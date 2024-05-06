<script lang="ts" setup>
import "./Inprocess.scss";
import InprocessCard from "./InprocessCard/InprocessCard.vue";
import { onMounted, ref } from "vue";
import { IWidgetForRenderProcess } from "../../../../types/Widget";

const widgets = ref<Array<IWidgetForRenderProcess>>([]);
function updateState(array: IWidgetForRenderProcess[]) {
  widgets.value = array;
}

async function listenWidgetsInProcess() {
    await window.ipcRenderer.on("listen-widgets-in-process", (_, args) => {
      updateState(JSON.parse(args));
    });
}
async function callNotification() {
  await window.ipcRenderer.send("process-controller-notificate");
}

onMounted(async () => {
  await callNotification()
  await listenWidgetsInProcess()
});
</script>

<template>
  <div class="inprocess">
    <div class="inprocess__content">
      <InprocessCard
        v-for="(item, index) in widgets"
        :key="index"
        v-bind="item"
      />
    </div>
  </div>
</template>
