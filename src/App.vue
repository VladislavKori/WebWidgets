<script setup lang="ts">
import Sidebar from './components/Sidebar/Sidebar.vue'
import Topbar from './components/Topbar/Topbar.vue';
</script>

<template>
  <Topbar />
  <div class="container">
    <Sidebar />
    <div class="screen-wrapper">
      <div class="screen-scroller">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>