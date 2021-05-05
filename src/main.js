import Vue from "vue";
import App from "./App.vue";
import VueCodeHighlight from "vue-code-highlight";
import axios from "axios";
import router from "./router";

Vue.use(VueCodeHighlight);
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
