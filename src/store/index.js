import { createStore } from "vuex";
import { auth } from "./auth.module";
import { reactive } from "vue";
import io from "socket.io-client";
import moment from 'moment'

//services
import HomeService from "../services/home.service";
import TicketService from "../services/ticket.service";
import CustomerService from "../services/customer.service";
import NumberService from "../services/number.service";

const socket = io("http://localhost:8092");

const store = createStore({
  modules: {
    auth,
  },
});

export const storeX = reactive({
  navigation: {
    view: null,
    customerId: null,
    ticketId: null,
  },
  io: socket,
  history: [],
  customerName: null,

  home: {
    actions: null
  },

  ticket: {
    tickets: null,
    ticketTotalCount: null,
    ticketOpenCount: null
  },

  customers: [],

  updateNavigation(obj) {
    this.navigation.view = obj.view;
    this.navigation.customerId = obj.customerId;
    this.navigation.ticketId = obj.ticketId;

    const last = JSON.stringify(this.history[this.history.length - 1]);
    const current = JSON.stringify(obj);

    //do nothing if user clicks to navigate to the page they're already on.
    if (last === current) return;

    this.history.push(obj);
    console.log(this.history.length)
    if (this.history.length > 2) this.history.shift();
    console.log(this.history)

    const url = new URL(window.location);

    //if null, remove from query params
    if (!obj.customerId) url.searchParams.delete("customerId");
    if (!obj.ticketId) url.searchParams.delete("ticketId");

    //set
    if (obj.view) url.searchParams.set("view", obj.view);
    if (obj.customerId) url.searchParams.set("customerId", obj.customerId);
    if (obj.ticketId) url.searchParams.set("ticketId", obj.ticketId);

    //delete
    if (obj.view === "Home") { 
      url.searchParams.delete("customerId");
      url.searchParams.delete("ticketId");
    }

    window.history.pushState(null, "", url.toString());
  },

  async formatDate(array) {
    array.forEach(item => {
      item.createdAt = moment(item.createdAt).format('MM-DD-YYYY HH:MM A');
    })
  },

  async getActionItems() {
    const highest = Math.max(...store.state.auth.user.roles);
    const req = await HomeService.getRoleNav(highest);
    this.home.actions = await req.data;
  },

  async loadTicketData() {
    const req = await TicketService.getTickets();
    const tickets = await req.data;
    this.ticket.tickets = tickets;
    this.ticket.ticketTotalCount = tickets.length;
    this.ticket.ticketOpenCount = tickets.length;
    console.log(this.ticket)
    //TODO add other status types
  },

  async loadCustomerData() {
    const request = await CustomerService.getCustomers()
    const data = await request.data;
    this.customers = await data;

    this.customers.forEach(async item => {
      const id = item.primaryPhone;
      const res = await this.loadPhoneData(id);
      const number = res[0].number;
      item.phone = number;
    })

    this.formatDate(this.customers);
  },

  async loadPhoneData(id) {
    const request = await NumberService.getNumberById(id)
    const data = await request.data;
    return data
  },
});

export default store;
