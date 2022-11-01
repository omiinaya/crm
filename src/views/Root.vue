<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <NavBar />
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <Home v-if="storeX.view === 'homeView' || !storeX.view"/>
      <Customers v-else-if="storeX.view === 'customersView'"/>
      <Assets v-else-if="storeX.view === 'assetsView'"/>
      <Invoices v-else-if="storeX.view === 'invoicesView'"/>
      <Tickets v-else-if="storeX.view === 'ticketsView'"/>
      <Parts v-else-if="storeX.view === 'partsView'"/>
      <Inventory v-else-if="storeX.view === 'inventoryView'"/>
      <Estimates v-else-if="storeX.view === 'estimatesView'"/>
      <POS v-else-if="storeX.view === 'posView'"/>
      <Admin v-else-if="storeX.view === 'adminView'"/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { storeX } from "../store/index";
import NavBar from '../components/NavBar.vue';
import Home from '../components/Home.vue';
import Customers from '../components/Customers.vue';
import Assets from '../components/Assets.vue';
import Invoices from '../components/Invoices.vue';
import Tickets from '../components/Tickets.vue';
import Parts from '../components/Parts.vue';
import Inventory from '../components/Inventory.vue';
import Estimates from '../components/Estimates.vue';
import POS from '../components/POS.vue';
import Admin from '../components/Admin.vue';

export default defineComponent({
  name: 'RootPage',
  data() {
    return {
      toShow: null,
      storeX
    };
  },
  methods: {},
  created() {
    console.log(storeX.view)
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    NavBar,
    Home,
    Customers,
    Assets,
    Invoices,
    Tickets,
    Parts,
    Inventory,
    Estimates,
    POS,
    Admin
  },
});
</script>

<style scoped>

</style>