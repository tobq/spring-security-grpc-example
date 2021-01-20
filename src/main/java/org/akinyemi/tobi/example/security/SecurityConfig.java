package org.akinyemi.tobi.example.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;

@Configuration
public class SecurityConfig {
    private final String issuer;

    public SecurityConfig(@Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}") String issuer) {
        this.issuer = issuer;
    }

    @Bean
    JwtDecoder jwtDecoder() {
        //        NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder) JwtDecoders.fromOidcIssuerLocation(issuer);
        //
        //        //        OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
        //        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
        //        //        OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);
        //
        //        //        jwtDecoder.setJwtValidator(withAudience);
        //        jwtDecoder.setJwtValidator(withIssuer);
        //
        //        return jwtDecoder;
        return JwtDecoders.fromOidcIssuerLocation(issuer);
    }
}
