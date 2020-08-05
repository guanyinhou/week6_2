<template>
  <span class="cart-num"> {{ cartNum }} </span>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      prods: [],
      isLoading: false,
      tempData: {},
      status: {
        loadingItem: "",
        // 加速數量選擇
        loadingNum: ""
      },
      carts: [],
      cartTotal: 0,
      uuid: "bba8c8a3-a5f2-4a81-91ef-9273532ebb26",
      apiPath: "https://course-ec-api.hexschool.io",
      cartNum: 0
    };
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
      axios
        .get(url)
        .then(res => {
          this.isLoading = false;
          console.log(res);
          this.carts = res.data.data;
          this.cartTotal = 0;
          this.cartNum = res.data.data.length;
          // this.$set(this.cartNum, res.data.data.length);
          this.updateCartTotal();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getCart();
  }
};
</script>
