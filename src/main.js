import { createApp } from "vue";
import { IonicVue } from "@ionic/vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as VeeValidate from "vee-validate";
import Vue3EasyDataTable from "vue3-easy-data-table";

import "@ionic/vue/css/core.css";

import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

import "vue3-easy-data-table/dist/style.css";

import 'vue-step-progress/dist/main.css';

/* Theme variables */
import "./theme/variables.css";

/* optional default css */
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)
  .use(VeeValidate)

app.component("EasyDataTable", Vue3EasyDataTable);

router.isReady().then(() => {
  app.mount("#app");
});
