<script lang="ts">
import WidgetsFolder from '../../components/Settings/WidgetsFolder/WidgetsFolder.vue'
import ChangeLang from '../../components/Settings/ChangeLang/ChangeLang.vue'

export default {
    components: {
        WidgetsFolder,
        ChangeLang
    }
}
</script>

<template>
    <h1>{{ $t('titles.settings') }}</h1>
    <WidgetsFolder />
    <ChangeLang />
</template>