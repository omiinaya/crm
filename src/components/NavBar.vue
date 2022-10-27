<template>
  <!-- Navbar 
  <nav class="navbar">
    <div class="container-fluid">
      <form class="d-flex" role="search">
        <a class="navbar-brand" href="#">Mobile Me IT Inc.</a>
        <input class="form-control me-2" type="search" placeholder="Search all the things" aria-label="Search">
      </form>
    </div>
  </nav>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container container-fluid">
      <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars text-light"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
          <li class="nav-item text-center mx-2 mx-lg-1" v-for="(link, index) in links" :key="link + index">
            <a class="nav-link active" aria-current="page" href="#!">
              <div>
                <i :class=link.icon></i>
              </div>
              {{ link.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  -->
  <div class="row">
    <div class="col-1 offset-1">
        <a class="navbar-brand" href="#">Mobile Me IT Inc.</a>
    </div>
    <div class="col-8">
      <input class="form-control me-2" type="search" placeholder="Search all the things" aria-label="Search" />
    </div>
  </div>
  <div class="row">
    <div class="col-1">

    </div>
    <div class="col-1-5 nav-item text-center" v-for="(link, index) in links" :key="link + index">
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

.topBar {
  text-align: center;
}
.container {
  margin-left: 50px;
}

.navbar {
  width: 100%;
}

.bi {
  font-size: 45px;
}

.navbar-brand {
  margin: auto;
  color: white;
}

.form-control {
  margin-left: 50px;
  width: 30% !important;
}

.col-1-5 {
  flex: 0 0 6.15%;
  max-width: 6.15%;
  position: relative;
  width: 100%;
}
</style>