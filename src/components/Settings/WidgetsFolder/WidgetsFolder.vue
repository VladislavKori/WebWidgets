<script lang="ts">
import './WidgetsFolder.scss'
import OpenFolderIcon from '../../../assets/Settings/open-folder.svg?component'

export default {
    name: "WidgetsFolder",
    data() {
        return {
            folders: new Array<string>()
        }
    },
    components: {
        OpenFolderIcon
    },
    methods: {
        async getWidgetFolders() {
            this.folders = await window.ipcRenderer.invoke("get-widget-folders")
        },
        async openWidgetsFolder(folderPath: string) {
            await window.ipcRenderer.invoke("open-widget-folder", JSON.stringify(folderPath))
        },
        async addWidgetFolder() {
            this.folders = await window.ipcRenderer.invoke("add-widget-folder")
        },
        async removeWidgetFolder(path: string) {
            this.folders = await window.ipcRenderer.invoke("remove-widget-folder", JSON.stringify(path))
        }
    },
    async created() {
        await this.getWidgetFolders()
    }
}
</script>

<template>
    <div class="widgetsFolder">
        <h3>{{ $t('titles.widgetFolders') }}</h3>
        <div class="widgetsFolder__list">
            <div class="widgetsFolder__filed" v-for="folderPath in folders">
                <p class="widgetsFolder__text">{{ folderPath }}</p>
                <button class="widgetsFolder__remove-btn" @click="removeWidgetFolder(folderPath)"></button>
                <button class="widgetsFolder__openFolder" @click="openWidgetsFolder(folderPath)">
                    <OpenFolderIcon class="widgetsFolder__openFolder-icon" />
                </button>
            </div>
        </div>
        <div class="widgetsFolder__manage">
            <button @click="addWidgetFolder" class="widgetsFolder__add-btn">{{ $t("buttons.addFolder") }}</button>
        </div>
    </div>
</template>