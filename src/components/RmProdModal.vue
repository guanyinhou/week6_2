<template>
  <div
    class="modal fade"
    id="rmProdModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title">刪除產品</span>
        </div>
        <div class="modal-body">
          <p>是否刪除{{ tempData.title }} (刪除後將無法恢復)？</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-cancel" type="button" data-dismiss="modal">
            取消
          </button>
          <button class="btn btn-confirm" type="button" @click="removeData">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  data() {
    return {};
  },
  props: ["tempData"],
  methods: {
    removeData() {
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)tokenName\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempData.id}`;

      //預設帶入 token
      axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      this.isLoading = true;
      axios
        .delete(url)
        .then(() => {
          this.isLoading = false;
          // $('#delProductModal').modal('hide');
          // this.closeModal();
          $("#rmProdModal").modal("hide");
          this.$emit("update");
          // this.getProds();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
