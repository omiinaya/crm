<!--
<select @change="testing123($event)">
  <option value="Option 1">Option 1</option>
  <option value="Option 2">Option 2</option>
  <option value="Option 3">Option 3</option>
</select>
-->

<template>
  <div :class="'col-sm-' + cols">
    <select @change="handler($event.target.value, this.name, this.byProp)">
     
        <option v-for="(item, index) in items" :key="item + index">
          <a v-if="byProp && byTicket">
            {{ item[byProp] }}
          </a>

          <a v-else-if="byProp">
            {{ item[byProp] }}
          </a>

          <a v-else-if="byTicket">
          {{ item }}
          </a>

          <a v-else>
            {{ item }}
          </a>
          
        </option>
        
     
    </select>
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
    }
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

select {
  background: #6C757D;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

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

</style>