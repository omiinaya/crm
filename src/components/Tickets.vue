<template>
  <div>Tickets</div>
</template>

<script>
import { storeX } from "../store/index";
export default {
  name: 'TicketsPage',
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