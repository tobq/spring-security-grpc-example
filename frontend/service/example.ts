import {ExampleServiceClient} from '~/proto/Example_pb_service'
import {GreetResponse} from '~/proto/Example_pb';
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {getAuthMetadata} from "~/service/auth";

let hostname = 'http://localhost:10000';
const client = new ExampleServiceClient(hostname)

export async function test() {
  return await new Promise<Empty>((res, rej) => client.endpoint(new Empty(), null, (err, resp) => {
    if (err) rej(err);
    else res(resp);
  }));
}

export async function testAuth() {
  return await new Promise<Empty>(async (res, rej) => client.endpointAuth(new Empty(), await getAuthMetadata(), (err, resp) => {
    if (err) rej(err);
    else res(resp);
  }));
}


export async function greet(): Promise<string> {
  const res: GreetResponse = await new Promise<GreetResponse>(async(res, rej) => client.greet(new Empty(), await getAuthMetadata(), (err, resp) => {
    if (err) rej(err);
    else res(resp);
  }));
  return res.getGreeting()
}
