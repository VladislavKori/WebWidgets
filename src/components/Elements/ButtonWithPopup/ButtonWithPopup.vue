<script lang="ts">
import './ButtonWithPopup.scss'
import MoreIcon from '../../../assets/Inprocess/more-vertical.svg?component'
import { ref, Ref } from 'vue'

export default {
    name: "ButtonWithPopup",
    components: {
        MoreIcon
    },
    data() {
    },
    methods: {
        hiddenPopup(event: any) {
            if (event.target === null) return null;

            if (event.target.closest(".buttonWithPopup__popup")) {
                this.changePopupState(true)
            } else if (event.target.closest(".buttonWithPopup")) {
                this.changePopupState()
            } else {
                this.changePopupState(false)
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.hiddenPopup)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.hiddenPopup)
    },
    setup() {
        let popupIsOpen: Ref<boolean> = ref(false)
        function changePopupState(value?: boolean) {
            if (value !== undefined) popupIsOpen.value = value;
            else popupIsOpen.value = !popupIsOpen.value
        }

        return { popupIsOpen, changePopupState }
    }
}

</script>

<template>
    <button class="buttonWithPopup" :class="{ buttonWithPopup_active: popupIsOpen }">
        <MoreIcon />
        <div v-if="popupIsOpen" class="buttonWithPopup__popup">
            <slot></slot>
        </div>
    </button>
</template>