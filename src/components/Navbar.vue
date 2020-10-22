<template>

<div>
  <b-navbar toggleable="lg" type="light">
    <div class="container">
      <b-navbar-brand href="#">LapakKu</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <router-link class="nav-link" to="/">Home</router-link>
        </b-nav-item>

        <b-nav-item>
          <router-link class="nav-link" to="/elektronik">Elektronik</router-link>
        </b-nav-item>

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <router-link class="nav-link" to="/keranjang">
            Keranjang
            <b-icon-bag></b-icon-bag>
            <span class="badge badge-success ml-2">{{updateKeranjang ? updateKeranjang.length : jumlah_pesanan.length}}</span>
          </router-link>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
    </div>
    
  </b-navbar>
</div>

</template>

<script>
import axios from 'axios'
export default {
  name: "Navbar",
  props:['updateKeranjang'],
  data(){
    return{
      jumlah_pesanan:[]
    }
  },
  methods:{
    setJumlah(data){
      this.jumlah_pesanan = data
    }
  },
  mounted(){
    axios
    .get("http://localhost:3004/keranjang")
    .then((response) => {
      this.setJumlah(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style>

</style>