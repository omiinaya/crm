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
              <div v-else-if="field.name === 'customerName'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
                    field.label
                }}:
                </label>
                <div class="col-sm-8">
                  <TypeAhead :placeholder="field.placeholder" :items="customerItems"
                    class="form-control simple-typeahead" @selectItem="(e) => this.ticketForm['customerId'] = e.id" />
                </div>
              </div>

              <div v-else-if="field.name === 'phone'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
                    field.label
                }}:
                </label>
                <div class="col-sm-2 dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false" style="width: 100%; padding: 5px"
                    placeholder="Dropdown">
                    {{ ticketForm["phoneType"] }}
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li v-for="(type, index) in phoneTypes" :key="type + index">
                      <a class="dropdown-item" href="#!" v-on:click="ticketForm['phoneType'] = type">{{ type }}
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-sm-4">
                  <input :type="field.type" class="form-control" :id="field.label + index"
                    :placeholder="field.placeholder" v-model="ticketForm[field.name]" />
                </div>
                <div class="col-sm-2">
                  <input :type="field.type" class="form-control" :id="field.label + index" placeholder="Ext."
                    v-model="ticketForm['extension']" />
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
              <div v-else class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i> {{
                    field.label
                }}:
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
            test
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
import ticketService from "../../services/ticket.service";
import CustomerService from "../../services/customer.service"
import { storeX } from "../../store/index";
import TypeAhead from "../TypeAhead.vue"

export default {
  name: 'NewCustomerPage',
  components: { TypeAhead },
  data: () => ({
    customerItems: [],
    ticketFields: null,
    ticketForm: {},
    storeX
  }),
  methods: {
    print(a) {
      console.log(a)
    },
    async getTicketFieldItems() {
      const req = await ticketService.getTicketFields();
      this.ticketFields = await req.data
    },
    async loadCustomerData() {
      const request = await CustomerService.getCustomers()
      const customerList = await request.data;
      //console.log(customerList)

      customerList.forEach((customer) => {
        this.customerItems.push(customer);
      })

      console.log(this.customerItems)
    },
    async createTicket(data) {
      ticketService.createTicket(data);
    },
    getChecked(index, side) {
      const checked = JSON.parse(this.settingsFields[side][index].options).default
      const name = this.settingsFields[side][index].name
      this.ticketForm[name] = checked
      return checked
    },
    testing() {
      console.log(this.ticketForm)
    }
  },
  created() {
    this.getTicketFieldItems();
    this.loadCustomerData();
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
</style>