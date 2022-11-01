<template>
  <div>test</div>
</template>

<script>
import { storeX } from "../store/index";
export default {
  name: 'CustomerPage',
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