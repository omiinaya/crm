<template>
  <div class="row">
    <div class="col-10 offset-1 top">
      <div class="top-spacing">
        <div>New Ticket</div>
        <button type="button" class="btn btn-primary" v-on:click="createTicket(ticketForm)">
          Create Ticket
        </button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-10 offset-1 top">
      <div class="row align-items-top section">
        <div class="cols-12 header">BASIC INFO</div>
        <div class="col-6 half">
          <div v-for="(field, index) in leftHalfTicket" :key="field + index">
            <div v-if="!field.show"></div>
            <Form v-else-if="field.name === 'ticketCustomerName'" class="row align-items-center">
              <label :for="field.label + index" class="col-sm-2 col-form-label">
                <i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <div class="col-sm-8">
                <TypeAhead :placeholder="field.placeholder" :items="customerItems" class="form-control simple-typeahead"
                  @selectItem="(e) => typeAheadHandler(e.id)" />
              </div>
            </Form>
            <Form v-else-if="field.type === 'textarea'" class="row align-items-center">
              <label :for="field.label + index" class="col-sm-2 col-form-label"><i :class="field.icon"></i> {{
                field.label
              }}:
              </label>
              <div class="col-sm-8">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                  v-model="ticketForm[field.name]"></textarea>
              </div>
            </Form>
            <Form v-else-if="field.type === 'dropdown' && field.name === 'ticketTech'" class="row align-items-center">
              <label :for="field.label + index" class="col-sm-2 col-form-label"><i :class="field.icon"></i> {{
                field.label
              }}:
              </label>
              <Dropdown2 :name=field.name :title="ticketForm[field.name]" :items="techItems" cols="8"
                :handler="tDropdownHandler" byProp="fullName" />
            </Form>
            <Form v-else-if="field.type === 'dropdown'" class="row align-items-center">
              <label :for="field.label + index" class="col-sm-2 col-form-label"><i :class="field.icon"></i> {{
                field.label
              }}:
              </label>
              <Dropdown2 :name=field.name :title="ticketForm[field.name]" :items="JSON.parse(field.options)" cols="8"
                :handler="dropdownHandler" />
            </Form>
            <Form v-else class="row align-items-center">
              <label :for="field.label + index" class="col-sm-2">
                <i :class="field.icon"></i>
                {{ field.label }}:
              </label>
              <div class="col-sm-8">
                <input :type="field.type" class="form-control" :id="field.label + index" :placeholder="field.placeholder"
                  v-model="ticketForm[field.name]" />
              </div>
            </Form>
          </div>
        </div>
        <div class="col-6">
          <div class="form">
            <div v-for="(field, index) in rightHalfTicket" :key="field + index">
              <div v-if="!field.show"></div>
              <Form v-else-if="field.name === 'ticketCustomerName'" class="row align-items-center">
                <label :for="field.label + index" class="col-sm-2 col-form-label">
                  <i :class="field.icon"></i>
                  {{ field.label }}:
                </label>
                <div class="col-sm-8">
                  <TypeAhead :placeholder="field.placeholder" :items="customerItems" class="form-control simple-typeahead"
                    @selectItem="(e) => typeAheadHandler(e.id)" />
                </div>
              </Form>
              <Form v-else-if="field.type === 'textarea'" class="row align-items-center">
                <label :for="field.label + index" class="col-sm-2 col-form-label"><i :class="field.icon"></i> {{
                  field.label
                }}:
                </label>
                <div class="col-sm-8">
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                    v-model="ticketForm[field.name]"></textarea>
                </div>
              </Form>
              <Form v-else-if="field.type === 'dropdown'" class="row align-items-center">
                <label :for="field.label + index" class="col-sm-2 col-form-label"><i :class="field.icon"></i> {{
                  field.label
                }}:
                </label>
                <Dropdown2 :name=field.name :title="ticketForm[field.name]" :items="JSON.parse(field.options)" cols="8"
                  :handler="dropdownHandler" />
              </Form>
              <Form v-else class="row align-items-center">
                <label :for="field.label + index" class="col-sm-2">
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
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-10 offset-1 top">
      <div v-if="editing" class="row align-items-top section">
        <div class="cols-12 header">ASSET INFO</div>
        <div class="col-6">
          <div class="form">
            <div v-for="(field, index) in leftHalfAsset" :key="field + index">
              <div v-if="field.type === 'dropdown'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-2">
                  <i :class="field.icon"></i>
                  {{ field.label }}: 
                </label>
                <Dropdown2 :name="field.name" :title="assetForm[field.name]" :items="JSON.parse(field.options)" cols="8"
                  :handler="adropdownHandler" />
              </div>
              <div v-else>
                <div class="mb-3 row align-items-center">
                  <label :for="field.label + index" class="col-sm-2">
                    <i :class="field.icon"></i>
                    {{ field.label }}:
                  </label>

                  <div class="col-sm-8">
                    <input :type="field.type" class="form-control" :id="field.label + index"
                      :placeholder="field.placeholder" v-model="assetForm[field.name]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="form-2">
            <div v-for="(field, index) in rightHalfAsset" :key="field + index">
              <div v-if="field.type === 'dropdown'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-2">
                  <i :class="field.icon"></i>
                  {{ field.label }}:
                </label>
                <Dropdown2 :name="field.name" :title="ticketForm[field.name]" :items="JSON.parse(field.options)" cols="8"
                  :handler="adropdownHandler" />
              </div>
              <div v-else-if="field.name === 'assetTag'">
                <div class="mb-3 row align-items-center">
                  <label :for="field.label + index" class="col-sm-2">
                    <i :class="field.icon"></i>
                    {{ field.label }}:
                  </label>
                  <div class="col-sm-8">
                    <input :type="field.type" class="form-control" :id="field.label + index"
                      :placeholder="field.placeholder" v-model="assetForm[field.name]" />
                  </div>
                </div>
              </div>
              <div v-else-if="field.name === 'assetSerial'">
                <div class="mb-3 row align-items-center">
                  <label :for="field.label + index" class="col-sm-2">
                    <i :class="field.icon"></i>
                    {{ field.label }}:
                  </label>
                  <div class="col-sm-8">
                    <input :type="field.type" class="form-control" :id="field.label + index"
                      :placeholder="field.placeholder" v-model="assetForm[field.name]" @input="warrantyHandler()" />
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-3 row align-items-center" style="margin-top: 30px">
              <label for="warranty-label" class="col-sm-2">
                <i class="bi bi-life-preserver"></i>
                Warranty Status:
              </label>
              <div class="col-sm-4">
                {{ warrantyCalc }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row align-items-top section">
        <div class="cols-12 header">ASSET INFO</div>
        <div class="col-6">
          <div class="form">
            <div v-for="(field, index) in leftHalfAsset" :key="field + index">
              <div v-if="field.type === 'dropdown'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-2">
                  <i :class="field.icon"></i>
                  {{ field.label }}:
                </label>
                <div class="col-sm-8">
                  {{ assetForm[field.name] }}
                </div>
              </div>
              <div v-else>
                <div class="mb-3 row align-items-center">
                  <label :for="field.label + index" class="col-sm-2">
                    <i :class="field.icon"></i>
                    {{ field.label }}:
                  </label>

                  <div class="col-sm-8">
                    {{ assetForm[field.name] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="form-2">
            <div v-for="(field, index) in rightHalfAsset" :key="field + index">
              <div v-if="field.type === 'dropdown'" class="mb-3 row align-items-center">
                <label :for="field.label + index" class="col-sm-2">
                  <i :class="field.icon"></i>
                  {{ field.label }}:
                </label>
                <div class="col-sm-8">
                  {{ assetForm[field.name] }}
                </div>
              </div>
              <div v-else-if="field.name === 'assetTag'">
                <div class="mb-3 row align-items-center">
                  <label :for="field.label + index" class="col-sm-2">
                    <i :class="field.icon"></i>
                    {{ field.label }}:
                  </label>
                  <div class="col-sm-8">
                    <div class="col-sm-8">
                      {{ assetForm[field.name] }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="field.name === 'assetSerial'">
                <div class="mb-3 row align-items-center">
                  <label :for="field.label + index" class="col-sm-2">
                    <i :class="field.icon"></i>
                    {{ field.label }}:
                  </label>
                  <div class="col-sm-8">
                    <div class="col-sm-8">
                      {{ assetForm[field.name] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-3 row align-items-center">
              <label for="warranty-label" class="col-sm-2">
                <i class="bi bi-life-preserver"></i>
                Warranty Status:
              </label>
              <div class="col-sm-4">
                {{ warrantyCalc }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-10 offset-1 bottom">
      <div class="top-spacing">
        <div></div>
        <div>
          <button v-if="editing" type="button" class="btn btn-primary" v-on:click="createAsset()">
            Create Asset
          </button>
          <button v-if="!editing" type="button" class="btn btn-primary" v-on:click="createAsset()">
            Edit Asset
          </button>
          <button type="button" class="btn btn-primary" v-on:click="createTicket(ticketForm)">
            Create Ticket
          </button>
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

export default {
  name: 'NewCustomerPage',
  components: { Dropdown2, TypeAhead, Form, /*Field, ErrorMessage*/ },
  data: () => ({
    customerItems: [],
    techItems: null,
    ticketFields: null,
    assetFields: null,
    ticketForm: {
      ticketStatus: 'New',
      ticketTech: ''
    },
    assetForm: {
      assetType: '',
      assetName: ''
    },
    finalForm: {},
    warranty: '',
    editing: true,
    format: (d) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
    storeX
  }),
  methods: {
    print(a) {
      console.log(a);
    },
    async warrantyHandler() {
      this.warranty = '';
      const serial = this.assetForm['assetSerial'];

      if (serial.length < 8) return;
      const warranty = await storeX.bLoadWarrantyData(serial);
      if (!warranty) return this.warranty = 'This is not a valid serial.';
      this.warranty = warranty[0];
    },
    async getTicketFieldItems() {
      const req = await storeX.TicketService.getTicketFields();
      this.ticketFields = await req.data;
      //get list of options
      const ticketTypes = this.ticketFields.filter(field => field.name === 'ticketType')[0].options
      //choose first option as default
      this.ticketForm['ticketType'] = JSON.parse(ticketTypes)[0];
      this.ticketForm['ticketTech'] = this.techItems[0].fullName;
    },
    async loadAssetFields() {
      const req = await storeX.AssetService.getAssetFields();
      const fields = req.data;

      const filtered = fields.filter(field =>
        field.name !== 'assetCustomerName' &&
        field.name !== 'assetCustomerId' &&
        field.name !== 'assetTicketId'
      )

      this.assetFields = filtered;
      //get list of options
      const assetTypes = this.assetFields.filter(field => field.name === 'assetType')[0].options;
      const assetBrands = this.assetFields.filter(field => field.name === 'assetBrand')[0].options;
      //choose first option as default
      this.assetForm.assetType = JSON.parse(assetTypes)[0];
      this.assetForm.assetBrand = JSON.parse(assetBrands)[0];
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
      this.ticketForm['ticketTech'] = this.techItems[0].fullName;
      this.ticketForm['ticketTechId'] = this.techItems[0].id;
      console.log(this.ticketForm.ticketTechId)
      this.getTicketFieldItems();
    },
    async createTicket() {
      this.finalForm['ticket'] = this.ticketForm;
      const ticket = await storeX.TicketService.createTicket(this.finalForm);
      if (ticket.status !== 200) return;
      const ticketId = ticket.data.id;
      const customerId = ticket.data.ticketCustomerId;
      storeX.updateNavigation({
        view: 'Ticket',
        ticketId: ticketId,
        customerId: customerId
      });
    },
    async createAsset() {
      this.finalForm['asset'] = this.assetForm;
      this.editing = !this.editing;
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
    adropdownHandler(item, name) {
      this.assetForm[name] = item;
    },
    tDropdownHandler(item, name) {
      const tech = this.techItems.filter(techItem => techItem.fullName === item);
      const techId = tech[0].id;
      this.ticketForm[name] = item;
      this.ticketForm['ticketTechId'] = techId;
    },
    typeAheadHandler(id) {
      this.ticketForm['ticketCustomerId'] = parseInt(id);
      document.getElementsByClassName('simple-typeahead')[3].value = storeX.customer.name;
    }
  },
  created() {
    this.loadCustomerData();
    this.loadAssetFields();
    this.loadTechnicianData();

    if (storeX.navigation.customerId) {
      storeX.loadCustomerById(storeX.navigation.customerId, this.typeAheadHandler);
    }

    if (storeX.navigation.assetId) {
      //loads asset data on store
      storeX.loadAssetById(storeX.navigation.assetId);
      //TODO: send and run handler to prefill data on new ticket page.
      //use example above
    }
  },
  computed: {
    leftHalfTicket() {
      if (!this.ticketFields) return;
      const arr = this.ticketFields;
      const x = arr.filter(el => el.show)
      const half_length = Math.ceil(x.length / 2);
      return x.slice(0, half_length + 1);
    },

    rightHalfTicket() {
      if (!this.ticketFields) return;
      const arr = this.ticketFields;
      const x = arr.filter(el => el.show)
      const half_length = Math.ceil(x.length / 2);
      return x.slice(half_length + 1, x.length);
    },

    leftHalfAsset() {
      if (!this.assetFields) return;
      const arr = this.assetFields;
      const half_length = Math.ceil(arr.length / 2);
      return arr.slice(0, half_length);
    },

    rightHalfAsset() {
      if (!this.assetFields) return;
      const arr = this.assetFields;
      const half_length = Math.ceil(arr.length / 2);
      return arr.slice(half_length, arr.length);
    },

    warrantyCalc() {
      if (!this.warranty) {
        return 'Enter a serial number above.'
      } else {
        return this.warranty;
      }
    }
  },
  mounted() { },
  watch: {
    ticketForm: {
      handler(newData) {
        console.log(newData);
      },
      deep: true
    },
    assetForm: {
      handler(newData) {
        console.log(newData);
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
  font-size: 24px;
}

.bottom {
  padding: 20px;
  padding-top: 20px;
  padding-bottom: 0;
  padding-left: 10px;
  font-size: 24px;
}

.btn {
  margin-right: 10px !important;
  font-size: 14px;
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

.form-2 {
  font-size: 14px;
  margin: 0px;
  margin-left: 15px;
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