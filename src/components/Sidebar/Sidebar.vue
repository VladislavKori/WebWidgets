<script lang="ts">
import './Sidebar.scss'
import Locker from '../Locker/Locker.vue'

export default {
    name: "Sidebar",
    components: {
        Locker,
    }
}
</script>

<template>
    <aside class="sidebar">
        <div class="sidebar__content">
            <router-link class="sidebar__link" to="/">Home</router-link>
            <router-link class="sidebar__link" to="/settings">Settings</router-link>
            <router-link class="sidebar__link" to="/inprocess">In Process</router-link>
        </div>
    </aside>
</template>