<template>
  <div>
    <div class="row align-items-center">
      <div class="col-6 offset-1 title">New Customer</div>
      <div class="col-5">
        <button type="button" class="btn btn-primary" v-on:click="createCustomer(customerForm)">TEST BUTTON 1</button>
        <button type="button" class="btn btn-secondary" v-on:click="createCustomer(customerForm)">TEST BUTTON 2</button>
        <button type="button" class="btn btn-success" v-on:click="testing()">TEST BUTTON 3</button>
      </div>
    </div>
    <div class="section">
      <div class="row align-items-top">
        <div class="cols-12 sub-title">BASIC INFO</div>
        <div class="col-6">
          <div class="form">
            <div v-for="(field, index) in fieldsLeft" :key="field + index">
              <div v-if="field.name === 'phone'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i>
                  {{ field.label }}:
                </label>
                <div class="col-sm-2 dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false" style="width: 100%; padding: 5px;" placeholder="Dropdown">
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
              <div v-else-if="field.name === 'customerType'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i>
                  {{ field.label }}:
                </label>
                <div class="col-sm-8" style="height:25px">
                  <div v-for="(type, index) in customerTypes" :key="type + index" class="form-check form-check-inline">
                    <div v-if="!index">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                        value="option1" v-on:click="customerType = type" checked>
                      <label class="form-check-label" for="inlineRadio1">{{ type }}</label>
                    </div>
                    <div v-else>
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                        value="option1" v-on:click="customerType = type">
                      <label class="form-check-label" for="inlineRadio1">{{ type }}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="field.name === 'businessName'" class="mb-3 row align-items-center" v-show="customerType === customerTypes[1]">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i>
                  {{ field.label }}:
                </label>
                <div class="col-sm-8">
                  <input :type="field.type" class="form-control" :id="field.label + index"
                    :placeholder="field.placeholder" v-model="customerForm[field.name]" @input="print(customerForm)" />
                </div>
              </div>
              <div v-else class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i>
                  {{ field.label }}:
                </label>
                <div class="col-sm-8">
                  <input :type="field.type" class="form-control" :id="field.label + index"
                    :placeholder="field.placeholder" v-model="customerForm[field.name]" @input="print(customerForm)" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="form">
            <div class="mb-3 row align-items-center" v-for="(field, index) in fieldsRight" :key="field + index">
              <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <div class="col-sm-8">
                <input :type="field.type" class="form-control" :id="field.label + index"
                  :placeholder="field.placeholder" v-model="customerForm[field.name]" @input="print(customerForm)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="section">
      <div class="row align-items-top">
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
    customerTypes: null,
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
      this.customerType = this.customerTypes[0];
    },
    async createCustomer(data) {
      const req = await CustomerService.createCustomer(data);
      const response = await req.data;
      console.log(response);
    },
    testing() {
      console.log(this.phoneType)
      console.log(this.customerType)
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
.btn {
  margin-right: 10px !important;
}

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