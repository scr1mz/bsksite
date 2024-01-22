<template>
  <header class="header">
    <div class="header__container">
      <NuxtLink to="/" class="header__logo">БСК</NuxtLink>
      <nav class="header__nav">
        <ul class="nav-items">
          <li class="nav-item">
            <NuxtLink to="/news" class="nav-link">Новости</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
@import "assets/styles/components/Header.scss";
</style>
