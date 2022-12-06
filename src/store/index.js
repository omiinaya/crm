import { createStore } from "vuex";
import { auth } from "./auth.module";
import { reactive } from 'vue'

const store = createStore({
  modules: {
    auth,
  },
});

export const storeX = reactive({
  view: null,
  customerId: null
})

export default store;