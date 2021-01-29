/* eslint-disable */
import { UnaryMethodDefinition } from '@improbable-eng/grpc-web/dist/typings/service';
import { Empty } from './google/protobuf/empty';
import { BrowserHeaders } from 'browser-headers';
import { grpc } from '@improbable-eng/grpc-web';
import { Writer, Reader } from 'protobufjs/minimal';

export const protobufPackage = 'org.akinyemi.tobi.example';

export interface GreetRequest {
  name: string;
}

export interface GreetResponse {
  greeting: string;
}

const baseGreetRequest: object = { name: '' };

export const GreetRequest = {
  encode(message: GreetRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GreetRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGreetRequest } as GreetRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GreetRequest {
    const message = { ...baseGreetRequest } as GreetRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    return message;
  },

  fromPartial(object: DeepPartial<GreetRequest>): GreetRequest {
    const message = { ...baseGreetRequest } as GreetRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = '';
    }
    return message;
  },

  toJSON(message: GreetRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },
};

const baseGreetResponse: object = { greeting: '' };

export const GreetResponse = {
  encode(message: GreetResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.greeting);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GreetResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGreetResponse } as GreetResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.greeting = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GreetResponse {
    const message = { ...baseGreetResponse } as GreetResponse;
    if (object.greeting !== undefined && object.greeting !== null) {
      message.greeting = String(object.greeting);
    } else {
      message.greeting = '';
    }
    return message;
  },

  fromPartial(object: DeepPartial<GreetResponse>): GreetResponse {
    const message = { ...baseGreetResponse } as GreetResponse;
    if (object.greeting !== undefined && object.greeting !== null) {
      message.greeting = object.greeting;
    } else {
      message.greeting = '';
    }
    return message;
  },

  toJSON(message: GreetResponse): unknown {
    const obj: any = {};
    message.greeting !== undefined && (obj.greeting = message.greeting);
    return obj;
  },
};

export interface ExampleService {
  endpoint(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<Empty>;
  endpointAuth(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<Empty>;
  greet(request: DeepPartial<GreetRequest>, metadata?: grpc.Metadata): Promise<GreetResponse>;
}

export class ExampleServiceClientImpl implements ExampleService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  endpoint(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(ExampleServiceendpointDesc, Empty.fromPartial(request), metadata);
  }

  endpointAuth(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(ExampleServiceendpointAuthDesc, Empty.fromPartial(request), metadata);
  }

  greet(request: DeepPartial<GreetRequest>, metadata?: grpc.Metadata): Promise<GreetResponse> {
    return this.rpc.unary(ExampleServicegreetDesc, GreetRequest.fromPartial(request), metadata);
  }
}

export const ExampleServiceDesc = {
  serviceName: 'org.akinyemi.tobi.example.ExampleService',
};

export const ExampleServiceendpointDesc: UnaryMethodDefinitionish = {
  methodName: 'endpoint',
  service: ExampleServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Empty.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...Empty.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const ExampleServiceendpointAuthDesc: UnaryMethodDefinitionish = {
  methodName: 'endpointAuth',
  service: ExampleServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Empty.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...Empty.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const ExampleServicegreetDesc: UnaryMethodDefinitionish = {
  methodName: 'greet',
  service: ExampleServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GreetRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      return {
        ...GreetResponse.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
    }
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
        : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message);
          } else {
            const err = new Error(response.statusMessage) as any;
            err.code = response.status;
            err.metadata = response.trailers;
            reject(err);
          }
        },
      });
    });
  }
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
