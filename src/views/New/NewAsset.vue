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
          <div v-if="field.show && field.type === 'typeahead'" class="mb-3 row align-items-center">
            <label :for="field.label + index" class="col-sm-3 col-form-label"><i :class="field.icon"></i> {{
              field.label
            }}:
            </label>
            <div class="col-sm-4">
              <TypeAhead :placeholder="field.placeholder" :items="storeX.customers"
                class="form-control simple-typeahead" @selectItem="(e) => customerHandler(e)" />
            </div>
          </div>
          <div v-else-if="field.show && field.type === 'dropdown' && field.name === 'assetTicketId'"
            class="mb-3 row align-items-center">
            <label :for="field.label + index" class="col-sm-3 col-form-label"><i :class="field.icon"></i> {{
              field.label
            }}:
            </label>
            <Dropdown2 cols="4" :name="field.name" :title="assetForm[field.name]" :items="openTicketsByCustomer"
              :handler="dropdownHandler" byProp="id" />
          </div>
          <div v-else-if="field.show && field.type === 'dropdown'" class="mb-3 row align-items-center">
            <label :for="field.label + index" class="col-sm-3 col-form-label"><i :class="field.icon"></i> {{
              field.label
            }}:
            </label>
            <Dropdown2 cols="4" :name="field.name" :title="assetForm[field.name]" :items="JSON.parse(field.options)"
              :handler="dropdownHandler" />
          </div>
          <div v-else-if="field.show && field.name === 'assetSerial'" class="mb-3 row align-items-center">
            <label :for="field.label + index" class="col-sm-3 col-form-label"><i :class="field.icon"></i> {{
              field.label
            }}:
            </label>
            <div class="col-sm-4">
              <input :type="field.type" class="form-control" :id="field.label + index" :placeholder="field.placeholder"
                v-model="assetForm[field.name]" @input="warrantyHandler()" />
            </div>
            <div class="col-sm-5">
              <div v-show="assetForm[field.name].length < 8 || assetForm[field.name].length > 8">
                Enter a valid serial to check warranty.
              </div>
              <div v-show="assetForm[field.name].length === 8">
                {{ warranty }}
              </div>
            </div>
          </div>
          <div v-else-if="field.show" class="mb-3 row align-items-center">
            <label :for="field.label + index" class="col-sm-3 col-form-label"><i :class="field.icon"></i> {{
              field.label
            }}:
            </label>
            <div class="col-sm-4">
              <input :type="field.type" class="form-control" :id="field.label + index" :placeholder="field.placeholder"
                v-model="assetForm[field.name]" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-1 offset-10 title">
      <button type="button" class="btn btn-success" v-on:click="testing(assetForm)">
        Test
      </button>
    </div>

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
      manufacturer: 'Lenovo',
      assetSerial: '',
    },
    customerSelected: null,
    warranty: null,
    storeX
  }),
  methods: {
    async warrantyHandler() {
      this.warranty = '';                                                             //resetting warranty state on input
      const serial = this.assetForm['assetSerial'];                                   //grabbing input from input v-model
      if (serial.length < 8) return;                                                  //checking if the input has at least 8 chars long

      const warranty = await storeX.loadWarrantyData(serial);                         //requesting warranty data from lenovo
      if (warranty[0] !== "In Warranty") return this.warranty = 'Not in Warranty';    //sending results to this.warranty
      return this.warranty = 'In Warranty';
    },
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
    async createAsset() {
      const newAsset = await storeX.AssetService.createAsset(this.assetForm);
      console.log(newAsset)
    },
    testing(e) {
      console.log(e)
      console.log(storeX.tickets)
    },
    async customerHandler(e) {
      const customerId = e.customerId;
      this.assetForm['customerId'] = customerId;
      storeX.loadTicketsByCustomerId(customerId);
      const tickets = this.openTicketsByCustomer;
      console.log(tickets)
    }
  },
  created() {
    this.storeX.tickets = [];
    this.loadAssetFields()
    storeX.loadCustomerData()
  },
  computed: {
    openTicketsByCustomer() {
      const filtered = storeX.tickets.filter(ticket => ticket.ticketStatus !== "Resolved");
      const customer = this.assetForm['customerId']
      if (!filtered.length && !customer) {
        return [{ id: 'Select a customer' }]
      } else if (!filtered.length && customer) {
        return [{ id: 'No tickets found' }]
      } else {
        return storeX.tickets.filter(ticket => ticket.ticketStatus !== "Resolved");
      }
    },
  },
  watch: {
    assetForm: {
      handler(newData) {
        console.log(newData)
        //console.log(this.customerItems)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.btn {
  font-size: 14px;
  color: white;
}

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