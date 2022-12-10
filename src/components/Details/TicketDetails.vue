<template>
  <div class="row">
    <div class="col-11 offset-1">
      <div clas="row">
        <div class="col-12">
          <div class="row">
            <div class="col-8 top">#{{ ticket.number }}</div>
            <div class="col-1 top">
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  New
                </button>
                <ul class="dropdown-menu">
                  <li v-for="(opt, index) in newOptions" :key="opt + index">
                    <a
                      class="dropdown-item"
                      href="#!"
                      v-on:click="newSelected = opt"
                      >{{ opt }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-1 top">
              <button
                type="button"
                class="btn btn-success"
                v-on:click="print(customerForm)"
              >
                test 2
              </button>
            </div>
            <div class="col-1 top">
              <button
                type="button"
                class="btn btn-success"
                v-on:click="print(customerForm)"
              >
                test 3
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-12 title">
              {{ ticket.title }}
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
                <div class="col-sm-6">{{ ticket.status }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-person-circle"></i> Assignee:
                </label>
                <div class="col-sm-6">{{ ticket.tech }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-list-check"></i> Type:
                </label>
                <div class="col-sm-6">{{ ticket.type }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-calendar-date"></i> Date Due:
                </label>
                <div class="col-sm-6">{{ ticket.updated }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-calendar-date"></i> Date Created:
                </label>
                <div class="col-sm-6">{{ ticket.created }}</div>
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
                <div class="col-sm-6">{{ customer.name }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-envelope"></i> Email:
                </label>
                <div class="col-sm-6">
                  <a :href="`mailto:${customer.email}`" target="_blank">
                    {{ customer.email }}
                  </a>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-telephone"></i> Primary Phone:
                </label>
                <div class="col-sm-6">{{ customer.phone }}</div>
              </div>
              <div class="row align-items-top mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-geo-alt"></i> Primary Address:
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
                  <i class="bi bi-phone"></i> SMS Service:
                </label>
                <div class="col-sm-6">PLACEHOLDER</div>
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
            <EasyDataTable
              :headers="headers"
              :items="items"
              theme-color="#1d90ff"
              table-class-name="customize-table-details"
              header-text-direction="center"
              body-text-direction="center"
              hide-footer
            >
              <template #item-warranty="{ warranty }">
                <Loading v-if="!warranty" />
                <a class="warranty" v-else :href="warranty[1]" target="_blank">
                  {{ warranty[0] }}
                </a>
              </template>
              <template #item-assetName="{ assetName }">
                <a class="warranty" href="#">
                  {{ assetName }}
                </a>
              </template>
            </EasyDataTable>
          </div>
          <div class="section">
            <div class="header">
              <i class="bi bi-chat-dots"></i>
              Communications
            </div>
            <div class="content">
              <div class="row">
                <div class="col-2">
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      {{ com.visibility || comVis[0] }}
                    </button>
                    <ul class="dropdown-menu">
                      <li v-for="(opt, index) in comVis" :key="opt + index">
                        <a
                          class="dropdown-item"
                          href="#!"
                          v-on:click="comVisHandler(opt)"
                          >{{ opt }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-2">
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      {{ com.type || comTypes[0] }}
                    </button>
                    <ul class="dropdown-menu">
                      <li v-for="(opt, index) in comTypes" :key="opt + index">
                        <a
                          class="dropdown-item"
                          href="#!"
                          v-on:click="comTypeHandler(opt)"
                          >{{ opt }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-2 offset-6">test</div>
              </div>
            </div>
            <div class="content">
              <div class="col-sm-12">
                <textarea
                  class="form-control text-area"
                  rows="6"
                  v-model="com.comMsg"
                  @input="testing123(com.comMsg)"
                ></textarea>
              </div>
              <div class="col-2 offset-10">
                <button class="btn messages" v-on:click="createCom(com)">
                  {{ com.comVis }}
                </button>
              </div>
            </div>
          </div>
          <div class="test">
            <div
              v-for="(com, index) in coms"
              class="col-12 form-control com mt-3"
              :key="com + index"
            >
              <div class="mb-3">
                <div class="row">
                  <div class="col-3">
                    {{ com.comAuthorName }}
                  </div>
                  <div class="col-1 offset-2">
                    {{ com.comType }}
                  </div>
                  <div class="col-1 offset-3">
                    {{ com.comType }}
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    {{ com.comVis }}
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    {{ com.comMsg }}
                  </div>
                </div>
              </div>
            </div>
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
import WarrantyService from "../../services/warranty.service";
import ComService from "../../services/com.service";
import Loading from "../Loading/Loading.vue";
import moment from 'moment'

export default {
  name: 'CustomerDetailsPage',
  components: { Loading },
  data: () => ({
    storeX,
    ticket: {
      number: null,
      title: null,
      created: null,
      updated: null,
      type: null,
      tech: null,
      status: null
    },
    customer: {
      name: null,
      email: null,
      phone: null,
      address: null,
      created: null
    },
    warranty: null,
    headers: [
      { value: "assetName", text: "NAME", sortable: true },
      { value: "assetBrand", text: "BRAND", sortable: true },
      { value: "assetType", text: "TYPE", sortable: true },
      { value: "assetSerial", text: "SERIAL", sortable: true },
      { value: "assetTag", text: "TAG", sortable: true },
      { value: "warranty", text: "WARRANTY", sortable: true },
    ],
    items: [],
    newOptions: ['Part Order', 'Estimate', 'Appointment', 'Intake Form', 'Outtake Form'],
    comVis: ['Private Note', 'Publc Note', 'Email', 'SMS', 'Email + SMS'],
    comTypes: ['Update', 'Issue', 'Diagnosis', 'Parts Ordered', 'Parts Arrival', 'Complete'],
    com: {
      comVis: null,
      comType: null,
      comMsg: null,
      comAuthorId: null,
      comTicketId: null,
      comAuthorName: null
    },
    coms: [],
  }),
  methods: {
    async createCom() {
      console.log(this.com)
      ComService.createCom(this.com);
    },
    async loadTicketdata(id) {
      const request = await TicketService.getTicketById(id)
      const data = await request.data[0];
      this.ticket.title = data.ticketTitle;
      this.ticket.type = data.ticketType;
      this.ticket.tech = data.ticketTech;
      this.ticket.status = data.ticketStatus;
      this.ticket.created = moment(data.createdAt).format('MMM DD YYYY HH:MM A');
      this.ticket.updated = moment(data.updateAt).format('MMM DD YYYY HH:MM A');
    },
    async loadCustomerData(id) {
      const request = await CustomerService.getCustomerById(id)
      const data = await request.data[0];

      const primaryPhone = await this.loadPhoneData(data.primaryPhone);
      const phoneNumber = primaryPhone[0].number;

      const primaryAddress = await this.loadLocationData(data.primaryAddress);
      const customerAddress = Object.values(primaryAddress[0]).slice(1, 7).join(', '); //gets address

      this.customer.name = `${data.firstName} ${data.lastName}`;
      this.customer.email = data.email;
      this.customer.phone = phoneNumber;
      this.customer.address = customerAddress;
      this.customer.created = moment(data.createdAt).format('MM-DD-YYYY');
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
      data[0].assetName = data[0].assetName.split('(')[0];
      this.items = await data;
      const warranty = await this.loadWarrantyData(data[0].assetSerial);
      this.items[0]['warranty'] = warranty;
      return data
    },
    async loadWarrantyData(serial) {
      const request = await WarrantyService.getLenovoWarranty(serial)
      const data = await request.data
      return data
    },
    async loadComData(id) {
      const request = await ComService.getComsByTicketId(id)
      const data = await request.data;
      this.coms = data;
      console.log(this.coms)
    },
    async comTypeHandler(opt) {
      this.com.comType = opt
      console.log(this.com.comType)
    },
    async comVisHandler(opt) {
      this.com.comVis = opt
      console.log(this.com.comVis)
    },
    async init() {
      this.comTypeHandler(this.comTypes[0]);
      this.comVisHandler(this.comVis[0]);
    },
    async testing123(a) {
      console.log(a)
    }
  },
  created() {
    this.init();
    this.ticket.number = this.storeX.ticketId.toString().padStart(5, '0');
    this.com.comAuthorId = JSON.parse(localStorage.getItem('user')).id;
    this.com.comAuthorName = JSON.parse(localStorage.getItem('user')).name;
    this.com.comTicketId = this.storeX.ticketId;
    this.loadTicketdata(this.storeX.ticketId);
    this.loadCustomerData(this.storeX.customerId);
    this.loadAssetData(this.storeX.ticketId);
    this.loadComData(this.storeX.ticketId);
  },
}
</script>
  
<style scoped>
.test {
  background: #1f1f1f;
  padding: 25px;
}

.com {
  padding: 20px;
  border: 1px yellow solid;
  background-color: #1f1f1f;
  color: white;
}

.messages {
  background-color: #c16701;
}

.text-area {
  background-color: #363636;
  border: 1px yellow solid;
  color: white;
  margin-bottom: 15px;
}

.text-area:focus {
  box-shadow: none !important;
}

.warranty {
  color: #c1cad4;
  text-decoration: none;
}

.warranty:hover {
  text-decoration: underline;
}

.bi {
  padding: 5px !important;
}

.btn {
  width: 100%;
  font-size: 14px;
  color: white;
  padding-bottom: 5px;
}

.btn::after {
  margin-right: 0px;
  margin-top: 8px;
}

.btn:focus {
  box-shadow: none !important;
  border-color: transparent !important;
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
  padding-top: 25px;
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