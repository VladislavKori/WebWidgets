<script lang="ts">
import { defineComponent } from 'vue';
import './WidgetCard.scss'

const uninstallWidget = () => {
    window.ipcRenderer.invoke("uninstall")
        .then(result => console.log(result))
}

export default defineComponent({
    name: "WidgetCard",
    props: {
        processId: undefined || String,
        path: String,
        config: Object({
            name: String,
            description: String,
            preview: String
        })
    },
    methods: {
        uninstallWidget,
        createWidget() {
            window.ipcRenderer.send("createWidget", JSON.stringify({ config: this.config, path: this.path }))
        },
        closeWidget(processId: string) {
            window.ipcRenderer.send("closeWidget", JSON.stringify({processId}))
        }
    }
})
</script>

<template>
    <div class="card">
        <div class="card__preview">
            <img :src="path + config.preview" alt="preview" />
        </div>
        <div class="card__content">
            <h2 class="card__title">{{ config.name }}</h2>
            <p class="card__subtitle">{{ config.description }}</p>
            <button class="card__btn card__btn_uninstall" @click="uninstallWidget()">Uninstall</button>
            <button class="card__btn card__btn_create" @click="createWidget">Create</button>
            <button v-if="processId !== undefined" class="card__btn card__btn_close" @click="closeWidget(processId)">
                Close
            </button>
        </div>
    </div>
</template>