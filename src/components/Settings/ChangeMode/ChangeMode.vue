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
            this.changeToggleState()
            if (this.toggleState) this.enableDevMode();
            else this.disableDevMode();
        }
    },
    setup() {
        let toggleState = ref(false);

        function changeToggleState(): void {
            toggleState.value = !toggleState.value;
        }

        return {
            toggleState,
            changeToggleState
        }
    }
})

</script>

<template>
    <div class="changeMode">
        <h3>Dev Mode</h3>
        <div class="changeMode__row">
            <p class="changeMode__text">Enable developer mode and develop widgets much faster using Chrome dev tools</p>
            <Toggle :value="toggleState" @changeState="changeMode" />
        </div>
    </div>
</template>