<template>
  <div id="app">
    <Header/>
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Header from "~/components/Header/Header";
import '@fortawesome/fontawesome-free/css/all.css';
</script>

<style scoped>
@import "assets/styles/main.scss";
</style>
