<script lang="ts">
import './WidgetsFolder.scss'
import OpenFolderIcon from '../../../assets/Settings/open-folder.svg?component'

export default {
    name: "WidgetsFolder",
    data() {
        return {
            folder: ""
        }
    },
    components: {
        OpenFolderIcon
    },
    methods: {
        async getWidgetsFolder() {
            const folder = await window.ipcRenderer.invoke("get-widgets-folder")
            this.folder = folder;
        },
        async openWidgetsFolder() {
            await window.ipcRenderer.invoke("open-widget-folder")
        }
    },
    async created() {
        await this.getWidgetsFolder()
    }
}
</script>

<template>
    <div class="widgetsFolder">
        <h3>Widgets Folder</h3>
        <div class="widgetsFolder__filed">
            <p class="widgetsFolder__text">{{ folder }}</p>
            <button class="widgetsFolder__openFolder" @click="openWidgetsFolder">
                <OpenFolderIcon class="widgetsFolder__openFolder-icon" />
            </button>
        </div>
    </div>
</template>