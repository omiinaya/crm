<template>
  <div class="row">
    <div class="col-11 offset-1 title">New Asset</div>
  </div>
  <div class="row">
    <div class="col-6 offset-1 form">
      <div class="col-11">Create A New Asset</div>
      <div v-for="(field, index) in assetFields" :key="field + index">
        <label :for="field.label + index" class="col-sm-4 col-form-label"><i :class="field.icon"></i>
          {{ field.label }}:
        </label>
        <div class="col-sm-8">
          <input :type="field.type" class="form-control" :id="field.label + index" :placeholder="field.placeholder"
            v-model="assetForm[field.name]" @input="print(assetForm)" />
        </div>
      </div>
      <button @click="testing">test</button>
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
      console.log(data)
    },
    async testing() {
      console.log(this.assetFields)
      AssetService.createAsset(this.assetFields);
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
</style>