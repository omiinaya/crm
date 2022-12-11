import { createStore } from "vuex";
import { auth } from "./auth.module";
import { reactive } from 'vue'
import io from 'socket.io-client';

const socket = io('http://localhost:8092');

const store = createStore({
  modules: {
    auth,
  },
});

export const storeX = reactive({
  view: null,
  customerId: null,
  ticketId: null,
  io: socket
})

export default store;