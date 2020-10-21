<template>
  <div class="food-detail">
    <Navbar/>
    <div class="container">

      <div class="row mt-5">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/elektronik">Elektronik</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
          </nav>
        </div>
      </div>
  
      <div class="row mt-3">
        <div class="col-md-6">
          <img :src="'../assets/images/'+product.gambar" class="img-fluid shadow">
        </div>
        <div class="col-md-6">
          <h2>Nama : {{product.nama}}</h2>
          <hr/>
          <h4>Harga : Rp. {{product.harga}}</h4>
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="jumlah_pesanan">Jumlah Pesanan</label>
              <input type="number" class="form-control" v-model="pesan.jumlah_pesanan">
            </div>
            <div class="form-group">
              <label for="keterangan">Keterangan</label>
              <textarea class="form-control" placeholder="Keterangan pesanan" v-model="pesan.keterangan"></textarea>
            </div>

            <button type="submit" class="btn btn-success" @click="pemesanan"><b-icon-cart></b-icon-cart> Pesan</button >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import axios from "axios"
import Navbar from '@/components/Navbar.vue'
export default {
  name:"Detail",
  data(){
    return{
      product:[],
      pesan:{}
    }
  },
  components: {
    Navbar
  },
  methods:{
    setProduct(data){
      this.product = data
    },
    pemesanan(){
      if(this.pesan.jumlah_pesanan){
        this.pesan.product = this.product;
      axios
      .post("http://localhost:3004/keranjang", this.pesan)
      .then(() => {
        this.$router.push({path:"/keranjang"})
        this.$toast.success('Berhasil menambah item', {
          type:'success',
          position:'top-right',
          duration:3000,
          dismissible: true
        })
      })
      .catch((error) => {
        console.log(error)
      })
      }else{
        this.$toast.error('Jumlah pesanan harus diisi', {
          type:'error',
          position:'top-right',
          duration:3000,
          dismissible: true
        })
      }
    }
  },
  mounted(){
    axios
    .get("http://localhost:3004/products/"+this.$route.params.id)
    .then((response) => {
      this.setProduct(response.data)
    })
    .catch((error) => {
      console.log("error : ",error)
    })
  }
}
</script>

<style>

</style>