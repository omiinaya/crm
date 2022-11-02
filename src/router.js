import { createWebHistory, createRouter } from "vue-router";

// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const BoardUser = () => import("./components/BoardUser.vue")
const Root = () => import("./views/Root.vue")
const Login = () => import("./components/Login.vue")
const Register = () => import("./components/Register.vue")
const Customers = () => import("./components/Customers.vue")

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
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
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