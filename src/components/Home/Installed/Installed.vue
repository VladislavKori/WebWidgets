<script lang="ts">
import './Installed.scss'
import WidgetCardVue from '../../WidgetCard/WidgetCard.vue';

export default {
    name: "Installed",
    data() {
        return {
            array: new Array<IWidget>(),
        }
    },
    methods: {
        async getInstalled() {
            const widgets = await window.ipcRenderer.invoke("getInstalled")
            this.array = widgets
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

        <ul class="installed__list">
            <WidgetCardVue v-for="item in array" v-bind="item" />
            <WidgetCardVue v-for="item in array" v-bind="item" />
        </ul>
    </div>
</template>
