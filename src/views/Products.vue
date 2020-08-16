<template>
  <div class="products page">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <h1>產品列表</h1>
      <ul class="row prod-list">
        <li v-for="prod in prods" :key="prod.id" class="col-sm-3">
          <router-link :to="`/product/${prod.id}`">
            <div class="prod-image">
              <img :src="prod.imageUrl" :alt="prod.title" />
            </div>
            <div class="prod-title">{{ prod.title }}</div>
            <div class="prod-origin-price">
              原價&nbsp;&nbsp;&nbsp;&nbsp;$ {{ prod.origin_price | thousands }}
            </div>
            <div class="prod-price">
              <b>特價&nbsp;&nbsp;&nbsp;&nbsp;$ {{ prod.price | thousands }}</b>
            </div>
          </router-link>
          <a href="#" class="add-to-cart" @click.prevent="addToCart(prod.id)">
            <i class="fa fa-cart-plus"></i>
          </a>
        </li>
      </ul>
    </div>
    <div is="gototop"></div>
  </div>
</template>

<script>
// import $ from "jquery";
import axios from "axios";
import gototop from "../components/Gototop";
export default {
  components: {
    gototop
  },
  data() {
    return {
      prods: [],
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
          swal(`${res.data.data.product.title}已加入購物車`);
          this.$bus.$emit("get-cart-num");
          // $("#modal").modal("hide");
          // this.getCart();
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
          console.log(err.response);
          console.log(err.response.data.errors[0]);
          alert(err.response.data.errors[0]);
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
    this.$http
      .get(
        `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`
      )
      .then(res => {
        this.isLoading = false;
        this.prods = res.data.data;
      });
  }
};
</script>
