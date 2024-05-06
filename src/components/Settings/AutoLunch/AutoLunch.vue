<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Switch from "../../UI/Switch/Switch.vue";

const props = withDefaults(defineProps<{
  autolaunch: boolean
}>(), {
  autolaunch: false
})

const mode = ref<boolean>(props.autolaunch);

function changeMode(value: boolean) {
  if (value) mode.value = value;
  else mode.value = !mode.value;

  if (mode.value) enableAutolaunch();
  else disableAutolaunch();
}
async function enableAutolaunch() {
  await window.ipcRenderer.send("enable-autolaunch");
}
async function disableAutolaunch() {
  await window.ipcRenderer.send("disable-autolaunch");
}
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
        />
      </div>
    </div>
  </div>
</template>
