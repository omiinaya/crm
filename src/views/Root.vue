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
            <li v-for="(crumb, index) in storeX.history" :key="storeX.history + index" class="breadcrumb-item"
              v-on:click="updateNavigation(crumb)">
              {{
                  crumb === storeX.history[storeX.history.length - 1]
                    ? crumb.view !== "Customer"
                      ? crumb.view !== "Ticket"
                        ? crumb.view
                        : `#${storeX.navigation.ticketId
                          .toString()
                          .padStart(5, "0")}`
                      : `${storeX.customerName}` //customer
                    : crumb.view !== "Ticket"
                      ? crumb.view !== "Customer" ? `⯇ ${crumb.view}` : `⯇ ${storeX.customerName}`
                      : `⯇ #${storeX.history[storeX.history.length - 2].ticketId.toString().padStart(5, "0")}`
              }}
            </li>
          </ol>
        </div>
      </div>
      <Home v-if="storeX.navigation.view === 'Home' || !storeX.navigation.view" />
      <Customers v-else-if="storeX.navigation.view === 'Customers'" />
      <Assets v-else-if="storeX.navigation.view === 'Assets'" />
      <Invoices v-else-if="storeX.navigation.view === 'Invoices'" />
      <Tickets v-else-if="storeX.navigation.view === 'Tickets'" />
      <Parts v-else-if="storeX.navigation.view === 'Parts'" />
      <Inventory v-else-if="storeX.navigation.view === 'Inventory'" />
      <Estimates v-else-if="storeX.navigation.view === 'Estimates'" />
      <POS v-else-if="storeX.navigation.view === 'Pos'" />
      <Admin v-else-if="storeX.navigation.view === 'Admin'" />
      <NewCustomer v-else-if="storeX.navigation.view === 'NewCustomer'" />
      <NewTicket v-else-if="storeX.navigation.view === 'NewTicket'" />
      <NewAsset v-else-if="storeX.navigation.view === 'NewAsset'" />
      <CustomerDetails v-else-if="storeX.navigation.view === 'Customer'" />
      <TicketDetails v-else-if="storeX.navigation.view === 'Ticket'" />
      <Projects v-else-if="storeX.navigation.view === 'Projects'" />
    </ion-content>
  </ion-page>
</template>

<script>
import { storeX } from "../store/index";
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import * as Components from "../components";
import * as Views from "../views";
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
  beforeCreate() {
    const route = useRoute()
    if (!Object.keys(route.query).length) return
    if (!route.query.view) return

    storeX.navigation.view = route.query.view
    storeX.navigation.customerId = route.query.customerId
    storeX.navigation.ticketId = route.query.ticketId
  },
  watch: {
    $route(to) {
      window.location.href = to.fullPath;
    }
  },

  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,

    NavBar: Components.NavBar,
    Home: Views.Home,
    Customers: Views.Customers,
    Assets: Views.Assets,
    Invoices: Views.Invoices,
    Tickets: Views.Tickets,
    Parts: Views.Parts,
    Inventory: Views.Inventory,
    Estimates: Views.Estimates,
    POS: Views.POS,
    Admin: Views.Admin,
    NewCustomer: Views.NewCustomer,
    NewTicket: Views.NewTicket,
    NewAsset: Views.NewAsset,
    CustomerDetails: Views.CustomerDetails,
    TicketDetails: Views.TicketDetails,
    Projects: Views.Projects
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