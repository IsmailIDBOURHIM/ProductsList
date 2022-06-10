<template>
  <div class="container mt-5">
    <h1 class="text-center"> All Products</h1>
    <div class="row">
      <div class="card" style="width: 18rem;" v-for="product in allProducts" :key="product.name">
        <img :src="product.image" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <div class="d-flex justify-content-between">
            <p class="card-text"> {{ product.description }}</p>
            <strong class="card-text text-info"> {{ product.price }}</strong>
          </div>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, onSnapshot, query, getFirestore } from "firebase/firestore";
export default {
  name: "AllProducts",
  data () {
    return {
      allProducts: []
    }
  },
  created () {
    const db = getFirestore();
    const results = query(collection(db, "products"));
    onSnapshot(results, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.allProducts.push({
          name: doc.data().name,
          price: doc.data().price,
          description: doc.data().description,
          image: doc.data().image,
          idProduct: doc.id
        })
      })

    })
    console.log(this.allProducts)
  }
}
</script>

<style scoped>

</style>
