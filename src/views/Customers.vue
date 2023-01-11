<template>
  <div class="row">
    <div class="col-10 offset-1 top">
      Customers
      <div class="row mt-2">
        <div class="search">
          <input type="search" placeholder="Search for a customer" @input="searchHandler($event)" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 section">
          <EasyDataTable v-model:items-selected="itemsSelected" :headers="headers" :items="filteredCustomers" theme-color="#1d90ff"
            table-class-name="customize-table" header-text-direction="left" body-text-direction="left">
            <template #item-name="{ firstName, lastName, id }">
              <button type="button" class="template-btn btn-lg" v-on:click="openCustomer(id)">
                {{ firstName }} {{ lastName }}
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
        { value: "name", text: "NAME", sortable: true },
        { value: "email", text: "EMAIL", sortable: true },
        { value: "phone", text: "PHONE", sortable: true },
        { value: "customerType", text: "TYPE", sortable: true },
        { value: "createdAt", text: "CREATED", sortable: true }
      ],
      itemsSelected: [],
      searchFilter: null
    };
  },
  methods: {
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
    async testing123(a) {
      console.log(a)
    }
  },
  computed: {
    filteredCustomers() {
      if (!this.searchFilter) return storeX.customers;
    
      const filtered = storeX.customers.filter(customer => {
        const input = this.searchFilter.toLowerCase();

        const name = `${customer.firstName} ${customer.lastName}`;
        const email = customer.email || '';
        const phone = customer.phone || '';

        const ifName = name.toLowerCase().includes(input);
        const ifEmail = email.toLowerCase().includes(input);
        const ifPhone = phone.includes(input);

        const byCondition = ifName || ifEmail || ifPhone;
        
        return byCondition;
      })
      return filtered;
    }
  },
  async created() {
    storeX.loadCustomerData();
  }
});

</script>

<style scoped>

.search {
  font-size: 16px;
  padding: 0;
}

input {
  width: 100%;
}

input:focus {
  outline: none;
}

input[type=search]::-webkit-search-cancel-button {
    -webkit-appearance: searchfield-cancel-button;
}
.top {
  padding: 20px;
  padding-top: 0 !important;
  padding-bottom: 0;
  font-size: 24px;
}

.section {
  margin-top: 25px;
  background: #1f1f1f;
  padding: 25px;
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
  box-shadow: none;
  border-color: transparent;
}

.btn:hover {
  text-decoration: underline;
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