<template>
  <div class="row test">
    <div class="col-1-5 offset-1 topBar">
      <div>Mobile Me IT Inc.</div>
    </div>
    <div class="col-7 search">
      <input class="form-control me-2" type="search" placeholder="Search all the things" aria-label="Search" />
    </div>
    <div class="col-2 topBar">
      <li class="nav-item rightBar">
        <!--user dropdown-->
        <router-link to="#!" class="nav-link">
          <font-awesome-icon icon="circle-user" />
          <!-- Testing User -->
        </router-link>
      </li>
      <li class="nav-item rightBar">
        <router-link to="#!" class="nav-link" @click="logOut()">
          <font-awesome-icon icon="sign-in-alt" />
        </router-link>
      </li>
    </div>
  </div>
  <div class="row">
    <div class="col-1">
    </div>
    <div class="col-0-5 nav-item text-center" v-for="(link, index) in links" :key="link + index">
      <a class="nav-link active" aria-current="page" href="#!">
        <div>
          <i :class=link.icon></i>
        </div>
        {{ link.title }}
      </a>
    </div>

  </div>
</template>

<script>
import NavService from "../services/nav.service";
export default {
  name: 'NavBar',
  components: {},
  data: () => ({
    links: null
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
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style>
.rightBar {
  font-size: 20px;
  padding-bottom: 10px;
}

.test {
  background: #121212 !important;
}

.search {
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding: 1vh;
}

.topBar {
  padding-top: 2vh;
}

.bi {
  font-size: 45px;
}

.form-control {
  width: 30% !important;
}

.col-0-5 {
  flex: 0 0 6.15%;
  max-width: 6.15%;
  position: relative;
  width: 100%;
  padding: 1vh;
}

.col-1-0 {
  flex: 0 0 9.225%;
  max-width: 9.225%;
  position: relative;
  width: 100%;
}

.col-1-5 {
  flex: 0 0 12.30%;
  max-width: 12.30%;
  position: relative;
  width: 100%;
}

li {
  display: inline-block;
  margin-left: 10px;
}
</style>