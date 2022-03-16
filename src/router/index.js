import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import News from "@/views/News.vue";
import Portfolio from "@/views/Portfolio.vue";
import AccountOverview from "@/views/AccountOverview.vue";
import EditDetails from "@/views/EditDetails.vue"
import PrivacySettings from "@/views/PrivacySettings.vue"
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
    path: "/accountOverview",
    name: "AccountOverview",
    component: AccountOverview,
  },
  {
    path: "/editDetails",
    name: "EditDetails",
    component: EditDetails,
  },
  {
    path: "/privacySettings",
    name: "PrivacySettings",
    component: PrivacySettings,
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
