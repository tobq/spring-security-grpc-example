package org.akinyemi.tobi.example.services;

import org.akinyemi.tobi.example.Example;
import org.akinyemi.tobi.example.ExampleServiceGrpc;
import org.lognet.springboot.grpc.GRpcService;
import org.lognet.springboot.grpc.security.GrpcSecurity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import com.google.protobuf.Empty;

import io.grpc.Context;
import io.grpc.stub.StreamObserver;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@GRpcService
public class ExampleService extends ExampleServiceGrpc.ExampleServiceImplBase {
    @Override public void endpoint(Empty request, StreamObserver<Empty> responseObserver) {
        log.info("Endpoint called");
        responseObserver.onNext(Empty.newBuilder().build());
        responseObserver.onCompleted();
    }

    @Secured("SCOPE_monitoring:consent:write")
    @Override public void endpointAuth(Empty request, StreamObserver<Empty> responseObserver) {
        log.info("Authorised Endpoint called");
        log.info("{}", getAuthentication().getAuthorities());

        responseObserver.onNext(Empty.newBuilder().build());
        responseObserver.onCompleted();
    }

    @Secured({})
    @Override public void greet(Empty request, StreamObserver<Example.GreetResponse> responseObserver) {
        log.info("Greet called");

        var usersName = getToken().getClaimAsString("name");
        responseObserver.onNext(Example.GreetResponse.newBuilder()
                                                     .setGreeting("Hello " + usersName)
                                                     .build());
        responseObserver.onCompleted();
    }

    private Jwt getToken() {
        JwtAuthenticationToken authentication = getAuthentication();
        return authentication.getToken();
    }

    private JwtAuthenticationToken getAuthentication() {
        return (JwtAuthenticationToken) GrpcSecurity.AUTHENTICATION_CONTEXT_KEY.get(Context.current());
    }
}
