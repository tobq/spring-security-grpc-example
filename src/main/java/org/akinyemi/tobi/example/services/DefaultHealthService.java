package org.akinyemi.tobi.example.services;

import org.lognet.springboot.grpc.GRpcService;

import io.grpc.health.v1.HealthCheckRequest;
import io.grpc.health.v1.HealthCheckResponse;
import io.grpc.health.v1.HealthGrpc;
import io.grpc.stub.StreamObserver;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@GRpcService
public class DefaultHealthService extends HealthGrpc.HealthImplBase {
    @Override
    public void check(HealthCheckRequest request, StreamObserver<HealthCheckResponse> responseObserver) {
        responseObserver.onNext(buildResponse());
        responseObserver.onCompleted();
    }

    @Override
    public void watch(HealthCheckRequest request, StreamObserver<HealthCheckResponse> responseObserver) {
        responseObserver.onNext(buildResponse());
        try {
            // services do not change status
            Thread.sleep(Long.MAX_VALUE);
        } catch (InterruptedException e) {
            // unless for some reason were shutting down
            log.error("health.watch connection interrupted",e);
        } finally {
            responseObserver.onCompleted();
        }
    }

    private HealthCheckResponse buildResponse() {
        return HealthCheckResponse.newBuilder().setStatus(HealthCheckResponse.ServingStatus.SERVING).build();
    }

}
