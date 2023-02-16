import { defineAsyncComponent } from 'vue'

import Admin from "./TODO/Admin.vue";
import Assets from "./Assets.vue";
import Customers from "./Customers.vue";
import Estimates from "./TODO/Estimates.vue";
import Technicians from "./Technicians.vue";
import Home from "./Home.vue";
import Inventory from "./TODO/Inventory.vue";
import Invoices from "./Invoices.vue";
import Login from "./Login.vue";
import Parts from "./TODO/Parts.vue";
import POS from "./TODO/POS.vue";
import Profile from "./TODO/Profile.vue";
import Projects from "./TODO/Projects.vue";

const Register= defineAsyncComponent(() => import('./Register.vue'));
const Tickets = defineAsyncComponent(() => import('./Tickets.vue'));
const Time = defineAsyncComponent(() => import('./Time.vue'));

//details
const CustomerDetails = defineAsyncComponent(() => import('./Details/CustomerDetails.vue'));
const TicketDetails = defineAsyncComponent(() => import('./Details/TicketDetails.vue'));
const AssetDetails = defineAsyncComponent(() => import('./Details/AssetDetails.vue'));

//new
const NewAsset = defineAsyncComponent(() => import('./New/NewAsset.vue'));
const NewCustomer = defineAsyncComponent(() => import('./New/NewCustomer.vue'));
const NewTicket = defineAsyncComponent(() => import('./New/NewTicket.vue'));

export {
    Admin,
    Assets,
    Customers,
    Estimates,
    Home,
    Inventory,
    Invoices,
    Login,
    Parts,
    POS,
    Profile,
    Projects,
    Register,
    Tickets,
    CustomerDetails,
    TicketDetails,
    AssetDetails,
    NewAsset,
    NewCustomer,
    NewTicket,
    Time,
    Technicians
};