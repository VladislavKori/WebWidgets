<script lang="ts" setup>
import { ref } from 'vue'
import DropdownItem from './DropdownItem.vue';

withDefaults(defineProps<{
    options: Array<any>
    size: "small" | "medium" | "large"
}>(), {
    size: "medium"
})

const isOpen = ref<boolean>(false)
function triggerHandler(value?: boolean) {
    if (value === undefined) isOpen.value = !isOpen.value
    else isOpen.value = value
}

</script> 

<template>
    <div class="dropdown">
        <div @click="triggerHandler()" class="dropdown__trigger">
            <slot></slot>

        </div>
        <div v-if="isOpen" :class="['dropdown__content', size]">
           <DropdownItem v-for="option in options" v-bind="option" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dropdown {
    position: relative;

    &__content {
        position: absolute;
        top: 100%;
        right: 0;
        background: #2a303c;
        transform: translateY(8px);
        padding: 5px;
        border-radius: 7px;
        box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);

        &.small {
            width: 150px;
        }
         
        &.medium {
            width: 200px;
        }

        &.large {
            width: 250px;   
        }
    }    
}
</style>