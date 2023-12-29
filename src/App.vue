<script setup lang="ts">
import Sidebar from './components/Sidebar/Sidebar.vue'
</script>

<template>
  <div class="container">
    <Sidebar />
    <div class="screen-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>