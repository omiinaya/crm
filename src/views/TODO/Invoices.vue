<template>
  <div>Invoices</div>
</template>

<script>
import { storeX } from "../../store/index";
export default {
  name: 'InvoicesPage',
  components: {},
  data: () => ({
    storeX
  }),
  created() {
    console.log(storeX.navigation.view)
  },
  methods: {}
}
</script>

<style>

</style>