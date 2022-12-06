<template>
  <div class="row">
    <div class="col-12 offset-1">
      <div class="row">
        <div class="col-5">
          <div>
            <div class="title">Customer Information</div>
            <ul>
              <li>Name: {{ customerName }}</li>
              <li>Email: {{ customerEmail }}</li>
              <li>Created: {{ customerCreated }}</li>
            </ul>
          </div>
          <div>Overview</div>
        </div>
        <div class="col-6">Tickets</div>
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

</style>