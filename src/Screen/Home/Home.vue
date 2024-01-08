<script lang="ts">
import './Home.scss'
import WidgetCard from '../../components/WidgetCard/WidgetCard.vue'
import Installed from '../../components/Home/Installed/Installed.vue'
import InProcess from '../../components/Home/Inprocess/Inprocess.vue'

export default {
    components: {
        WidgetCard,
        Installed,
        InProcess
    }
}
</script>

<template>
    <InProcess />
    <Installed />
</template>