<script lang="ts">
import './InprocessCard.scss'

export default {
    name: "inprocess-card",
    props: {
        processId: String,
        config: Object({
            name: String,
            description: String,
            preview: String
        }),
        lock: Boolean,
        folderPath: String,
    },
    methods: {
        closeWidget(processId: string) {
            window.ipcRenderer.send("closeWidget", JSON.stringify({ processId }))
        },
        lockWidget(processId: string) {
            window.ipcRenderer.send("change-lock-widget-status", JSON.stringify({ processId }))
        }
    }
}
</script>
<template>
    <div class="inprocess-card">
        <div class="inprocess-card__left">
            <div class="inprocess-card__imgbox">
                <img :src="folderPath + config.preview" />
            </div>
            <div>
                <h4>{{ config.name }}</h4>
                <p>{{ config.description }}</p>
            </div>
        </div>
        <button @click="closeWidget(processId as string)">Disable</button>
        <button v-if="lock" @click="lockWidget(processId as string)">Unlock</button>
        <button v-if="!lock" @click="lockWidget(processId as string)">Lock</button>
    </div>
</template>