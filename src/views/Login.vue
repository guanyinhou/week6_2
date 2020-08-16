<template>
  <div class="login page">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="text-center">
        <form class="form-signin" @submit.prevent.enter="signin">
          <h2>請先登入</h2>
          <hr />
          <label for="email">帳號：</label>
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            v-model="user.email"
            required
          />
          <br /><br />
          <label for="passwd">密碼：</label>
          <input
            type="password"
            id="passwd"
            placeholder="Password"
            v-model="user.password"
            required
          />
          <br /><br />
          <hr />
          <div class="btn-zone">
            <button class="btn" type="submit">登入</button><br />
            <!-- <button class="btn" type="button" @click="signout">登出</button><br> -->
            <!-- <button class="btn" type="button" @click="getData">取得資料</button> -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      token: "",
      isLoading: false,
      // uuid
      uuid: "bba8c8a3-a5f2-4a81-91ef-9273532ebb26",
      apiPath: "https://course-ec-api.hexschool.io/api/"
    };
  },
  methods: {
    signin() {
      let vm = this;
      //   const api = `${this.apiPath}auth/login`;
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/login`;
      vm.isLoading = true;

      //   this.$http.post
      axios
        .post(api, vm.user)
        .then(res => {
          console.log(res);
          const token = res.data.token;
          const expired = res.data.expired;
          document.cookie = `tokenName=${token}; expires=${new Date(
            expired * 1000
          )}; path=/`;
          // window.location = "./dashboard/Index.vue";
          this.$router.push("admin");
        })
        .catch(err => {
          console.log(err);
        });
    },
    signout() {
      document.cookie = "tokenName=;expire=;";
      window.location = "/";
    },
    getData() {
      // 取得 token 的 cookies (注意取得的時間點)
      // 詳情請見：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)tokenName\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      // API
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products`;
      // 將 Token 加入到 Headers 內
      this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      //   this.$http.post
      axios.get(api).then(res => {
        this.products = res.data.data;
        this.pagination = res.data.meta.pagination;
      });
    }
  }
};
</script>
