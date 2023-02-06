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

const IS_PROD = process.env.NODE_ENV === "production";
const sURL = IS_PROD ? "https://mmit-crm.herokuapp.com" : `http://localhost:8090`;

const socket = io(sURL);

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
  ticket: {
    title: null,
    type: null,
    tech: null,
    status: null,
    updated: null,
    created: null,
  },
  customer: {
    name: null,
    email: null,
    primaryPhone: null,
    primaryAddress: null,
    createdAt: null,
    type: null
  },
  asset: {},

  newTicketTest: '',
  dialogs: {
    canned: false
  },

  com: {
    comVis: null,
    comType: null,
    comMsg: null,
    comAuthorId: null,
    comTicketId: null,
    comAuthorName: null,
    comCreated: null,
    comPhoneNumber: null
  },

  warranty: [],

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
    for (let i = array.length - 1; i >= 0; i--) {
      const item = array[i];
      item.createdAt = moment(item.createdAt).format('MM-DD-YYYY HH:MM A');
    }
  },

  async getActionItems() {
    const highest = Math.max(...store.state.auth.user.roles);
    const req = await HomeService.getRoleNav(highest);
    this.home.actions = await req.data;
  },

  async loadCustomerData() {
    try {
      const customerRequest = await CustomerService.getCustomers();
      const data = customerRequest.data;
      const responses = [];

      for (let i = data.length - 1; i >= 0; i--) {
        const customer = data[i];
        const phoneId = customer.primaryPhone;
        const addressId = customer.primaryAddress;
        const [phoneRes, addressRes] = await Promise.all([
          this.loadPhoneDataById(phoneId),
          this.loadLocationDataById(addressId),
        ])
        responses.push([phoneRes, addressRes])
      }

      for (let i = data.length - 1; i >= 0; i--) {
        const customer = data[i];
        const phoneRes = responses[i][0];
        const addressRes = responses[i][1];
        customer.name = `${customer.firstName} ${customer.lastName}`;
        customer.customerId = customer.id;

        if (phoneRes && phoneRes[0] && phoneRes[0].number) {
          const primaryPhone = phoneRes[0].number || '';
          customer.phone = primaryPhone;
        }

        if (addressRes && addressRes[0]) {
          const address1 = addressRes[0]['address1']

          if (address1) {
            customer.address = Object.values(addressRes[0]).slice(1, 7).join(', ');
          } else {
            customer.address = '';
          }
        }
        this.customers = data;
      }

      this.formatDate(this.customers);
    } catch (error) {
      // handle error here
      console.error(error);
    }
  },


  async loadTicketData() {
    const tickets = await TicketService.getTickets();
    const customers = await CustomerService.getCustomers();

    this.tickets = await tickets.data;
    this.customers = await customers.data;

    const customerLookup = {};
    for (let i = this.customers.length - 1; i >= 0; i--) {
      const customer = this.customers[i];
      customerLookup[customer.id] = `${customer.firstName} ${customer.lastName}`;
    }

    for (let i = this.tickets.length - 1; i >= 0; i--) {
      const ticket = this.tickets[i];
      ticket.customerName = customerLookup[ticket.ticketCustomerId];
      ticket.ticketId = ticket.id;
      const data = await this.loadAssetByTicketId(ticket.id);
      console.log(data)
      if (data) ticket.ticketAssetSerial = data[0].assetSerial;
    }

    this.formatDate(this.tickets);
  },

  async loadWarrantyData(serial) {
    try {
      const input = serial.trim()
      storeX.WarrantyService.getLenovoWarranty(input).then(res => {
        const warranty = res.data;
        this.asset[0]['warranty'] = warranty;
      });
    }
    catch (e) {
      console.log(e)
    }
  },

  async bLoadWarrantyData(serial) {
    try {
      const input = serial.trim()
      const request = await storeX.WarrantyService.getLenovoWarranty(input);
      const data = await request.data;
      return data;
    }
    catch (e) {
      return false;
    }
  },

  async loadAssetData() {
    const req = await AssetService.getAssets()
    const assets = await req.data;
    this.assets = await assets;

    for (let i = this.assets.length - 1; i >= 0; i--) {
      const asset = this.assets[i];
      const customer = await this.loadCustomerByCustomerId(asset.assetCustomerId);
      asset.customerName = customer.name;
      asset.assetId = asset.id;
    }
  },

  async loadCustomerByCustomerId(id, handler) {
    const request = await CustomerService.getCustomerById(id)
    const data = await request.data[0];

    data.name = `${data.firstName} ${data.lastName}`;
    data.createdAt = moment(data.createdAt).format('MMMM-DD-YYYY');

    const primaryPhone = await this.loadPhoneDataById(data.primaryPhone);
    if (primaryPhone.length) {
      const phoneNumber = primaryPhone[0].number;
      data.primaryPhone = phoneNumber;
    }

    const primaryAddress = await this.loadLocationDataById(data.primaryAddress);
    console.log(primaryAddress)
    const address1 = primaryAddress[0]['address1'];

    if (address1) {
      const customerAddress = Object.values(primaryAddress[0]).slice(1, 7).reverse().join(' '); //gets address
      const words = customerAddress.split(" ");
      //capitalizes the first letter of each word
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      const capitalized = words.join(' ');
      data.primaryAddress = capitalized;
    } else {
      data.primaryAddress = '';
    }

    this.customer = data;

    if (handler) {
      handler(await data.id)
    }

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
    const data = await req.data;
    if (!data.length) return

    this.asset = data;
    data[0].assetName = data[0].assetName.split('(')[0];
    this.loadWarrantyData(data[0].assetSerial);
    //this.asset[0]['warranty'] = warranty;
    return data;

  },

  async loadTicketById(id) {
    const request = await TicketService.getTicketById(id)
    const data = await request.data[0];
    this.ticket.id = data.id;
    this.ticket.title = data.ticketTitle;
    this.ticket.type = data.ticketType;
    this.ticket.tech = data.ticketTech;
    this.ticket.status = data.ticketStatus;
    this.ticket.created = moment(data.createdAt).format('MMM DD YYYY HH:MM A');
    this.ticket.updated = moment(data.updateAt).format('MMM DD YYYY HH:MM A');
    console.log(this.ticket)
  },

  openTickets() {
    if (this.tickets.length) {
      return this.tickets.filter(ticket => ticket.ticketStatus !== "Resolved").length;
    }
  },

  closedTickets() {
    if (this.tickets.length) {
      return this.tickets.filter(ticket => ticket.ticketStatus === "Resolved").length;
    }
  },

  totalTickets() {
    return this.tickets.length;
  },
});

export default store;
