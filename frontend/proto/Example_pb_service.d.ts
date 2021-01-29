// package: org.akinyemi.tobi.example
// file: Example.proto

import * as Example_pb from "./Example_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ExampleServiceendpoint = {
  readonly methodName: string;
  readonly service: typeof ExampleService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type ExampleServiceendpointAuth = {
  readonly methodName: string;
  readonly service: typeof ExampleService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof google_protobuf_empty_pb.Empty;
};

type ExampleServicegreet = {
  readonly methodName: string;
  readonly service: typeof ExampleService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Example_pb.GreetRequest;
  readonly responseType: typeof Example_pb.GreetResponse;
};

export class ExampleService {
  static readonly serviceName: string;
  static readonly endpoint: ExampleServiceendpoint;
  static readonly endpointAuth: ExampleServiceendpointAuth;
  static readonly greet: ExampleServicegreet;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ExampleServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  endpoint(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  endpoint(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  endpointAuth(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  endpointAuth(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_empty_pb.Empty|null) => void
  ): UnaryResponse;
  greet(
    requestMessage: Example_pb.GreetRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: Example_pb.GreetResponse|null) => void
  ): UnaryResponse;
  greet(
    requestMessage: Example_pb.GreetRequest,
    callback: (error: ServiceError|null, responseMessage: Example_pb.GreetResponse|null) => void
  ): UnaryResponse;
}

