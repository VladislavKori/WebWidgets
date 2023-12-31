<script lang="ts">
import './Sidebar.scss'

export default {
    name: "Sidebar",
}
</script>

<template>
    <aside class="sidebar">
        <router-link class="sidebar__link" to="/">Home</router-link>
        <router-link class="sidebar__link" to="/settings">Settings</router-link>
    </aside>
</template>