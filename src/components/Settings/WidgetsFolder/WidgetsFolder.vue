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
            const folders = await window.ipcRenderer.invoke("get-widget-folders")
            this.folders = folders;
        },
        async openWidgetsFolder(folderPath: string) {
            await window.ipcRenderer.invoke("open-widget-folder", JSON.stringify(folderPath))
        }
    },
    async created() {
        await this.getWidgetFolders()
    }
}
</script>

<template>
    <div class="widgetsFolder">
        <h3>Widgets Folder</h3>
        <div class="widgetsFolder__filed" v-for="folderPath in folders">
            <p class="widgetsFolder__text">{{ folderPath }}</p>
            <button class="widgetsFolder__openFolder" @click="openWidgetsFolder(folderPath)">
                <OpenFolderIcon class="widgetsFolder__openFolder-icon" />
            </button>
        </div>
    </div>
</template>