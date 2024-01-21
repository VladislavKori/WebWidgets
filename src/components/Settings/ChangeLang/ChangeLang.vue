<script lang="ts">
import { setLanguage } from '../../../utils/LangFunc';
import './ChangeLang.scss'

export default {
    name: "ChangeLang",
    data() {
        return {
            lang: 'en'
        }
    },
    methods: {
        changeLang(lang: string) {
            this.$i18n.locale = lang;
            this.lang = this.$i18n.locale;
            setLanguage(lang);
        }
    },
    mounted() {
        this.lang = this.$i18n.locale
    }
}
</script>

<template>
    <div class="change-lang">
        <h3>{{ $t('titles.choseLang') }}</h3>
        <div class="change-lang__btns">
            <button @click="changeLang('ru')" class="change-lang__button" :class="{ active: lang == 'ru' }">Ru</button>
            <button @click="changeLang('en')" class="change-lang__button" :class="{ active: lang == 'en' }">En</button>
        </div>
    </div>
</template>