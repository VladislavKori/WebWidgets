<script setup lang="ts">
  import Sidebar from './components/Sidebar/Sidebar.vue'
</script>

<template>
  <div class="container">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>