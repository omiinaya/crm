<template>
  <div class="row">
    <div class="col-11 offset-1">
      <div clas="row">
        <div class="col-11 top">
          <div style="display: flex; justify-content: space-between;">
            <div class="col-10 top">{{ fullName }}</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="row section">
            <div class="col-12 header">
              <i class="bi bi-person-circle"></i>
              Technician Information
            </div>
            <div class="content">
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-clipboard2-pulse"></i> Role:
                </label>
                {{ roleTitle }}
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-person-circle"></i> Email:
                </label>
                {{ email }}
              </div>
            </div>
          </div>
          <div class="row section">
            <div class="col-12 header">
              <i class="bi bi-person-circle"></i>
              Technician Overview
            </div>
            <div class="content">
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-person-circle"></i> Tickets Open:
                </label>
                <div class="col-sm-6">{{ storeX.customer.name }}</div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-envelope"></i> Tickets Closed:
                </label>
                <div class="col-sm-6">
                  <a :href="`mailto:${email}`" target="_blank">
                    {{ email }}
                  </a>
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-envelope"></i> Total Tickets:
                </label>
                <div class="col-sm-6">
                  <a :href="`mailto:${email}`" target="_blank">
                    {{ email }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="section">
            <div class="header">
              <i class="bi bi-laptop"></i>
              Tickets
            </div>
            <div class="section">
              <EasyDataTable v-model:items-selected="itemsSelected" :headers="headers" :items="storeX.technician"
                theme-color="#1d90ff" table-class-name="customize-table" header-text-direction="left"
                body-text-direction="left">
                <template #item-id="{ id }">
                  <button type="button" class="template-btn btn-lg" v-on:click="openTicket(id)">
                    {{ id }}
                  </button>
                </template>
              </EasyDataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { storeX } from "../../store/index";

export default {
  name: 'CustomerDetailsPage',
  components: {},
  data: () => ({
    storeX,
    headers: [
      { value: "assetName", text: "NAME", sortable: true },
      { value: "assetBrand", text: "BRAND", sortable: true },
      { value: "assetType", text: "TYPE", sortable: true },
      { value: "assetSerial", text: "SERIAL", sortable: true },
      { value: "assetTag", text: "TAG", sortable: true },
      { value: "warranty", text: "WARRANTY", sortable: true },
    ],
    itemsSelected: [],
  }),
  methods: {
    async openAsset(id) {
      this.storeX.updateNavigation({
        view: 'Asset',
        assetId: id,
      })
    },
    async newHandler(opt) {
      this.newSelected = opt;
      console.log(opt);
    },
    async testing123(a) {
      console.log(a);
    },
    async init() {
      await storeX.loadTechDataById()
      storeX.loadTicketsByTechId(storeX.technician[0].id)
    }
  },
  created() {
    this.init()
  },

  computed: {
    fullName() {
      if (!storeX.technician.length) return;
      return storeX.technician[0].fullName;
    },
    roleId() {
      if (!storeX.technician.length) return;
      return storeX.technician[0].roleId;
    },
    email() {
      if (!storeX.technician.length) return;
      return storeX.technician[0].email;
    },
    roleTitle() {
      if (!storeX.technician.length) return;
      if (storeX.technician[0].roleId === 2) return 'Technician';
      if (storeX.technician[0].roleId === 3) return 'Moderator';
      if (storeX.technician[0].roleId === 4) return 'Administrator';
      if (storeX.technician[0].roleId === 5) return 'Super Admin';
      return 'User';
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