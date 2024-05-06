<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Switch from "../../UI/Switch/Switch.vue";

const mode = ref<boolean>(false);
const modeLoading = ref<boolean>(false);

function changeMode(value: boolean) {
    console.log(value);
  if (value) mode.value = value;
  else mode.value = !mode.value;

  if (mode.value) enableDevMode();
  else disableDevMode();
}
function enableDevMode() {
  window.ipcRenderer.invoke("enable-auto-lunch");
}
function disableDevMode() {
  window.ipcRenderer.invoke("disable-auto-lunch");
}
async function getMode(): Promise<boolean> {
  modeLoading.value = true;
  return await window.ipcRenderer.invoke("get-lunch-mode");
}

onMounted(async () => {
  console.log(await getMode());
  changeMode(await getMode());
  modeLoading.value = false;
});
</script>

<template>
  <div class="changeMode">
    <h3>{{ $t("titles.autoLunch") }}</h3>
    <div class="changeMode__row">
      <p class="changeMode__text">{{ $t("texts.autoLunch") }}</p>
      <div>
        <Switch
          size="large"
          :onChange="changeMode"
          :defaultValue="mode"
          :loading="modeLoading"
        />
      </div>
    </div>
  </div>
</template>
