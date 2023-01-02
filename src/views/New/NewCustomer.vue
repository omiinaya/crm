<template>
  <div>
    <div class="row align-items-center">
      <div class="col-6 offset-1 title">New Customer</div>
      <div class="col-5">
        <button type="button" class="btn btn-primary" v-on:click="createCustomer(customerForm)">
          New Customer
        </button>
        <button type="button" class="btn btn-secondary" v-on:click="print(customerForm)">
          TEST BUTTON 2
        </button>
        <button type="button" class="btn btn-success" v-on:click="print(customerForm)">
          TEST BUTTON 3
        </button>
      </div>
    </div>
    <div class="section">
      <div class="row align-items-top">
        <div class="cols-12 sub-title">BASIC INFO</div>
        <div class="col-6">
          <Form>
            <div v-for="(field, index) in customerFields.left" :key="field + index">
              <div v-if="!field.show"></div>
              <div v-else-if="field.name === 'phone'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
                    field.label
                }}:
                </label>
                <div class="col-sm-2-5 dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false" style="width: 100%; padding: 5px"
                    placeholder="Dropdown">
                    {{ customerForm["phoneType"] }}
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li v-for="(type, index) in phoneTypes" :key="type + index">
                      <a class="dropdown-item" v-on:click="customerForm['phoneType'] = type">{{ type }}
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-sm-4">
                  <input :type="field.type" class="form-control" :id="field.label + index"
                    :placeholder="field.placeholder" v-model="customerForm[field.name]" />
                </div>
                <div class="col-sm-2-3">
                  <input :type="field.type" class="form-control" :id="field.label + index" placeholder="Ext."
                    v-model="customerForm['extension']" />
                </div>
              </div>
              <div v-else-if="field.name === 'customerType'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
                    field.label
                }}:
                </label>
                <div class="col-sm-8" style="height: 25px">
                  <div v-for="(type, index) in customerTypes" :key="type + index" class="form-check form-check-inline">
                    <div v-if="!index">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                        value="option1" v-on:click="customerForm[field.name] = type" checked />
                      <label class="form-check-label" for="inlineRadio1">{{
                          type
                      }}</label>
                    </div>
                    <div v-else>
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                        value="option1" v-on:click="customerForm[field.name] = type" />
                      <label class="form-check-label" for="inlineRadio1">{{
                          type
                      }}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="field.name === 'businessName'" class="mb-3 row align-items-center"
                v-show="customerForm['customerType'] === customerTypes[1]">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
                    field.label
                }}:
                </label>
                <div class="col-sm-8">
                  <input :type="field.type" class="form-control" :id="field.label + index"
                    :placeholder="field.placeholder" v-model="customerForm[field.name]" />
                </div>
              </div>
              <div v-else-if="field.name === 'schoolName'" class="mb-3 row align-items-center"
                v-show="customerForm['customerType'] === customerTypes[2]">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
                    field.label
                }}:
                </label>
                <div class="col-sm-8">
                  <input :type="field.type" class="form-control" :id="field.label + index"
                    :placeholder="field.placeholder" v-model="customerForm[field.name]" />
                </div>
              </div>
              <div v-else class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
                    field.label
                }}:
                </label>
                <div class="col-sm-8">
                  <input :type="field.type" class="form-control" :id="field.label + index"
                    :placeholder="field.placeholder" v-model="customerForm[field.name]" />
                </div>
              </div>
            </div>
          </Form>
        </div>

        <div class="col-6">
          <Form @submit="testing123" class="mb-3 row align-items-center" v-for="(field, index) in customerFields.right" :key="field + index" :validation-schema="schema">
            <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{ field.label
            }}:
            </label>
            <div class="col-sm-8">
              <Field :name="field.name" :type="field.type" class="form-control" :id="field.label + index"
                :placeholder="field.placeholder" v-model="customerForm[field.name]" />
              <ErrorMessage :name="field.name" class="error-feedback" />
            </div>
          </Form>
          <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="section">
      <div class="row align-items-top">
        <div class="cols-10 sub-title">CUSTOMER SETTINGS</div>
        <div class="col-6">
          <Form>
            <div class="mb-3 row align-items-center" v-for="(field, index) in settingsFields.left" :key="field + index">
              <label :for="field.label + index" class="col-sm-5 col-form-label"><i :class="field.icon"></i> {{
                  field.label
              }}:
              </label>
              <div class="col-sm-7">
                <input :type="field.type" class="form-check-input" :id="field.label + index"
                  :placeholder="field.placeholder" v-model="customerForm[field.name]"
                  :checked="getChecked(index, 'left')" />
              </div>
            </div>
          </Form>
        </div>
        <div class="col-6">
          <Form>
            <div class="mb-3 row align-items-center" v-for="(field, index) in settingsFields.right"
              :key="field + index">
              <label :for="field.label + index" class="col-sm-5 col-form-label"><i :class="field.icon"></i> {{
                  field.label
              }}:
              </label>
              <div class="col-sm-7">
                <input :type="field.type" class="form-check-input" :id="field.label + index"
                  :placeholder="field.placeholder" v-model="customerForm[field.name]"
                  :checked="getChecked(index, 'right')" />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerService from "../../services/customer.service";
import LocationService from "../../services/location.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import { storeX } from "../../store/index";
import * as yup from "yup";

export default {
  name: 'NewCustomerPage',
  components: { Form, Field, ErrorMessage },
  data() {
    const schema = yup.object().shape({
      address1: yup
        .string()
        .required("First name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      lastName: yup
        .string()
        .required("Last name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      customerFields: {
        left: null,
        right: null
      },
      locationFields: null,
      settingsFields: {
        left: null,
        right: null
      },
      customerTypes: ['Individual'],
      phoneTypes: null,
      customerForm: {
        phoneType: 'Mobile',
        extension: null
      },
      storeX
    };
  },
  methods: {
    print(a) {
      console.log(a)
    },
    async getCustomerFieldItems() {
      const req = await CustomerService.getCustomerFields();
      const loc = await LocationService.getLocationFields();
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
      const req = await CustomerService.getCustomerSettingsFields();
      this.settingsFields.left = await req.data.filter(field => !field.side);
      this.settingsFields.right = await req.data.filter(field => field.side);
    },
    async createCustomer(data) {
      const customer = await CustomerService.createCustomer(data);
      const customerId = customer.data.id
      storeX.updateNavigation({ view: 'Customer', customerId: customerId })
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
.col-sm-2-5 {
  flex: 0 0 21.0625%;
  max-width: 21.0625%;
  position: relative;
  width: 100%;
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

Form {
  margin: 30px;
  margin-top: 0;
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