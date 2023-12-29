import { createRouter, createWebHashHistory } from "vue-router";

// Screens
import Home from "../Screen/Home/Home.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [{ path: "/", component: Home }],
});
