<template>
  <div class="container">
  </div>
</template>

<script lang="ts">
import {userManager} from "~/service/auth";

userManager.signinSilentCallback()
</script>
