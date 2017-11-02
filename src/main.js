import Vue from 'vue'
import App from './App.vue'



import VueResource from 'vue-resource';
Vue.use(VueResource);

//Enter URL here:
Vue.http.options.root = 'https://to-do-app-64a1c.firebaseio.com/';




new Vue({
  el: '#app',
  render: h => h(App)
})
