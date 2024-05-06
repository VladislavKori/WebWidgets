import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import Router from "./Router/router";
import { createI18n } from "vue-i18n";
import { getLanguage } from "./utils/LangFunc";

import EN from "./locale/EN.json";
import RU from "./locale/RU.json";

getLanguage().then((language: string | undefined) => {
  const app = createApp(App);

  const i18n = createI18n({
    legacy: false,
    locale: language ? language : "en",
    messages: {
      en: EN,
      ru: RU,
    },
  });

  app.use(i18n);
  app.use(Router);

  app.mount("#app").$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
    window.ipcRenderer.on("main-process-message", (_event, message) => {
      console.log(message);
    });
  });
});
