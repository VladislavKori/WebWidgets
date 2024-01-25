<script lang="ts">
import './Toggle.scss'

export default {
    name: "Toggle",
    props: {
        value: {
            type: Boolean,
            default: false
        },
    },
}
</script>

<template>
    <div @click="$emit('changeState')" class="toggle">
        <div class="toggle__point" :class="{ active: value }"></div>
    </div>
</template>