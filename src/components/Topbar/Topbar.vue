<script lang="ts">
import './Topbar.scss'
import MinimizeIcon from '../../assets/Topbar/minimize.svg?component'
import MaximizeIcon from '../../assets/Topbar/maximize.svg?component'
import CloseIcon from '../../assets/Topbar/close.svg?component'

export default {
    name: "Topbar",
    components: {
        MinimizeIcon,
        MaximizeIcon,
        CloseIcon
    },
    methods: {
        async maximizeWindow() {
            await window.ipcRenderer.send("maximize")
        },
        async minimizeWindow() {
            await window.ipcRenderer.send("minimize")
        },
        async closeWindow() {
            await window.ipcRenderer.send("close")
        }
    }
}
</script>

<template>
    <div class="topbar">
        <button @click="minimizeWindow" class="topbar__btn">
            <MinimizeIcon />
        </button>
        <button @click="maximizeWindow" class="topbar__btn">
            <MaximizeIcon />
        </button>
        <button @click="closeWindow" class="topbar__btn topbar__btn_close">
            <CloseIcon />
        </button>
    </div>
</template>