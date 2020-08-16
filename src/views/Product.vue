<template>
  <div class="product">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <h1>{{ prod.title }}</h1>
      <div class="prod-img">
        <img :src="prod.imageUrl" :alt="prod.title" />
      </div>
      <div class="prod-price">
        <h2>特價 $ {{ prod.price }}</h2>
      </div>
      <div class="add-to-cart">
        <button class="btn" @click="addToCart(prod.id)">
          加入購物車
        </button>
      </div>
      <div class="prod-content">
        <div class="sub-title">產品介紹</div>
        <p>{{ prod.content }}</p>
      </div>
      <div class="prod-content">
        <div class="sub-title">產品材質</div>
        <p>{{ prod.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
import axios from "axios";
export default {
  data() {
    return {
      prod: [],
      isLoading: false,
      uuid: "bba8c8a3-a5f2-4a81-91ef-9273532ebb26",
      apiPath: "https://course-ec-api.hexschool.io",
      cartTotal: 0
      //   cartNum: 0
    };
  },
  methods: {
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
      const cart = {
        product: id,
        quantity: qty
      };
      console.log(cart);

      axios
        .post(url, cart)
        .then(res => {
          this.isLoading = false;
          console.log(res);
          // eslint-disable-next-line no-undef
          swal(`${res.data.data.product.title}已加入購物車`, "success");
          this.$bus.$emit("get-cart-num");
          // $("#modal").modal("hide");
          this.getCart();
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
          console.log(err.response);
          console.log(err.response.data.errors[0]);
          // alert(err.response.data.errors[0]);
          // eslint-disable-next-line no-undef
          swal(`${err.response.data.errors[0]}`, "danger");
          // $("#modal").modal("hide");
        });
    },
    getCart() {
      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
      axios
        .get(url)
        .then(res => {
          this.isLoading = false;
          console.log(res);
          this.carts = res.data.data;
          // this.cartNum = res.data.data.length;
          this.cartTotal = 0;
          this.updateCartTotal();
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateCartTotal() {
      this.carts.forEach(item => {
        this.cartTotal += item.product.price * item.quantity;
      });
    }
  },
  created() {
    this.isLoading = true;
    console.log(this.$route.params.id);
    const id = this.$route.params.id;
    this.$http
      .get(
        `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`
      )
      .then(res => {
        this.isLoading = false;
        this.prod = res.data.data;
      });
  }
};
</script>
