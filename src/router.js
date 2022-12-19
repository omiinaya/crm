import { createWebHistory, createRouter } from "vue-router";

// lazy-loaded
const Profile = () => import("./views/Profile.vue")
const Root = () => import("./views/Root.vue")
const Login = () => import("./views/Login.vue")
const Register = () => import("./views/Register.vue")
const Customers = () => import("./views/Customers.vue")

const routes = [
  {
    path: "/",
    name: "root",
    component: Root,
  },
  {
    path: "/customers",
    name: "customers",
    component: Customers,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;