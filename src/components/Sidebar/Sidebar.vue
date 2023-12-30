<script lang="ts">
import './Sidebar.scss'
import Locker from '../Locker/Locker.vue'

export default {
    name: "Sidebar",
    components: {
        Locker
    }
}
</script>

<template>
    <aside class="sidebar">
        <router-link to="/">Home</router-link>
        <router-link to="/settings">Settings</router-link>
        <router-link to="/inprocess">In Process</router-link>
        <Locker />
    </aside>
</template>