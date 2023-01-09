<template>
  <div class="row">
    <div class="col-10 offset-1 top">
      Tickets
      <div class="row mt-2">
        <div class="search">
          <input type="search" placeholder="Search for a ticket" @input="searchHandler($event)" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 section">
          <EasyDataTable v-model:items-selected="itemsSelected" :headers="headers" :items="filteredCustomers"
            theme-color="#1d90ff" table-class-name="customize-table" header-text-direction="left" body-text-direction="left">
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
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { storeX } from "../store/index";

export default defineComponent({
  name: 'CustomerPage',
  data() {
    return {
      storeX,
      headers: [
        { value: "id", text: "ID", sortable: true },
        { value: "ticketTitle", text: "TITLE", sortable: true },
        { value: "customerName", text: "CUSTOMER", sortable: true },
        { value: "ticketDesc", text: "DESCRIPTION", sortable: true },
        { value: "ticketTech", text: "TECHNICIAN", sortable: true },
        { value: "createdAt", text: "CREATED", sortable: true },
        { value: "assetSerial", text: "SERIAL", sortable: true },
        { value: "ticketStatus", text: "STATUS", sortable: true },
      ],
      searchFilter: null,
      itemsSelected: []
    };
  },
  methods: {
    testing123(a) {
      console.log(a);
    },
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

    async searchHandler(input) {
      const value = input.target.value;
      this.searchFilter = value;
    },
  },
  computed: {
    filteredCustomers() {
      if (!this.searchFilter) return storeX.tickets;

      const filtered = storeX.tickets.filter(ticket => {
        const input = this.searchFilter.toLowerCase();

        const id = ticket.id;
        const customer = ticket.customerName || '';
        const serial = ticket.assetSerial || '';
        const status = ticket.ticketStatus || '';

        const ifId = id.toString().includes(input);
        const ifCustomer = customer.toLowerCase().includes(input);
        const ifSerial = serial.toLowerCase().includes(input);
        const ifStatus = status.toLowerCase().includes(input);

        const byCondition = ifId || ifCustomer || ifSerial || ifStatus;

        return byCondition;

      })

      return filtered;
    }
  },
  async created() {
    storeX.loadTicketData()
    storeX.loadCustomerData()
  }
});

</script>

<style scoped>
.search {
  font-size: 16px;
  padding: 0;
}

input:focus {
  outline: none;
}

input[type=search]::-webkit-search-cancel-button {
    -webkit-appearance: searchfield-cancel-button;
}

.template-btn {
  font-size: 14px;
  color: #c1cad4;
  background: transparent;
  padding: 0;
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

.section {
  margin-top: 25px;
  background: #1f1f1f;
  padding: 25px;
}

.top {
  padding: 20px;
  padding-top: 0 !important;
  padding-bottom: 0;
  font-size: 24px;
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