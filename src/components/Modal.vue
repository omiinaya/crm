<template>
  <div class="text-center">
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ props }">
        <button class="com-btn" v-bind="props">
          <slot></slot>
        </button>
      </template>

      <v-card>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </v-card-text>
        <v-card-actions>
          <v-btn block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { storeX } from "../store/index";

export default {
  name: 'MyComponent',
  data: () => ({
    storeX,
    dialog: false,
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
</style>