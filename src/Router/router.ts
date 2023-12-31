import { createRouter, createWebHashHistory } from "vue-router";

// Screens
import Home from "../Screen/Home/Home.vue";
import Settings from "../Screen/Settings/Settings.vue";
import InProcessVue from "../Screen/InProcess/InProcess.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/settings", component: Settings },
    { path: "/inprocess", component: InProcessVue}
  ],
});
