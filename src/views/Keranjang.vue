<template> 
<div class="keranjang">
  <Navbar :updateKeranjang="keranjangs" /> 
   <div class="container">
     <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Keranjang</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>Keranjang</h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Nama</th>
                  <th scope="col">keterangan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(keranjang,index) in keranjangs" :key="keranjang.id">
                  <th>{{index+1}}</th>
                  <td><img :src="'../assets/images/'+keranjang.product.gambar" class="img-fluid" width="100"></td>
                  <td>{{keranjang.product.nama}}</td>
                  <td>{{keranjang.keterangan ? keranjang.keterangan : "-"}}</td>
                  <td>{{keranjang.jumlah_pesanan}}</td>
                  <td align="left">Rp. {{keranjang.product.harga}}</td>
                  <td align="left">Rp. <strong>{{keranjang.jumlah_pesanan * keranjang.product.harga}}</strong></td>
                  <td align="center" class="text-danger">
                    <b-icon-trash @click="hapusKeranjang(keranjang.id)"></b-icon-trash>
                  </td>
                </tr>

                <tr>
                  <td colspan="6" align="right">
                    <strong>Total Harga : </strong>
                  </td>
                  <td align="left">
                    <strong>Rp. {{totalHarga}}</strong>
                  </td>
                  <!-- <td></td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="nama">Nama</label>
              <input type="text" class="form-control" v-model="pesan.nama">
            </div>

            <div class="form-group">
              <label for="noMeja">Nomor Meja</label>
              <input type="number" class="form-control" v-model="pesan.noMeja">
            </div>

            <button type="submit" class="btn btn-success float-right" @click="checkout"><b-icon-cart></b-icon-cart> Pesan</button >
          </form>
        </div>
      </div>
   </div>
</div>
</template>
 
<script>
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
export default {
  name:"Keranjang",
  components: {
    Navbar
  }, 
  data(){
    return{
      keranjangs:[],
      pesan:{}
    }
  },
  methods:{
    setKeranjangs(data){
      this.keranjangs = data;
    },
    hapusKeranjang(id){
      axios
      .delete("http://localhost:3004/keranjang/"+id)
      .then(() => {
        this.$toast.success('Berhasil Hapus Item', {
          type:'success',
          position:'top-right',
          duration:3000,
          dismissible: true
        })
        axios
        .get("http://localhost:3004/keranjang")
        .then((response) => {
          console.log("berhasil",response.data)
          this.setKeranjangs(response.data)
        })
      })
      .catch((error)=>{
        console.log(error)
        this.$toast.error('Gagal Hapus Item', {
          type:'error',
          position:'top-right',
          duration:3000,
          dismissible: true
        })
      })
    }, 
    checkout(){
      if(this.pesan.nama && this.pesan.noMeja){
        // console.log("keranjangs",this.keranjangs)
 
      this.pesan.keranjangs = this.keranjangs;
      console.log("pesan",this.pesan.keranjangs)

      axios
      .post("http://localhost:3004/pesanan", this.pesan)
      .then(() => {

        this.keranjangs.map(function(item){
          return (
            axios
            .delete("http://localhost:3004/keranjang/" + item.id)
            .catch((error) => console.log(error))
          )
        });

        this.$router.push({path:"/pesanan"})
        this.$toast.success('Berhasil Melakukan Pesanan', {
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
        this.$toast.error('Masukkan Nama & Nomor Meja', {
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
    .get("http://localhost:3004/keranjang")
    .then((response) => {
      console.log("berhasil",response.data)
      this.setKeranjangs(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, 
  computed:{
    totalHarga(){
      return this.keranjangs.reduce(function(items, data){
        return items+(data.jumlah_pesanan * data.product.harga)
      },0)
    }
  }
}
</script>

<style>

</style>