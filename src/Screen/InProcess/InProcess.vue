<script lang="ts">
import './InProcess.scss'
import WidgetCard from '../../components/WidgetCard/WidgetCard.vue';
import IWidget from '../../types/Widget';

export default {
    data() {
        return {
            array: new Array<IWidget>
        }
    },
    components: {
        WidgetCard
    },
    methods: {
        async getWidgetsInProcess() {
            const inProcessArray = await window.ipcRenderer.invoke("getWidgetsInProcess") 
            console.log(inProcessArray)
            this.array = inProcessArray;
        }
    },
    async created() {
        this.getWidgetsInProcess()
    }
}
</script>


<template>
    <h1>In process</h1>
    <div class="inprocess__list">
        <WidgetCard v-for="item in array" v-bind="item" />
    </div>
</template>