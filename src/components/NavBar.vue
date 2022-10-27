<template>
  <div class="row">
    <div class="col-1-0 offset-1 topBar">
      <div>Mobile Me IT Inc.</div>
    </div>
    <div class="col-8 search">
      <input class="form-control me-2" type="search" placeholder="Search all the things" aria-label="Search" />
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
      const url = `http://localhost:8090/api/navItems`;
      const req = await fetch(url);
      const json = await req.json();
      this.links = json;
    },

  }
}
</script>

<style>
.search {
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-top: 1vh;
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
}

.col-1-0 {
  flex: 0 0 12.30%;
  max-width: 6.15%;
  position: relative;
  width: 100%;
}
</style>