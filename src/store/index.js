import { createStore } from "vuex";
import { auth } from "./auth.module";
import { reactive } from "vue";
import io from "socket.io-client";

const socket = io("http://localhost:8092");

const store = createStore({
  modules: {
    auth,
  },
});

export const storeX = reactive({
  navigation: {
    view: null,
    customerId: null,
    ticketId: null,
  },
  prevNav: {},
  io: socket,
  history: [{ view: "home" }],
  updateNavigation(obj) {
    (this.navigation.view = obj.view || null),
      (this.navigation.customerId = obj.customerId || null),
      (this.navigation.ticketId = obj.ticketId || null);
    this.history.push(obj);
  },
  getBreadcrumbs() {
    const x = this.history.slice(-3)
    console.log(x)
    return x;
  },
});

export default store;
