<template>
  <v-dialog v-model="storeX.dialogs[dialog]">
    <v-card class="vmodal">
      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>
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
  props: {
    dialog: {
      type: String,
      required: true
    }
  },
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

  width: 1080px;
  height: 635px;
  transform: translate(-50%, -50%)
}
</style>