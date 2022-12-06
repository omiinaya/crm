<template>
  <div class="row">
    <div class="col-10 offset-1 top">
      Tickets
      <div class="row">
        <div class="col-12 section">
          <EasyDataTable v-model:items-selected="itemsSelected" :headers="headers" :items="items" theme-color="#1d90ff"
            table-class-name="customize-table" header-text-direction="center" body-text-direction="center">
            <template #item-customerName="{ customerName, ticketCustomerId }">
              <button type="button" class="btn btn-lg" v-on:click="openCustomer(ticketCustomerId)">
                {{ customerName }}
              </button>
            </template>
            <template #item-ticketTitle="{ ticketTitle, id }">
              <button type="button" class="btn btn-lg" v-on:click="openTicket(id)">
                {{ ticketTitle }}
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
import TicketService from "../services/ticket.service"
import CustomerService from "../services/customer.service"
import moment from 'moment'

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
        { value: "ticketType", text: "ISSUE", sortable: true },
        { value: "ticketStatus", text: "STATUS", sortable: true },
      ],
      items: [],
      itemsSelected: []
    };
  },
  methods: {
    testing123(a) {
      console.log(a)
    },
    async openTicket(id) {
      storeX.view = 'ticket'
      storeX.ticketId = id
    },
    async openCustomer(id) {
      storeX.view = 'customer'
      storeX.customerId = id
    },
    async loadTicketData() {
      const req = await TicketService.getTickets();
      const tickets = await req.data;

      this.items = await tickets;
      this.formatDate();
    },
    async formatDate() {
      this.items.forEach(item => {
        item.createdAt = moment(item.createdAt).format('MM-DD-YYYY HH:MM A');
        item.updatedAt = moment(item.updatedAt).format('MM-DD-YYYY HH:MM A');
      })
    },
    async loadCustomerData() {
      const req = await CustomerService.getCustomers();
      const customers = await req.data;

      let fullName = '';
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]
        const customer = customers.filter(customer => {
          const customerId = parseInt(customer.id)
          const ticketCustomerId = parseInt(item.ticketCustomerId)

          return customerId === ticketCustomerId
        });
        fullName = `${customer[0].firstName} ${customer[0].lastName}`
        item['customerName'] = fullName;
      }
    }
  },
  async created() {
    this.loadTicketData()
    this.loadCustomerData()
  }
});

</script>

<style scoped>
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

.section {
  margin-top: 25px;
  background: #1f1f1f;
  padding: 25px;
}

.top {
  padding: 20px;
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