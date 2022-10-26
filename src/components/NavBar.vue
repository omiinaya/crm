<template>
    <!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container container-fluid">

    <!-- Toggle button -->
    <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
      aria-label="Toggle navigation">
      <i class="fas fa-bars text-light"></i>
    </button>

    <!-- Collapsible wrapper -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!-- Left links -->
      <ul class="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
        <li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link active" aria-current="page" href="#!">
            <div>
                <i class="bi bi-person"></i>
            </div>
            Customers
          </a>
        </li>
        <li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link active" aria-current="page" href="#!">
            <div>
                <i class="bi bi-laptop"></i>
            </div>
            Assets
          </a>
        </li>
        <li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link active" aria-current="page" href="#!">
            <div>
                <i class="bi bi-cart"></i>
            </div>
            Invoices
          </a>
        </li>
        <li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link active" aria-current="page" href="#!">
            <div>
                <i class="bi bi-file-earmark-text"></i>
            </div>
            Estimates
          </a>
        </li>
        <li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link active" aria-current="page" href="#!">
            <div>
                <i class="bi bi-tag"></i>
            </div>
            Tickets
          </a>
        </li>
        <li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link active" aria-current="page" href="#!">
            <div>
                <i class="bi bi-motherboard"></i>
            </div>
            Parts
          </a>
        </li>
        <li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link active" aria-current="page" href="#!">
            <div>
                <i class="bi bi-upc-scan"></i>
            </div>
            Inventory
          </a>
        </li>
        <li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link active" aria-current="page" href="#!">
            <div>
                <i class="bi bi-cash"></i>
            </div>
            POS
          </a>
        </li>
        <li class="nav-item text-center mx-2 mx-lg-1">
          <a class="nav-link active" aria-current="page" href="#!">
            <div>
                <i class="bi bi-gear"></i>
            </div>
            Admin
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

<style>
.container {
    margin-left: 50px;
}
.navbar {
    width: 100%;
}
.nav-item {
    width:100px;
}
.bi {
    font-size: 45px;
}
</style>