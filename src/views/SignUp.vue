<template>
  <div class="container mt-5" >
    <form @submit.prevent="registerUser">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Name</label>
        <input type="text" class="form-control" v-model="user.name">
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" v-model="user.email">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" v-model="user.password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <div class="alert alert-danger" v-if="errorMessage"> {{ errorMessage}} </div>
    </form>
  </div>
</template>

<script>
import router from "../router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
export default {
  name: "SignUp",
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        uid: ''
      },
      errorMessage: ''
    }
  },
  methods: {
      registerUser () {
      const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.user.email, this.user.password)
          .then( (userCredential) => {
            const userData = userCredential.user;
            console.log(userCredential);
            const db = getFirestore();
            const colRef = collection(db, "users");
            addDoc(colRef, {
              name: this.user.name,
              email: this.user.email,
              uid: userData.uid,
            });
          })
          router.push({
            name: 'home'
          })
          .catch((error) => {
            console.log('error', error.code)
            this.errorMessage = error.code;
            //const errorMessage = error.message;
          });
    }
  }
}
</script>

<style scoped>

</style>
