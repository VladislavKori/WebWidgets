import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import Router from "./Router/router";
import { createI18n } from "vue-i18n";

import EN from "./locale/EN.json";
import RU from "./locale/RU.json";

function getLanguageFromCookie(): string {
  const langFromCookie = document.cookie.split("=")[1];
  const defualtLang = "en";

  if (!langFromCookie) {
    document.cookie = `lang=${defualtLang}`;
  }

  return langFromCookie || defualtLang;
}

const i18n = createI18n({
  locale: getLanguageFromCookie(),
  messages: {
    en: EN,
    ru: RU,
  },
});

createApp(App)
  .use(i18n)
  .use(Router)
  .mount("#app")
  .$nextTick(() => {
    // Remove Preload scripts loading
    postMessage({ payload: "removeLoading" }, "*");

    // Use contextBridge
    window.ipcRenderer.on("main-process-message", (_event, message) => {
      console.log(message);
    });
  });
