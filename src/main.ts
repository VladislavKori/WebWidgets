import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import Router from "./Router/router";

createApp(App)
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
