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
                  <i class="bi bi-ticket"></i> New Tickets
                </label>
                <div class="col-sm-6">
                  {{ storeX.newTickets() }}
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-ticket-detailed"></i> Open Tickets:
                </label>
                <div class="col-sm-6">
                  {{ storeX.openTickets() }}
                </div>
              </div>
              <div class="row align-items-center mb-2">
                <label class="col-sm-6">
                  <i class="bi bi-ticket-perforated"></i> Resolved Tickets:
                </label>
                <div class="col-sm-6">
                  {{ storeX.closedTickets() }}
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
            <div class="section" v-if="storeX.tickets.length">
              <EasyDataTable v-model:items-selected="itemsSelected" :headers="headers" :items="storeX.tickets"
                theme-color="#1d90ff" table-class-name="customize-table" header-text-direction="left"
                body-text-direction="left">
                <template #item-id="{ id, ticketCustomerId }">
                  <button type="button" class="template-btn btn-lg" v-on:click="openTicket(id, ticketCustomerId)">
                    {{ id }}
                  </button>
                </template>
                <template #item-ticketTitle="{ ticketTitle, id, ticketCustomerId }">
                  <button type="button" class="template-btn btn-lg" v-on:click="openTicket(id, ticketCustomerId)">
                    {{ ticketTitle }}
                  </button>
                </template>
                <template #item-ticketDesc="{ ticketDesc, id, ticketCustomerId }">
                  <button type="button" class="template-btn btn-lg" v-on:click="openTicket(id, ticketCustomerId)">
                    {{ ticketDesc }}
                  </button>
                </template>
              </EasyDataTable>
            </div>
            <div class="section text-center" v-if="!storeX.tickets.length">
              There are no tickets to display
            </div>
          </div>
          <div class="section">
            <div class="header">
              <i class="bi bi-hourglass"></i>
              History
            </div>
            <div class="section text-center">
              <!--
              <EasyDataTable v-model:items-selected="itemsSelected" :headers="headers" :items="storeX.tickets"
                theme-color="#1d90ff" table-class-name="customize-table" header-text-direction="left"
                body-text-direction="left">
                <template #item-id="{ id, ticketCustomerId }">
                  <button type="button" class="template-btn btn-lg" v-on:click="openTicket(id, ticketCustomerId)">
                    {{ id }}
                  </button>
                </template>
              </EasyDataTable>
              -->
              TODO: Show history of latest updates or changes by this user
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
      { value: "id", text: "ID", sortable: true },
      { value: "ticketTitle", text: "TITLE", sortable: true },
      { value: "ticketDesc", text: "DESCRIPTION", sortable: true },
      { value: "ticketType", text: "Type", sortable: true },
      { value: "ticketStatus", text: "STATUS", sortable: true },
      { value: "createdAt", text: "DATE", sortable: true },
    ],
    itemsSelected: [],
  }),
  methods: {
    async openTicket(id, ticketCustomerId) {
      this.storeX.updateNavigation({
        view: 'Ticket',
        ticketId: id,
        customerId: ticketCustomerId
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
    },
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