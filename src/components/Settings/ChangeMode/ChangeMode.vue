<script lang="ts" setup>
import {  onMounted, ref } from 'vue'
import Switch from '../../UI/Switch/Switch.vue';

type IModes = "dev" | "default"
const workMode = ref<IModes>('default');
const modeLoading = ref<boolean>(false);
function chagneMode(isActive: boolean) {
    workMode.value = isActive ? 'dev' : 'default';

    if (workMode.value === "dev") window.ipcRenderer.invoke("enable-dev-mode")
    else if (workMode.value === "default") window.ipcRenderer.invoke("disable-dev-mode")
}
function devModeisActive(): boolean {
    return workMode.value === "dev";
}

async function getMode(): Promise<IModes> {
    modeLoading.value = true;
    const result: boolean = await window.ipcRenderer.invoke("get-mode")
    if (result) return "dev"
    else return "default"
}

onMounted(async () => {
    workMode.value = await getMode();
    modeLoading.value = false;
})
</script>

<template>
    <div class="changeMode">
        <h3>{{ $t('titles.devMode') }}</h3>
        <div class="changeMode__row">
            <p class="changeMode__text">{{ $t("texts.infoAboutDevMode") }}</p>
            <div>
                <Switch size="large" :onChange="chagneMode" :defaultValue="devModeisActive()" :loading="modeLoading" />
            </div>
        </div>
    </div>
</template>