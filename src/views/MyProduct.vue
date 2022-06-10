<template>
  <div class="container mt-5">
    <h1 class="text-center"> My Products</h1>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">
      add product
    </button>
    <div class="row">
      <div class="card mr-4" style="width: 18rem;" v-for="product in myProducts" :key="product.idProduct + Math.random()">
        <img :src="product.image" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <div class="d-flex justify-content-between">
            <p class="card-text"> {{ product.description }}</p>
            <strong class="card-text text-info"> {{ product.price }}</strong>
          </div>
<!--          <a href="#" class="btn btn-primary">Go somewhere</a>-->
          <div class="mt-2 d-flex justify-content-between">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateProductModal"
                    @click="getData(product)"> Update </button>
            <button class="btn btn-danger" @click="deleteProduct(product.idProduct)"> Delete </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal add product-->
    <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="addProduct">
            <div class="alert alert-success" v-if="msgSuccess"> {{msgSuccess}} </div>
            <div class="alert alert-danger" v-if="msgError"> {{msgError}} </div>
            <div class="modal-body">
              <div class="mb-2">
                <label for="name-product" class="col-form-label">Name:</label>
                <input type="text" class="form-control" id="name-product" v-model="product.name" required>
              </div>
              <div class="mb-3">
                <label for="price-product" class="col-form-label">Price:</label>
                <input type="number" class="form-control" id="price-product" v-model="product.price" required>
              </div>
              <div class="mb-3">
                <label for="img-product" class="col-form-label">Image:</label>
                <input type="file" class="form-control" id="img-product" @change="previewImage" accept=".png, .jpg, .jpeg">
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Description:</label>
                <textarea class="form-control" id="message-text" v-model="product.description"></textarea>
              </div>
              <div class="progress">
                <div class="progress-bar bg-success" role="progressbar" :style="{width: uploadValue + '%' }" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Modal update product-->
    <div class="modal fade" id="updateProductModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="reloadPage"></button>
          </div>
            <div class="alert alert-success" v-if="msgSuccess"> {{msgSuccess}} </div>
<!--            <div class="alert alert-danger" v-if="msgError"> {{msgError}} </div>-->
            <div class="modal-body">
              <div class="mb-2">
                <label for="name-product" class="col-form-label">Name:</label>
                <input type="text" class="form-control" id="name-product" v-model="dataProduct.name" required>
              </div>
              <div class="mb-3">
                <label for="price-product" class="col-form-label">Price:</label>
                <input type="number" class="form-control" id="price-product" v-model="dataProduct.price" required>
              </div>
              <div class="mb-3">
                <label for="img-product" class="col-form-label">Image:</label>
                <input type="text" class="form-control" id="img-product" v-model="dataProduct.image">
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Description:</label>
                <textarea class="form-control" id="message-text" v-model="dataProduct.description"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="reloadPage">Close</button>
              <button type="button" class="btn btn-primary" @click="update">Update</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import router from "../router";
import { collection, addDoc, getFirestore,
          onSnapshot, query, where,
          updateDoc, doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default {
  name: "MyProduct",
  data () {
    return {
      product: {
        name: '',
        price: 0,
        description: '',
        image: '',
        idProduct: null,
        uid: localStorage.getItem('user-id')
      },
      myProducts: [],
      dataProduct: [],
      msgSuccess: '',
      msgError: '',
      picture:null,
      uploadValue: null,
      imageName: '',
      imageData: null
    }
  },

  methods: {
    addProduct () {
      this.picture = null;
      this.myProducts= [];
      const storageRef = ref(getStorage(), `images/${this.imageName}`);
      const uploadTask= uploadBytesResumable(storageRef, this.imageData);
      uploadTask.on('state_changed', (snapshot) => {
            this.uploadValue  = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + this.uploadValue  + '% done');
          },
          (error) => {
            console.log(error.message)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              this.product.image=downloadURL
              const db = getFirestore();
              const collectionRef = collection(db, 'products');
              addDoc(collectionRef,this.product).then(() => {
                this.msgSuccess = "Your product has been successfully added"
              }).then(() => {
                this.product.name= ''
                this.product.price= ''
                this.product.description= ''
                this.product.image= ''
              }).catch((error) =>{
                this.msgError = error.code
              })
            });
          }
      );
    },

    // addProduct () {
    //   this.myProducts= []
    //   const db = getFirestore();
    //   const collectionRef = collection(db, 'products');
    //   addDoc(collectionRef,this.product).then(() => {
    //     this.msgSuccess = "Your product has been successfully added"
    //   }).then(() => {
    //     this.product.name= ''
    //     this.product.price= ''
    //     this.product.description= ''
    //     this.product.image= ''
    //   }).catch((error) =>{
    //     this.msgError = error.code
    //   })
    // },

    update () {
      this.myProducts = []
      const db = getFirestore();
      updateDoc(doc(db, "products", this.dataProduct.idProduct), {
        name: this.dataProduct.name,
        price: this.dataProduct.price,
        description: this.dataProduct.description,
        image: this.dataProduct.image,
      })
      this.msgSuccess = "Your product has been successfully modified";
    },

    getData (productCurrent) {
      this.dataProduct = productCurrent;

    },

    deleteProduct (idProduct) {
      this.myProducts = []
      const db = getFirestore();
      deleteDoc(doc(db, "products", idProduct));
    },

    reloadPage() {
      window.location.reload();
    },

    previewImage (event) {
      this.uploadValue= 0;
      this.picture= null;
      this.imageData = event.target.files[0];
      this.imageName= event.target.files[0].name;
    }
  },

  created() {
    const collecRef = query(collection(getFirestore(), "products"), where('uid', '==', this.product.uid));
    onSnapshot(collecRef, (q) => {
      //const tab = [];
      q.forEach((myDoc) => {
        this.myProducts.push({
          name: myDoc.data().name,
          price: myDoc.data().price,
          description: myDoc.data().description,
          image: myDoc.data().image,
          idProduct: myDoc.id
        })
      })
      console.log('all', this.myProducts)
    })
  }
}
</script>

<style scoped>

</style>
