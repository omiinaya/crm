<template>
  <!-- Navbar -->
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

      <!-- Toggle button -->
      <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars text-light"></i>
      </button>

      <!-- Collapsible wrapper -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Left links -->
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
      <!-- Collapsible wrapper -->
    </div>
    <!-- Container wrapper -->
  </nav>
  <!-- Navbar -->
</template>

<script>
export default {
  name: 'NavBar',
  components: {},
  data: () => ({
    links: [
      {
        title: 'Customers',
        icon: 'bi bi-person',
        url: '#!'
      },
      {
        title: 'Assets',
        icon: 'bi bi-laptop',
        url: '#!'
      },
      {
        title: 'Invoices',
        icon: 'bi bi-cart',
        url: '#!'
      },
      {
        title: 'Estimates',
        icon: 'bi bi-file-earmark-text',
        url: '#!'
      },
      {
        title: 'Tickets',
        icon: 'bi bi-tag',
        url: '#!'
      },
      {
        title: 'Parts',
        icon: 'bi bi-motherboard',
        url: '#!'
      },
      {
        title: 'Inventory',
        icon: 'bi bi-upc-scan',
        url: '#!'
      },
      {
        title: 'POS',
        icon: 'bi bi-cash',
        url: '#!'
      },
      {
        title: 'Admin',
        icon: 'bi bi-gear',
        url: '#!'
      }
    ]
  }),
  created() { },
  methods: {
    async getNavItems() {
      //const url = `${this.server}/api/autocomplete?value=${input}`;
      //const req = await fetch(url);
      //const json = await req.json();
      //this.autoCompleteData = json;
    },

  }
}
</script>

<style>
.container {
  margin-left: 50px;
}

.navbar {
  width: 100%;
}

.nav-item {
  width: 100px;
}

.bi {
  font-size: 45px;
}

.navbar-brand {
  margin-left: 100px;
  color: white !important;
}

.form-control {
  margin-left: 50px;
}
</style>