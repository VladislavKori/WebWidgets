<script lang="ts" setup>
import { IWidget } from "../../../../../types/Widget";

const props = defineProps<IWidget>();
const createWidget = async () => {
  console.log('createWidget')
    await window.ipcRenderer.send("launch-widget", JSON.stringify({ widgetId: props.widgetId }));
}

</script>

<template>
  <div class="card">
    <img :src="folderPath + config.preview" />
    <p>{{ config.name }}</p>
    <button @click="createWidget">Create</button>
  </div>
</template>

<style lang="scss" scoped>
.card {
    color: #fff;
}
</style>