<template>
    <div>Customer Details</div>
  </template>
  
  <script>
  import { storeX } from "../../store/index";
  export default {
    name: 'CustomerDetailsPage',
    components: {},
    data: () => ({
      storeX
    }),
    created() {
      console.log(storeX.view)
    },
    methods: {}
  }
  </script>
  
  <style>
  
  </style>