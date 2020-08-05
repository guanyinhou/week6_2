<template>
  <div
    class="modal fade"
    id="prodModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title" v-if="isNew">新增產品</span>
          <span class="modal-title" v-else>編輯產品</span>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-5">
              <aside>
                <div class="form-group">
                  <label for="imgUrl">輸入圖片網址</label>
                  <input
                    class="form-control"
                    type="text"
                    id="imgUrl"
                    placeholder="請輸入圖片連結"
                    v-model="tempData.imageUrl[0]"
                  />
                </div>
                <div class="form-group">
                  <img :src="tempData.imageUrl" />
                </div>
              </aside>
            </div>
            <div class="col-sm-7">
              <main>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label for="newTitle">標題</label>
                      <input
                        class="form-control"
                        type="text"
                        id="newTitle"
                        placeholder="請輸入標題"
                        v-model="tempData.title"
                      />
                    </div>
                  </div>
                  <!-- <div class="col-sm-12">
                    <div class="form-group">
                      <label for="newSku">編號</label>
                      <input
                        class="form-control"
                        type="text"
                        id="newSku"
                        placeholder="請輸入編號"
                        v-model="tempData.sku"
                      />
                    </div>
                  </div> -->
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="newCate">分類</label>
                      <input
                        class="form-control"
                        type="text"
                        id="newCate"
                        placeholder="請輸入分類"
                        v-model="tempData.category"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="newUnit">單位</label>
                      <input
                        class="form-control"
                        type="text"
                        id="newUnit"
                        placeholder="請輸入單位"
                        v-model="tempData.unit"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="newOriginPrice">原價</label>
                      <input
                        class="form-control"
                        type="text"
                        id="newOriginPrice"
                        placeholder="請輸入原價"
                        v-model="tempData.origin_price"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="newPrice">售價</label>
                      <input
                        class="form-control"
                        type="text"
                        id="newPrice"
                        placeholder="請輸入售價"
                        v-model="tempData.price"
                      />
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label for="newDescription">產品描述</label>
                      <textarea
                        class="form-control"
                        type="text"
                        id="newDescription"
                        placeholder="請輸入產品描述"
                        v-model="tempData.description"
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label for="newContent">說明內容</label>
                      <textarea
                        class="form-control"
                        type="text"
                        id="newContent"
                        placeholder="請輸入說明內容"
                        v-model="tempData.content"
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group">
                      <div class="ckbox">
                        <input
                          type="checkbox"
                          id="newActivate"
                          v-model="tempData.enabled"
                        />
                        <label for="newActivate">是否啟用</label>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" id="cancel" data-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn" id="confirm" @click="uploadData">
            確認
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
    return {
      tempData: {
        imageUrl: []
      }
    };
  },
  props: ["isNew"],
  methods: {
    getProd(id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`;
      // this.isLoading = true;
      axios
        .get(url)
        .then(res => {
          // this.isLoading = false;
          this.tempData = res.data.data;
        })
        .catch(err => {
          // this.isLoading = false;
          console.log(err);
        });
    },
    uploadData() {
      this.isLoading = true;
      let url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/product`;
      let httpMethod = "post";
      if (!this.isNew) {
        url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempData.id}`;
        httpMethod = "patch";
      }

      // const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.tempData.id}`;
      axios[httpMethod](url, this.tempData)
        .then(() => {
          this.isLoading = false;
          $("#prodModal").modal("hide");
          this.$emit("update");
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeData() {
      const url = `${process.env.VUE_APP_UUID}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempData.id}`;

      //預設帶入 token
      axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      this.isLoading = true;
      axios.delete(url).then(() => {
        this.isLoading = false;
        // $('#delProductModal').modal('hide');
        this.closeModal();
        // this.$emit('update');
        this.getProds();
      });
    },
    openNewPanel() {},
    openEditPanel() {}
  }
};
</script>
