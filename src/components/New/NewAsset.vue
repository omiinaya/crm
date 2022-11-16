<template>
  <div class="row">
    <div class="col-6 offset-1 title">New Asset</div>
    <div class="col-5 title">
      <button
        type="button"
        class="btn btn-primary"
        v-on:click="createAsset(assetForm)"
      >
        New Asset
      </button>
      <button
        type="button"
        class="btn btn-success"
        v-on:click="print(assetForm)"
      >
        TEST BUTTON 3
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-6 offset-1 form">
      <div class="col-11">Create A New Asset</div>
      <div v-for="(field, index) in assetFields" :key="field + index">
        <label :for="field.label + index" class="col-sm-4 col-form-label"
          ><i :class="field.icon"></i> {{ field.label }}:
        </label>
        <div class="col-sm-8">
          <input
            :type="field.type"
            class="form-control"
            :id="field.label + index"
            :placeholder="field.placeholder"
            v-model="assetForm[field.name]"
            @input="print(assetForm)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssetService from "../../services/asset.service";
import { storeX } from "../../store/index";

export default {
  name: 'NewAssetPage',
  components: {},
  data: () => ({
    assetFields: null,
    assetForm: {},
    storeX
  }),
  methods: {
    print(a) {
      console.log(a)
    },
    async loadAssetFields() {
      const req = await AssetService.getAssetFields();
      const data = await req.data
      this.assetFields = await data
    },
    async createAsset() {
      AssetService.createAsset(this.assetForm);
    },
    testing() {
      //console.log(this.assetForm)
    }
  },
  created() {
    this.loadAssetFields()
    //this.testing()
  }
}
</script>

<style scoped>
.title {
  margin-top: 2%;
}

.form {
  margin-top: 2%;
}

.btn {
  margin-right: 10px !important;
}
</style>