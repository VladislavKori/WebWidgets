<script lang="ts">
import './Installed.scss'
import WidgetCardVue from '../../WidgetCard/WidgetCard.vue';
import { SearchWidgetReturn } from '../../../../types/Installation';

export default {
    name: "Installed",
    data() {
        return {
            array: new Array<SearchWidgetReturn>(),
        }
    },
    methods: {
        async getInstalled() {
            const widgets = await window.ipcRenderer.invoke("getInstalled")
            this.array = widgets
            console.log(this.array)
        }
    },
    components: {
        WidgetCardVue
    },
    async created() {
        this.getInstalled()
    }
}
</script>

<template>
    <div class="installed">
        <h1>{{ $t("titles.installed") }}</h1>
        <ul class="installed__list">
            <WidgetCardVue v-for="item in array" v-bind="item" />
        </ul>
    </div>
</template>