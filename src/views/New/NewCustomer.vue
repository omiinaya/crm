<template>
  <div class="row">
    <div class="col-10 offset-1 top">
      <div class="top-spacing">
        <div>New Customer</div>
        <div>
          <button type="button" class="btn btn-primary" v-on:click="createCustomer(customerForm)">
            New Customer
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-10 offset-1 top">
      <!------------------------------------------------------------------------------->
      <div class="row align-items-top section">
        <div class="cols-12 header">BASIC INFO</div>
        <div class="col-6 half">
          <div v-for="(field, index) in customerFields.left" :key="field + index">
            <div v-if="!field.show"></div>
            <Form v-else-if="field.name === 'phone'" class="row align-items-center">
              <label :for="field.label + index" class="col-sm-4 col-form-label">
                <i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <Dropdown2 :title="customerForm['phoneType']" :items="phoneTypes" :handler="dropdownHandler"
                name='phoneType' cols="2-5" />
              <div class="col-sm-4">
                <input :type="field.type" class="form-control" :id="field.label + index"
                  :placeholder="field.placeholder" v-model="customerForm[field.name]" />
              </div>
              <div class="col-sm-2-3">
                <input :type="field.type" class="form-control" :id="field.label + index" placeholder="Ext."
                  v-model="customerForm['extension']" />
              </div>
            </Form>
            <Form v-else-if="field.name === 'customerType'" class="row align-items-center">
              <label :for="field.label + index" class="col-sm-4 col-form-label">
                <i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <div class="col-sm-8" style="height: 25px">
                <div v-for="(type, index) in customerTypes" :key="type + index" class="form-check form-check-inline">
                  <div v-if="!index">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                      value="option1" v-on:click="customerForm[field.name] = type" checked />
                    <label class="form-check-label" for="inlineRadio1">
                      {{ type }}
                    </label>
                  </div>
                  <div v-else>
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                      value="option1" v-on:click="customerForm[field.name] = type" />
                    <label class="form-check-label" for="inlineRadio1">
                      {{ type }}
                    </label>
                  </div>
                </div>
              </div>
            </Form>
            <Form v-else-if="field.name === 'businessName'" class="row align-items-center"
              v-show="customerForm['customerType'] === customerTypes[1]">
              <label :for="field.label + index" class="col-sm-4 col-form-label">
                <i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <div class="col-sm-8">
                <input :type="field.type" class="form-control" :id="field.label + index"
                  :placeholder="field.placeholder" v-model="customerForm[field.name]" />
              </div>
            </Form>
            <Form v-else-if="field.name === 'schoolName'" class="row align-items-center"
              v-show="customerForm['customerType'] === customerTypes[2]">
              <label :for="field.label + index" class="col-sm-4 col-form-label">
                <i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <div class="col-sm-8">
                <input :type="field.type" class="form-control" :id="field.label + index"
                  :placeholder="field.placeholder" v-model="customerForm[field.name]" />
              </div>
            </Form>
            <Form v-else class="row align-items-center" :validation-schema="schema">
              <label :for="field.label + index" class="col-sm-4">
                <i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <div class="col-sm-8">
                <Field :name="field.name" :type="field.type" class="form-control" :id="field.label + index"
                  :placeholder="field.placeholder" v-model="customerForm[field.name]" />
                <ErrorMessage :name="field.name" class="error-feedback" />
              </div>
            </Form>
          </div>
        </div>
        <div class="col-5 offset-1">
          <div v-for="(field, index) in customerFields.right" :key="field + index">
            <Form v-if="field.name === 'country'" name="country" class="row align-items-center" :validation-schema="schema">
              <label :for="field.label + index" class="col-sm-4 col-form-label">
                <i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <Dropdown2 v-if="this.customerForm.country" :title="customerForm['country']" :items="countryItems" :handler="countryDropdownHandler"
                name='country' cols="8" byProp="name" />
            </Form>

            <Form v-else-if="field.name === 'state'" name="state" class="row align-items-center" :validation-schema="schema">
              <label :for="field.label + index" class="col-sm-4 col-form-label">
                <i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <Dropdown2 v-if="this.customerForm.state" :title="customerForm.state" :items="stateItems" :handler="stateDropdownHandler" name='state'
                cols="8" byProp="name" />
            </Form>

            <Form v-else-if="field.name === 'city'" name="city" class="row align-items-center" :validation-schema="schema">
              <label :for="field.label + index" class="col-sm-4 col-form-label">
                <i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <Dropdown2 v-if="this.customerForm.city" :title="customerForm.city" :items="cityItems" :handler="dropdownHandler" name='city'
                cols="8" byProp="name" />
            </Form>

            <Form v-else class="row align-items-center" :validation-schema="schema">
              <label :for="field.label + index" class="col-sm-4 col-form-label">
                <i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <div class="col-sm-8">
                <Field :name="field.name" :type="field.type" class="form-control" :id="field.label + index"
                  :placeholder="field.placeholder" v-model="customerForm[field.name]" />
                <ErrorMessage :name="field.name" class="error-feedback" />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-10 offset-1 top">

      <!------------------------------------------------------------------------------->
      <div class="row align-items-top section">
        <div class="cols-12 header test">ASSET INFO</div>

        <div class="col-5 half">
          <div class="row align-items-center form" v-for="(field, index) in settingsFields.left" :key="field + index">
            <label :for="field.label + index" class="col-sm-5 col-form-label">
              <i :class="field.icon"></i> {{ field.label }}:
            </label>
            <div class="col-sm-7">
              <input :type="field.type" class="form-check-input" :id="field.label + index"
                :placeholder="field.placeholder" v-model="customerForm[field.name]"
                :checked="getChecked(index, 'left')" />
            </div>
          </div>
        </div>
        <div class="col-6 half">
          <div class="row align-items-center form" v-for="(field, index) in settingsFields.right" :key="field + index">
            <label :for="field.label + index" class="col-sm-5 col-form-label">
              <i :class="field.icon"></i>
              {{ field.label }}:
            </label>
            <div class="col-sm-7">
              <input :type="field.type" class="form-check-input" :id="field.label + index"
                :placeholder="field.placeholder" v-model="customerForm[field.name]"
                :checked="getChecked(index, 'right')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row bottom">
    <div class="col-10 offset-1 top">
      <div class="top-spacing">
        <div></div>
        <div>
          <button type="button" class="btn btn-primary" v-on:click="createCustomer(customerForm)">
            New Customer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import Dropdown2 from "../../components/Dropdown2.vue"
