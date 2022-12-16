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
    this.navigation.view = obj.view;
    this.navigation.customerId = obj.customerId;
    this.navigation.ticketId = obj.ticketId;

    const x = JSON.stringify(this.history[this.history.length-1])
    const y = JSON.stringify(obj)

    if (x === y) return

    this.history.push(obj);
    if (this.history.length > 2) this.history.shift();
  },
});

export default store;
