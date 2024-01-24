<script lang="ts">
import Switch from '../../Elements/Switch/Switch.vue';
import './ChangeMode.scss'

export default {
    name: "ChangeMode",
    components: { Switch },
    methods: {
        enableDevMode() {
            window.ipcRenderer.invoke("enable-dev-mode")
        },
        disableDevMode() {
            window.ipcRenderer.invoke("disable-dev-mode")
        }
    },
}

</script>

<template>
    <div class="changeMode">
        <h3>Dev Mode</h3>
        <div class="changeMode__row">
            <p class="changeMode__text">Enable developer mode and develop widgets much faster using Chrome dev tools</p>
            <!-- <Switch :state="false" /> -->
            <button @click="enableDevMode">Enable</button>
            <button @click="disableDevMode">Disable</button>
        </div>
    </div>
</template>