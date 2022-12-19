<template>
  <div>Admin</div>
</template>

<script>
import { storeX } from "../../store/index";
export default {
  name: 'AdminPage',
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