<script lang="ts">
import { defineComponent } from 'vue';


function getWidgetsInstalled() {
    window.ipcRenderer.invoke("getInstalled").then(res => {
        console.log(res)
    })
}

export default defineComponent({
    methods: {
        getWidgetsInstalled
    }
})

</script>
(
<template>
    <h1>Home</h1>
    <div>
        <h3>Instsalled</h3>
        <button @click="getWidgetsInstalled">Load</button>
    </div>
    <div>

    </div>
</template>