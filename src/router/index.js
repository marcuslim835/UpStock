import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import News from "@/views/News.vue";
import Portfolio from "@/views/Portfolio.vue";
import AccountOverview from "@/views/AccountOverview.vue";
import EditDetails from "@/views/EditDetails.vue"
import StockPage from "@/views/StockPage.vue";
import StockSearch from "@/views/StockSearch.vue";
import AddStock from "@/components/Overlay_ManageStock.vue";

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
    path: "/stockPage",
    name: "StockPage",
    component: StockPage,
    props: true,
  },
  {
    path: "/stockSearch",
    name: "StockSearch",
    component: StockSearch,
  },
  {
    path: "/addStock",
    name: "AddStock",
    component: AddStock,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
