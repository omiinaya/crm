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
import UserService from "../services/user.service";
import WarrantyService from "../services/warranty.service";
import ComService from "../services/com.service";
import CSCService from "../services/csc.service";

const socket = io("http://localhost:8092");

const store = createStore({
  modules: {
    auth,
  },
});

function getHistory() {
  const value = localStorage.getItem('history');
  if (!value) return [{ view: 'Home' }]
  return JSON.parse(value)
}

export const storeX = reactive({
  navigation: {
    view: null,
    customerId: null,
    ticketId: null,
  },
  io: socket,
  history: getHistory(),
  home: { actions: null },
  tickets: [],
  assets: [],
  customers: [],
  ticket: null,
  customer: {
    name: null,
    email: null,
    primaryPhone: null,
    primaryAddress: null,
    createdAt: null,
    type: null
  },

  HomeService,
  TicketService,
  CustomerService,
  NumberService,
  LocationService,
  AssetService,
  UserService,
  WarrantyService,
  ComService,
  CSCService,

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

    //saving history to localStorage
    localStorage.setItem('history', JSON.stringify(this.history));

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
    const promises = data.map(customer => {
      const phoneId = customer.primaryPhone;
      const addressId = customer.primaryAddress;
      return Promise.all([
        this.loadPhoneDataById(phoneId),
        this.loadLocationDataById(addressId),
      ]);
    });
    const responses = await Promise.all(promises);
    data.forEach((customer, index) => {
      const phoneRes = responses[index][0];
      const primaryPhone = phoneRes[0].number;
      const addressRes = responses[index][1];
      const customerAddress = Object.values(addressRes[0]).slice(1, 7).join(', ');
      customer.phone = primaryPhone;
      customer.address = customerAddress;
      customer.name = `${customer.firstName} ${customer.lastName}`;
    });
    // Wait for the phone number data to be received
    await Promise.all(data.map(d => this.loadPhoneDataById(d.primaryPhone)));
    // After the phone number data is received, assign the data to this.customers
    this.customers = data;
    this.formatDate(this.customers);
  },

  async loadTicketData() {
    const tickets = await TicketService.getTickets();
    const customers = await CustomerService.getCustomers();

    this.tickets = await tickets.data;
    this.customers = await customers.data;

    const customerLookup = {};
    for (const customer of this.customers) {
      customerLookup[customer.id] = `${customer.firstName} ${customer.lastName}`;
    }

    for (const ticket of this.tickets) {
      const data = await this.loadAssetByTicketId(ticket.id);
      ticket.assetSerial = data[0].assetSerial;
      ticket.customerName = customerLookup[ticket.ticketCustomerId];
    }
    this.formatDate(this.tickets);
  },

  async loadAssetData() {
    const req = await AssetService.getAssets()
    const assets = await req.data;
    this.assets = await assets;

    this.assets.forEach(async asset => {
      const customer = await this.loadCustomerByCustomerId(asset.assetCustomerId)
      asset.customerName = customer.name;
    })
  },

  async loadCustomerByCustomerId(id) {
    const request = await CustomerService.getCustomerById(id)
    const data = await request.data[0];

    const primaryPhone = await this.loadPhoneDataById(data.primaryPhone);
    const phoneNumber = primaryPhone[0].number;

    const primaryAddress = await this.loadLocationDataById(data.primaryAddress);
    const customerAddress = Object.values(primaryAddress[0]).slice(1, 7).join(', '); //gets address

    data.name = `${data.firstName} ${data.lastName}`;
    data.createdAt = moment(data.createdAt).format('MMMM-DD-YYYY');
    data.primaryPhone = phoneNumber;
    data.primaryAddress = customerAddress;
    this.customer = data;
    return data;
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
    this.assets = await data;
  },

  async loadAssetByTicketId(id) {
    const req = await AssetService.getAssetByTicketId(id);
    const asset = await req.data;
    return asset;
  },

  openTickets() {
    return this.tickets.filter(ticket => ticket.ticketStatus !== "Closed").length;
  },

  closedTickets() {
    return this.tickets.filter(ticket => ticket.ticketStatus === "Closed").length;
  },
});

export default store;
