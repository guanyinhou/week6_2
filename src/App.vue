<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/css/all.scss";
</style>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // this.isLoading = true;
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 3000);
    // this.$http
    //   .get(
    //     `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`
    //   )
    //   .then(res => {
    //     // this.isLoading = false;
    //     console.log(res);
    //   });
  }
};
</script>
