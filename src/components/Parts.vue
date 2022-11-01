<template>
  <div>Parts</div>
</template>

<script>
import { storeX } from "../store/index";
export default {
  name: 'PartsPage',
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