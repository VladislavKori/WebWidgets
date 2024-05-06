<script setup lang="ts">
import { withDefaults } from "vue";

withDefaults(
  defineProps<{
    placeholder?: string;
    disabled?: boolean;
    defaultValue?: string;
    size?: "small" | "medium" | "large";
    fill?: boolean;
    value?: string | number;
    status?: "error" | "warning" | "success";
    type?: "text" | "password" | "number";
    prefix?: string;
    onChange?: (event: Event) => void;
  }>(),
  {
    size: "medium",
  }
);
</script>

<template>
  <div :class="['input', { disabled }, size]">
    <div v-if="prefix !== undefined" :class="['input__prefix']">
      <p>{{ prefix }}</p>
    </div>
    <span v-if="prefix !== undefined" class="input__separator"></span>
    <input
      :type="type"
      :class="['input__input-el', size, { disabled }]"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="value"
      @input="onChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.input {
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 3px 6px -3px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1),
    0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 0 -1px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 7px;

  display: flex;
  align-items: center;
  column-gap: 8px;

  &.small {
    padding: 0 10px;
  }

  &.medium {
    padding: 0 9px;
  }

  &.large {
    padding: 0 20px;
  }

  &.disabled {
    cursor: not-allowed;
  }

  &__input-el {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;

    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 13px;
    line-height: 150%;
    color: #fff;

    &::placeholder {
      color: #6b7280;
    }

    &.small {
      padding: 5px 0;
    }

    &.medium {
      padding: 9px 0;
    }

    &.large {
      padding: 15px 0;
    }

    &.disabled {
      cursor: not-allowed;
    }
  }

  &__prefix {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    & p {
      font-family: var(--font-inter);
      font-weight: 500;
      font-size: 12px;
      line-height: 167%;
      color: #6b7280;
    }
  }

  &__separator {
    width: 1px;
    height: 18px;
    background: rgba(107, 114, 128, 0.45);
  }
}
</style>
