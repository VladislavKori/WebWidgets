import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import Router from "./Router/router";
import { createI18n } from "vue-i18n";
import { getLanguage } from "./utils/LangFunc";

import EN from "./locale/EN.json";
import RU from "./locale/RU.json";

getLanguage().then((language: string) => {
  const app = createApp(App);

  const i18n = createI18n({
    locale: language,
    messages: {
      en: EN,
      ru: RU,
    },
  });

  app.use(i18n);
  app.use(Router);

  app.mount("#app").$nextTick(() => {
    // Remove Preload scripts loading
    postMessage({ payload: "removeLoading" }, "*");

    // Use contextBridge
    window.ipcRenderer.on("main-process-message", (_event, message) => {
      console.log(message);
    });
  });
});
