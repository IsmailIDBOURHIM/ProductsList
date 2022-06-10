<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>
<script>
import NavBar from "@/views/NavBar";
export default {
  components: {
    NavBar
  }
}
</script>
<style>

</style>
