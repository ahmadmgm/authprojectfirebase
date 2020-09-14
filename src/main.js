import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import './main.scss';
import * as firebase from 'firebase'
Vue.config.productionTip = false
Vue.use(Vuelidate)

var firebaseConfig = {
  apiKey: "AIzaSyDs1bChhL6pUPHnWSjkUhbsoA7vhDMlX4c",
  authDomain: "authproject-276b5.firebaseapp.com",
  databaseURL: "https://authproject-276b5.firebaseio.com",
  projectId: "authproject-276b5",
  storageBucket: "authproject-276b5.appspot.com",
  messagingSenderId: "1072859302600",
  appId: "1:1072859302600:web:d0d10b803c20798b8833fd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
