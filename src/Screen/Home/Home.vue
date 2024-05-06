<script lang="ts" setup>
import "./Home.scss";
import Button from "../../components/UI/Button/Button.vue";
import { onMounted, ref, h } from "vue";
import Installed from "../../components/Home/Installed/Installed.vue";
import Inprocess from "../../components/Home/Inprocess/Inprocess.vue";
import MoreIcon from '../../assets/Inprocess/more-vertical.svg?component'

import Dropdown from "../../components/UI/Dropdown/Dropdown.vue";

import LockKeyhole from "../../assets/Inprocess/lock-keyhole.svg?component";
import LockKeyholeUnlocked from "../../assets/Inprocess/lock-keyhole-unlocked.svg?component";
import { IWidget } from "../../../types/Widget";

type Mode = "installed" | "active";
const mode = ref<Mode>("installed");
function changeModeAction(value: Mode) {
  mode.value = value;
}

const allWidgetsLocked = ref<boolean>(false);
async function changeLockStatusForAllWidgets() {
  allWidgetsLocked.value = !allWidgetsLocked.value;
  options.value[0].title = allWidgetsLocked.value ? "Unlock" : "Lock";
  await window.ipcRenderer.send("change-lock-status-for-all-widgets");
}
async function listenWidgetsInProcess() {
  await window.ipcRenderer.on("widgets-in-process", (_, args) => {
    allWidgetsLocked.value = JSON.parse(args).every((item: IWidget) => item.parameters?.locker === true);
  });
}

onMounted(async () => {
  await listenWidgetsInProcess();
});

const options = ref<Array<any>>([
  {
    title:  allWidgetsLocked.value ? "Unlock" : "Lock",
    action: changeLockStatusForAllWidgets,
    icon: LockKeyhole
  }
])
</script>

<template>
  <div class="home">
    <header class="home__header">
      <div class="home__buttons">
        <Button
          :active="mode == 'installed'"
          @click="changeModeAction('installed')"
        >
          Installed
        </Button>
        <Button :active="mode == 'active'" @click="changeModeAction('active')">
          Active
        </Button>
      </div>

      <Dropdown :options="options" v-if="mode == 'active'">
        <Button size="small" class="home__trigger">
          <MoreIcon />
        </Button>
      </Dropdown>
    </header>
    <Installed v-if="mode == 'installed'" />
    <Inprocess v-if="mode == 'active'" />
  </div>
</template>

<style scoped lang="scss">
.home {

  &__header {
    justify-content: space-between;
  }

  &__buttons, 
  &__header {
    display: flex;
    align-items: center;
    column-gap: 8px;    
  }

  &__trigger {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
