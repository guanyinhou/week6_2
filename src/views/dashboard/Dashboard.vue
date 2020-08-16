<template>
  <div class="dashboard">
    <loading :active.sync="isLoading"></loading>
    <div id="nav">
      <router-link to="/admin">後台首頁</router-link> |
      <router-link to="/admin/products">產品管理</router-link> |
      <router-link to="/admin/coupons">優惠卷管理</router-link> |
      <router-link to="/admin/order">訂單管理</router-link> |
      <router-link to="/admin/picture">圖片儲存管理</router-link> |
      <router-link to="/">回到前台</router-link> |
      <a href="#" type="button" @click.prevent="signout">登出</a>
    </div>
    <router-view :token="token" v-if="checkSuccess"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      checkSuccess: false,
      isLoading: false
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.isLoading = true;
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)tokenName\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      const api = `${process.env.VUE_APP_APIPATH}/api/auth/check`;

      this.$http
        .post(api, {
          api_token: this.token
        })
        .then(res => {
          this.isLoading = false;
          console.log(res);
          this.checkSuccess = true;
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
          this.$router.push("/login");
        });
    },
    signout() {
      document.cookie = `tokenName=; expires=; path=/`;
      window.location = "/week6_2/dist/";
    }
  }
};
</script>
