<template>
  <div id="app">
    <v-grid theme="darkCompact" :source="rows" :columns="columns" resize></v-grid>
  </div>
</template>

<script>
import VGrid from "@revolist/vue3-datagrid";
export default {
  name: "App",
  data() {
    return {
      columns: [
        {
          prop: "name",
          name: "First",
          sortable: "true"
        },
        {
          prop: "details",
          name: "Second",
        },
      ],
      rows: [
        {
          name: "1",
          details: "Item 1",
        },
        {
          name: "2",
          details: "Item 2",
        },
      ],
    };
  },
  components: {
    VGrid,
  },
};
</script>

<style>
#app {
  height: 400px;
  width: 500px;
}
revo-grid {
  height: 50%;
}
</style>
