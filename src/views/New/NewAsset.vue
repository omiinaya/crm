<template>
  <div class="row align-items-center">
    <div class="col-9 offset-1 title">New Asset</div>
    <div class="col-2">
      <button type="button" class="btn btn-success" v-on:click="createAsset(assetForm)">
        Create Asset
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-10 offset-1 form">
      <div class="col-6">
        <div v-for="(field, index) in assetFields" :key="field + index">
          <div v-if="!field.show">
          </div>
          <div v-else-if="field.type === 'typeahead'" class="mb-3 row align-items-center">
            <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
              field.label
            }}:
            </label>
            <div class="col-sm-6">
              <TypeAhead :placeholder="field.placeholder" :items="customerItems" class="form-control simple-typeahead"
                @selectItem="(e) => this.assetForm['customerId'] = e.id" />
            </div>
          </div>
          <div v-else-if="field.type === 'dropdown'" class="mb-3 row align-items-center">
            <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
              field.label
            }}:
            </label>
            <Dropdown2 :name="field.name" :title="assetForm[field.name]" :items="JSON.parse(field.options)" cols="6"
              :handler="dropdownHandler" />
          </div>
          <div v-else class="mb-3 row align-items-center">
            <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
              field.label
            }}:
            </label>
            <div class="col-sm-6">
              <input :type="field.type" class="form-control" :id="field.label + index" :placeholder="field.placeholder"
                v-model="assetForm[field.name]" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--
    <div class="col-1 offset-10 title">
      <button type="button" class="btn btn-success" v-on:click="createAsset(assetForm)">
        Create Asset
      </button>
    </div>
    -->
  </div>
</template>

<script>
import TypeAhead from "../../components/TypeAhead.vue"
import Dropdown2 from "../../components/Dropdown2.vue"
import { storeX } from "../../store/index";

export default {
  name: 'NewAssetPage',
  components: { TypeAhead, Dropdown2 },
  data: () => ({
    assetFields: null,
    assetForm: {
      type: 'Laptop',
      manufacturer: 'Lenovo'
    },
    customerItems: [],
    customerSelected: null,
    storeX
  }),
  methods: {
    dropdownHandler(type, name) {
      this.assetForm[name] = type
    },
    async loadAssetFields() {
      const req = await storeX.AssetService.getAssetFields();
      this.assetFields = await req.data

      const assetTypes = this.assetFields.filter(field => field.name === 'assetType')[0].options
      const assetBrands = this.assetFields.filter(field => field.name === 'assetBrand')[0].options

      this.assetForm['assetType'] = JSON.parse(assetTypes)[0];
      this.assetForm['assetBrand'] = JSON.parse(assetBrands)[0];
    },
    async loadCustomerData() {
      const request = await storeX.CustomerService.getCustomers()
      const customerList = await request.data;

      customerList.forEach((customer) => {
        this.customerItems.push(customer);
      })
    },
    async createAsset() {
      console.log(this.assetForm)
      storeX.AssetService.createAsset(this.assetForm);
    },
    testing() {
      console.log(this.assetForm)
    }
  },
  created() {
    this.loadAssetFields()
    this.loadCustomerData()
  },
  watch: {
    assetForm: {
      handler(newData) {
        console.log(newData)
      },
      deep: true
    }
  }
}
</script>

<style scoped>

.title {
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 30px;
}

.form {
  background: #1f1f1f;
  padding: 30px;
}

</style>

<style>
.simple-typeahead-list-item-text {
  color: black;
}

.simple-typeahead-list-item-active {
  background-color: white !important;
}

.simple-typeahead-list {
  box-shadow: 4px 4px 0px #11294e, -4px 4px 0px #11294e;
  border-radius: 7px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>