<script lang="ts" setup>
import OpenFolderIcon from "../../../assets/Settings/open-folder.svg?component";
import TrashIcon from "../../../assets/Settings/trash.svg?component";
import Button from "../../UI/Button/Button.vue";

defineProps<{
  folders: string[]
}>()

async function openWidgetsFolder(folderPath: string) {
  await window.ipcRenderer.send(
    "open-folder",
    JSON.stringify(folderPath)
  );
}

async function addWidgetFolder() {
  await window.ipcRenderer.send("add-folder");
}

async function removeWidgetFolder(path: string) {
  await window.ipcRenderer.send(
    "remove-folder",
    JSON.stringify(path)
  );
}
</script>

<template>
  <div class="widgetsFolder">
    <h3 class="widgetsFolder__title">{{ $t("titles.widgetFolders") }}</h3>
    <div class="widgetsFolder__list">
      <div class="widgetsFolder__filed" v-for="folderPath in folders">
        <p class="widgetsFolder__text">{{ folderPath }}</p>
        <Button
          size="small"
          variant="danger"
          class="widgetsFolder__remove-btn"
          @click="removeWidgetFolder(folderPath)"
        >
          <TrashIcon class="widgetsFolder__remove-btn-icon" />
        </Button>
        <Button
          size="small"
          class="widgetsFolder__openFolder"
          @click="openWidgetsFolder(folderPath)"
        >
          <OpenFolderIcon class="widgetsFolder__openFolder-icon" />
        </Button>
      </div>
    </div>
    <div class="widgetsFolder__manage">
      <Button @click="addWidgetFolder" class="widgetsFolder__add-btn">
        {{ $t("buttons.addFolder") }}
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.widgetsFolder {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  
  &__filed {
    background: rgb(244, 244, 244, 0.1);
    border-radius: 10px;
    padding: 8px 15px;
    display: flex;
    align-items: center;
    column-gap: 14px;

    &:first-child .widgetsFolder__remove-btn {
      display: none;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 300px;
    row-gap: 14px;
  }

  &__text {
    flex: 1;
    font-family: var(--font-inter);
    font-size: 14px;
    overflow-x: auto;
    color: #ffffff8c;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__openFolder,
  &__remove-btn {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;

    &-icon {
      width: 60%;
      height: 60%;
      fill: #fff;
    }
  }

  &__remove-btn-icon {
    fill: transparent;
    stroke: #fff;
    stroke-width: 2px;
  }

  &__title {
    font-family: var(--font-inter);
    font-size: 18px;
    color: #fff;
    font-weight: 400;
  }

  &__manage {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
