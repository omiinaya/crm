<template>
  <div class="row">
    <div class="col-10 offset-1 top">
      <div class="top-spacing">
        <div>New Ticket</div>
        <div>
          <button type="button" class="btn btn-primary" v-on:click="createTicket(ticketForm)">
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-10 offset-1 top">
      <div class="row align-items-top section">
        <div class="cols-12 header">BASIC INFO</div>
        <div class="col-6 half">
          <div v-for="(field, index) in ticketFields" :key="field + index">
            <div v-if="!field.show"></div>
            <Form v-else-if="field.name === 'ticketCustomerName'" class="row align-items-center">
              <label :for="field.label + index" class="col-sm-4 col-form-label">
                <i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <div class="col-sm-8">
                <TypeAhead :placeholder="field.placeholder" :items="customerItems" class="form-control simple-typeahead"
                  @selectItem="(e) => typeAheadHandler(e.id)" />
              </div>
            </Form>
            <Form v-else-if="field.type === 'textarea'" class="row align-items-center">
              <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
                field.label
              }}:
              </label>
              <div class="col-sm-8">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                  v-model="ticketForm[field.name]"></textarea>
              </div>
            </Form>
            <Form v-else-if="field.type === 'dropdown' && field.name === 'ticketTech'" class="row align-items-center">
              <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
                field.label
              }}:
              </label>
              <Dropdown2 :name=field.name :title="ticketForm[field.name].fullName" :items="techItems" cols="8"
                :handler="dropdownHandler" byProp="fullName" />
            </Form>
            <Form v-else-if="field.type === 'dropdown'" class="row align-items-center">
              <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
                field.label
              }}:
              </label>
              <Dropdown2 :name=field.name :title="ticketForm[field.name]" :items="JSON.parse(field.options)" cols="8"
                :handler="dropdownHandler" />
            </Form>
            <Form v-else-if="field.name === 'ticketDue'" class="row align-items-center">
              <label :for="field.label + index" class="col-sm-4">
                <i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <div class="col-sm-8">
                <DatePicker v-model="ticketForm[field.name]" :format="format" />
              </div>
            </Form>
            <Form v-else class="row align-items-center">
              <label :for="field.label + index" class="col-sm-4">
                <i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <div class="col-sm-8">
                <input :type="field.type" class="form-control" :id="field.label + index"
                  :placeholder="field.placeholder" v-model="ticketForm[field.name]" />
              </div>
            </Form>
          </div>
        </div>
        <div class="col-6">
          <div class="form">
            test
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-10 offset-1 top">
      <div class="row align-items-top section">
        <div class="cols-12 header">ASSET INFO</div>
        <div class="col-6">
          <div class="form">
            <div v-for="(field, index) in assetFields" :key="field + index">
              <div v-if="field.type === 'dropdown'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4">
                  <i :class="field.icon"></i>
                  {{ field.label }}:
                </label>
                <Dropdown2 :name="field.name" :title="ticketForm[field.name]" :items="JSON.parse(field.options)"
                  cols="8" :handler="dropdownHandler" />
              </div>
              <div v-else>
                <div class="mb-3 row align-items-center">
                  <label :for="field.label + index" class="col-sm-4">
                    <i :class="field.icon"></i>
                    {{ field.label }}:
                  </label>
                  <div class="col-sm-8">
                    <input :type="field.type" class="form-control" :id="field.label + index"
                      :placeholder="field.placeholder" v-model="ticketForm[field.name]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="form">
            test
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storeX } from "../../store/index";
import { Form, /*Field, ErrorMessage*/ } from "vee-validate";
import TypeAhead from "../../components/TypeAhead.vue"
import Dropdown2 from "../../components/Dropdown2.vue"
import DatePicker from '@vuepic/vue-datepicker';

export default {
  name: 'NewCustomerPage',
  components: { Dropdown2, TypeAhead, DatePicker, Form, /*Field, ErrorMessage*/ },
  data: () => ({
    customerItems: [],
    techItems: null,
    ticketFields: null,
    assetFields: null,
    ticketForm: {},
    format: (d) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
    storeX
  }),
  methods: {
    print(a) {
      console.log(a);
    },
    async getTicketFieldItems() {
      const req = await storeX.TicketService.getTicketFields();
      this.ticketFields = await req.data;
      //get list of options
      const ticketTypes = this.ticketFields.filter(field => field.name === 'ticketType')[0].options
      //choose first option as default
      this.ticketForm['ticketType'] = JSON.parse(ticketTypes)[0];
      this.ticketForm['ticketTech'] = this.techItems[0].fullName;
      this.ticketForm['ticketDue'] = new Date();
    },
    async loadAssetFields() {
      const req = await storeX.AssetService.getAssetFields();
      const arr = req.data;
      await arr.splice(0, 3); //removes customer name, customer id and ticket number
      this.assetFields = arr;
      //get list of options
      const assetTypes = this.assetFields.filter(field => field.name === 'assetType')[0].options;
      const assetBrands = this.assetFields.filter(field => field.name === 'assetBrand')[0].options;
      //choose first option as default
      this.ticketForm['assetType'] = JSON.parse(assetTypes)[0];
      this.ticketForm['assetBrand'] = JSON.parse(assetBrands)[0];
    },
    async loadCustomerData() {
      const request = await storeX.CustomerService.getCustomers()
      const customerList = await request.data;

      for (let i = customerList.length - 1; i >= 0; i--) {
        const customer = customerList[i]
        this.customerItems.push(customer);
      }
    },
    async loadTechnicianData() {
      const request = await storeX.UserService.getAllUsers();
      const technicianList = await request.data;
      this.techItems = technicianList;
      this.getTicketFieldItems();
    },
    async createTicket(data) {
      console.log(data)
      const ticket = await storeX.TicketService.createTicket(data);
      if (ticket.status !== 200) return;
      const ticketId = ticket.data.id;
      const customerId = ticket.data.ticketCustomerId;
      storeX.updateNavigation({ view: 'Ticket', ticketId: ticketId, customerId: customerId });
    },
    getChecked(index, side) {
      const checked = JSON.parse(this.settingsFields[side][index].options).default;
      const name = this.settingsFields[side][index].name;
      this.ticketForm[name] = checked;
      return checked;
    },
    testing() {
      console.log(this.ticketForm);
    },
    dropdownHandler(item, name) {
      this.ticketForm[name] = item;
    },
    typeAheadHandler(id) {
      this.ticketForm['ticketCustomerId'] = parseInt(id)
      console.log(document.getElementsByClassName('simple-typeahead')[3].value)
      document.getElementsByClassName('simple-typeahead')[3].value = storeX.customer.name
    }
  },
  created() {
    this.loadCustomerData();
    this.loadAssetFields();
    this.loadTechnicianData();

    if (storeX.navigation.customerId) {
      storeX.loadCustomerById(storeX.navigation.customerId, this.typeAheadHandler)
    }
  },
  mounted() {

  },
  watch: {
    ticketForm: {
      handler(newData) {
        console.log(newData)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
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

.top-spacing {
  display: flex;
  justify-content: space-between;
}

.top {
  padding: 20px;
  padding-top: 0 !important;
  padding-bottom: 0;
  padding-left: 10px;
  font-size: 24px;
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
  margin-top: 25px;
  background: #1f1f1f;
  padding: 25px;
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

.dropdown-toggle::after {
  margin: 11px;
  float: right;
}
</style>