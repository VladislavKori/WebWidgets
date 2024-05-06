<script lang="ts" setup>
import { ref } from "vue";
import Arrow from "../../../assets/UI/Collapse/arrow-down.svg";

const props = withDefaults(
  defineProps<{
    title: string;
    defaultValue?: boolean;
  }>(),
  {
    defaultValue: false,
  }
);

const isOpen = ref(props.defaultValue);
const toggleCollapse = (value?: boolean) => {
  if (value !== undefined) isOpen.value = value;
  else isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="collapse">
    <header @click="toggleCollapse()" class="collapse__header">
      <h4 class="collapse__title">{{ title }}</h4>
      <Arrow :class="['collapse__arrow', { isOpen }]" />
    </header>

    <div :class="['collapse__content', { isOpen }]">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collapse {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }

  &__arrow {
    transform: rotate(-180deg);
    transition: all 0.2s ease-in-out;
    
    &.isOpen {
        transform: rotate(0deg);
    }
  }

  &__title {
    font-family: var(--font-inter);
    font-weight: 500;
    font-size: 12px;
    line-height: 167%;
    letter-spacing: 0.03em;
    color: #9ca3af;
  }

  &__content {
    flex-direction: column;
    row-gap: 8px;
    padding: 8px 0;
    display: none;
    opacity: 0;
    transition: all .2s ease-in-out;

    &.isOpen {
        opacity: 1;
        display: flex;
    }
  }
}
</style>
