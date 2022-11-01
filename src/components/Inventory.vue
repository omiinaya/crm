<template>
  <div>Inventory</div>
</template>

<script>
import { storeX } from "../store/index";
export default {
  name: 'InventoryPage',
  components: {},
  data: () => ({
    storeX
  }),
  created() {
    console.log(storeX.view)
  },
  methods: {}
}
</script>

<style>

</style>