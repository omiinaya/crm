<template>
  <EasyDataTable :v-show="testing" :headers="headers" :items="items" />
  <div>
    {{ items }}
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { storeX } from "../store/index";
import CustomerService from "../services/customer.service"

export default defineComponent({
  name: 'CustomerPage',
  data() {
    return {
      storeX,
      testing: null,
      headers: [
        { value: "id", text: "ID" },
        { value: "firstName", text: "FIRST NAME" },
        { value: "lastName", text: "LAST NAME" },
        { value: "email", text: "EMAIL" },
        { value: "customerType", text: "TYPE" },
        { value: "businessId", text: "BUSINESS ID" },
        { value: "createdAt", text: "CREATED" }
      ],
      items: []
    };
  },
  methods: {
    async loadCustomerData() {
      const request = await CustomerService.getCustomerData()
      const data = await request.data
      this.items = await data
    }
  },
  async created() {
    this.loadCustomerData()
  }
});

</script>