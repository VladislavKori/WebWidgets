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
        folderPath: String,
        config: Object({
            name: String,
            description: String,
            preview: String
        })
    },
    methods: {
        uninstallWidget,
        createWidget() {
            window.ipcRenderer.send("createWidget", JSON.stringify(this.$props))
        }
    }
})
</script>

<template>
    <div class="card">
        <div class="card__preview">
            <img :src="folderPath + config.preview" alt="preview" />
        </div>
        <div class="card__content">
            <h3 class="card__title">{{ config.name }}</h3>
            <p class="card__subtitle">{{ config.description }}</p>
            <div class="card__btns">
                <button class="card__btn card__btn_create" @click="createWidget">{{ $t("buttons.create") }}</button>
                <button class="card__btn card__btn_uninstall" @click="uninstallWidget">{{ $t("buttons.uninstall") }}</button>
            </div>
        </div>
    </div>
</template>