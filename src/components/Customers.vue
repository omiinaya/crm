<template>
  <v-grid theme="darkCompact" :source="rows" :columns="columns" />
</template>

<script>
import VGrid from "@revolist/vue3-datagrid";
export default {
  name: "App",
  data() {
    return {
      columns: [
        {
          name: "Birth",
          prop: "birthdate",
          columnType: "date",
          sortable: true,
          order: "asc",
        },
        {
          prop: "name",
          name: "First",
          sortable: true,
          order: "asc",
        },
        {
          prop: "details",
          name: "Second",
          sortable: true,
        },
      ],
      rows: [
        {
          birthdate: "2022-08-24",
          name: "1",
          details: "Item 1",
        },
        {
          birthdate: "2022-08-24",
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
  height: 700px;
  width: 500px;
}
revo-grid {
  height: 100%;
}
</style>
