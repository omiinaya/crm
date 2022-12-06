<template>
  <div class="row">
    <div class="col-10 offset-1 top">
      Assets
      <div class="row">
        <div class="col-12 section">
          <EasyDataTable v-model:items-selected="itemsSelected" :headers="headers" :items="items" theme-color="#1d90ff" table-class-name="customize-table"
            header-text-direction="center" body-text-direction="center">
            <template #item-name="{ firstName, lastName, /*id*/ }">
              <!--v-on:click="openCustomer(id)"-->
              <button type="button" class="btn btn-lg">
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
import AssetService from "../services/asset.service"
import CustomerService from "../services/customer.service"
import moment from 'moment'

export default defineComponent({
  name: 'AssetPage',
  data() {
    return {
      storeX,
      headers: [
        { value: "id", text: "ID", sortable: true },
        { value: "assetName", text: "NAME", sortable: true },
        { value: "customerName", text: "CUSTOMER", sortable: true },
        { value: "assetSerial", text: "SERIAL", sortable: true },
        { value: "assetType", text: "TYPE", sortable: true },
        { value: "assetBrand", text: "MANUFACTURER", sortable: true }
      ],
      items: [],
      itemsSelected: []
    };
  },
  methods: {
    testing123(a) {
      console.log(a)
    },
    async loadAssetData() {
      const req = await AssetService.getAssets()
      const assets = await req.data;
      this.items = await assets;

      this.formatDate();
    },

    async loadCustomerData() {
      const req = await CustomerService.getCustomers();
      const customers = await req.data;

      let fullName = '';
      this.items.forEach(item => {
        const customer = customers.filter(customer => {
          const customerId = parseInt(customer.id)
          const assetCustomerId = parseInt(item.assetCustomerId)

          return customerId === assetCustomerId
        });
        fullName = `${customer[0].firstName} ${customer[0].lastName}`
        item['customerName'] = fullName;
      })

      console.log(fullName)
    },

    async formatDate() {
      this.items.forEach(item => {
        item.createdAt = moment(item.createdAt).format('MM-DD-YYYY HH:MM A');
      })
    }
  },
  async created() {
    this.loadAssetData()
    this.loadCustomerData()
  }
});

</script>

<style scoped>
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