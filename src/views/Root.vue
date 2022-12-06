<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <NavBar />
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <Home v-if="storeX.view === 'home' || !storeX.view" />
      <Customers v-else-if="storeX.view === 'customers'" />
      <Assets v-else-if="storeX.view === 'assets'" />
      <Invoices v-else-if="storeX.view === 'invoices'" />
      <Tickets v-else-if="storeX.view === 'tickets'" />
      <Parts v-else-if="storeX.view === 'parts'" />
      <Inventory v-else-if="storeX.view === 'inventory'" />
      <Estimates v-else-if="storeX.view === 'estimates'" />
      <POS v-else-if="storeX.view === 'pos'" />
      <Admin v-else-if="storeX.view === 'admin'" />
      <NewCustomer v-else-if="storeX.view === 'newCustomer'" />
      <NewTicket v-else-if="storeX.view === 'newTicket'" />
      <NewAsset v-else-if="storeX.view === 'newAsset'" />
      <CustomerDetail v-else-if="storeX.view === 'customer'" />
      <TicketDetail v-else-if="storeX.view === 'ticket'" />
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
import NewCustomer from '../components/New/NewCustomer.vue';
import NewTicket from '../components/New/NewTicket.vue';
import NewAsset from '../components/New/NewAsset.vue';
import CustomerDetail from '../components/Details/CustomerDetails.vue';
import TicketDetail from '../components/Details/TicketDetails.vue';
import { useRoute } from 'vue-router'

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
    const route = useRoute()
    if (!Object.keys(route.query).length) return
    if (!route.query.view) return
    storeX.view = route.query.view
    storeX.customerId = route.query.customerId
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
    Admin,
    NewCustomer,
    NewTicket,
    NewAsset,
    CustomerDetail,
    TicketDetail,
  },
});
</script>

<style scoped>
.btn {
  box-shadow: none;
  border-color: transparent;
}
</style>