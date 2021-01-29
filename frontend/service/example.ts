import {ExampleServiceClient, ServiceError, UnaryResponse} from '~/proto/Example_pb_service'
import {GreetResponse} from '~/proto/Example_pb';
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {getAuthMetadata} from "~/service/auth";
import {BrowserHeaders} from "browser-headers";
// import {GreetRequest, ExampleServiceClientImpl, GrpcWebImpl} from "~/proto2/Example"
// import {Empty} from "~/proto2/google/protobuf/empty"

let hostname = 'http://localhost:10000';
const client = new ExampleServiceClient(hostname)

export async function test() {
  return await new Promise<Empty>((res, rej) => client.endpoint.bind(client)(new Empty(), null, (err, resp) => {
    if (err) rej(err);
    else res(resp);
  }));
}

export async function testAuth() {
  return await new Promise<Empty>(async (res, rej) => client.endpointAuth.bind(client)(new Empty(), await getAuthMetadata(), (err, resp) => {
    if (err) rej(err);
    else res(resp);
  }));
}

// export const testAuthUnary = (name: string) => {
//   console.log("calling")
//   let metadata = new grpc.Metadata();
//   let accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPcWNlZWU0a2VsTFZMcjZQcDJDRVhBdjA5XzUxaHpYUV9kZ3oyOWtjTldBIn0.eyJleHAiOjE2MTE4NDc3ODIsImlhdCI6MTYxMTg0NzQ4MiwiYXV0aF90aW1lIjoxNjExODQ2NDA3LCJqdGkiOiJkMTY4NjM5Zi04NjRkLTRiOWYtODEzMy04NjA5Y2ZkZTIzOGEiLCJpc3MiOiJodHRwczovL3NhbmRib3guaWFtLnlhcGlseS5jb20vYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZGQ4YWMzNTktYzk5ZS00YmZhLWIzNTItOWRmZTA5M2NkMDE4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibW9uaXRvcmluZyIsIm5vbmNlIjoiZjM3bXYiLCJzZXNzaW9uX3N0YXRlIjoiMGFmYzNiMTktYzgwNC00NDBjLTlhNTMtMzE0MTc4M2ZlMWU4IiwiYWNyIjoiMCIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgbW9uaXRvcmluZzpjb25zZW50OndyaXRlIHByb2ZpbGUgZW1haWwgbW9uaXRvcmluZzpyZXF1ZXN0OndyaXRlIG1vbml0b3Jpbmc6YWRtaW4gbW9uaXRvcmluZzp2aWV3IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiVG9iaSBBa2lueWVtaSIsInByZWZlcnJlZF91c2VybmFtZSI6InRvYmkuYWtpbnllbWlAeWFwaWx5LmNvbSIsImdpdmVuX25hbWUiOiJUb2JpIiwiZmFtaWx5X25hbWUiOiJBa2lueWVtaSIsImVtYWlsIjoidG9iaS5ha2lueWVtaUB5YXBpbHkuY29tIn0.EDvSuXIGqWGJlQSHsJQYuT-D_aIH2w_2xzfCnfkeUfpv37_aEOKDWp19EZc-ZGqJumIpJyl4vmU0S8A58cHPUhe4Y-AWfoZQMYn6oVTLJOzTlONEBrq5bznOMONlc7wSiJIU7nbvoUPVb_myIguWGRRV1QW09Ilj4VRDTWuoeNpYMP4B58tIYqgLQWP-Uinn_dtsUggfbHHXbQ9VpoTjkai7vlJeB1N34YiwHEM10-Hi3Wu7EMz_ylN09mR4v4YrQbG9T8Ahu52bVkjFk17uTajo5D2oFyJrq2RkNGEJMaqot7JeNYIIGLu3YBUe2pOsrGjQG_8NbB2E63wN3_vUpg";
//   metadata.append("Authorization-bin", `Bearer ${accessToken}`)
//
//   return new Promise((resolve, reject) => {
//     const request = new Empty();
//     grpc.unary(ExampleService.endpointAuth, {
//       request: request,
//       metadata: metadata,
//       host: hostname,
//       onEnd: ({status, message: response, trailers}) => {
//         if (status === grpc.Code.OK && response) {
//           return resolve(response.toObject());
//         } else {
//           const errorMessage = trailers.headersMap['grpc-message'][0] ?? 'Failed to load hello service';
//           return reject(errorMessage);
//         }
//       },
//     });
//   });
// };

export async function greet(): Promise<string> {
  const res: GreetResponse = await new Promise<GreetResponse>(async(res, rej) => client.greet.bind(client)(new Empty(), await getAuthMetadata(), (err, resp) => {
    if (err) rej(err);
    else res(resp);
  }));
  return res.getGreeting()
  // let request = GreetRequest.fromJSON({name: name});
  // let res = await client.greet(request);
  // return res.greeting;
}

// export async function testAuth(name: string) {
//   let metadata = new grpc.Metadata();
//   metadata.append("Authorization-bin","Bearer "+"ooo000iOYOOOOOOOOOOOo")
//   return new Promise<Empty>((res, rej) => client.endpointAuth(new Empty(), metadata, (err, resp) => {
//     if (err) rej(err);
//     else res(resp);
//   }));
// }


// export async function testAsyncAuth(name: string) {
//   return new Promise<Empty>((res, rej) => asyncClient.endpointAuth(new Empty(), null, (err, resp) => {
//     if (err) rej(err);
//     else res(resp);
//   }));
// }
