import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Auth from "@/views/Auth.vue";
import Dashboard from "@/views/Dashboard.vue";
import FirstTimeLogin from "@/views/FirstTimeLogin.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    alias: ["/login", "/register"],
    name: "Auth",
    component: Auth,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/dashboard",
    alias: ["/dashboard/user/settings"],
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/firstTimeLogin",
    alias: "/firstTimeLogin",
    name: "FirstTimeLogin",
    component: FirstTimeLogin
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
