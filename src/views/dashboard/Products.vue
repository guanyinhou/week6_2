<template>
  <div
    class="products products-list page"
    :class="{
      openNewPanel: openNewPanel,
      openEditPane: openEditPanel,
      openConfirm: openConfirm
    }"
  >
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <h1>產品管理</h1>
      <button class="btn" type="button" @click="openModal(`new`)">新增</button>
      <div class="table-responsive table-bordered table-hover">
        <table>
          <thead>
            <tr>
              <!-- <th>編號</th> -->
              <th>目次</th>
              <th>類型</th>
              <th>品名</th>
              <th>原價</th>
              <th>特價</th>
              <th>啟用</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(prod, key) in prods" :key="prod.id">
              <!-- <td>{{ prod.sku }}</td> -->
              <td>{{ key + 1 }}</td>
              <td>{{ prod.category }}</td>
              <td>{{ prod.title }}</td>
              <td>$ {{ prod.origin_price | thousands }}</td>
              <td>
                <b>$ {{ prod.price | thousands }}</b>
              </td>
              <td>
                <span class="main-color" v-if="prod.enabled">啟用</span>
                <span class="text-danger" v-else>未啟用</span>
              </td>
              <td>
                <button
                  class="btn btn-edit"
                  type="button"
                  @click="openModal(`edit`, prod)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-delete"
                  type="button"
                  @click="openModal(`delete`, prod)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div is="pagination" :pages="pagination" @update="getProds"></div>

      <prodmodal ref="prodModal" :is-new="isNew" @update="getProds"></prodmodal>
      <rmprodmodal :temp-data="tempData" @update="getProds"></rmprodmodal>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import pagination from "../../components/Pagination";
import prodmodal from "../../components/ProdModal";
import rmprodmodal from "../../components/RmProdModal";
export default {
  components: {
    pagination,
    prodmodal,
    rmprodmodal
  },
  data() {
    return {
      prods: [],
      // token: "",
      isLoading: false,
      pagination: {},
      tempData: { enabled: false, imageUrl: [] },
      isNew: "",
      openNewPanel: false,
      openEditPanel: false,
      openConfirm: false,
      loadingBtn: ""
    };
  },
  props: ["token"],
  methods: {
    openModal(isNew, prod) {
      switch (isNew) {
        case "new": {
          // this.tempData = { enabled: false, imageUrl: [] };
          this.$refs.prodModal.tempData = {
            enabled: false,
            imageUrl: []
          };
          this.isNew = true;
          $("#prodModal").modal("show");
          break;
        }
        case "edit": {
          this.loadingBtn = prod.id;
          this.tempData = Object.assign({}, prod);
          // const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${prod.id}`;
          console.log(prod);
          this.$refs.prodModal.getProd(this.tempData.id);
          this.isNew = false;
          $("#prodModal").modal("show");
          break;
        }
        case "delete": {
          // this.openConfirm = true;
          this.tempData = JSON.parse(JSON.stringify(prod));
          $("#rmProdModal").modal("show");
          break;
        }
      }
    },
    getProds(num = 1) {
      // if(!num){num=1}
      console.log(num);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${num}`;
      this.isLoading = true;
      axios
        .get(url)
        .then(res => {
          this.isLoading = false;
          console.log(res);
          this.prods = res.data.data;
          this.pagination = res.data.meta.pagination;

          // if(this.tempData.id){
          this.tempData = { enabled: false, imageUrl: [] };
          this.openNewPanel = false;
          this.openEditPanel = false;
          // }
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
    }
  },
  created() {
    this.isLoading = true;
    // this.token = document.cookie.replace(
    //   /(?:(?:^|.*;\s*)tokenName\s*=\s*([^;]*).*$)|^.*$/,
    //   "$1"
    // );
    // this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;

    // 後台管理 API
    const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products`;
    this.$http.get(url).then(res => {
      this.isLoading = false;
      console.log(res);
      this.prods = res.data.data;
      this.pagination = res.data.meta.pagination;
    });
  }
};
</script>
