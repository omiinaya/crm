<template>
  <div>
    <div>
      <div class="cols-10 offset-1 title">New Customer</div>
    </div>
    <div>
      <div class="section">
        <div class="row">
          <div class="col-6">
            <div class="form">
              <div
                class="mb-3 row"
                v-for="(field, index) in fieldsLeft"
                :key="field + index"
              >
                <label
                  :for="field.label + index"
                  class="col-sm-3 col-form-label"
                  ><i :class="field.icon"></i>
                  {{ field.label }}
                </label>
                <div class="col-sm-9">
                  <input
                    :type="field.type"
                    class="form-control"
                    :id="field.label + index"
                    :placeholder="field.placeholder"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="form">
              <div
                class="mb-3 row"
                v-for="(field, index) in fieldsRight"
                :key="field + index"
              >
                <label
                  :for="field.label + index"
                  class="col-sm-3 col-form-label"
                  ><i :class="field.icon"></i>
                  {{ field.label }}
                </label>
                <div class="col-sm-9">
                  <input
                    :type="field.type"
                    class="form-control"
                    :id="field.label + index"
                    :placeholder="field.placeholder"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerService from "../../services/customer.service";
import { storeX } from "../../store/index";

export default {
  name: 'NewCustomerPage',
  components: {},
  data: () => ({
    fields: null,
    storeX
  }),
  methods: {
    async getFieldItems() {
      const req = await CustomerService.getCustomerFields();
      this.fields = await req.data;
    },
  },
  created() { this.getFieldItems() },
  computed: {
    fieldsLeft: function() {
      if (!this.fields) return;
       return this.fields.filter(field => field.side === 0);
    },
    fieldsRight: function() {
      if (!this.fields) return;
       return this.fields.filter(field => field.side === 1);
    }
  }
}
</script>

<style scoped>
.form {
  margin: 30px;
}
.title {
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 30px;
}

.section {
  margin-left: 125px;
  margin-right: 125px;
  background: #1f1f1f;
}
</style>