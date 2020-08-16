<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

// export default {
//   name: "Home",
//   components: {
//     HelloWorld
//   }
// };
// import axios from "axios";
// import data from "../../src/assets/js/data";
// import axios from "axios";
import navbar from "../components/Navbar";
export default {
  name: "Home",
  components: {
    navbar
  },
  data() {
    return {
      // prods: [],
      isLoading: false,
      // tempData: {},
      status: {
        loadingItem: "",
        // 加速數量選擇
        loadingNum: ""
      }
      // carts: [],
      // cartTotal: 0,
      // uuid: "bba8c8a3-a5f2-4a81-91ef-9273532ebb26",
      // apiPath: "https://course-ec-api.hexschool.io"
    };
  }
  // methods: {
  //   getCart() {
  //     this.isLoading = true;
  //     const url = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
  //     axios
  //       .get(url)
  //       .then(res => {
  //         this.isLoading = false;
  //         console.log(res);
  //         this.carts = res.data.data;
  //         this.cartTotal = 0;
  //         this.updateCartTotal();
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }
  // },
  // created() {
  //   this.getCart();
  // }
};
</script>
