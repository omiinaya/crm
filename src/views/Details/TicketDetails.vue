<template>
  <div class="row">
    <div class="col-11 offset-1">
      <div clas="row">
        <div class="col-12">
          <div class="row">
            <div class="col-8 top">#{{ ticket.number }}</div>
            <div class="col-1 top">
              <Dropdown title="New" :items="newOptions" cols="12" :handler="newHandler" />
            </div>
            <div class="col-1 top">
              <button type="button" class="btn btn-success" v-on:click="print(customerForm)">
                test 2
              </button>
            </div>
            <div class="col-1 top">
              <button type="button" class="btn btn-success" v-on:click="print(customerForm)">
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
          <div class="row section">
            <div class="col-12 header">
              <i class="bi bi-person-circle"></i>
              Ticket Information
            </div>
            <div class="content">
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-clipboard2-pulse"></i> Status:
                </label>
                <Dropdown :title="ticket.status" :items="ticketStatus" cols="6" :handler="ticketStatusHandler"
                  :byTicket="true" />
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-person-circle"></i> Assignee:
                </label>
                <Dropdown :title="ticket.tech" :items="ticketTechs" cols="6" :handler="ticketTechHandler"
                  :byTicket="true" byProp="fullName" />
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-list-check"></i> Labor Type:
                </label>
                <Dropdown :title="ticket.type" :items="ticketTypes" cols="6" :handler="ticketTypeHandler"
                  :byTicket="true" />
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
          <div class="row section">
            <div class="col-12 header">
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
                  <a :href="`https://maps.google.com/?q=${customer.address}`" target="_blank">
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
          <div class="row section">
            <div class="col-12 header">
              <i class="bi bi-paperclip"></i>
              Attachments
            </div>
            <div class="content">test</div>
          </div>
        </div>
        <div class="col-8">
          <div class="section" v-if="!editing.assets.editMode">
            <div class="header">
              <i class="bi bi-laptop"></i>
              Assets
            </div>
            <div class="edit">
              <button class="btn" v-on:click="edit('assets')">
                <i class="bi bi-pencil"></i>
              </button>
            </div>
            <EasyDataTable :headers="headers" :items="ticketAssets" theme-color="#1d90ff"
              table-class-name="customize-table-details" header-text-direction="center" body-text-direction="center"
              hide-footer>
              <template #item-warranty="{ warranty }">
                <Loading v-if="!warranty" />
                <a class="warranty" v-else :href="warranty[1]" target="_blank">
                  {{ warranty[0] }}
                </a>
              </template>
              <template #item-assetName="{ assetName }">
                <a class="warranty">
                  {{ assetName }}
                </a>
              </template>
            </EasyDataTable>
          </div>
          <div class="section" v-if="editing.assets.editMode">
            <div class="header">
              <i class="bi bi-laptop"></i>
              Assets (Editing)
            </div>
            <div class="edit">
              <button class="btn" v-on:click="edit('assets')">
                <i class="bi bi-pencil"></i>
              </button>
            </div>
            <EasyDataTable :headers="headers" :items="ticketAssets" theme-color="#1d90ff"
              table-class-name="customize-table-details" header-text-direction="center" body-text-direction="center"
              hide-footer>
              <template #item-warranty="{ warranty }">
                <Loading v-if="!warranty" />
                <a class="warranty" v-else :href="warranty[1]" target="_blank">
                  {{ warranty[0] }}
                </a>
              </template>

              <template #item-assetName="{ assetName }">
                <input type="input" class="form-control" :id="'editAssetName'" :placeholder="assetName"
                  v-model="editing.assets.assetName" />
              </template>

              <template #item-assetBrand="{ /*assetBrand*/ }">


                <Dropdown2 :items="assetBrands" cols="12" :handler="testing123"/>

              </template>

            </EasyDataTable>
          </div>
          <div class="section">
            <div class="col-12 header">
              <i class="bi bi-chat-dots"></i>
              Communications
            </div>
            <div class="content">
              <div class="row mt-4">
                <Dropdown :title="com.comVis" :items="comVis" cols="2" :handler="comVisHandler" />
                <Dropdown :title="com.comType" :items="comTypes" cols="2" :handler="comTypeHandler" />
                <div class="col-1 offset-7" style="display: flex">
                  <button class="btn" v-on:click="edit('assets')">
                    <i class="bi bi-clipboard"></i>
                  </button>

                  <button class="btn" v-on:click="edit('assets')">
                    <i class="bi bi-paperclip"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="content">
              <div class="col-sm-12">
                <textarea class="form-control text-area" rows="6" v-model="com.comMsg"
                  @input="testing123(com.comMsg)"></textarea>
              </div>
              <div class="col-2 offset-10">
                <button class="btn messages" v-on:click="createCom(com)">
                  {{ com.comVis }}
                </button>
              </div>
            </div>
          </div>
          <div class="test">
            <div v-for="(com, index) in coms" class="col-12 form-control com mt-3" :key="com + index">
              <div class="mb-3">
                <div class="row">
                  <div class="col-3">
                    {{ com.comAuthorName }}
                  </div>
                  <div class="col-1 offset-2">
                    {{ com.comType }}
                  </div>
                  <div class="col-3 offset-3">
                    {{ com.createdAt }}
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    {{ com.comVis }}
                  </div>
                </div>
                <div class="row">
                  <div class="col-12" style="white-space: pre-wrap">
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
import Loading from "../../components/Loading.vue";
import Dropdown from "../../components/Dropdown.vue";
import Dropdown2 from "../../components/Dropdown2.vue";
import moment from 'moment';

