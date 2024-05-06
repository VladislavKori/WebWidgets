<script lang="ts" setup>
import { ref } from "vue";
import Spinner from "../Spinner/Spinner.vue";

const props = withDefaults(
  defineProps<{
    size?: "small" | "medium" | "large";
    defaultValue?: boolean;
    onChange?: (value: boolean) => void;
    loading?: boolean;
  }>(),
  {
    size: "medium",
    defaultValue: false,
  }
);

const isActive = ref<boolean>(props.defaultValue);
function toggle(value?: boolean) {
  if (value === undefined) isActive.value = !isActive.value;
  else isActive.value = value;

  if (props.onChange) props.onChange(isActive.value);
}
</script>

<template>
  <div @click="toggle()" :class="['switch', { active: isActive }, size]">
    <div :class="['switch__rail', size, { active: isActive }]">
        <Spinner v-if="loading" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.switch {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  position: relative;
  transition: all .2s ease-in-out;

  &.small {
    height: 18px;
    width: 32px;
  }

  &.medium {
    height: 22px;
    width: 40px;
  }

  &.large {
    height: 26px;
    width: 48px;
  }

  &.active {
    background: #8c91ff;
  }

  &__rail {
    background: rgba(255, 255, 255, 1);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 3px;
    transform: translateY(-50%);
    transition: all .2s ease-in-out;

    &.small {
      height: 12px;
      width: 12px;

      &.active {
        left: 18px;
      }
    }

    &.medium {
      height: 16px;
      width: 16px;

      &.active {
        left: 20px;
      }
    }

    &.large {
      height: 20px;
      width: 20px;

      &.active {
        left: 24px;
      }
    }
  }
}
</style>
