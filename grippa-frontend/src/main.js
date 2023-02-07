// import { createApp } from 'vue'
// //import Vue from "vue";
// import App from './App.vue'
// createApp(App).mount('#app')


// import Vue from 'vue'
// import App from "./App.vue";

//   new Vue({
//     render: (h) => h(App),
//   }).$mount("#app");

// import { createApp } from 'vue'
// import Vue from 'vue'
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap-vue/dist/bootstrap-vue.css"
// import BootstrapVue from "bootstrap-vue"
// import App from './App.vue'

// Vue.use(BootstrapVue)

//     new Vue({
//     el: '#app',
//     render: h => h(App)
// })
// createApp(App).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import store from './store'

const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');
