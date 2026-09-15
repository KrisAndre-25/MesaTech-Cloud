package com.mesatech.bff_service.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Entra ID entrega dos tipos de claim distintos que deben convertirse en
 * GrantedAuthority:
 * - "scp": permisos delegados (scopes), string separado por espacios -> SCOPE_xxx
 * - "roles": App Roles asignados al usuario (Cliente/Operador/Administrador),
 *   array de strings que ya vienen con el prefijo ROLE_ definido en el manifiesto.
 */
public class EntraIdAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        List<GrantedAuthority> authorities = new ArrayList<>();

        String scopes = jwt.getClaimAsString("scp");
        if (scopes != null && !scopes.isBlank()) {
            for (String scope : scopes.split(" ")) {
                authorities.add(new SimpleGrantedAuthority("SCOPE_" + scope));
            }
        }

        List<String> roles = jwt.getClaimAsStringList("roles");
        if (roles != null) {
            for (String rol : roles) {
                authorities.add(new SimpleGrantedAuthority(rol));
            }
        }

        return authorities;
    }
}
