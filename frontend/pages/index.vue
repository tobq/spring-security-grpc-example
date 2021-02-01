<template>
  <div class="container">
    <div>
      <h1 class="title">Vue GRPC + PKCE Oauth Flow </h1>
      <div class="">
        <button @click="testGrpc">Test Grpc</button>
        <button @click="testGrpcAuth">Test Secured Method</button>
        <br/>
        <label>Name: </label>
        <span>{{ currentUser }}</span>
        <button @click="greet">Greet Me</button>
        <p>{{ greetingMessage }}</p>
        <p>{{ debugMessage }}</p>


        <button class='btn' @click='login' v-if='!isLoggedIn'>Login</button>
        <button class='btn' @click='logout' v-if='isLoggedIn'>Logout</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {test, testAuth, greet} from '~/service/example';
import {getUser, login, logout} from "~/service/auth";

@Component({})
export default class HomePage extends Vue {
  public greetingMessage: string = '';
  public debugMessage: string = '';
  private isLoggedIn: boolean = false;
  private accessTokenExpired: boolean = false;
  private currentUser: string = '';

  async testGrpc() {
    await this.tryGrpc(test);
  }

  async testGrpcAuth() {
    await this.tryGrpc(testAuth);
  }

  private async tryGrpc<T>(req: () => Promise<T>) {
    try {
      let res = await req();
      console.log(res);
      this.debugMessage = "GRPC Request submitted successfully";
      return res;
    } catch (e) {
      console.log(e);
      this.debugMessage = "GRPC Request failed: " + e;
    }
  }

  public login() {
    login();
  }

  public logout() {
    logout();
  }

  async greet() {
    try {
      const greeting = await greet();
      console.log(greeting);
      this.greetingMessage = greeting;
      this.debugMessage = "GRPC Request submitted successfully";
    } catch (e) {
      this.debugMessage = "GRPC Request failed: " + e;
    }
  }

  public async mounted() {
    const user = await getUser();
    if (user) {
      this.currentUser = user.profile.name;
      this.accessTokenExpired = user.expired;
      this.isLoggedIn = !user.expired;
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
