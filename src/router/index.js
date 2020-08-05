import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        name: "Index",
        path: "",
        component: () => import("../views/Index.vue")
      },
      {
        name: "About",
        path: "/about",
        component: () => import("../views/About.vue")
      },
      {
        name: "Checkout",
        path: "/checkout",
        component: () => import("../views/Checkout.vue")
      },
      {
        name: "Checkout finish",
        path: "/checkout_finish",
        component: () => import("../views/Checkout_finish.vue")
      },
      {
        name: "Products",
        path: "/products",
        component: () => import("../views/Products.vue")
      },
      {
        name: "Product",
        path: "/product/:id",
        component: () => import("../views/Product.vue")
      },
      {
        name: "Cart",
        path: "/cart",
        component: () => import("../views/Cart.vue")
      }
    ]
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/admin",
    name: "Dashboard",
    component: () => import("../views/dashboard/Dashboard.vue"),
    children: [
      {
        name: "Index",
        path: "",
        component: () => import("../views/dashboard/Index.vue")
      },
      {
        name: "Products",
        path: "products",
        component: () => import("../views/dashboard/Products.vue")
      },
      {
        name: "Coupons",
        path: "coupons",
        component: () => import("../views/dashboard/Coupons.vue")
      },
      {
        name: "Order",
        path: "order",
        component: () => import("../views/dashboard/Order.vue")
      },
      {
        name: "Picture",
        path: "picture",
        component: () => import("../views/dashboard/Picture.vue")
      }
    ]
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
