import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
