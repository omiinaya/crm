<template>
  <div>

    <div class="cols-10 offset-1 title">New Customer</div>

    <div class="section">
      <div class="row">
        <div class="cols-10 sub-title">BASIC INFO</div>
        <div class="col-6">
          <div class="form">
            <div v-for="(field, index) in fieldsLeft" :key="field + index">
              <div v-if="field.name === 'phone'" class="mb-3 row">
                <label :for="field.label + index" class="col-sm-3 col-form-label"><i :class="field.icon"></i>
                  {{ field.label }}
                </label>
                <div class="col-sm-3 dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false" style="width: 100%" placeholder="Dropdown">
                    {{ phoneType }}
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li v-for="(type, index) in phoneTypes" :key="type + index">
                      <a class="dropdown-item" href="#!" v-on:click="phoneType = type">{{ type }}
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-sm-4">
                  <input :type="field.type" class="form-control" :id="field.label + index"
                    :placeholder="field.placeholder" v-model="customerForm[field.label]" @input="print(customerForm)" />
                </div>
                <div class="col-sm-2">
                  <input :type="field.type" class="form-control" :id="field.label + index" placeholder="Ext" />
                </div>
              </div>
              <div v-else-if="field.name === 'customerType'" class="mb-3 row">
                <label :for="field.label + index" class="col-sm-3 col-form-label"><i :class="field.icon"></i>
                  {{ field.label }}:
                </label>
                <div class="col-sm-8">
                  <div v-for="(customerType, index) in customerTypes" :key="customerType + index" class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                        value="option1">
                      <label class="form-check-label" for="inlineRadio1">{{ customerType }}</label>  
                  </div>
                </div>
              </div>
              <div v-else class="mb-3 row">
                <label :for="field.label + index" class="col-sm-3 col-form-label"><i :class="field.icon"></i>
                  {{ field.label }}:
                </label>
                <div class="col-sm-9">
                  <input :type="field.type" class="form-control" :id="field.label + index"
                    :placeholder="field.placeholder" v-model="customerForm[field.name]" @input="print(customerForm)" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="form">
            <div class="mb-3 row" v-for="(field, index) in fieldsRight" :key="field + index">
              <label :for="field.label + index" class="col-sm-3 col-form-label"><i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <div class="col-sm-9">
                <input :type="field.type" class="form-control" :id="field.label + index"
                  :placeholder="field.placeholder" v-model="customerForm[field.name]" @input="print(customerForm)" />
              </div>
            </div>
          </div>
          <div class="col-sm-1" v-on:click="createCustomer(customerForm)">
            <button>test</button>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="section">
      <div class="row">
        <div class="cols-10 sub-title">CUSTOMER SETTINGS</div>
        <div class="col-6">
          <div class="form">
            test1
          </div>
        </div>
        <div class="col-6">
          <div class="form">
            test2
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import CustomerService from "../../services/customer.service";
import { storeX } from "../../store/index";

export default {
  name: 'NewCustomerPage',
  components: {},
  data: () => ({
    fields: null,
    customerTypes: ['Individual', 'Business'],
    customerType: null,
    phoneTypes: null,
    phoneType: null,
    customerForm: {},
    storeX
  }),
  methods: {
    print(a) {
      console.log(a)
    },
    async getFieldItems() {
      const req = await CustomerService.getCustomerFields();
      this.fields = await req.data;
      //phonesTypes
      const phoneTypes = this.fields.filter(field => field.name === 'phone')[0].options
      this.phoneTypes = JSON.parse(phoneTypes);
      this.phoneType = this.phoneTypes[0];
      //customerTypes
      const customerTypes = this.fields.filter(field => field.name === 'customerType')[0].options
      this.customerTypes = JSON.parse(customerTypes)
      console.log(this.customerTypes)


    },
    async createCustomer(data) {
      const req = await CustomerService.createCustomer(data);
      const response = await req.data;
      console.log(response);
    }
  },
  created() { this.getFieldItems() },
  computed: {
    fieldsLeft: function () {
      if (!this.fields) return;
      return this.fields.filter(field => field.side === 0);
    },
    fieldsRight: function () {
      if (!this.fields) return;
      return this.fields.filter(field => field.side === 1);
    }
  }
}
</script>

<style scoped>
.form {
  margin: 30px;
}

.title {
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 30px;
}

.sub-title {
  margin: 30px;
  margin-bottom: 0;
}

.section {
  margin-left: 125px;
  margin-right: 125px;
  background: #1f1f1f;
}
</style>