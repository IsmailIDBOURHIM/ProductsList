<template>
  <div class="container mt-5">
    <form @submit.prevent="loginUser">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" v-model="user.email">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" v-model="user.password">
      </div>
      <div class="alert alert-danger" v-if="errMsg"> {{ errMsg}} </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import router from "../router";
export default {
  name: "SignIn",

  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      errMsg: ''
    }
  },
  methods: {
    loginUser () {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.user.email, this.user.password).then(() => {
        console.log('success');
        // console.log(auth.currentUser);
        localStorage.setItem("user-id", auth.currentUser.uid)
        router.push({
          name: 'home'
        })
      }).catch((error) => {
        console.log(error.code)
        switch (error.code) {
          case "auth/invalid-email":
            this.errMsg = "Invalid email";
            break;
          case "auth/user-not-found":
            this.errMsg = "No account with that email was found";
            break;
          case "auth/wrong-password":
            this.errMsg = "Incorrect password";
            break;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
