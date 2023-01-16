<template>
  <div class="row test align-items-center">
    <div class="col-1-5 offset-1" id="topBar">
      <button type="button" class="btn" v-on:click="storeX.navigation.view = null">
        Mobile Me IT Inc.
      </button>
    </div>
    <div class="col-1-5 search">
      <TypeAhead2 placeholder="Search all the things" :items="items" class="form-control simple-typeahead"
        :itemProjection="myProjectionFunction" @selectItem="selectHandler($event)" @input="searchHandler($event)" />
    </div>
    <div class="col-2 offset-5 topBar">
      <li class="nav-item rightBar">
        <router-link to="#" class="nav-link" @click="logOut()">
          <i class="bi bi-box-arrow-in-right"></i>
        </router-link>
      </li>
      <li class="nav-item rightBar">
        <i class="bi bi-person-circle"></i>
        {{ this.$store.state.auth.user.name }}
      </li>
    </div>
  </div>
  <div class="row">
    <div class="col-12 offset-1 navBar">
      <div class="row">
        <div class="col-0-5 text-center" v-for="(link, index) in links" :key="link + index">
          <button type="button" class="btn btn-lg" v-on:click="storeX.updateNavigation({ view: link.url })">
            <div>
              <i :class="link.icon"></i>
            </div>
            {{ link.title }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavService from "../services/nav.service";
import TypeAhead2 from "../components/TypeAhead2.vue";
import { storeX } from "../store/index";
export default {
  name: 'NavBar',
  components: { TypeAhead2 },
  data: () => ({
    links: null,
    searchFilter: null,
    items: [],
    selected: null,
    storeX
  }),
  created() {
    this.getNavItems()
  },
  methods: {
    async getNavItems() {
      const highest = Math.max(...this.$store.state.auth.user.roles);
      const req = await NavService.getRoleNav(highest);
      this.links = await req.data;
    },
    async searchHandler(input) {
      const value = input.target.value;

      try {
        await Promise.all([storeX.loadCustomerData(), storeX.loadAssetData(), storeX.loadTicketData()])
        this.searchFilter = value;

        this.items = [...storeX.tickets, ...storeX.customers, ...storeX.assets]
      } catch (err) {
        console.log(err)
      }
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    myProjectionFunction(item) {

      if ("ticketId" in item) {
        return `Ticket: #${item.ticketId} - ${item.customerName} - ${item.ticketDesc}`;

      }
      else if ("assetId" in item) {
        return `Asset: ${item.assetSerial}`;

      }
      else if ("customerId" in item) {
        return `Customer: ${item.firstName} ${item.lastName} - ${item.email} - ${item.phone}`;
      }
    },
    selectHandler(e) {
      if (e.customerId) {
        this.selected = e.customerId;
        console.log(this.selected);
      }

      if (e.assetId) {
        this.selected = e.assetId;
        console.log(this.selected);
      }

      if (e.ticketId) {
        this.selected = e.ticketId;
        console.log(this.selected);
      }
    }
  },
  watch: {
    assetForm: {
      handler(newData) {
        console.log(newData)
        console.log(this.customerItems)
      },
      deep: true
    }
  },
}
</script>

<style scoped>
.navBar {
  padding: 10px;
}

.btn {
  width: 100%;
  font-size: 16px;
  color: white;
  padding: 0;
}

.btn:focus {
  box-shadow: none;
  border-color: transparent;
}

.rightBar .bi {
  font-size: 20px !important;
  padding-right: 10px;
}

.rightBar {
  font-size: 18px;
  float: right;
}

.test {
  background: #121212 !important;
}

.search {
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding: 1vh;
}

.bi {
  font-size: 30px;
}

.form-control {
  width: 30% !important;
}

.col-0-5 {
  flex: 0 0 5%;
  max-width: 5%;
  position: relative;
  width: 100%;
  padding: 0;
}

.col-1-0 {
  flex: 0 0 9.225%;
  max-width: 9.225%;
  position: relative;
  width: 100%;
}

.col-1-5 {
  flex: 0 0 12.3%;
  max-width: 12.3%;
  position: relative;
  width: 100%;
}

li {
  display: inline-block;
  margin-left: 10px;
}
</style>

<style>
.simple-typeahead-list-item-text {
  color: black;
}

.simple-typeahead-list-item-active {
  background-color: white !important;
}

.simple-typeahead-list {
  box-shadow: 4px 4px 0px #11294e, -4px 4px 0px #11294e;
  border-radius: 7px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>