<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <NavBar />
        <div class="container-fluid text-center">
          <ol class="breadcrumb text-center">
            <li
              v-for="(crumb, index) in breadcrumbs"
              :key="breadcrumbs + index"
              class="breadcrumb-item active"
              aria-current="page"
            >
              {{
                crumb === breadcrumbs[breadcrumbs.length - 1]
                  ? crumb.view !== "customer"
                    ? crumb.view !== "ticket"
                      ? crumb.view.charAt(0).toUpperCase() + crumb.view.slice(1)
                      : "TODO: Ticket Number" //tickets
                    : "TODO: Customer Name" //customer
                  : crumb.view.charAt(0).toUpperCase() + crumb.view.slice(1)
              }}
            </li>
          </ol>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <Home
        v-if="storeX.navigation.view === 'home' || !storeX.navigation.view"
      />
      <Customers v-else-if="storeX.navigation.view === 'customers'" />
      <Assets v-else-if="storeX.navigation.view === 'assets'" />
      <Invoices v-else-if="storeX.navigation.view === 'invoices'" />
      <Tickets v-else-if="storeX.navigation.view === 'tickets'" />
      <Parts v-else-if="storeX.navigation.view === 'parts'" />
      <Inventory v-else-if="storeX.navigation.view === 'inventory'" />
      <Estimates v-else-if="storeX.navigation.view === 'estimates'" />
      <POS v-else-if="storeX.navigation.view === 'pos'" />
      <Admin v-else-if="storeX.navigation.view === 'admin'" />
      <NewCustomer v-else-if="storeX.navigation.view === 'newCustomer'" />
      <NewTicket v-else-if="storeX.navigation.view === 'newTicket'" />
      <NewAsset v-else-if="storeX.navigation.view === 'newAsset'" />
      <CustomerDetail v-else-if="storeX.navigation.view === 'customer'" />
      <TicketDetail v-else-if="storeX.navigation.view === 'ticket'" />
      <Projects v-else-if="storeX.navigation.view === 'projects'" />
    </ion-content>
  </ion-page>
</template>

<script>
import { storeX } from "../store/index";
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
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
import Projects from '../components/Projects.vue';
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
    storeX.navigation.view = route.query.view
    storeX.customerId = route.query.customerId
  },
  computed: {
    breadcrumbs() {
      return this.storeX.getBreadcrumbs()
    }
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
    Projects
  },
});
</script>

<style scoped>
.btn {
  box-shadow: none;
  border-color: transparent;
}

.breadcrumb {
  justify-content: center;
}
</style>