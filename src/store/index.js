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
  history: [],

  updateNavigation(obj) {

    console.log(obj)

    this.navigation.view = obj.view;
    this.navigation.customerId = obj.customerId;
    this.navigation.ticketId = obj.ticketId;

    const x = JSON.stringify(this.history[this.history.length - 1]);
    const y = JSON.stringify(obj);

    if (x === y) return;

    this.history.push(obj);
    if (this.history.length > 2) this.history.shift();

    const url = new URL(window.location);
    

    if (obj.view) url.searchParams.set("view", obj.view);
    if (obj.customerId) url.searchParams.set("customerId", obj.customerId);
    if (obj.ticketId) url.searchParams.set("ticketId", obj.ticketId);
  
    if (obj.view !== 'ticket') url.searchParams.delete("ticketId");
    if (obj.view !== 'customer' && obj.view !== 'ticket') url.searchParams.delete("customerId");
    
    window.history.pushState(null, "", url.toString());
  },
});

export default store;
