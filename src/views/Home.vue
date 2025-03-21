<template>
  <div class="row">
    <div class="col-10 offset-1 top">
      Welcome
      <div class="row">
        <div class="col-sm-2-5-l section text-center">
          <div class="title">Actions</div>
          <div class="action-group btn-group-vertical" role="group" aria-label="Vertical button group">
            <div v-for="(action, index) in homeActions" :key="action + index">
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-secondary btn-lg actions custom-left">
                  <i :class="action.icon"></i>
                </button>
                <button type="button" class="btn btn-success btn-lg actions custom-right"
                  v-on:click="storeX.updateNavigation({ view: action.url })">
                  + {{ action.title }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 section">
          <div class="title text-center">Pending Tickets</div>
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
            <template #item-customerName="{ customerName, ticketCustomerId }">
              <button type="button" class="template-btn btn-lg" v-on:click="openCustomer(ticketCustomerId)">
                {{ customerName }}
              </button>
            </template>
          </EasyDataTable>
        </div>
        <div class="col-sm-2-5-r section">
          <div class="title text-center">Summary</div>
          <div class="details row align-items-center mb-2">
            <label class="col-sm-6 offset-1">
              <i class="bi bi-envelope"></i> Total Tickets:
            </label>
            <div class="col-sm-3 offset-2">
              {{ storeX.totalTickets() }}
            </div>

            <label class="col-sm-6 offset-1">
              <i class="bi bi-envelope"></i> Open Tickets:
            </label>
            <div class="col-sm-3 offset-2">
              {{ storeX.openTickets() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { storeX } from "../store/index";

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      headers: [
        { value: "id", text: "#", sortable: true },
        { value: "ticketTitle", text: "TITLE", sortable: true },
        { value: "customerName", text: "CUSTOMER", sortable: true },
        { value: "ticketDesc", text: "DESCRIPTION", sortable: true },
        { value: "ticketStatus", text: "STATUS", sortable: true }
      ],
      items: [],
      itemsSelected: null,
      storeX
    };
  },
  computed: {
    homeActions() {
      return storeX.home.actions;
    },
  },
  methods: {
    async openTicket(id, ticketCustomerId) {
      this.storeX.updateNavigation({
        view: 'Ticket',
        ticketId: id,
        customerId: ticketCustomerId
      })
    },
    async openCustomer(id) {
      this.storeX.updateNavigation({
        view: 'Customer',
        customerId: id
      })
    },
  },
  created() {
    storeX.getActionItems()
    storeX.loadTicketData()
  },
  filteredTickets() {
    const name = this.$store.state.auth.user.name;
    return storeX.tickets.filter(ticket => ticket.ticketTech === name)
  }
});
</script>

<style scoped>
.title {
  font-size: 18px;
}

.action-group {
  margin-top: 10px;
}

.details {
  margin-top: 10px;
  font-size: 16px;
  color: #c0c7d2;
}

.template-btn {
  font-size: 14px;
  color: #c1cad4;
  background: transparent;
  padding: 0;
}

.col-sm-2-5-l {
  flex: 0 0 23.0625%;
  max-width: 23.0625%;
  position: relative;
  width: 100%;
  margin-right: 30px;
}

.col-sm-2-5-r {
  flex: 0 0 23.0625%;
  max-width: 23.0625%;
  position: relative;
  width: 100%;
  margin-left: 30px;
}

.top {
  padding: 20px;
  padding-top: 0 !important;
  padding-bottom: 0;
  font-size: 24px;
}

.btn {
  font-size: 16px;
}

.menu {
  padding: 10px;
}

.actions {
  margin: 5px;
}

.bi {
  font-size: 20px;
}

.custom-right {
  width: 165px !important;
  text-align: left;
}

.custom-left {
  pointer-events: none;
}

.section {
  margin-top: 25px;
  background: #1f1f1f;
  padding: 25px;
}

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

ul {
  list-style-type: none;
  padding: 0;
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
