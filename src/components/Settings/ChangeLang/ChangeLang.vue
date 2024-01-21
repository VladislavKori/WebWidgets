<script lang="ts">
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
            document.cookie = "lang=" + lang;
            this.lang = lang;
            window.location.reload();
        }
    },
    mounted() {
        this.lang = document.cookie.split('=')[1]
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