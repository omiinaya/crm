import { createApp } from "vue";
import { IonicVue } from "@ionic/vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import VeeValidate from 'vee-validate';
import Vue3EasyDataTable from "vue3-easy-data-table";
import DatePicker from '@vuepic/vue-datepicker';

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

//imports css
import "vue3-easy-data-table/dist/style.css";
import '@vuepic/vue-datepicker/dist/main.css'

/* Theme variables */
import "./theme/variables.css";

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)

app.component("EasyDataTable", Vue3EasyDataTable);
app.component('DatePicker', DatePicker);

router.isReady().then(() => {
  app.mount("#app");
});
