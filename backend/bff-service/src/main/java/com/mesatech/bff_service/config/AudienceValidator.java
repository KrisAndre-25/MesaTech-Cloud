package com.mesatech.bff_service.config;

import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Collection;
import java.util.Collections;

public class AudienceValidator implements OAuth2TokenValidator<Jwt> {

    // Entra ID puede emitir el claim aud como el GUID de la app o como su
    // Application ID URI (api://<guid>), segun la version del token; se
    // acepta cualquiera de las dos formas.
    private final Collection<String> audienciasAceptadas;

    public AudienceValidator(String clientId) {
        this.audienciasAceptadas = Collections.unmodifiableList(java.util.List.of(
                clientId,
                "api://" + clientId));
    }

    @Override
    public OAuth2TokenValidatorResult validate(Jwt jwt) {
        boolean coincide = jwt.getAudience().stream().anyMatch(audienciasAceptadas::contains);
        if (coincide) {
            return OAuth2TokenValidatorResult.success();
        }
        OAuth2Error error = new OAuth2Error(
                "invalid_token",
                "El token no contiene ninguna de las audiencias esperadas: " + audienciasAceptadas,
                null);
        return OAuth2TokenValidatorResult.failure(error);
    }
}
