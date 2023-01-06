<template>
  <div>
    <div class="row align-items-center">
      <div class="col-7 offset-1 title">New Ticket</div>
      <div class="col-4">
        <button type="button" class="btn btn-primary" v-on:click="createTicket(ticketForm)">
          New Ticket
        </button>
        <button type="button" class="btn btn-secondary" v-on:click="print(ticketForm)">
          TEST BUTTON 2
        </button>
      </div>
    </div>
    <div class="section">
      <div class="row align-items-top">
        <div class="cols-12 sub-title">BASIC INFO</div>
        <div class="col-6">
          <div class="form">
            <div v-for="(field, index) in ticketFields" :key="field + index">
              <div v-if="!field.show">
              </div>
              <div v-else-if="field.type === 'typeahead'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
    field.label
}}:
                </label>
                <div class="col-sm-8">
                  <TypeAhead :placeholder="field.placeholder" :items="customerItems"
                    class="form-control simple-typeahead"
                    @selectItem="(e) => this.ticketForm['ticketCustomerId'] = e.id" />
                </div>
              </div>
              <div v-else-if="field.type === 'textarea'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
    field.label
}}:
                </label>
                <div class="col-sm-8">
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                    v-model="ticketForm[field.name]"></textarea>
                </div>
              </div>
              <div v-else-if="(field.type === 'dropdown' && field.name === 'ticketTech')"
                class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
    field.label
}}:
                </label>
                <Dropdown :name=field.name :title="ticketForm[field.name]" :items="techItems" cols="8"
                  :handler="dropdownHandler" byProp="fullName" />
              </div>
              <div v-else-if="field.type === 'dropdown'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
    field.label
}}:
                </label>
                <Dropdown :name=field.name :title="ticketForm[field.name]" :items="JSON.parse(field.options)" cols="8"
                  :handler="dropdownHandler" />
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
                        value="option1" v-on:click="ticketForm[field.name] = type" checked />
                      <label class="form-check-label" for="inlineRadio1">{{
    type
}}</label>
                    </div>
                    <div v-else>
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                        value="option1" v-on:click="ticketForm[field.name] = type" />
                      <label class="form-check-label" for="inlineRadio1">{{
    type
}}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="field.name === 'businessName'" class="mb-3 row align-items-center"
                v-show="ticketForm['customerType'] === customerTypes[1]">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
    field.label
}}:
                </label>
                <div class="col-sm-8">
                  <input :type="field.type" class="form-control" :id="field.label + index"
                    :placeholder="field.placeholder" v-model="ticketForm[field.name]" />
                </div>
              </div>
              <div v-else-if="field.name === 'schoolName'" class="mb-3 row align-items-center"
                v-show="ticketForm['customerType'] === customerTypes[2]">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
    field.label
}}:
                </label>
                <div class="col-sm-8">
                  <input :type="field.type" class="form-control" :id="field.label + index"
                    :placeholder="field.placeholder" v-model="ticketForm[field.name]" />
                </div>
              </div>
              <div v-else-if="field.name === 'ticketDue'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4">
                  <i :class="field.icon"></i>
                  {{ field.label }}:
                </label>
                <!-- test -->
                <div class="col-sm-8">
                  <DatePicker v-model="ticketForm[field.name]" :format="format"/>
                </div>
              </div>
              <div v-else class="mb-3 row align-items-center">
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
        <div class="col-6">
          <div class="form">
            test
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="section">
      <div class="row align-items-top">
        <div class="cols-10 sub-title">ADD ASSET</div>
        <div class="col-6">
          <div class="form">
            <div v-for="(field, index) in assetFields" :key="field + index">
              <div v-if="field.type === 'dropdown'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4">
                  <i :class="field.icon"></i>
                  {{ field.label }}:
                </label>
                <Dropdown :name="field.name" :title="ticketForm[field.name]" :items="JSON.parse(field.options)"
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
import TypeAhead from "../../components/TypeAhead.vue"
import Dropdown from "../../components/Dropdown.vue"
import DatePicker from '@vuepic/vue-datepicker';

export default {
  name: 'NewCustomerPage',
  components: { TypeAhead, Dropdown, DatePicker },
  data: () => ({
    customerItems: [],
    techItems: ['Select Technician'],
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
      customerList.forEach((customer) => {
        this.customerItems.push(customer);
      })
    },
    async loadTechnicianData() {
      const request = await storeX.UserService.getAllUsers();
      const technicianList = await request.data;
      this.techItems = technicianList;
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
    }
  },
  created() {
    this.loadCustomerData();
    this.loadAssetFields();
    this.loadTechnicianData();
    this.getTicketFieldItems();
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