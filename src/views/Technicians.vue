<template>
  <div class="row">
    <div class="col-10 offset-1 top">
      <div class="top-spacing">
        <div>{{ storeX.navigation.view }}</div>
        <div>
          <button type="button" class="btn btn-success" v-on:click="newTicket()">
            New Ticket
          </button>
        </div>
      </div>
      <div class="row mt-2">
        <div class="search">
          <input type="search" placeholder="Search for a technician" @input="searchHandler($event)" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 section">
          <EasyDataTable v-model:items-selected="itemsSelected" :headers="headers" :items="filteredTechnicians"
            theme-color="#1d90ff" table-class-name="customize-table" header-text-direction="left"
            body-text-direction="left">
            <template #item-fullName="{ fullName, id }">
              <button type="button" class="template-btn btn-lg" v-on:click="openTechnician(id)">
                {{ fullName }}
              </button>
            </template>
            <template #item-roleId="{ roleId }">
              <a>
                {{ roleTitle(roleId) }}
              </a>
            </template>
            <template #item-email="{ email }">
              <a :href="`mailto:${email}`" target="_blank">
                {{ email }}
              </a>
            </template>
          </EasyDataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { storeX } from "../store/index";

export default defineComponent({
  name: 'CustomerPage',
  data() {
    return {
      storeX,
      headers: [
        { value: "id", text: "ID", sortable: true },
        { value: "fullName", text: "NAME", sortable: true },
        { value: "roleId", text: "ROLE", sortable: true },
        { value: "email", text: "EMAIL", sortable: true },
        { value: "createdAt", text: "CREATED", sortable: true }
      ],
      itemsSelected: [],
      searchFilter: null
    };
  },
  methods: {
    async openTechnician(id) {
      console.log(id)
      this.storeX.updateNavigation({
        view: 'Technician',
        techId: id
      })
    },
    async searchHandler(input) {
      const value = input.target.value;
      this.searchFilter = value;
    },
    async testing123(a) {
      console.log(a)
    },
    roleTitle(roleId) {
      if (roleId === 2) return 'Technician';
      if (roleId === 3) return 'Moderator';
      if (roleId === 4) return 'Administrator';
      if (roleId === 5) return 'Super Admin';
      else return 'User'
    }
  },
  computed: {
    filteredTechnicians() {
      if (!this.searchFilter) return storeX.technicians;

      const filtered = storeX.technicians.filter(technician => {
        const input = this.searchFilter.toLowerCase();

        const name = technician.fullName;
        const email = technician.email || '';
        //add by role, needs sql relationships first

        const ifName = name.toLowerCase().includes(input);
        const ifEmail = email.toLowerCase().includes(input);
 

        const byCondition = ifName || ifEmail

        return byCondition;
      })
      return filtered;
    },
  },
  async created() {
    storeX.loadTechnicianData();
  }
});

</script>

<style scoped>

.top-spacing {
  display: flex;
  justify-content: space-between;
}
.search {
  font-size: 16px;
  padding: 0;
}

input {
  width: 100%;
}

input:focus {
  outline: none;
}

input[type=search]::-webkit-search-cancel-button {
  -webkit-appearance: searchfield-cancel-button;
}

.top {
  font-size: 24px;
}

.section {
  margin-top: 25px;
  background: #1f1f1f;
  padding: 25px;
}

.template-btn {
  font-size: 14px;
  color: #c1cad4;
  background: transparent;
  padding: 0;
}

.btn {
  width: 100%;
  font-size: 14px;
}

.btn:focus {
  box-shadow: none;
  border-color: transparent;
}

.btn:hover {
  text-decoration: underline;
}

.customize-table {
  --easy-table-border: 1px solid #1f1f1f;
  --easy-table-row-border: 1px solid #1f1f1f;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #1f1f1f;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #1f1f1f;

  --easy-table-body-row-font-color: #c0c7d2;
  --easy-table-body-row-background-color: #1f1f1f;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #c0c7d2;
  --easy-table-body-row-hover-background-color: #1f1f1f;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #1f1f1f;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;

  --easy-table-scrollbar-track-color: #1f1f1f;
  --easy-table-scrollbar-color: #1f1f1f;
  --easy-table-scrollbar-thumb-color: #1f1f1f;
  --easy-table-scrollbar-corner-color: #1f1f1f;

  --easy-table-loading-mask-background-color: #1f1f1f;
}
</style>