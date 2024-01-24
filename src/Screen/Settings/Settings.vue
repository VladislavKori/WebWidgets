<script lang="ts">
import WidgetsFolder from '../../components/Settings/WidgetsFolder/WidgetsFolder.vue'
import ChangeLang from '../../components/Settings/ChangeLang/ChangeLang.vue'
import ChangeMode from '../../components/Settings/ChangeMode/ChangeMode.vue'

export default {
    components: {
        WidgetsFolder,
        ChangeLang,
        ChangeMode
    }
}
</script>

<template>
    <h1>{{ $t('titles.settings') }}</h1>
    <WidgetsFolder />
    <ChangeLang />
    <ChangeMode />
</template>