<template>
  <div class="row">
    <div class="col-11 offset-1">
      <div clas="row">
        <div class="col-12 top">
          <div class="row">
            <div class="col-9">{{ customer.name }}</div>
            <div class="col-3">test</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="section">
            <div class="header">
              <i class="bi bi-person-circle"></i>
              Customer Information
            </div>
            <div class="content">
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-envelope"></i> Email:
                </label>
                <div class="col-sm-6">
                  <a
                    :href="`mailto:${customer.email}`"
                    target="_blank"
                  >
                    {{ customer.email }}
                  </a>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-telephone"></i> Phone:
                </label>
                <div class="col-sm-6">{{ customer.phone }}</div>
              </div>
              <div class="row align-items-top mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-geo-alt"></i> Address:
                </label>
                <div class="col-sm-6">
                  <a
                    :href="`https://maps.google.com/?q=${customer.address}`"
                    target="_blank"
                  >
                    {{ customer.address }}
                  </a>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-calendar-event"></i> Created:
                </label>
                <div class="col-sm-6">{{ customer.created }}</div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="header">
              <i class="bi bi-info-circle"></i>
              Overview
            </div>
            <div class="content">
              <div class="row">
                <div class="col-6">
                  <div class="header">Tickets:</div>
                  <ul>
                    <li>Open: {{ tickets.open }}</li>
                    <li>Closed: {{ tickets.closed }}</li>
                  </ul>
                </div>
                <div class="col-6">
                  <div class="header">Invoices:</div>
                  <ul>
                    <li>Unpaid: 0</li>
                    <li>Total: 0</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="section">
            <div class="header">
              <i class="bi bi-tag"></i>
              Tickets
            </div>
            <div v-if="ticketItems.length" class="content">
              <EasyDataTable
                :headers="ticketHeaders"
                :items="ticketItems"
                theme-color="#1d90ff"
                table-class-name="customize-table"
                header-text-direction="center"
                body-text-direction="center"
              >
                <template
                  #item-ticketTitle="{ ticketTitle, id, ticketCustomerId }"
                >
                  <button
                    type="button"
                    class="btn btn-lg"
                    v-on:click="openTicket(id, ticketCustomerId)"
                  >
                    {{ ticketTitle }}
                  </button>
                </template>
              </EasyDataTable>
            </div>
            <center v-if="!ticketItems.length">
              There are no tickets to display
            </center>
          </div>
          <div class="section">
            <div class="header">
              <i class="bi bi-laptop"></i>
              Assets
            </div>
            <div v-if="assetItems.length" class="content">
              <EasyDataTable
                :headers="assetHeaders"
                :items="assetItems"
                theme-color="#1d90ff"
                table-class-name="customize-table"
                header-text-direction="center"
                body-text-direction="center"
              />
            </div>
            <center v-if="!assetItems.length">
              There are no assets to display
            </center>
          </div>
          <div class="section">
            <div class="header">
              <i class="bi bi-person-circle"></i>
              Invoices
            </div>
            <div class="content">PLACEHOLDER</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { storeX } from "../../store/index";
import CustomerService from "../../services/customer.service";
import TicketService from "../../services/ticket.service";
import AssetService from "../../services/asset.service";
import NumberService from "../../services/number.service";
import LocationService from "../../services/location.service";
import moment from 'moment'

