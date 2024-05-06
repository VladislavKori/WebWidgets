<script lang="ts" setup>
import "./ChangeLang.scss";
import { withDefaults } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const props = withDefaults(defineProps<{
  lang: "en" | "ru"
}>(), {
  lang: "en"
})

async function changeLang(value: "en" | "ru") {
  locale.value = value;
  await window.ipcRenderer.send("set-language", JSON.stringify({ language: value}));
}
</script>

<template>
  <div class="change-lang">
    <h3>{{ $t("titles.choseLang") }}</h3>
    <div class="change-lang__btns">
      <button
        @click="changeLang('ru')"
        class="change-lang__button"
        :class="{ active: props.lang == 'ru' }"
      >
        Ru
      </button>
      <button
        @click="changeLang('en')"
        class="change-lang__button"
        :class="{ active: lang == 'en' }"
      >
        En
      </button>
    </div>
  </div>
</template>
