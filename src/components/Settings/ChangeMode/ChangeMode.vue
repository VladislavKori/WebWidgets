<script lang="ts">
import { defineComponent, ref } from 'vue'
import Toggle from '../../Elements/Toggle/Toggle.vue';
import './ChangeMode.scss'

export default defineComponent({
    name: "ChangeMode",
    components: { Toggle },
    methods: {
        enableDevMode() {
            window.ipcRenderer.invoke("enable-dev-mode")
        },
        disableDevMode() {
            window.ipcRenderer.invoke("disable-dev-mode")
        },
        changeMode() {
            this.changeToggleState(!this.toggleState)
            if (this.toggleState) this.enableDevMode();
            else this.disableDevMode();
        },
        async getMode(): Promise<boolean> {
            return await window.ipcRenderer.invoke("get-mode")
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
})

</script>

<template>
    <div class="changeMode">
        <h3>{{ $t('titles.devMode') }}</h3>
        <div class="changeMode__row">
            <p class="changeMode__text">{{ $t("texts.infoAboutDevMode") }}</p>
            <div>
                <Toggle :value="toggleState" @changeState="changeMode" />
            </div>
        </div>
    </div>
</template>