import { createWebHistory, createRouter } from "vue-router";

// lazy-loaded
const Root = () => import("./views/Root.vue")
const Register = () => import("./views/Register.vue")

const routes = [
  {
    path: "/",
    name: "root",
    component: Root,
  },
  {
    path: "/register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;