import { storeX } from "../../store/index";
import * as yup from "yup";

export default {
  name: 'NewCustomerPage',
  components: { Form, Field, ErrorMessage, Dropdown2 },
  data() {
    const schema = yup.object().shape({
      firstName: yup
        .string()
        .required("First name is required!")
        .min(1, "Must be at least 1 characters!"),

      lastName: yup
        .string()
        .required("Last name is required!")
        .min(1, "Must be at least 1 characters!"),
      email: yup
        .string()
        .required("Email address is required!")
        .min(1, "Must be at least 1 characters!"),
    });

    return {
      //error handling
      successful: false,
      loading: false,
      message: "",
      schema,

      //fields
      customerFields: {
        left: null,
        right: null
      },
      locationFields: null,
      settingsFields: {
        left: null,
        right: null
      },

      //types
      customerTypes: ['Individual'],
      phoneTypes: [],

      //forms
      customerForm: {
        phoneType: 'Mobile',
        extension: null,
        country: 'United States',
        state: 'Florida',
        city: 'Doral'
      },

      countryItems: [],
      stateItems: [],
      cityItems: [],

      storeX
    };
  },
  methods: {
    testing12345() {
      console.log(this.customerForm.country)
    },
    print(a) {
      console.log(a)
    },
    dropdownHandler(item, name) {
      this.customerForm[name] = item;
    },
    countryDropdownHandler(item, name) {
      this.dropdownHandler(item, name);
      this.loadStates();
    },
    stateDropdownHandler(item, name) {
      this.dropdownHandler(item, name);
      this.loadCities();
    },
    getCountryId() {
      const country = this.countryItems.filter(country => country.name === this.customerForm.country);
      const countryId = country[0].id;
      return countryId;
    },
    getStateId() {
      const state = this.stateItems.filter(state => state.name === this.customerForm.state);
      const stateId = state[0].id;
      return stateId;
    },
    async loadCountries() {
      const countries = await storeX.CSCService.getCountries()
      const data = countries.data;
      this.countryItems = data;
      this.loadStates()
    },
    async loadStates() {
      const countryId = this.getCountryId();
      const states = await storeX.CSCService.getStatesByCountry(countryId);
      this.stateItems = states;
      this.customerForm.state = states[11].name //11 = Florida
      this.loadCities()
    },
    async loadCities() {
      const stateId = this.getStateId();
      const cities = await storeX.CSCService.getCitiesByState(stateId);
      this.cityItems = cities;
      this.customerForm.city = cities[178].name; //178 = Doral
      console.log(cities)
    },
    async getCustomerFieldItems() {
      const req = await storeX.CustomerService.getCustomerFields();
      const loc = await storeX.LocationService.getLocationFields();
      this.customerFields.left = await req.data
      this.customerFields.right = await loc.data

      //phonesTypes
      const phoneTypes = this.customerFields.left.filter(field => field.name === 'phone')[0].options
      this.phoneTypes = JSON.parse(phoneTypes);
      this.customerForm['phoneType'] = this.phoneTypes[0]

      //customerTypes
      const customerTypes = this.customerFields.left.filter(field => field.name === 'customerType')[0].options
      this.customerTypes = JSON.parse(customerTypes)
      this.customerForm['customerType'] = this.customerTypes[0]
    },
    async getSettingsFieldItems() {
      const req = await storeX.CustomerService.getCustomerSettingsFields();
      this.settingsFields.left = await req.data.filter(field => !field.side);
      this.settingsFields.right = await req.data.filter(field => field.side);
    },
    async createCustomer(data) {
      const customer = await storeX.CustomerService.createCustomer(data);
      if (customer.status !== 200) return;
      const customerId = customer.data.id;
      storeX.updateNavigation({ view: 'Customer', customerId: customerId });
    },
    getChecked(index, side) {
      const checked = JSON.parse(this.settingsFields[side][index].options).default
      const name = this.settingsFields[side][index].name
      this.customerForm[name] = checked
      return checked
    },
    testing() {
      console.log(this.customerForm)
    }
  },
  created() {
    this.getCustomerFieldItems();
    this.getSettingsFieldItems();
    this.loadCountries();
  },
  watch: {
    customerForm: {
      handler(newData) {
        console.log(newData)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.title {}

.test {
  margin-bottom: 10px;
}

.header {
  padding: 0;
  font-size: 16px;
}

label {
  padding: 0;
}

.half {
  padding: 0;
  margin: 0;
}

.top {
  padding: 20px;
  padding-top: 0 !important;
  padding-bottom: 0;
  padding-left: 10px;
  font-size: 24px;
}

.top-spacing {
  display: flex;
  justify-content: space-between;
}

.top-spacing>*>* :not(:last-child) {
  margin-right: 15px !important;
}

.col-sm-2-3 {
  flex: 0 0 12.2%;
  max-width: 12.2%;
  position: relative;
  width: 100%;
}

.btn {
  margin-right: 10px !important;
}

form {
  font-size: 14px;
  margin: 0px;
  margin-bottom: 15px;
}

.form {
  font-size: 14px;
  margin: 0px;
  margin-bottom: 15px;
}

.error-feedback {
  color: #da3e3e;
}


.section {
  margin-top: 25px;
  background: #1f1f1f;
  padding: 25px;
}

.bottom {
  margin-top: 25px;
}
</style>