<script lang="ts">
import { ref } from 'vue'
import Toggle from '../../Elements/Toggle/Toggle.vue';

export default {
    name: "AutoLunch",
    components: { Toggle },
    methods: {
        enableDevMode() {
            window.ipcRenderer.invoke("enable-auto-lunch")
        },
        disableDevMode() {
            window.ipcRenderer.invoke("disable-auto-lunch")
        },
        changeMode() {
            this.changeToggleState(!this.toggleState)
            if (this.toggleState) this.enableDevMode();
            else this.disableDevMode();
        },
        async getMode(): Promise<boolean> {
            return await window.ipcRenderer.invoke("get-lunch-mode")
        }
    },
    setup() {
        let toggleState = ref(false);

        function changeToggleState(to: boolean): void {
            toggleState.value = to;
        }

        return {
            toggleState,
            changeToggleState
        }
    },
    async mounted() {
        this.changeToggleState(await this.getMode())
    }
}
</script>

<template>
    <div class="changeMode">
        <h3>{{ $t('titles.autoLunch') }}</h3>
        <div class="changeMode__row">
            <p class="changeMode__text">{{ $t("texts.autoLunch") }}</p>
            <div>
                <Toggle :value="toggleState" @changeState="changeMode" />
            </div>
        </div>
    </div>
</template>