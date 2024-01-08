<script lang="ts">
import './Inprocess.scss'
import LockKeyhole from '../../../assets/Inprocess/lock-keyhole.svg?component'
import LockKeyholeUnlocked from '../../../assets/Inprocess/lock-keyhole-unlocked.svg?component'
import InprocessCard from './InprocessCard/InprocessCard.vue'
import { ref, Ref } from 'vue'
import { IProcessWidget } from '../../../../types/Process'

export default {
    name: "InProcess",
    data() {
        return {
            allWidgetsLock: false,
        }
    },
    components: {
        LockKeyhole,
        LockKeyholeUnlocked,
        InprocessCard
    },
    methods: {
        async changeLockStatusById(id: string, doLock: boolean) {
            await window.ipcRenderer.send("change-lock-status", JSON.stringify({ id, doLock }))
        },
        async changeLockStatusForAllWidgets() {
            await window.ipcRenderer.send("change-lock-status-for-all-widgets")
        },
        async listenWidgetsInProcess() {
            await window.ipcRenderer.on("widgets-in-process", (_, args) => {
                this.updateState(JSON.parse(args).wins)
                this.allWidgetsLock = JSON.parse(args).allIsLock
            })
        },
        async getWidgetsInProcess() {
            await window.ipcRenderer.send("getWidgetsInProcess")
        }
    },
    async created() {
        await this.getWidgetsInProcess()
        await this.listenWidgetsInProcess()
    },
    setup() {
        const widgets = ref([]) as Ref<IProcessWidget[]>

        function updateState(array: IProcessWidget[]) {
            widgets.value = array
            console.log(widgets.value)
        }

        return {
            widgets,
            updateState
        }
    }
}
</script>

<template>
    <div class="inprocess">
        <header class="inprocess__header">
            <h1>In Process</h1>
            <button @click="changeLockStatusForAllWidgets" v-if="allWidgetsLock" class="inprocess__lock">
                <LockKeyhole class="inprocess__lock-icon" />
            </button>
            <button @click="changeLockStatusForAllWidgets" v-if="!allWidgetsLock" class="inprocess__lock">
                <LockKeyholeUnlocked class="inprocess__lock-icon" />
            </button>
        </header>
        <div class="inprocess__content">
            <h5 v-if="widgets.length === 0">Is Empty</h5>
            <InprocessCard v-for="(item, index) in widgets" :key="index" v-bind="item" />
        </div>
    </div>
</template>