export default {
  name: 'CustomerDetailsPage',
  components: {},
  data: () => ({
    storeX,
    customer: {
      name: null,
      phone: null,
      email: null,
      address: null,
      created: null,
      type: null
    },
    
    ticketHeaders: [
      { value: "id", text: "ID", sortable: true },
      { value: "ticketTitle", text: "TITLE", sortable: true },
      { value: "ticketDesc", text: "DESCRIPTION", sortable: true },
      { value: "createdAt", text: "CREATED", sortable: true },
      { value: "ticketStatus", text: "STATUS", sortable: true },
    ],
    ticketItems: [],
    assetHeaders: [
      { value: "id", text: "ID", sortable: true },
      { value: "assetName", text: "NAME", sortable: true },
      { value: "assetSerial", text: "SERIAL", sortable: true },
      { value: "assetType", text: "TYPE", sortable: true },
      { value: "assetBrand", text: "MANUFACTURER", sortable: true }
    ],
    assetItems: [],
    tickets: {
      open: null,
      closed: null
    },
    //TODO: calc this instead of hard coding
    paidInvoices: 0,
    unpaidInvoices: 0
  }),
  methods: {
    async openTicket(id, ticketCustomerId) {
      this.storeX.updateNavigation({
        view: 'ticket',
        ticketId: id,
        customerId: ticketCustomerId
      })
    },
    async loadCustomerData(id) {
      const request = await CustomerService.getCustomerById(id)
      const data = await request.data[0];
      console.log(data)
      const primaryPhone = await this.loadPhoneData(data.primaryPhone);
      const phoneNumber = primaryPhone[0].number;

      const primaryAddress = await this.loadLocationData(data.primaryAddress);
      const customerAddress = Object.values(primaryAddress[0]).slice(1, 7).join(', '); //gets address

      this.customer.name = `${data.firstName} ${data.lastName}`;
      this.customer.email = data.email;
      this.customer.phone = data.phone;
      this.customer.type = data.customerType;
      this.customer.created = moment(data.createdAt).format('MMMM-DD-YYYY');
      this.customer.phone = phoneNumber;
      this.customer.address = customerAddress;
    },
    async loadPhoneData(id) {
      const request = await NumberService.getNumberById(id)
      const data = await request.data;
      return data
    },
    async loadLocationData(id) {
      const request = await LocationService.getLocationById(id)
      const data = await request.data;
      return data
    },
    async loadTicketData(id) {
      const request = await TicketService.getTicketsByCustomer(id)
      const data = await request.data;

      this.ticketItems = await data;
      this.tickets.open = this.ticketItems.filter(ticket => ticket.ticketStatus != 'Closed').length
      this.tickets.closed = this.ticketItems.filter(ticket => ticket.ticketStatus === 'Closed').length
      this.formatDate();
    },
    async loadAssetData(id) {
      const request = await AssetService.getAssetsByCustomer(id)
      const data = await request.data;
      data[0].assetName = data[0].assetName.split('(')[0];
      this.assetItems = await data;
    },
    async formatDate() {
      this.ticketItems.forEach(item => {
        item.createdAt = moment(item.createdAt).format('MM-DD-YYYY HH:MM A');
        item.updatedAt = moment(item.updatedAt).format('MM-DD-YYYY HH:MM A');
      })
    },
  },
  created() {
    this.loadCustomerData(this.storeX.navigation.customerId)
    this.loadTicketData(this.storeX.navigation.customerId)
    this.loadAssetData(this.storeX.navigation.customerId)
  },
}
</script>
  
<style scoped>
.bi {
  padding-right: 5px !important;
}
.btn {
  width: 100%;
  font-size: 14px;
  color: #c1cad4;
  padding: 0;
}

.btn:focus {
  box-shadow: none !important;
  border-color: transparent !important;
}

.btn:hover {
  text-decoration: underline;
}

li {
  color: #c0c7d2;
}
.header {
  font-size: 18px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.top {
  padding: 25px;
  padding-bottom: 0;
  font-size: 32px;
}

.section {
  margin-top: 25px;
  background: #1f1f1f;
  padding: 25px;
}

.content {
  padding-top: 15px;
  font-size: 14px;
  color: #c0c7d2;
}
.customize-table {
  --easy-table-border: 1px solid #1f1f1f;
  --easy-table-row-border: 1px solid #1f1f1f;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #1f1f1f;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #1f1f1f;

  --easy-table-body-row-font-color: #c0c7d2;
  --easy-table-body-row-background-color: #1f1f1f;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #c0c7d2;
  --easy-table-body-row-hover-background-color: #1f1f1f;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #1f1f1f;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;

  --easy-table-scrollbar-track-color: #1f1f1f;
  --easy-table-scrollbar-color: #1f1f1f;
  --easy-table-scrollbar-thumb-color: #1f1f1f;
  --easy-table-scrollbar-corner-color: #1f1f1f;

  --easy-table-loading-mask-background-color: #1f1f1f;
}
</style>