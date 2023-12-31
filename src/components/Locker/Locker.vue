<script lang="ts">
import { defineComponent } from 'vue';
import './Locker.scss'

export default defineComponent({
    name: "Locker",
    data() {
        return {
            isLock: false
        }
    },
    methods: {
        changeLockMod() {
            window.ipcRenderer.send("changeLockMod");
            this.getLockMod();
        },
        async getLockMod() {
            const mod: boolean = await window.ipcRenderer.invoke("getLockMod")
            this.isLock = mod
        }
    },
    async created() {
        await this.getLockMod()
    }
})
</script>

<template>
    <div @click="changeLockMod" class="lock-btn" v-if="isLock">Unlock</div>
    
    <div @click="changeLockMod" class="lock-btn" v-if="!isLock">Lock</div>
</template>