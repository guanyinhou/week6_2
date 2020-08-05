import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "font-awesome/css/font-awesome.css";
import thousandsFilter from "./assets/js/thousands";
// import $ from "jquery";
// 讓瀏覽器的全域環境可以使用到 $
// import jQuery from "jquery";
// window.$ = window.jQuery = jQuery;

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.component("Loading", Loading);
Vue.filter("thousands", thousandsFilter);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
