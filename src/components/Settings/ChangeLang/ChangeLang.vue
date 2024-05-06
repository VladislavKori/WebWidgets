<script lang="ts" setup>
import { setLanguage } from "../../../utils/LangFunc";
import "./ChangeLang.scss";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const lang = ref<string>("en");
function changeLang(value: string) {
  locale.value = value;
  lang.value = value;
  setLanguage(value);
}

onMounted(() => {
    lang.value = locale.value;
})
</script>

<template>
  <div class="change-lang">
    <h3>{{ $t("titles.choseLang") }}</h3>
    <div class="change-lang__btns">
      <button
        @click="changeLang('ru')"
        class="change-lang__button"
        :class="{ active: lang == 'ru' }"
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
