<template>
  <div>POS</div>
</template>

<script>
import { storeX } from "../store/index";
export default {
  name: 'PosPage',
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