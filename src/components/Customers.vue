<template>
  <div class="container">
    <EasyDataTable :headers="headers" :items="items" theme-color="#1d90ff" table-class-name="customize-table"
      header-text-direction="center" body-text-direction="center" v-on:click="testing123($event)">
     
      <template #item-name="{ firstName, lastName/*, customerUrl*/ }">
        <a target="_blank" href="#!">{{firstName}} {{lastName}}</a>
      </template>
     
    </EasyDataTable>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { storeX } from "../store/index";
import CustomerService from "../services/customer.service"
import moment from 'moment'

export default defineComponent({
  name: 'CustomerPage',
  data() {
    return {
      storeX,
      headers: [
        { value: "id", text: "ID", sortable: true },
        { value: "name", text: "NAME", sortable: true },
        { value: "email", text: "EMAIL", sortable: true },
        { value: "customerType", text: "TYPE", sortable: true },
        { value: "createdAt", text: "CREATED", sortable: true }
      ],
      items: []
    };
  },
  methods: {
    testing123(a) {
      console.log(a)
    },
    async loadCustomerData() {
      const request = await CustomerService.getCustomers()
      const data = await request.data;
      this.items = await data;
      this.formatDate();
    },
    async formatDate() {
      this.items.forEach(item => {
        item.createdAt = moment(item.createdAt).format('MM-DD-YYYY HH:MM A');
      })
    }
  },
  async created() {
    this.loadCustomerData()
  }
});

</script>

<style scoped>
.customize-table {
  --easy-table-border: 1px solid #121212;
  --easy-table-row-border: 1px solid #121212;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #121212;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #121212;

  --easy-table-body-row-font-color: #c0c7d2;
  --easy-table-body-row-background-color: #121212;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #c0c7d2;
  --easy-table-body-row-hover-background-color: #1f1f1f;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #121212;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;

  --easy-table-scrollbar-track-color: #121212;
  --easy-table-scrollbar-color: #121212;
  --easy-table-scrollbar-thumb-color: #121212;
  --easy-table-scrollbar-corner-color: #121212;

  --easy-table-loading-mask-background-color: #121212;
}
</style>