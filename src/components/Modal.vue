<template>
  <v-dialog v-model="this.$parent.dialog">
    <v-card class="vmodal">
      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>
      <v-card-actions>
        <v-btn block @click="this.$parent.dialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { storeX } from "../store/index";

export default {
  name: 'MyComponent',
  data: () => ({
    storeX,
  }),
  created() { },
};
</script>

<style scoped>
.com-btn {
  padding: 0 !important;
  margin: 0 !important;
  background: transparent;
  font-size: 16px;
}

.vmodal {
  background-color: black;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  
  width: 900px;
  height: 600px;
  transform: translate(-50%, -50%)
}
</style>