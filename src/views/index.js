import { defineAsyncComponent } from 'vue';

import Admin from "./TODO/Admin.vue";
import Estimates from "./TODO/Estimates.vue";
import Inventory from "./TODO/Inventory.vue";
import POS from "./TODO/POS.vue";
import Parts from "./TODO/Parts.vue";
import Profile from "./TODO/Profile.vue";
import Projects from "./TODO/Projects.vue";

const Register= defineAsyncComponent(() => import('./Register.vue'));
const Tickets = defineAsyncComponent(() => import('./Tickets.vue'));
const Time = defineAsyncComponent(() => import('./Time.vue'));
const Login = defineAsyncComponent(()=> import('./Login.vue'));
const Invoices = defineAsyncComponent(()=> import('./Invoices.vue'));
const Home = defineAsyncComponent(()=> import('./Home.vue'));
const Technicians = defineAsyncComponent(()=> import('./Technicians.vue'));
const Customers = defineAsyncComponent(()=> import('./Customers.vue'));
const Assets = defineAsyncComponent(()=> import('./Assets.vue'));

//details
const CustomerDetails = defineAsyncComponent(() => import('./Details/CustomerDetails.vue'));
const TicketDetails = defineAsyncComponent(() => import('./Details/TicketDetails.vue'));
const AssetDetails = defineAsyncComponent(() => import('./Details/AssetDetails.vue'));
const TechDetails = defineAsyncComponent(() => import('./Details/TechDetails.vue'));

//new
const NewAsset = defineAsyncComponent(() => import('./New/NewAsset.vue'));
const NewCustomer = defineAsyncComponent(() => import('./New/NewCustomer.vue'));
const NewTicket = defineAsyncComponent(() => import('./New/NewTicket.vue'));
const NewInvoice = defineAsyncComponent(() => import('./New/NewInvoice.vue'));

export {
    Admin,
    Estimates,
    Inventory,
    Parts,
    POS,
    Profile,
    Projects,
    Assets,
    Customers,
    Home,
    Invoices,
    Login,
    Register,
    Tickets,
    CustomerDetails,
    TicketDetails,
    AssetDetails,
    NewAsset,
    NewCustomer,
    NewTicket,
    Time,
    Technicians,
    TechDetails,
    NewInvoice
};