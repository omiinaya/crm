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
import LocationService from "../services/location.service";
import AssetService from "../services/asset.service";

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

  tickets: [],
  assets: [],
  customers: [],

  ticket: null,

  customer: {
    name: null,
    phone: null,
    email: null,
    address: null,
    created: null,
    type: null
  },

  updateNavigation(obj) {
    this.navigation.view = obj.view;
    this.navigation.customerId = obj.customerId;
    this.navigation.ticketId = obj.ticketId;

    const last = JSON.stringify(this.history[this.history.length - 1]);
    const current = JSON.stringify(obj);

    //do nothing if user clicks to navigate to the page they're already on.
    if (last === current) return;

    this.history.push(obj);

    if (this.history.length > 2) this.history.shift();

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

  async loadCustomerData() {
    const request = await CustomerService.getCustomers()
    const data = await request.data;
    this.customers = await data;

    //may be unnecessary here. double check.
    this.customers.forEach(async customer => {
      //get primary phone number of each customer
      const phoneId = customer.primaryPhone;
      const phoneRes = await this.loadPhoneDataById(phoneId);
      const primaryPhone = phoneRes[0].number;

      //get primary address number of each customer
      const addressId = customer.primaryAddress
      const addressRes = await this.loadLocationDataById(addressId);
      const customerAddress = Object.values(addressRes[0]).slice(1, 7).join(', '); //gets address

      customer.phone = primaryPhone;
      customer.address = customerAddress;
      customer.fullName = `${customer.firstName} ${customer.lastName}`
    })

    this.formatDate(this.customers);
  },

  async loadTicketData() {
    const req = await TicketService.getTickets();
    this.tickets = await req.data;
  },

  async loadCustomerByCustomerId(id) {
    const request = await CustomerService.getCustomerById(id)
    const data = await request.data[0];
    
    const primaryPhone = await this.loadPhoneDataById(data.primaryPhone);
    const phoneNumber = primaryPhone[0].number;

    const primaryAddress = await this.loadLocationDataById(data.primaryAddress);
    const customerAddress = Object.values(primaryAddress[0]).slice(1, 7).join(', '); //gets address

    this.customer.name = `${data.firstName} ${data.lastName}`;
    this.customer.email = data.email;
    this.customer.type = data.customerType;
    this.customer.created = moment(data.createdAt).format('MMMM-DD-YYYY');
    this.customer.phone = phoneNumber;
    this.customer.address = customerAddress;

    this.customerName = this.customer.name;
  },

  async loadPhoneDataById(id) {
    const request = await NumberService.getNumberById(id)
    return await request.data;
  },

  async loadLocationDataById(id) {
    const request = await LocationService.getLocationById(id)
    return await request.data;
  },

  async loadTicketsByCustomerId(id) {
    const request = await TicketService.getTicketsByCustomer(id)
    this.tickets = await request.data
    this.formatDate(this.tickets);
    return this.tickets;
  },

  async loadAssetsByCustomerId(id) {
    const request = await AssetService.getAssetsByCustomer(id)
    const data = await request.data;

    if (!data.length) return;

    data[0].assetName = data[0].assetName.split('(')[0];
    this.assets = await data;
  },

  openTickets() {
    return this.tickets.filter(ticket => ticket.ticketStatus !== "Closed").length;
  },

  closedTickets() {
    return this.tickets.filter(ticket => ticket.ticketStatus === "Closed").length;
  }
});

export default store;
