<template>
  <div :class="'col-sm-' + cols">
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        {{ title }}
      </button>
      <ul class="dropdown-menu">
        <li v-for="(item, index) in items" :key="item + index">
          <a v-if="!byProp"
            class="dropdown-item"
            href="#"
            @click="handler(storeX.navigation.ticketId, item)"
            >{{ item }}
          </a>
          <a v-else
            class="dropdown-item"
            href="#"
            @click="handler(storeX.navigation.ticketId, item[byProp])"
            >{{ item[byProp] }}
          </a>
        </li>
      </ul>
    </div>
  </div>
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
        type: Number,
        required: true,
    },
    items: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    handler: {
      type: Function,
      required: true,
    },
    byProp: {
        type: String,
        required: false
    }
  },
  created() {
    console.log(this.items)
    console.log(this.title)
    console.log(this.handler)
  },
};
</script>

<style scoped>
.btn {
  width: 100%;
  font-size: 14px;
  color: white;
  padding-bottom: 5px;
}
</style>