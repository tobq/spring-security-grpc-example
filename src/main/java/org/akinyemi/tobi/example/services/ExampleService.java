package org.akinyemi.tobi.example.services;

import lombok.extern.slf4j.Slf4j;
import org.akinyemi.tobi.example.ExampleServiceGrpc;
import org.lognet.springboot.grpc.GRpcService;
import org.springframework.security.access.annotation.Secured;

import com.google.protobuf.Empty;

import io.grpc.stub.StreamObserver;

@Slf4j
@GRpcService
public class ExampleService extends ExampleServiceGrpc.ExampleServiceImplBase {
    @Secured("SCOPE_monitoring:consent:write")
    @Override
    public void endpoint(Empty request, StreamObserver<Empty> responseObserver) {
        log.info("endpoint reached - doing nothing");
        responseObserver.onNext(Empty.newBuilder().build());
        responseObserver.onCompleted();
    }
}
