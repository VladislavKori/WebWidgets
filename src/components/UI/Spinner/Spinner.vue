<script setup lang="ts">

withDefaults(defineProps<{
    size: "small" | "medium" | "large"
}>(), {
    size: "medium"
})

</script>

<template>
    <span class="loader"></span>
</template>

<style lang="scss" scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #8C91FF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
