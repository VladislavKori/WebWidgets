<script lang="ts" setup>
import { FunctionalComponent, VNodeChild, h } from 'vue';

const props = defineProps<{
  title: string;
  icon?: FunctionalComponent<any>;
  action: () => void;
}>();

console.log(props.icon)
</script>

<template>
  <div class="di" @click="action">
    <div class="di__iconbox" v-if="icon !== undefined">
        <component class="di__icon" :is="icon"/>
    </div>
    <p class="di__text">{{ title }}</p>
  </div>
</template>

<style lang="scss" scoped>
.di {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 7px;
  background: transparent;
  transition: all .2s ease-in-out;
  column-gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &__text {
    font-size: 12px;
    font-family: var(--font-inter);
    color: #fff;
    font-weight: 500;
  }

  &__iconbox {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 100%;
    height: 100%;
  }
}
</style>
