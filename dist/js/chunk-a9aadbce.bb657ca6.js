(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a9aadbce"],{"159b":function(t,a,i){var o=i("da84"),c=i("fdbc"),e=i("17c2"),r=i("9112");for(var n in c){var s=o[n],d=s&&s.prototype;if(d&&d.forEach!==e)try{r(d,"forEach",e)}catch(u){d.forEach=e}}},"17c2":function(t,a,i){"use strict";var o=i("b727").forEach,c=i("a640"),e=i("ae40"),r=c("forEach"),n=e("forEach");t.exports=r&&n?[].forEach:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}},4160:function(t,a,i){"use strict";var o=i("23e7"),c=i("17c2");o({target:"Array",proto:!0,forced:[].forEach!=c},{forEach:c})},8418:function(t,a,i){"use strict";var o=i("c04e"),c=i("9bf2"),e=i("5c6c");t.exports=function(t,a,i){var r=o(a);r in t?c.f(t,r,e(0,i)):t[r]=i}},"99af":function(t,a,i){"use strict";var o=i("23e7"),c=i("d039"),e=i("e8b5"),r=i("861d"),n=i("7b0b"),s=i("50c4"),d=i("8418"),u=i("65f0"),l=i("1dde"),p=i("b622"),f=i("2d00"),h=p("isConcatSpreadable"),g=9007199254740991,v="Maximum allowed index exceeded",L=f>=51||!c((function(){var t=[];return t[h]=!1,t.concat()[0]!==t})),b=l("concat"),C=function(t){if(!r(t))return!1;var a=t[h];return void 0!==a?!!a:e(t)},T=!L||!b;o({target:"Array",proto:!0,forced:T},{concat:function(t){var a,i,o,c,e,r=n(this),l=u(r,0),p=0;for(a=-1,o=arguments.length;a<o;a++)if(e=-1===a?r:arguments[a],C(e)){if(c=s(e.length),p+c>g)throw TypeError(v);for(i=0;i<c;i++,p++)i in e&&d(l,p,e[i])}else{if(p>=g)throw TypeError(v);d(l,p++,e)}return l.length=p,l}})},d2f1:function(t,a,i){"use strict";i.r(a);var o=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"product"},[i("loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}}),i("div",{staticClass:"container"},[i("h1",[t._v(t._s(t.prod.title))]),i("div",{staticClass:"prod-img"},[i("img",{attrs:{src:t.prod.imageUrl,alt:t.prod.title}})]),i("div",{staticClass:"prod-price"},[i("h2",[t._v("特價 $ "+t._s(t.prod.price))])]),i("div",{staticClass:"add-to-cart"},[i("button",{staticClass:"btn",on:{click:function(a){return t.addToCart(t.prod.id)}}},[t._v(" 加入購物車 ")])]),i("div",{staticClass:"prod-content"},[i("div",{staticClass:"sub-title"},[t._v("產品介紹")]),i("p",[t._v(t._s(t.prod.content))])]),i("div",{staticClass:"prod-content"},[i("div",{staticClass:"sub-title"},[t._v("產品材質")]),i("p",[t._v(t._s(t.prod.description))])])])],1)},c=[],e=(i("99af"),i("4160"),i("159b"),i("bc3a")),r=i.n(e),n={data:function(){return{prod:[],isLoading:!1,uuid:"bba8c8a3-a5f2-4a81-91ef-9273532ebb26",apiPath:"https://course-ec-api.hexschool.io",cartTotal:0}},methods:{addToCart:function(t){var a=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.isLoading=!0;var o="".concat(this.apiPath,"/api/").concat(this.uuid,"/ec/shopping"),c={product:t,quantity:i};console.log(c),r.a.post(o,c).then((function(t){a.isLoading=!1,console.log(t),swal("".concat(t.data.data.product.title,"已加入購物車"),"success"),a.$bus.$emit("get-cart-num"),a.getCart()})).catch((function(t){a.isLoading=!1,console.log(t),console.log(t.response),console.log(t.response.data.errors[0]),swal("".concat(t.response.data.errors[0]),"danger")}))},getCart:function(){var t=this;this.isLoading=!0;var a="".concat(this.apiPath,"/api/").concat(this.uuid,"/ec/shopping");r.a.get(a).then((function(a){t.isLoading=!1,console.log(a),t.carts=a.data.data,t.cartTotal=0,t.updateCartTotal()})).catch((function(t){console.log(t)}))},updateCartTotal:function(){var t=this;this.carts.forEach((function(a){t.cartTotal+=a.product.price*a.quantity}))}},created:function(){var t=this;this.isLoading=!0,console.log(this.$route.params.id);var a=this.$route.params.id;this.$http.get("".concat("https://course-ec-api.hexschool.io","/api/").concat("bba8c8a3-a5f2-4a81-91ef-9273532ebb26","/ec/product/").concat(a)).then((function(a){t.isLoading=!1,t.prod=a.data.data}))}},s=n,d=i("2877"),u=Object(d["a"])(s,o,c,!1,null,null,null);a["default"]=u.exports},fdbc:function(t,a){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-a9aadbce.bb657ca6.js.map