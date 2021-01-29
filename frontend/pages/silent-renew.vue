<template>
  <div class="container">
    <div>
      <h1 class="title">GRPC-boilerplate</h1>
      <div class="">
        <button @click="testGrpc">Test</button>
        <button @click="testGrpcAuth">Test Auth</button>
        <br/>
        <p>{{ message }}</p>
        <label>Name: </label>
        <input type="text" v-model="name"/>
        <button @click="greet">Greet</button>
        <p>{{ greetingMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {userManager} from "~/service/auth";

userManager.signinSilentCallback()
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
