<template>
  <div class="row">
    <div class="col-6 offset-1 title">New Asset</div>
    <div class="col-5 title">
      <button type="button" class="btn btn-primary" v-on:click="createAsset(assetForm)">
        New Ticket
      </button>
      <button type="button" class="btn btn-success" v-on:click="loadCustomerData()">
        TEST BUTTON 3
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-6 offset-1 form">
      <div class="col-11">Create A New Asset</div>
      <div v-for="(field, index) in assetFields" :key="field + index">
        <div v-if="field.show !== null">
        </div>
        <div v-else-if="field.name === 'customerName'" class="mb-3 row align-items-center">
          <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{ field.label
          }}:
          </label>
          <div class="col-sm-6">
            <TypeAhead :placeholder="field.placeholder" :items="customerItems" class="form-control simple-typeahead"
              @selectItem="(e) => this.assetForm['customerId'] = e.id" />
          </div>
        </div>
        <div v-else-if="field.type === 'dropdown'" class="mb-3 row align-items-center">
          <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{ field.label
          }}:
          </label>
          <div class="col-sm-6 dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
              data-bs-toggle="dropdown" aria-expanded="false" style="width: 100%; padding: 5px" placeholder="Dropdown">
              {{ assetForm[field.name] }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-for="(type, index) in JSON.parse(field.options)" :key="type + index">
                <a class="dropdown-item" href="#!" v-on:click="assetForm[field.name] = type">{{ type }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="mb-3 row align-items-center">
          <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{ field.label
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
</template>

<script>
import AssetService from "../../services/asset.service";
import CustomerService from "../../services/customer.service"
import TypeAhead from "../TypeAhead.vue"
import { storeX } from "../../store/index";

export default {
  name: 'NewAssetPage',
  components: { TypeAhead },
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
    async loadAssetFields() {
      const req = await AssetService.getAssetFields();
      this.assetFields = await req.data
    },
    async loadCustomerData() {
      const request = await CustomerService.getCustomers()
      const customerList = await request.data;

      customerList.forEach((customer) => {
        this.customerItems.push(customer);
      })
    },
    async createAsset() {
      console.log(this.assetForm)
      AssetService.createAsset(this.assetForm);
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