<template>
  <div class="row">
    <div class="col-11 offset-1">
      <div clas="row">
        <div class="col-12 top">{{ customerName }}</div>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="section">
            <div class="title">Customer Information</div>
            <div class="content">
              <ul>
                <li>Email: {{ customerEmail }}</li>
                <li>Created: {{ customerCreated }}</li>
              </ul>
            </div>
          </div>
          <div class="section">
            <div class="title">Overview</div>
            <div class="content">PLACEHOLDER</div>
          </div>
        </div>
        <div class="col-8">
          <div class="section">
            <div class="title">Tickets</div>
            <div class="content">PLACEHOLDER</div>
          </div>

          <div class="section">
            <div class="title">Assets</div>
            <div class="content">PLACEHOLDER</div>
          </div>

          <div class="section">
            <div class="title">Invoices</div>
            <div class="content">PLACEHOLDER</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { storeX } from "../../store/index";
import CustomerService from "../../services/customer.service"
import moment from 'moment'

export default {
  name: 'CustomerDetailsPage',
  components: {},
  data: () => ({
    customerData: null,
    customerName: null,
    customerEmail: null,
    customerNumber: null,
    customerAddress: null,
    customerCreated: null,
    storeX
  }),
  methods: {
    async loadCustomerData(id) {
      const request = await CustomerService.getCustomerById(id)
      const data = await request.data[0];

      this.customerData = await data;
      this.customerName = `${data.firstName} ${data.lastName}`;
      this.customerEmail = data.email;
      this.customerType = data.customerType;
      this.customerCreated = moment(data.createdAt).format('MM-DD-YYYY');

      console.log(this.customerData)
    },
  },
  created() {
    this.loadCustomerData(this.storeX.id)
  },
}
</script>
  
<style>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.top {
  padding: 25px;
  padding-bottom: 0;
}

.section {
  margin-top: 25px;
  background: #1f1f1f;
  padding: 25px;
}

.content {
  padding-top: 20px;
}
</style>