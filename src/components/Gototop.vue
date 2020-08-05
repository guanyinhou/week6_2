<template>
  <a
    href="#"
    id="back-to-top"
    title="Back to top"
    :class="{ '`show`': show }"
    @click.prevent="goToTop"
  >
    <i class="fa fa-angle-up"></i>
  </a>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      show: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.goToTop);
  },
  methods: {
    goToTop() {
      if ($("#back-to-top").length) {
        var scrollTrigger = 100, // px
          backToTop = function() {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
              $("#back-to-top").addClass("show");
            } else {
              $("#back-to-top").removeClass("show");
            }
          };
        backToTop();
        $(window).on("scroll", function() {
          backToTop();
        });
        $("#back-to-top").on("click", function() {
          $("html,body").animate(
            {
              scrollTop: 0
            },
            700
          );
        });
      }
    }
  }
};
</script>
