import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PortalVue from "portal-vue";

// setup socketio connection and vuesocketio integration
import SocketIO from "socket.io-client";
import VueSocketIO from "vue-socket.io";

// custom directive
import ClickOutside from "./directives/ClickOutside";
Vue.directive("click-outside", ClickOutside);

Vue.use(
  new VueSocketIO({
    // debug: true,
    connection: SocketIO("http://localhost:3000"),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

Vue.config.productionTip = false;

Vue.use(PortalVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
