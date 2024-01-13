<script lang="ts">
import './InprocessCard.scss'
import LockCard from "../../../../assets/Inprocess/lock-card.svg?component"
import UnlockCard from '../../../../assets/Inprocess/unlock-card.svg?component'

export default {
    name: "inprocess-card",
    components: {
        LockCard,
        UnlockCard
    },
    props: {
        processId: String,
        config: Object({
            name: String,
            description: String,
            preview: String
        }),
        lock: Boolean,
        folderPath: String,
    },
    methods: {
        closeWidget(processId: string) {
            window.ipcRenderer.send("closeWidget", JSON.stringify({ processId }))
        },
        lockWidget(processId: string) {
            window.ipcRenderer.send("change-lock-widget-status", JSON.stringify({ processId }))
        }
    }
}
</script>
<template>
    <div class="inprocess-card">
        <div class="inprocess-card__left">
            <div class="inprocess-card__imgbox">
                <img :src="folderPath + config.preview" />
            </div>
            <h4>{{ config.name }}</h4>
        </div>
        <div class="inprocess-card__right">
            <button class="inprocess-card__lock-btn" :class="{ 'inprocess-card__lock-btn_active': lock }" v-if="lock"
                @click="lockWidget(processId as string)">
                <UnlockCard class="inprocess-card__lock-icon" />
            </button>
            <button class="inprocess-card__lock-btn" v-if="!lock" @click="lockWidget(processId as string)">
                <LockCard class="inprocess-card__lock-icon" />
            </button>
            <button class="inprocess-card__disable-btn" @click="closeWidget(processId as string)" />
        </div>
    </div>
</template>