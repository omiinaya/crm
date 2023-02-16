import { createApp } from "vue";
import { IonicVue } from "@ionic/vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vue3EasyDataTable from "vue3-easy-data-table";
import DatePicker from '@vuepic/vue-datepicker';

import { createVuetify } from 'vuetify';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

//import 'vuetify/styles';
//import "@ionic/vue/css/structure.css";
//import "@ionic/vue/css/typography.css";
//import "@ionic/vue/css/padding.css";
//import "@ionic/vue/css/float-elements.css";
//import "@ionic/vue/css/text-alignment.css";
//import "@ionic/vue/css/text-transformation.css";
//import "@ionic/vue/css/flex-utils.css";
//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap.bundle";
//import "bootstrap";
//import '@vuepic/vue-datepicker/dist/main.css'

import "@ionic/vue/css/core.css";
import "@ionic/vue/css/normalize.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "vue3-easy-data-table/dist/style.css";

//not loading for some reason
import "./theme/variables.scss";

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)
  .use(vuetify)

app.component("EasyDataTable", Vue3EasyDataTable);
app.component('DatePicker', DatePicker);

router.isReady().then(() => {
  app.mount("#app");
});
