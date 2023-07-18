<script setup>
import NavBar from "@/components/NavBar.vue";
import { store } from "@/services/auth.js";

</script>

<template>
  <main>
    <NavBar  v-if="store.user"/>
    <router-view />
  </main>
</template>
