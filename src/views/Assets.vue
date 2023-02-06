<template>
  <div class="row">
    <div class="col-10 offset-1 top">
      Assets
      <div class="row mt-2">
        <div class="search">
          <input type="search" placeholder="Search for an asset" @input="searchHandler($event)" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 section">
          <EasyDataTable v-model:items-selected="itemsSelected" :headers="headers" :items="filteredCustomers"
            theme-color="#1d90ff" table-class-name="customize-table" header-text-direction="left"
            body-text-direction="left">
            <template #item-customerName="{ customerName, assetCustomerId }">
              <button type="button" class="template-btn btn-lg" v-on:click="openCustomer(assetCustomerId)">
                {{ customerName }}
              </button>
            </template>
            <template #item-assetWarranty="{ id }">
              <Loading class="align-items-center" v-if="Object.keys(warranty).length === 0 && hasLoaded < storeX.assets.length" />
              <a v-if="hasLoaded === storeX.assets.length" class="warranty" :href="warranty[id]['url']" target="_blank">
                {{ warranty[id]['status'] }} <i class="bi bi-info-circle"></i>
              </a>
            </template>
            <template #item-assetName="{ id, assetName }">
              <button type="button" class="template-btn btn-lg" v-on:click="openAsset(id)">
                {{ assetName }}
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
import Loading from "../components/Loading.vue";

export default defineComponent({
  name: 'AssetPage',
  components: { Loading },
  data() {
    return {
      storeX,
      headers: [
        { value: "id", text: "ID", sortable: true },
        { value: "assetName", text: "NAME", sortable: true },
        { value: "customerName", text: "CUSTOMER", sortable: true },
        { value: "assetSerial", text: "SERIAL", sortable: true },
        { value: "assetType", text: "TYPE", sortable: true },
        { value: "assetBrand", text: "MANUFACTURER", sortable: true },
        { value: "assetWarranty", text: "WARRANTY", sortable: true }
      ],
      searchFilter: null,
      itemsSelected: [],
      warranty: {},
      hasLoaded: 0
    };
  },
  methods: {
    async openCustomer(id) {
      this.storeX.updateNavigation({
        view: 'Customer',
        customerId: id,
      })
    },

    async openAsset(id) {
      this.storeX.updateNavigation({
        view: 'Asset',
        assetId: id,
      })
    },

    testing123(a) {
      console.log(a)
    },

    async searchHandler(input) {
      const value = input.target.value;
      this.searchFilter = value;
    },

    async init() {
      await storeX.loadAssetData()
      //do stuff with assets after they have loaded.
      storeX.assets.forEach(async asset => {
        const id = asset.id;
        const serial = asset.assetSerial;

        const warranty = await storeX.bLoadWarrantyData(serial);
        this.warranty[id] = { 
          status: warranty[0], 
          url: warranty[1]
        };
        this.hasLoaded++;
      })
      console.log(this.warranty)
    }
  },
  computed: {
    filteredCustomers() {

      if (!this.searchFilter) return storeX.assets;

      const filtered = storeX.assets.filter(asset => {
        const input = this.searchFilter.toLowerCase();

        const name = asset.assetName || '';
        const customer = asset.customerName || '';
        const serial = asset.assetSerial || '';
        const brand = asset.assetBrand || '';
        const type = asset.assetType || '';

        const ifName = name.toLowerCase().includes(input);
        const ifCustomer = customer.toLowerCase().includes(input);
        const ifSerial = serial.toLowerCase().includes(input);
        const ifBrand = brand.toLowerCase().includes(input);
        const ifType = type.toLowerCase().includes(input);

        const byCondition = ifName || ifCustomer || ifSerial || ifBrand || ifType;

        return byCondition;
      })

      return filtered;
    },
  },
  async created() {
    this.init()
  }
});

</script>

<style scoped>

.warranty {
  color: #c1cad4;
  text-decoration: none;
}

.warranty:hover {
  text-decoration: underline;
}

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