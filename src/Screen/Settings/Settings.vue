<script lang="ts" setup>
import WidgetsFolder from "../../components/Settings/WidgetsFolder/WidgetsFolder.vue";
import ChangeLang from "../../components/Settings/ChangeLang/ChangeLang.vue";
import Autolaunch from "../../components/Settings/AutoLunch/AutoLunch.vue";
import { IAppConfiguration } from "../../../types/AppConfiguration";
import { onMounted, ref } from "vue";

const state = ref<IAppConfiguration>({
  language: 'en',
	autolaunch: true,
	folders: [], 
})

async function listenAppConfig() {
  await window.ipcRenderer.on("listen-app-config", (_, args) => {
    const { folders, language, autolaunch } = JSON.parse(args)
    state.value.folders = folders;
    state.value.language = language;
    state.value.autolaunch = autolaunch;
  })
}
async function callNotification() {
  await window.ipcRenderer.send("settings-controller-notificate")
}

onMounted(async () => {
  await listenAppConfig();
  await callNotification();
})
</script>

<template>
  <div class="settings">
    <h1 class="settings__title">{{ $t("titles.settings") }}</h1>
    <WidgetsFolder :folders="state.folders" />
    <ChangeLang :lang="state.language" />
    <Autolaunch :autolaunch="state.autolaunch" />
  </div>
</template>

<style lang="scss" scoped>
.settings {
  display: flex;
  flex-direction: column;
  row-gap: 14px;

  &__title {
    font-family: var(--font-inter);
    color: #fff;
    font-size: 32px;
    font-weight: 600;
  }
}
</style>
