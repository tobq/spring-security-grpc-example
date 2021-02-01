package org.akinyemi.tobi.example.security;

import org.lognet.springboot.grpc.security.EnableGrpcSecurity;
import org.lognet.springboot.grpc.security.GrpcSecurity;
import org.lognet.springboot.grpc.security.GrpcSecurityConfigurerAdapter;
import org.lognet.springboot.grpc.security.jwt.JwtAuthProviderFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;

@EnableGrpcSecurity
public class GrpcSecurityConfiguration extends GrpcSecurityConfigurerAdapter {
    private final JwtDecoder jwtDecoder;

    public GrpcSecurityConfiguration(@Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}") String issuer) {
        jwtDecoder = JwtDecoders.fromOidcIssuerLocation(issuer);
    }

    @Override
    public void configure(GrpcSecurity builder) throws Exception {
        builder.authorizeRequests()
               .withSecuredAnnotation()
               .authenticationProvider(JwtAuthProviderFactory.forAuthorities(jwtDecoder));
    }
}
