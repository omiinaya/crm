<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <NavBar />
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="breadcrumbs">
        <div class="col-11 offset-1">
          <ol class="breadcrumb">
            <li
              v-for="(crumb, index) in breadcrumbs"
              :key="breadcrumbs + index"
              class="breadcrumb-item"
              v-on:click="updateNavigation(crumb)"
            >
              {{
                crumb === breadcrumbs[breadcrumbs.length - 1]
                  ? crumb.view !== "customer"
                    ? crumb.view !== "ticket"
                      ? `${crumb.view
                          .charAt(0)
                          .toUpperCase()}${crumb.view.slice(1)}`
                      : `Ticket # ${storeX.navigation.ticketId
                          .toString()
                          .padStart(5, "0")}`
                    : "Customer: TODO: Customer Name" //customer
                  : crumb.view !== "ticket"
                  ? `⯇ ${crumb.view.charAt(0).toUpperCase()}${crumb.view.slice(
                      1
                    )}`
                  : `⯇ Ticket #${storeX.history[
                      storeX.history.length - 2
                    ].ticketId
                      .toString()
                      .padStart(5, "0")}`
              }}
            </li>
          </ol>
        </div>
      </div>
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
  methods: {
    updateNavigation(crumb) {
      this.storeX.updateNavigation({
        view: crumb.view,
        customerId: crumb.customerId,
        ticketId: crumb.ticketId
      })
    }
  },
  created() {
    const route = useRoute()
    if (!Object.keys(route.query).length) return
    if (!route.query.view) return
    storeX.navigation.view = route.query.view
    storeX.navigation.customerId = route.query.customerId
    storeX.navigation.ticketId = route.query.ticketId
  },
  watch: {
    $route (to){
      window.location.href = to.fullPath;
  }
},
  computed: {
    breadcrumbs() {
      return this.storeX.history
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
.breadcrumbs {
  margin-top: 20px;
  background-color: #121212;
}

.btn {
  box-shadow: none;
  border-color: transparent;
}

.breadcrumb-item .li {
  color: white !important;
}

.breadcrumb-item:last-child {
  color: grey !important;
}

.breadcrumb-item:hover {
  text-decoration: underline;
}

.breadcrumb-item:last-child:hover {
  text-decoration: none;
}
</style>