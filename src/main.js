// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import './common/style/theme/index.css';
import axios from 'axios'

Vue.config.productionTip = false;

Vue.use(ElementUI);

axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;
router.afterEach((to, from) => {
  window.scrollTo(0,0);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created(){
     axios.defaults.baseURL='http://www.leeyum.com';
  },
  components: { App },
  template: '<App/>'
});
