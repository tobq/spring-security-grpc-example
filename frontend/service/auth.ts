import {UserManager, WebStorageStateStore} from 'oidc-client';
import {grpc} from "@improbable-eng/grpc-web";
import Metadata = grpc.Metadata;

export const userManagerSettings: any = {
  userStore: new WebStorageStateStore({store: window.localStorage}),
  authority: "https://sandbox.iam.yapily.com/auth/realms/internal",
  client_id: 'grpc-test',
  redirect_uri: 'http://localhost:3000/callback',
  automaticSilentRenew: true,
  silent_redirect_uri: 'http://localhost:3000/silent-renew',
  response_type: 'code',
  scope: 'openid profile',
  post_logout_redirect_uri: 'http://localhost:3000/',
  response_mode: "query",
  filterProtocolClaims: true
};

export const userManager = new UserManager(userManagerSettings);

export async function getUser() {
  return userManager.getUser();
}

export async function login() {
  return userManager.signinRedirect();
}

export async function loginSilent() {
  return userManager.signinSilent();
}

export async function logout() {
  return userManager.signoutRedirect();
}

async function sleep(millis: number) {
  return new Promise<void>(res => {
    setTimeout(() => res(), millis);
  })
}

export async function getAccessToken() {
  let user = await userManager.getUser();
  while (user == null) {
    await login();
    console.log("Sleeping following a lack of redirection after login");
    await sleep(1000);
  }
  return user.access_token;
}


export async function getAuthMetadata() {
  let metadata = new Metadata();
  metadata.append("Authorization", `Bearer ${await getAccessToken()}`);
  return metadata;
}
