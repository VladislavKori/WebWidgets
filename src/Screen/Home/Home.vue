<script lang="ts">
import './Home.scss'
import WidgetCard from '../../components/WidgetCard/WidgetCard.vue'
import IWidget from '../../types/Widget'

export default {
    data() {
        return {
            array: new Array<IWidget>(),
        }
    },
    components: {
        WidgetCard
    },
    methods: {
        async getInstalled() {
            const widgets = await window.ipcRenderer.invoke("getInstalled")
            this.array = widgets
        }
    },
    async created() {
        this.getInstalled()
    }
}
</script>

<template>
    <h1>Home</h1>
    <div>
        <h3>Instsalled</h3>
    </div>
    <div class="widgets__scroll">
        <div class="widgets">
            <WidgetCard v-for="item in array" v-bind="(item)" />
        </div>
    </div>
</template>