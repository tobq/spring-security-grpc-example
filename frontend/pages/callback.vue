<template>
  <div class="container">
  </div>
</template>

<script lang="ts">
import {userManager} from "~/service/auth";

(async () => {
  try {
    const user = await userManager.signinRedirectCallback();
    console.log("signin response success", user);
    window.location.href = '../';
  } catch (e) {
    console.log(e);
  }
})();
</script>
