<template>
  <div>test</div>
</template>

<script>
import { storeX } from "../store/index";

export default {
  name: 'MyComponent',
  data: () => ({
    storeX,
  }),
  props: {
    cols: {
        type: String,
        required: true,
    },
  },
  
  created() {
    /*
    console.log(this.name)
    console.log(this.items)
    console.log(this.title)
    console.log(this.handler)
    console.log(this.byProp)
    */
  },
  
};
</script>

<style scoped>

.dropdown-item {
  position: relative;
  z-index: 9999 !important;
}

</style>