<template>
  <div class="cart page">
    <loading :active.sync="isLoading"></loading>
    <h1>購物車</h1>
    <div class="container">
      <div class="cart-area">
        <div class="float-right">
          <button class="btn" type="button" @click="rmCartAllItem">
            <i class="fa fa-trash"></i> 刪除所有品項
          </button>
        </div>
        <div class="clearfix"></div>
        <hr />
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>刪除</th>
                <th>品名</th>
                <th>數量</th>
                <th>單位</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in carts" :key="item.product.id + 1">
                <td>
                  <button class="btn" @click="rmCartItem(item.product.id)">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
                <td>
                  <a href="#">{{ item.product.title }}</a>
                </td>
                <td>
                  <div class="input-group">
                    <div class="inpuy-group-append">
                      <button
                        class="btn"
                        type="button"
                        :disabled="item.quantity <= 1"
                        @click="
                          item.quantity--;
                          updateQuantity(item.product.id, item.quantity);
                        "
                      >
                        <i class="fa fa-minus"></i>
                      </button>
                    </div>
                    <input
                      type="number"
                      class="form-control text-center"
                      v-model="item.quantity"
                      min="1"
                      @change="updateQuantity(item.product.id, item.quantity)"
                    />
                    <div class="input-group-prepend">
                      <button
                        class="btn"
                        type="button"
                        @click="
                          item.quantity++;
                          updateQuantity(item.product.id, item.quantity);
                        "
                      >
                        <!-- :disabled="status.loadingNum === item.product.id" -->
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <td>{{ item.product.unit }}</td>
                <td class="prod-price">
                  $ {{ item.product.price | thousands }}
                </td>
              </tr>
              <tr>
                <td class="text-right" colspan="4">
                  <span class="total-word">總數</span>
                </td>
                <td class="text-center prod-price">
                  {{ cartPageTotalNum }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td class="text-right" colspan="4">
                  <span class="total-word">總計</span>
                </td>
                <td class="text-center prod-price">
                  $ {{ cartTotal | thousands }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    <div is="gototop"></div>
  </div>
</template>

<script>
import axios from "axios";
import gototop from "../components/Gototop";
export default {
  components: {
    gototop
  },
  data() {
    return {
      // prods: [],
      cartPageTotalNum: 0,
      isLoading: false,
      tempData: {},
      status: {
        // loadingItem: "",
        // 加速數量選擇
        loadingNum: ""
      },
      carts: [],
      cartTotal: 0,
      uuid: "bba8c8a3-a5f2-4a81-91ef-9273532ebb26",
      apiPath: "https://course-ec-api.hexschool.io"
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
          // this.$bus.$emit("get-cart-num");
          this.cartPageTotalNum = 0;
          this.carts.forEach(item => {
            this.cartPageTotalNum += item.quantity;
            // console.log(this.cartPageTotalNum);
          });
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
    },
    updateQuantity(id, quantity) {
      // 等同addToCart
      // 加速數量選擇
      this.status.loadingNum = id;
      console.log(this.status.loadingNum);
      const url = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
      const cart = {
        product: id,
        quantity
      };
      if (cart.quantity < 1) {
        alert("請輸入大於1的數字");
        this.$set(cart, "quantity", 1);
        this.getCart();
      }
      console.log(cart);
      console.log(cart.quantity);
      axios
        .patch(url, cart)
        .then(res => {
          // 加速數量選擇
          this.status.loadingNum = "";
          console.log(res);
          // console.log(this.carts.length);
          this.cartTotal = 0;
          this.cartPageTotalNum = 0;
          this.$bus.$emit("get-cart-num");
          this.updateCartTotal();
          this.getCart();
        })
        .catch(err => {
          console.log(err);
        });
    },
    rmCartItem(id) {
      this.status.loadingNum = id;
      const url = `${this.apiPath}/api/${this.uuid}/ec/shopping/${id}`;

      axios
        .delete(url)
        .then(res => {
          // 加速數量選擇
          this.status.loadingNum = "";
          // eslint-disable-next-line no-undef
          swal(res.data.message, "", "success");
          console.log(res);
          this.cartPageTotalNum = 0;
          this.$bus.$emit("get-cart-num");
          this.getCart();
        })
        .catch(err => {
          console.log(err);
        });
    },
    rmCartAllItem() {
      const url = `${this.apiPath}/api/${this.uuid}/ec/shopping/all/product`;

      // eslint-disable-next-line no-undef
      swal({
        title: "要刪除所有商品嗎？",
        // text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          axios
            .delete(url)
            .then(res => {
              console.log(res);
              this.cartPageTotalNum = 0;
              this.$bus.$emit("get-cart-num");
              this.getCart();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          // eslint-disable-next-line no-undef
          // swal("Your imaginary file is safe!");
        }
      });
    }
  },
  created() {
    this.getCart();
  }
};
</script>
