<script lang="ts" setup>
withDefaults(
  defineProps<{
    size?: "small" | "medium" | "large";
    fill?: boolean;
    variant?: "default" | "danger";
    active?: boolean;
  }>(),
  {
    size: "medium",
    fill: false,
    variant: "default",
    active: false,
  }
);
</script>

<template>
  <button :class="['button', variant, size, { fill }, { active }]">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  border-radius: 10px;
  border: none;
  outline: none;
  transition: all 0.2s ease-in-out;
  width: max-content;

  font-family: var(--font-inter);
  font-weight: 500;
  font-size: 12px;
  line-height: 167%;
  letter-spacing: 0.03em;
  color: #fff;

  &.medium {
    padding: 4px 20px;
  }

  &.default {
    background: #2a303c;

    &.active {
      background: #8c91ff;

      &:hover {
        background: #5d61ac;
      }
    }

    &:hover {
      background: #1e222b;
    }
  }

  &.danger {
    background: rgba(255, 27, 27, 0.6);

    &:hover {
      background: rgba(255, 27, 27, 0.4);
    }
  }

  &.fill {
    width: 100%;
  }
}
</style>
