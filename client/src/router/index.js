import { createRouter, createWebHistory } from "vue-router";
import Loginpage from "../views/Login.vue";
import Chat from "../views/Chat.vue";
import Home from "../views/Home.vue";
import Chatadmib from "../views/ChatAdmin.vue";

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
      path: "/chat",
      name: "chat",
      component: Chat,
    },
    {
      path: "/management",
      name: "chatAdmin",
      component: Chatadmib,
    },
  ],
});

export default router;
