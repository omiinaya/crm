<template>
  <div class="row">
    <div class="col-11 offset-1">
      <div clas="row">
        <div class="col-11 top">
          <div style="display: flex; justify-content: space-between;">
            <div class="col-10 top">#{{ ticketId }}</div>
            <div>
              <Dropdown title="New" :items="newOptions" cols="12" :handler="newHandler" />
            </div>
            <div>
              <button type="button" class="btn btn-success" v-on:click="print(customerForm)">
                test 2
              </button>
            </div>
            <div>
              <button type="button" class="btn btn-success" v-on:click="() => { dialog = true }">
                test 3
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-3 title">
              {{ storeX.ticket.title }}
            </div>
            <div class="col-9 title">
              test
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
                <Dropdown2 v-if="storeX.ticket.status" name="status" :title="storeX.ticket.status" :items="ticketStatus"
                  cols="6" :handler="ticketStatusHandler" :byTicket="true" />
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-person-circle"></i> Assignee:
                </label>
                <Dropdown2 v-if="storeX.ticket.tech" name="assignee" :title="storeX.ticket.tech" :items="ticketTechs"
                  cols="6" :handler="ticketTechHandler" :byTicket="true" byProp="fullName" />
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-list-check"></i> Labor Type:
                </label>
                <Dropdown2 v-if="storeX.ticket.type" name="labor" :title="storeX.ticket.type" :items="ticketTypes"
                  cols="6" :handler="ticketTypeHandler" :byTicket="true" />
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-calendar-date"></i> Date Edited:
                </label>
                <div class="col-sm-6">{{ storeX.ticket.updated }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-calendar-date"></i> Date Created:
                </label>
                <div class="col-sm-6">{{ storeX.ticket.created }}</div>
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
                <div class="col-sm-6">{{ storeX.customer.name }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-envelope"></i> Email:
                </label>
                <div class="col-sm-6">
                  <a :href="`mailto:${storeX.customer.email}`" target="_blank">
                    {{ storeX.customer.email }}
                  </a>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-telephone"></i> Primary Phone:
                </label>
                <div class="col-sm-6">{{ storeX.customer.primaryPhone }}</div>
              </div>
              <div class="row align-items-top mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-geo-alt"></i> Primary Address:
                </label>
                <div class="col-sm-6">
                  <a :href="`https://maps.google.com/?q=${storeX.customer.primaryAddress}`" target="_blank">
                    {{ storeX.customer.primaryAddress }}
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
            <div v-if="storeX.asset.length">
              <EasyDataTable :headers="headers" :items="storeX.asset" theme-color="#1d90ff"
                table-class-name="customize-table-details" header-text-direction="left" body-text-direction="left"
                hide-footer>
                <template #item-warranty="{ warranty }">
                  <Loading v-if="!warranty" />
                  <a class="warranty" v-else :href="warranty[1]" target="_blank">
                    {{ warranty[0] }} <i class="bi bi-info-circle"></i>
                  </a>
                </template>
                <template #item-assetName="{ id, assetName }">
                  <button type="button" class="template-btn btn-lg" v-on:click="openAsset(id)">
                    {{ assetName }}
                  </button>
                </template>
              </EasyDataTable>
            </div>
            <div class="row" v-else>
              <div class="col-12 text-center">
                There are no assets to display.
              </div>
            </div>
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
          </div>
          <div class="section">
            <div class="col-12 header">
              <i class="bi bi-chat-dots"></i>
              Communications
            </div>
            <div class="row">
              <div class="col-12 top">
                <div class="com-top">
                  <div class="col-11" style="display: flex;">
                    <Dropdown2 :title="storeX.com.comVis" :items="comVis" cols="2" :handler="comVisHandler" />
                    <Dropdown2 :title="storeX.com.comType" :items="comTypes" cols="2" :handler="comTypeHandler" />
                  </div>
                  <button class="com-btn" v-on:click="() => { storeX.dialogs.canned = true }">
                    <i class="bi bi-clipboard"></i>
                  </button>
                  <Modal dialog="canned">
                    <template v-slot:content>
                      <Canned />
                    </template>
                  </Modal>
                  <button class="com-btn" v-on:click="edit('assets')">
                    <i class="bi bi-paperclip"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="content">
              <div class="col-sm-12">
                <textarea class="form-control text-area" rows="6" v-model="storeX.com.comMsg"
                  @input="testing123(storeX.com.comMsg)"></textarea>
              </div>
              <div class="col-2 offset-10">
                <button class="btn messages" v-on:click="createCom(storeX.com)">
                  {{ storeX.com.comVis }}
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
import Modal from "../../components/Modal.vue";
import Canned from "../../components/Modals/Canned.vue";
import moment from 'moment';

export default {
  name: 'CustomerDetailsPage',
  components: { Loading, Dropdown, Dropdown2, Modal, Canned },
  data: () => ({
    storeX,
    ticket: {
      number: null,
      title: 'test',
      created: null,
      updated: null,
      type: null,
      tech: null,
      status: null,
      /*
      info: {
        status: null,
        assignee: null,
        laborType: null
      }
      */
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
    ticketTypes: ['Flat-Rate', 'Warranty', 'In-House'],
    assetBrands: ['Lenovo', 'Dell', 'HP', '...'],
    comVis: ['Private Note', 'Publc Note', 'Email', 'SMS', 'Email + SMS'],
    comTypes: ['Update', 'Issue', 'Diagnosis', 'Parts Ordered', 'Parts Arrival', 'Complete'],
    coms: [],
    editing: {
      assets: {
        editMode: false,
        assetName: null,
        assetSerial: null
      },
    },
    dialog: false
  }),
  methods: {

    async openAsset(id) {
      this.storeX.updateNavigation({
        view: 'Asset',
        assetId: id,
      })
    },

    async createCom() {
      storeX.com.customerPhone = storeX.customer.phone;
      storeX.com.customerEmail = storeX.customer.email;
      storeX.ComService.createCom(storeX.com);
      storeX.com.comMsg = ''; //clearing box after com creation
    },
    async loadTechnicianData() {
      const request = await storeX.UserService.getAllUsers();
      const data = await request.data;
      this.ticketTechs = data;
    },
    async loadComData(id) {
      const request = await storeX.ComService.getComsByTicketId(id);
      const data = await request.data.reverse();

      for (var i = data.length - 1; i >= 0; i--) {
        const com = data[i];
        com.createdAt = moment(com.createdAt).format('ddd MM-DD-YYYY HH:MM A');
      }

      this.coms = data;
    },

    async comTypeHandler(opt) {
      storeX.com.comType = opt;
    },

    async comVisHandler(opt) {
      storeX.com.comVis = opt;
    },

    async ticketStatusHandler(item) {
      console.log(storeX.ticket.status)
      const id = storeX.navigation.ticketId;
      const obj = { ticketStatus: item };
      storeX.TicketService.updateTicket(id, obj);
    },

    async ticketTypeHandler(item) {
      const id = storeX.navigation.ticketId;
      const obj = { ticketType: item };
      storeX.TicketService.updateTicket(id, obj);
    },

    async ticketTechHandler(item) {
      const id = storeX.navigation.ticketId;
      const obj = { ticketTech: item };
      storeX.TicketService.updateTicket(id, obj);
    },

    async newHandler(opt) {
      this.newSelected = opt;
      console.log(opt);
    },

    async init() {
      storeX.asset = [];

      this.comTypeHandler(this.comTypes[0]);
      this.comVisHandler(this.comVis[0]);

      this.loadComData(this.storeX.navigation.ticketId);
      this.loadTechnicianData();

      await storeX.loadCustomerById(this.storeX.navigation.customerId);
      await storeX.loadTicketById(this.storeX.navigation.ticketId);
      await storeX.loadAssetByTicketId(this.storeX.navigation.ticketId);

      this.ticket.number = this.storeX.navigation.ticketId;
      storeX.com.comAuthorId = JSON.parse(localStorage.getItem('user')).id;
      storeX.com.comAuthorName = JSON.parse(localStorage.getItem('user')).name;
      storeX.com.comTicketId = storeX.ticket.id;
      storeX.com.comPhoneNumber = storeX.customer.primaryPhone;
    },
    async edit(x) {
      this.editing[x]['editMode'] = !this.editing[x]['editMode']
    },

    async testing123(a) {
      console.log(a);
    }
  },
  created() {
    this.init();

    this.storeX.io.on('comCreatedResponse', (id) => {
      if (this.storeX.navigation.ticketId != id) return;
      this.loadComData(this.storeX.navigation.ticketId);
    })

    this.storeX.io.on('ticketUpdateResponse', (id) => {
      if (this.storeX.navigation.ticketId != id) return;
      storeX.loadTicketById(this.storeX.navigation.ticketId);
    })
  },

  computed: {
    ticketId() {
      if (!storeX.ticket.id) return;
      return storeX.padX(storeX.ticket.id);
    }
  }
}
</script>
  
<style scoped>
.template-btn {
  font-size: 14px;
  color: #c1cad4;
  background: transparent;
  padding: 0;
}

.stepper {
  font-size: 16px;
}

.com-top {
  display: flex;
  justify-content: space-between;
}

.com-top>*>* {
  margin-right: 15px;
}

.com-btn {
  padding: 0 !important;
  margin: 0 !important;
  background: transparent;
  font-size: 16px;
}

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
  font-size: 20px;
}

.header {
  font-size: 18px;
  float: left;
  margin-bottom: 25px;
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
  font-size: 24px;
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

</style>