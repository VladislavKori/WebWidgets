<script lang="ts" setup>
import "./InprocessCard.scss";
import LockCard from "../../../../assets/Inprocess/lock-card.svg?component";
import UnlockCard from "../../../../assets/Inprocess/unlock-card.svg?component";
import { onMounted, ref } from "vue";
import Input from "../../../UI/Input/Input.vue";
import Collapse from "../../../UI/Collapse/Collapse.vue";
import { IWidgetForRenderProcess } from "../../../../../types/Widget";
import Switch from "../../../UI/Switch/Switch.vue";

const props = defineProps<IWidgetForRenderProcess>();

const drawerIsOpen = ref<boolean>(false);
function toggleDrawer(value?: boolean) {
  if (value !== undefined) drawerIsOpen.value = value;
  else drawerIsOpen.value = !drawerIsOpen.value;
}

async function closeWidget() {
  await window.ipcRenderer.send(
    "stop-widget",
    JSON.stringify({ id: props.id })
  );
}

const widgetIsLock = ref<boolean>(props.parameters?.locker || false);
const widgetPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const widgetWorkMode = ref<"dev" | "production">("production")
function updateWidgetPosition(x: number, y: number) {
  widgetPosition.value = { x, y };
  window.ipcRenderer.send(
    "change-widget-position",
    JSON.stringify({ id: props.id, position: { x, y } })
  );
}

async function initPositionListner({ processId }: { processId: string }) {
  console.log(props.id)
  await window.ipcRenderer.on(`listen-widget-${props.id}`, (_, args) => {
    const value: {
      id: string;
      position: { x: number; y: number };
      locker: boolean;
      mode: "dev" | "production"
    } = JSON.parse(args);
    if (value.id === processId) {
      widgetPosition.value = { x: value.position.x, y: value.position.y };
      widgetIsLock.value = value.locker;
    }
  });
}

async function lockWidget() {
  await window.ipcRenderer.send(
    "lock-widgets",
    JSON.stringify({ widgets: [{ id: props.id }] })
  );
}
async function unlockWidget() {
  await window.ipcRenderer.send(
    "unlock-widgets",
    JSON.stringify({ widgets: [{ id: props.id }] })
  );
}
async function changeLockStatus() {
  if (widgetIsLock.value) await unlockWidget();
  else await lockWidget();
}

async function enableDevMode() {
  await window.ipcRenderer.send(
    "enable-dev-mode",
    JSON.stringify({ widgets: [{ id: props.id }] })
  );
}

async function disableDevMode() {
  await window.ipcRenderer.send(
    "disable-dev-mode",
    JSON.stringify({ widgets: [{ id: props.id }] })
  )
}

async function changeWorkMode() {
  console.log(props.id, props.parameters?.mode)
  if (props.parameters?.mode === "dev") await disableDevMode()
  else if (props.parameters?.mode === "production") await enableDevMode()
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggleDrawer(false);
});

onMounted(async () => {
  if (props.id) {
    await initPositionListner({ processId: props.id });
  }

  // if (props.parameters?.position) {
  //   widgetPosition.value = {
  //     x: props.parameters?.position.x,
  //     y: props.parameters?.position.y,
  //   };
  // }

  if (props.parameters?.mode) {
    widgetWorkMode.value = props.parameters.mode;
  }
});
</script>

<template>
  <div v-if="drawerIsOpen" :class="['inprocess-card__drawer']">
    <Collapse :title="config.name" :defaultValue="true">
      <Input type="number" placeholder="X axis" prefix="X" :value="widgetPosition.x"
        :onChange="event => updateWidgetPosition(parseInt((event.target as HTMLInputElement).value), widgetPosition.y)" />

      <Input type="number" placeholder="Y axis" prefix="Y" :value="widgetPosition.y"
        :onChange="event => updateWidgetPosition(widgetPosition.x, parseInt((event.target as HTMLInputElement).value))" />

      <div>
        <p>Lock</p>
        <Switch :onChange="changeLockStatus" :defaultValue="widgetIsLock" />
      </div>

      <div>
        <p>Dev Mode</p>
        <Switch :onChange="changeWorkMode" :defaultValue="parameters?.mode === 'dev'" />
      </div>
    </Collapse>
  </div>
  <div @click="toggleDrawer()" class="inprocess-card">
    <div class="inprocess-card__left">
      <div class="inprocess-card__imgbox">
        <img :src="folderPath + config.preview" />
      </div>
      <h4>{{ config.name }}</h4>
      <h4>{{ parameters?.mode }}</h4>
      <button @click="closeWidget">close</button>
    </div>
    <div class="inprocess-card__right">
      <button class="inprocess-card__lock-btn" :class="{ 'inprocess-card__lock-btn_active': parameters.locker }"
        v-if="parameters?.locker" @click="lockWidget">
        <UnlockCard class="inprocess-card__lock-icon" />
      </button>
      <!-- <button
        class="inprocess-card__lock-btn"
        v-if="!lock"
        @click="lockWidget(processId as string)"
      >
        <LockCard class="inprocess-card__lock-icon" />
      </button> -->
      <!-- <button
        class="inprocess-card__disable-btn"
        @click="closeWidget(processId as string)"
      /> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inprocess-card {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  width: max-content;
  min-width: 260px;
  height: max-content;

  &__imgbox {
    width: 100%;
  }

  &__drawer {
    position: absolute;
    right: 0;
    top: 0;
    width: 400px;
    height: 100%;
    padding: 20px;
    background: #101725;
    z-index: 2;
    transition: all 0.2s ease-in-out;
  }
}
</style>
