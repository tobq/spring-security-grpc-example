package org.akinyemi.tobi.example.services;

import org.akinyemi.tobi.example.ExampleServiceGrpc;
import org.lognet.springboot.grpc.GRpcService;

import com.google.protobuf.Empty;

import io.grpc.stub.StreamObserver;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@GRpcService
public class ExampleService extends ExampleServiceGrpc.ExampleServiceImplBase {
    @Override
    public void endpoint(Empty request, StreamObserver<Empty> responseObserver) {
        log.info("endpoint reached - doing nothing");
        responseObserver.onNext(Empty.newBuilder().build());
        responseObserver.onCompleted();
    }

    @Override
    public void stream(Empty request, StreamObserver<Empty> responseObserver) {
        log.info("stream reached");
        for (int i = 0; i < 10; i++) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                log.error("stream processing interrupted", e);
                responseObserver.onError(e);
                return;
            }
            log.info("sending response {}", i);
            responseObserver.onNext(Empty.newBuilder().build());
        }
        responseObserver.onCompleted();
    }
}
