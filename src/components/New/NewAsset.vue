<template>
  <div class="row">
    <div class="col-6 offset-1 title">New Asset</div>
    <div class="col-5 title">
      <button
        type="button"
        class="btn btn-primary"
        v-on:click="createAsset(assetForm)"
      >
        New Asset
      </button>
      <button
        type="button"
        class="btn btn-success"
        v-on:click="loadCustomerData()"
      >
        TEST BUTTON 3
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-6 offset-1 form">
      <div class="col-11">Create A New Asset</div>
      <div v-for="(field, index) in assetFields" :key="field + index">
        <div
          v-if="field.name === 'customerName'"
          class="mb-3 row align-items-center"
        >
          <label :for="field.label + index" class="col-sm-4 col-form-label"
            ><i :class="field.icon"></i> {{ field.label }}:
          </label>
          <div class="col-sm-6">
            <SimpleTypeahead
              :placeholder="field.placeholder"
              :items="customerItems"
              class="form-control simple-typeahead"
              @selectItem="(e) => onSelect(e)"
            />
          </div>
        </div>
        <div v-else class="mb-3 row align-items-center">
          <label :for="field.label + index" class="col-sm-4 col-form-label"
            ><i :class="field.icon"></i> {{ field.label }}:
          </label>
          <div class="col-sm-6">
            <input
              :type="field.type"
              class="form-control"
              :id="field.label + index"
              :placeholder="field.placeholder"
              v-model="assetForm[field.name]"
              @input="print(assetForm)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssetService from "../../services/asset.service";
import CustomerService from "../../services/customer.service"
import SimpleTypeahead from 'vue3-simple-typeahead';
import { storeX } from "../../store/index";

export default {
  name: 'NewAssetPage',
  components: { SimpleTypeahead },
  data: () => ({
    assetFields: null,
    assetForm: {},
    customerItems: [],
    customerIds: [],
    customerSelected: null,
    storeX
  }),
  methods: {
    print(a) {
      console.log(a)
    },
    async loadAssetFields() {
      const req = await AssetService.getAssetFields();
      this.assetFields = await req.data
    },
    async loadCustomerData() {
      const request = await CustomerService.getCustomers()
      const customerList = await request.data;

      customerList.forEach((customer/*, index*/) => {
        const id = customer.id;
        const item = `${id}: ${customer.firstName} ${customer.lastName}`;
        this.customerItems.push(item);
        this.customerIds.push(id);
      })
    },
    async createAsset() {
      AssetService.createAsset(this.assetForm);
    },
    onSelect(e) {
      //TODO: reverse typeahead and use objects instead of this hacky method to get id of selected user
      const index = this.customerItems.indexOf(e)
      this.customerSelected = this.customerIds[index]
      console.log(this.customerSelected)
    },
    testing() {
      console.log(this.assetForm)
    }
  },
  created() {
    this.loadAssetFields()
    this.loadCustomerData()
  }
}
</script>

<style scoped>
.title {
  margin-top: 2%;
}

.form {
  margin-top: 2%;
}

.btn {
  margin-right: 10px !important;
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