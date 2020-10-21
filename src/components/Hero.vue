<template>
  <div class="hero">

    <!-- desktop -->
    <div class="d-none d-md-block">
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2>Barang Elektronik <strong><br>Berkualitas</strong></h2>
              <p>Temukan gadget impianmu.</p>
              <router-link to="/elektronik" class="btn btn-lg btn-success">Pesan <b-icon-arrow-right></b-icon-arrow-right></router-link >
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img src="../assets/images/Hero.png" width="100%"/>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="d-sm-block d-md-none">
      <div class="row mt-4">
        <div class="col-md-6 mb-3">
          <img src="../assets/images/Hero.png" width="100%"/>
        </div>

        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2>Barang Elektronik <strong><br>Berkualitas</strong></h2>
              <p>Temukan gadget impianmu.</p>
              <router-link to="/elektronik" class="btn btn-lg btn-success">Pesan <b-icon-arrow-right></b-icon-arrow-right></router-link >
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero'
}
</script>

<style>

</style>