<template>
  <div class="row">
    <div class="col-11 offset-1">
      <div clas="row">
        <div class="col-12">
          <div class="row">
            <div class="col-9 top">#{{ ticketNumber }}</div>
            <div class="col-3 top">test</div>
          </div>
          <div class="row">
            <div class="col-12 title">
              {{ ticketTitle }}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="section">
            <div class="header">
              <i class="bi bi-person-circle"></i>
              Ticket Information
            </div>
            <div class="content">
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-clipboard2-pulse"></i> Status:
                </label>
                <div class="col-sm-6"> {{ ticketStatus }} </div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-person-circle"></i> Assignee:
                </label>
                <div class="col-sm-6">{{ ticketTech }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-list-check"></i> Type:
                </label>
                <div class="col-sm-6">{{ ticketType }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-calendar-date"></i> Date Due:
                </label>
                <div class="col-sm-6"> {{ ticketUpdated }} </div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-calendar-date"></i> Date Created:
                </label>
                <div class="col-sm-6"> {{ ticketCreated }} </div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="header">
              <i class="bi bi-person-circle"></i>
              Customer Information
            </div>
            <div class="content">
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-person-circle"></i> Name:
                </label>
                <div class="col-sm-6">{{ customerName }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-envelope"></i> Email:
                </label>
                <div class="col-sm-6">{{ customerEmail }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-telephone"></i> Phone:
                </label>
                <div class="col-sm-6">{{ customerPhone }}</div>
              </div>
              <div class="row align-items-top mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-geo-alt"></i> Primary Address:
                </label>
                <div class="col-sm-6"> {{ customerAddress }} </div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-phone"></i> SMS Service:
                </label>
                <div class="col-sm-6"> PLACEHOLDER </div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="header">
              <i class="bi bi-paperclip"></i>
              Attachments
            </div>
            <div class="content">test</div>
          </div>
        </div>
        <div class="col-8">
          <div class="section">
            <div class="header">
              <i class="bi bi-laptop"></i>
              Relevant Asset
            </div>
            <EasyDataTable v-model:items-selected="itemsSelected" :headers="headers" :items="items" theme-color="#1d90ff"
            table-class-name="customize-table-details" header-text-direction="center" body-text-direction="center" hide-footer/>
          </div>
          <div class="section">
            <div class="header">
              <i class="bi bi-chat-dots"></i>
              Communications
            </div>
            <div class="content">test</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { storeX } from "../../store/index";
import TicketService from "../../services/ticket.service";
import CustomerService from "../../services/customer.service";
import NumberService from "../../services/number.service";
import LocationService from "../../services/location.service";
import AssetService from "../../services/asset.service";
import moment from 'moment'

export default {
  name: 'CustomerDetailsPage',
  components: {},
  data: () => ({
    storeX,
    ticketTitle: null,
    ticketCreated: null,
    ticketUpdated: null,
    ticketType: null,
    ticketTech: null,
    ticketStatus: null,
    customerName: null,
    customerEmail: null,
    customerPhone: null,
    customerAddress: null,
    customerCreated: null,
    headers: [
        { value: "assetName", text: "NAME", sortable: true },
        { value: "assetBrand", text: "BRAND", sortable: true },
        { value: "assetType", text: "TYPE", sortable: true },
        { value: "assetSerial", text: "SERIAL", sortable: true },
        { value: "assetTag", text: "TAG", sortable: true },
      ],
    items: [],
  }),
  methods: {
    async loadTicketdata(id) {
      const request = await TicketService.getTicketById(id)
      const data = await request.data[0];
      this.ticketTitle = data.ticketTitle;
      this.ticketType = data.ticketType;
      this.ticketTech = data.ticketTech;
      this.ticketStatus = data.ticketStatus;
      this.ticketCreated = moment(data.createdAt).format('MMM DD YYYY HH:MM A');
      this.ticketUpdated = moment(data.updateAt).format('MMM DD YYYY HH:MM A');
    },
    async loadCustomerData(id) {
      const request = await CustomerService.getCustomerById(id)
      const data = await request.data[0];

      const primaryPhone = await this.loadPhoneData(data.primaryPhone);
      const phoneNumber = primaryPhone[0].number;

      const primaryAddress = await this.loadLocationData(data.primaryAddress);
      const customerAddress = Object.values(primaryAddress[0]).slice(1, 7).join(', '); //gets address

      this.customerName = `${data.firstName} ${data.lastName}`;
      this.customerEmail = data.email;
      this.customerPhone = phoneNumber;
      this.customerAddress = customerAddress;

      
      this.customerCreated = moment(data.createdAt).format('MM-DD-YYYY');
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
    async loadAssetData(id) {
      const request = await AssetService.getAssetByTicketId(id)
      const data = await request.data;
      this.items = await data;
      this.assetBrand = data[0].assetBrand;
      this.assetSerial = data[0].assetSerial;
      this.assetTag = data[0].assetTag;
      this.assetName = data[0].assetName;
      this.assetType = data[0].assetType;
      return data
    },
  },
  created() {
    this.ticketNumber = this.storeX.ticketId.toString().padStart(5, '0');
    this.loadTicketdata(this.storeX.ticketId)
    this.loadCustomerData(this.storeX.customerId)
    this.loadAssetData(this.storeX.ticketId)
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

.title {
  font-size: 22px;
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


.customize-table-details {
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

<style>

.customize-table-details .vue3-easy-data-table__main {
  min-height: 0px !important;
}

</style>