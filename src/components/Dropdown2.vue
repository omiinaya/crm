<template>
  <div :class="'col-sm-' + cols"> <select :id="'sel-' + this.name" @change="handler($event.target.value, this.name,
  this.byProp)" v-model="selectedTitle">
      <option v-for="(item, index) in items" :key="item + index" :selected="selectedTitle">
        <a v-if="byProp && byTicket">
          {{ item[byProp] }}
        </a>
        <a v-else-if="byProp">
          {{ item[byProp] }}
        </a>
        <a v-else-if="byTicket"> {{
          item
        }}
        </a>
        <a v-else>
          {{ item }}
        </a>
      </option>
    </select>
  </div>
</template>

<script>import { storeX } from "../store/index";
// use a data property to store the selected
export default {
  name: 'MyComponent',
  data: () => ({
    storeX,
    selectedTitle: '',
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
    name: { type: String, required: false }, title: { type: String, required: false, }, byProp: { type: String, }, byTicket: { type: Boolean, default: false, }
  },

  created() {
    // initialize the data property with the prop value 
    console.log(this.title)
    this.selectedTitle = this.title
  },
  // watch for changes in the data property
  watch: {
    // emit a custom event to update the prop in the parent component
    selectedTitle(newValue) {
      this.$emit('update: title', newValue)
    }
  }  

}

</script>

<style scoped>
select {
  background: #6C757D;
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  font-size: 14px;
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