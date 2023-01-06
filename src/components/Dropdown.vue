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
          <a v-if="byProp && byTicket"
            class="dropdown-item"
            @click="handler(item, name, byProp)"
            >{{ item[this.byProp] }}
          </a>
          <a v-else-if="byProp"
            class="dropdown-item"
            @click="handler(item, name, byProp)"
            >{{ item[this.byProp] }}
          </a>
          <a v-else-if="byTicket"
            class="dropdown-item"
            @click="handler(item, this.name)"
            >{{ item }}
          </a>
          <a v-else
            class="dropdown-item"
            @click="handler(item, this.name)"
            >{{ item }}
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
        type: String,
        required: true,
    },
    items: {
        type: Object,
        required: true,
    },
    handler: {
        type: Function,
        required: true,
    },
    name: {
      type: String,
      required: false
    },
    title: {
        type: String,
        required: false,
    },
    byProp: {
        type: String,
    },
    byTicket: {
        type: Boolean,
        default: false,
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
.btn {
  width: 100%;
  font-size: 14px;
  color: white;
  padding-bottom: 5px;
}

.col-sm-2-5 {
  flex: 0 0 21.0625%;
  max-width: 21.0625%;
  position: relative;
  width: 100%;
}

.dropdown-menu {
  max-height: 200px;
  width: 100%;
  overflow-y: scroll;
  
}

.dropdown-item {
  position: relative;
  z-index: 9999 !important;
}
</style>