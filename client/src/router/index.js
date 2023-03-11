import { createRouter, createWebHistory } from "vue-router";
import Loginpage from "../views/Login.vue";
import Home from "../views/Home.vue";
import Chatadmin from "../views/ChatAdmin.vue";
import QA from "../views/QaAdmin.vue";
import QAedit from "../views/QAedit.vue";
import Deletepage from "../views/Deletepage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Loginpage,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/management",
      name: "chatAdmin",
      component: Chatadmin,
    },
    {
      path: "/qamanagement",
      name: "QA",
      component: QA,
    },
    {
      path: "/qaupdate",
      name: "update",
      component: QAedit,
    },
    {
      path: "/qadelete",
      name: "delete",
      component: Deletepage,
    },
  ],
});

export default router;
