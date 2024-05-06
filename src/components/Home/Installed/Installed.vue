<script lang="ts" setup>
import "./Installed.scss";
import Card from "./Card/Card.vue"
import { IWidget } from "../../../../types/Widget";
import { onMounted, ref } from "vue";

const widgets = ref<Array<IWidget>>([]);
async function listenInstalledWidgets() {
  await window.ipcRenderer.on("listen-installed-widgets", (_, args: string) => {
    widgets.value = JSON.parse(args);
  });
}
async function callNotification() {
  await window.ipcRenderer.send("manage-controller-notificate")
}

onMounted(async () => {
  await callNotification();
  await listenInstalledWidgets();
});
</script>

<template>
  <div class="installed">
    <ul class="installed__list">
      <Card v-for="item in widgets" v-bind="item" />
    </ul>
  </div>
</template>
