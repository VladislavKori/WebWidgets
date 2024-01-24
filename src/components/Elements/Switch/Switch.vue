<script lang="ts">
import './Switch.scss'

export default {
    name: "Switch",
    data() {
        return {
            switchState: false
        }
    },
    porps: {
        state: Boolean,
        func1: Function,
        func2: Function
    },
    methods: {
        changeState() {
            this.switchState = !this.switchState;
            console.log(this.state, this.func1, this.func2)
        }
    },
}
</script>

<template>
    <div @click="changeState" class="switch">
        <div class="switch__point" :class="switchState === true ? 'active' : ''"></div>
    </div>
</template>