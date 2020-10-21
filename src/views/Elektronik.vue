<template>
  <div>
    <Navbar/>
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h2>Daftar Elektronik</h2>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            <input 
              v-model="search"
              type="text" 
              class="form-control" 
              placeholder="Pencarian" 
              aria-label="Pencarian" 
              aria-describedby="basic-addon1"
              @keyup="searchItem"
              >
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                <b-icon-search></b-icon-search>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-3 mt-4" v-for="product in products" :key="product.id">
          <CardProduct :product="product"/>
        </div>
      </div>

    </div>
  </div>
</template>
 
<script>
import Navbar from '@/components/Navbar.vue'
import CardProduct from '@/components/CardProduct.vue'
import axios from "axios"

export default {
  name:"Elektronik",
  components:{
    Navbar,
    CardProduct
  },
  data(){
    return{
      products:[],
      search:''
    }
  },
  methods:{
    setProducts(data){
      this.products = data;
    },
    searchItem(){
      axios
      .get("http://localhost:3004/products?q="+this.search)
      .then((response) => {
        this.setProducts(response.data)
      })
      .catch((error) => {
        console.log("error",error)
      })
    }
  },
  mounted(){
    axios
    .get("http://localhost:3004/products")
    .then((response) => {
      this.setProducts(response.data)
    })
    .catch((error) => {
      console.log("ini error",error)
    })
  }
}
</script>

<style>

</style>