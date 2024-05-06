<script lang="ts">
import WidgetsFolder from "../../components/Settings/WidgetsFolder/WidgetsFolder.vue";
import ChangeLang from "../../components/Settings/ChangeLang/ChangeLang.vue";
import ChangeMode from "../../components/Settings/ChangeMode/ChangeMode.vue";
import AutoLunch from "../../components/Settings/AutoLunch/AutoLunch.vue";

export default {
  components: {
    WidgetsFolder,
    ChangeLang,
    ChangeMode,
    AutoLunch,
  },
};
</script>

<template>
  <div class="settings">
    <h1 class="settings__title">{{ $t("titles.settings") }}</h1>
    <WidgetsFolder />
    <ChangeLang />
    <ChangeMode />
    <AutoLunch />
  </div>
</template>

<style lang="scss" scoped>
.settings {
  display: flex;
  flex-direction: column;
  row-gap: 14px;

  &__title {
    font-family: var(--font-inter);
    color: #fff;
    font-size: 32px;
    font-weight: 600;
  }
}
</style>