export default {
  name: 'CustomerDetailsPage',
  components: { Loading, Dropdown, Dropdown2 },
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
    newOptions: ['Part Order', 'Estimate', 'Appointment', 'Intake Form', 'Outtake Form'],
    ticketAssets: [],
    ticketTechs: [],
    ticketStatus: ['New', 'Waiting for Parts', 'Waiting on Client', 'In Progress', 'Ready for Pickup', 'Customer Reply', 'Resolved'],
    ticketTypes: ['Flat Rate', 'Warranty', 'In-House'],
    assetBrands: ['Lenovo', 'Dell', 'HP', '...'],
    comVis: ['Private Note', 'Publc Note', 'Email', 'SMS', 'Email + SMS'],
    comTypes: ['Update', 'Issue', 'Diagnosis', 'Parts Ordered', 'Parts Arrival', 'Complete'],
    com: {
      comVis: null,
      comType: null,
      comMsg: null,
      comAuthorId: null,
      comTicketId: null,
      comAuthorName: null,
      comCreated: null,
      comCustomerNumber: null
    },
    coms: [],
    editing: {
      assets: {
        editMode: false,
        assetName: null,
        assetSerial: null
      },
    }
  }),
  methods: {
    async createCom() {
      this.com.customerPhone = this.customer.phone;
      this.com.customerEmail = this.customer.email;
      storeX.ComService.createCom(this.com);
    },
    async loadTechnicianData() {
      const request = await storeX.UserService.getAllUsers();
      const data = await request.data;
      this.ticketTechs = data;
    },
    async loadTicketdata(id) {
      const request = await storeX.TicketService.getTicketById(id)
      const data = await request.data[0];
      this.ticket.title = data.ticketTitle;
      this.ticket.type = data.ticketType;
      this.ticket.tech = data.ticketTech;
      this.ticket.status = data.ticketStatus;
      this.ticket.created = moment(data.createdAt).format('MMM DD YYYY HH:MM A');
      this.ticket.updated = moment(data.updateAt).format('MMM DD YYYY HH:MM A');
    },
    async loadCustomerData(id) {
      const request = await storeX.CustomerService.getCustomerById(id)
      const data = await request.data[0];

      const primaryPhone = await this.loadPhoneData(data.primaryPhone);
      const phoneNumber = primaryPhone[0].number;

      const primaryAddress = await this.loadLocationData(data.primaryAddress);
      if (!primaryAddress[0].address1) {
        this.customer.address = '';
      } else {
        const customerAddress = Object.values(primaryAddress[0]).slice(1, 7).join(', '); //gets address
        this.customer.address = customerAddress.replace(/\b[a-z]/gi, char => char.toUpperCase()); //capitalizes every first letter
      }

      this.customer.name = `${data.firstName} ${data.lastName}`;
      this.customer.email = data.email;
      this.customer.phone = phoneNumber;
      this.customer.created = moment(data.createdAt).format('MM-DD-YYYY');
    },
    async loadPhoneData(id) {
      const request = await storeX.NumberService.getNumberById(id);
      const data = await request.data;
      return data;
    },
    async loadLocationData(id) {
      const request = await storeX.LocationService.getLocationById(id);
      const data = await request.data;
      return data;
    },
    async loadAssetData(id) {
      const request = await storeX.AssetService.getAssetByTicketId(id);
      const data = await request.data;
      data[0].assetName = data[0].assetName.split('(')[0];
      this.ticketAssets = await data;
      const warranty = await this.loadWarrantyData(data[0].assetSerial);
      this.ticketAssets[0]['warranty'] = warranty;
      return data;
    },
    async loadWarrantyData(serial) {
      const request = await storeX.WarrantyService.getLenovoWarranty(serial);
      const data = await request.data;
      return data;
    },
    async loadComData(id) {
      const request = await storeX.ComService.getComsByTicketId(id);
      const data = await request.data;
      data.forEach(com =>
        com.createdAt = moment(com.createdAt).format('ddd MM-DD-YYYY HH:MM A')
      );
      this.coms = data.reverse();
    },

    async comTypeHandler(opt) {
      this.com.comType = opt;
    },

    async comVisHandler(opt) {
      this.com.comVis = opt;
    },

    async ticketStatusHandler(item, name, byProp) {
      const data = item[byProp]
      const id = storeX.navigation.ticketId;
      const obj = { ticketStatus: data };
      storeX.TicketService.updateTicket(id, obj);
    },

    async ticketTechHandler(item, name, byProp) {
      const data = item[byProp]
      const id = storeX.navigation.ticketId;
      const obj = { ticketTech: data };
      storeX.TicketService.updateTicket(id, obj);
    },

    async ticketTypeHandler(item, name, byProp) {
      const data = item[byProp]
      const id = storeX.navigation.ticketId;
      const obj = { ticketType: data };
      storeX.TicketService.updateTicket(id, obj);
    },

    async newHandler(opt) {
      this.newSelected = opt;
      console.log(opt);
    },

    async init() {
      this.comTypeHandler(this.comTypes[0]);
      this.comVisHandler(this.comVis[0]);
    },

    async edit(x) {
      this.editing[x]['editMode'] = !this.editing[x]['editMode']
      console.log(this.editing.assets)
    },

    async testing123(a, b) {
      console.log(a);
      console.log(b);
    }
  },
  created() {
    this.init();
    this.ticket.number = this.storeX.navigation.ticketId.toString().padStart(5, '0');
    this.com.comAuthorId = JSON.parse(localStorage.getItem('user')).id;
    this.com.comAuthorName = JSON.parse(localStorage.getItem('user')).name;
    this.com.comTicketId = this.storeX.navigation.ticketId;
    this.loadTicketdata(this.storeX.navigation.ticketId);
    this.loadCustomerData(this.storeX.navigation.customerId);
    this.loadAssetData(this.storeX.navigation.ticketId);
    this.loadComData(this.storeX.navigation.ticketId);
    this.loadTechnicianData();

    this.storeX.io.on('comCreatedResponse', (id) => {
      if (this.storeX.navigation.ticketId != id) return;
      this.loadComData(this.storeX.navigation.ticketId);
    })

    this.storeX.io.on('ticketUpdateResponse', (id) => {
      if (this.storeX.navigation.ticketId != id) return;
      this.loadTicketdata(this.storeX.navigation.ticketId);
    })
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
  padding: 8px !important;
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
  font-size: 16px;
  color: white;
  padding: 0;
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
  float: left;
}

.edit {
  position: relative;
  float: right;
  font-size: 18px;
  z-index: 2 !important;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.top {
  padding-top: 25px;
  padding-bottom: 0;
  padding-top: 0 !important;
  font-size: 32px;
}

.section {
  margin-top: 12px;
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

.vue3-easy-data-table {
  z-index: 1 !important
}
</style>