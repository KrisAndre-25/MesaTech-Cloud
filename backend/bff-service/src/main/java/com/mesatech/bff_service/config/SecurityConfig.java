package com.mesatech.bff_service.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuerUri;

    @Value("${security.oauth2.audience}")
    private String audience;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // Endpoint de version sin autenticacion, usado por API Gateway (GET /v2/version)
                        .requestMatchers(HttpMethod.GET, "/v2/version").permitAll()
                        // Ver todas las solicitudes y cambiar estado: solo Operador/Administrador
                        .requestMatchers(HttpMethod.GET, "/v1/solicitudes", "/v2/solicitudes")
                            .hasAnyAuthority("ROLE_OPERADOR", "ROLE_ADMINISTRADOR")
                        .requestMatchers(HttpMethod.PUT, "/v1/solicitudes/*/estado")
                            .hasAnyAuthority("ROLE_OPERADOR", "ROLE_ADMINISTRADOR")
                        // Mantener catalogo: solo Administrador
                        .requestMatchers(HttpMethod.POST, "/v1/catalogo/**").hasAuthority("ROLE_ADMINISTRADOR")
                        .requestMatchers(HttpMethod.PUT, "/v1/catalogo/**").hasAuthority("ROLE_ADMINISTRADOR")
                        .requestMatchers(HttpMethod.DELETE, "/v1/catalogo/**").hasAuthority("ROLE_ADMINISTRADOR")
                        // Crear solicitud, ver las propias y consultar catalogo: cualquier usuario autenticado
                        .anyRequest().authenticated())
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .decoder(jwtDecoder())
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())));

        return http.build();
    }

    // Permite que el frontend React (localhost:3000) consuma el BFF, incluyendo
    // el header Authorization con el Bearer token.
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuracion = new CorsConfiguration();
        configuracion.setAllowedOrigins(List.of("http://localhost:3000"));
        configuracion.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuracion.setAllowedHeaders(List.of("Authorization", "Content-Type"));

        UrlBasedCorsConfigurationSource fuente = new UrlBasedCorsConfigurationSource();
        fuente.registerCorsConfiguration("/**", configuracion);
        return fuente;
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        NimbusJwtDecoder decoder = (NimbusJwtDecoder) JwtDecoders.fromIssuerLocation(issuerUri);
        OAuth2TokenValidator<Jwt> conIssuer = JwtValidators.createDefaultWithIssuer(issuerUri);
        OAuth2TokenValidator<Jwt> conAudiencia = new AudienceValidator(audience);
        OAuth2TokenValidator<Jwt> validadorCombinado =
                new DelegatingOAuth2TokenValidator<>(conIssuer, conAudiencia);
        decoder.setJwtValidator(validadorCombinado);
        return decoder;
    }

    // Mapea tanto el scope delegado ("scp" -> SCOPE_access_as_user) como los
    // App Roles del usuario ("roles" -> ROLE_CLIENTE/ROLE_OPERADOR/ROLE_ADMINISTRADOR).
    private JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(new EntraIdAuthoritiesConverter());
        return converter;
    }
}
