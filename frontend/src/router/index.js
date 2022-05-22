import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

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
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
