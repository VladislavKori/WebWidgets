import { createRouter, createWebHashHistory } from "vue-router";

// Screens
import Home from "../Screen/Home/Home.vue";
import Settings from "../Screen/Settings/Settings.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/settings", component: Settings },
  ],
});
