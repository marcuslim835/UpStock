import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import News from "@/views/News.vue";
import Portfolio from "@/views/Portfolio.vue";
import Register from "@/views/Register.vue";
import Settings from "@/views/Settings.vue";
import StockPage from "@/views/StockPage.vue";
import StockSearch from "@/views/StockSearch.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/news",
    name: "News",
    component: News,
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/stockPage",
    name: "StockPage",
    component: StockPage,
  },
  {
    path: "/stockSearch",
    name: "StockSearch",
    component: StockSearch,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
