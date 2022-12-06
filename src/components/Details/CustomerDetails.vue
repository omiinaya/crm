<template>
  <div class="row">
    <div class="col-11 offset-1">
      <div clas="row">
        <div class="col-12 top">
          <div class="row">
            <div class="col-9">{{ customerName }}</div>
            <div class="col-3">test</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="section">
            <div class="title">
              <i class="bi bi-person-circle"></i>
              Customer Information
            </div>
            <div class="content">
              <ul>
                <li>Email: {{ customerEmail }}</li>
                <li>Phone: {{ customerPhone }}</li>
                <li>Created: {{ customerCreated }}</li>
              </ul>
            </div>
          </div>
          <div class="section">
            <div class="title">
              <i class="bi bi-info-circle"></i>
              Overview
            </div>
            <div class="content">PLACEHOLDER</div>
          </div>
        </div>
        <div class="col-8">
          <div class="section">
            <div class="title">
              <i class="bi bi-tag"></i>
              Tickets
            </div>
            <div class="content">
              <EasyDataTable :headers="ticketHeaders" :items="ticketItems" theme-color="#1d90ff"
                table-class-name="customize-table" header-text-direction="center" body-text-direction="center" />
            </div>
          </div>
          <div class="section">
            <div class="title">
              <i class="bi bi-laptop"></i>
              Assets
            </div>
            <div class="content">
              <EasyDataTable :headers="assetHeaders" :items="assetItems" theme-color="#1d90ff"
                table-class-name="customize-table" header-text-direction="center" body-text-direction="center" />
            </div>
          </div>
          <div class="section">
            <div class="title">
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
import moment from 'moment'

export default {
  name: 'CustomerDetailsPage',
  components: {},
  data: () => ({
    customerData: null,
    customerName: null,
    customerPhone: null,
    customerEmail: null,
    customerNumber: null,
    customerAddress: null,
    customerCreated: null,
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
    storeX
  }),
  methods: {
    async loadCustomerData(id) {
      const request = await CustomerService.getCustomerById(id)
      const data = await request.data[0];

      this.customerData = await data;
      this.customerName = `${data.firstName} ${data.lastName}`;
      this.customerEmail = data.email;
      this.customerPhone = data.phone;
      this.customerType = data.customerType;
      this.customerCreated = moment(data.createdAt).format('MM-DD-YYYY');
    },
    async loadTicketData(id) {
      const request = await TicketService.getTicketsByCustomer(id)
      const data = await request.data;

      this.ticketItems = await data;
      this.formatDate();
    },
    async loadAssetData(id) {
      const request = await AssetService.getAssetsByCustomer(id)
      const data = await request.data;

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
    this.loadCustomerData(this.storeX.customerId)
    this.loadTicketData(this.storeX.customerId)
    this.loadAssetData(this.storeX.customerId)
  },
}
</script>
  
<style>
.title {
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