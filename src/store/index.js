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
    this.navigation.view = obj.view
    this.navigation.customerId = obj.customerId,
    this.navigation.ticketId = obj.ticketId
    this.history.push(obj);
    console.log(this.history)
  },
  getBreadcrumbs() {
    const arr = this.history.slice(-2);
    const uniqueIds = new Set();
    const unique = arr.filter((el) => {
      const isDuplicate = uniqueIds.has(el.view);
      uniqueIds.add(el.view);

      if (!isDuplicate) {
        return true;
      }
      return false;
    });

    return unique;
  },
});

export default store;
