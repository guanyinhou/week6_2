<template>
  <div id="nav">
    <router-link to="/">前台首頁</router-link> |
    <router-link to="/about">關於我們</router-link> |
    <router-link to="/products">產品列表</router-link> |
    <router-link to="/cart">
      購物車<span class="badge badge-pill badge-danger">
        {{ cartTotalNum }}
      </span>
    </router-link>
    |
    <router-link to="/checkout">結帳</router-link> |
    <router-link to="/checkout_finish">結帳完成</router-link> |
    <router-link to="/admin">管理後台</router-link>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      carts: [],
      cartTotalNum: 0,
      uuid: "bba8c8a3-a5f2-4a81-91ef-9273532ebb26",
      apiPath: "https://course-ec-api.hexschool.io"
    };
  },
  methods: {
    getCart() {
      const url = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
      this.$http
        .get(url)
        .then(res => {
          //   this.isLoading = false;
          console.log(res);
          this.carts = res.data.data;
          this.cartTotalNum = 0;
          this.carts.forEach(item => {
            this.cartTotalNum += item.quantity;
            console.log(this.cartTotalNum);
          });
          //   this.cartTotal = 0;
          //   this.updateCartTotal();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getCart();
    this.$bus.$on("get-cart-num", () => {
      this.getCart();
    });
  }
};
</script>
