<script lang="ts">
import './Home.scss'
import WidgetCard from '../../components/WidgetCard/WidgetCard.vue'
import Installed from '../../components/Home/Installed/Installed.vue'

export default {
    components: {
        WidgetCard,
        Installed
    }
}
</script>

<template>
    <Installed />
</template>