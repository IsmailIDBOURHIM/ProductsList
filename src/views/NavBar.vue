<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
<!--        <a class="navbar-brand" href="#">Navbar</a>-->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'home'}">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'about'}">ABOUT</router-link>
            </li>
            <li class="nav-item" v-if="user">
              <router-link class="nav-link" :to="{ name: 'products'}">Products</router-link>
            </li>
            <li class="nav-item" v-if="user">
              <router-link class="nav-link" :to="{ name: 'myProduct'}">My Product</router-link>
            </li>
            <li class="nav-item" v-if="!user">
              <router-link class="nav-link" :to="{ name: 'signIn'}">Sign In</router-link>
            </li>
            <li class="nav-item" v-if="!user">
              <router-link class="nav-link" :to="{ name: 'signUp'}">Sign Up</router-link>
            </li>
            <li class="nav-item" v-if="user">
              <a class="nav-link active" @click="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import router from "../router";
export default {
  name: "NavBar",
  data () {
    return {
      user: null
    }
  },
  created () {
    const auth = getAuth();
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        this.user = userAuth
        // ...
      } else {
        this.user = null
      }
    });
  },
  methods: {
    logout () {
      const auth = getAuth();
      signOut(auth).then(function () {
        console.log('sign-out');
        router.push({
          name: 'signIn'
        })
        localStorage.removeItem("user-id");
      }).catch((error) => {
        console.log('sign-out error: ', error)
      })
    }
  }
}
</script>

<style scoped>
  nav {
    background: #58be60;
  }

 .nav-link {
   text-transform: uppercase;
 }
  .router-link-exact-active {
    background: white;
  }
  .nav-link,
  .nav-link:link,
  .nav-link:visited,
  .nav-link:active {
    display: block;
    position: relative;
    font-size: 14px;
    letter-spacing: 1px;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    color: blue;
  }

  .nav-link::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 3px;
    background: rgba(0, 0, 0, 0.2);
    opacity: 0;
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .nav-link:hover::before,
  .nav-link:focus::before {
    opacity: 1;
    -webkit-transform: translate(0, 5px);
    transform: translate(0, 5px);
  }
</style>
