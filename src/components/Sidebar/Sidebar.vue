<script lang="ts">
import './Sidebar.scss'

export default {
    name: "Sidebar",
}
</script>

<template>
    <aside class="sidebar">
        <router-link to="/">Home</router-link>
        <router-link to="/settings">Settings</router-link>
    </aside>
</template>