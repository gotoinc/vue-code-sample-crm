import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./registerServiceWorker";
import VueMeta from "vue-meta";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";
import tooltipDirective from "@/directives/tooltip.directive";
import Loader from "@/components/Common/Loader";

import "materialize-css/dist/js/materialize.min.js";
import messagePlugin from "@/utils/message.plugin";
import titlePlugin from "@/utils/title.plugin";
import Paginate from "vuejs-paginate";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.filter("dateFilter", dateFilter);
Vue.filter("currencyFilter", currencyFilter);
Vue.filter("localizeFilter", localizeFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyDG6M8NSZUABRbY7qWqeAZgRuMdfq8b3II",
  authDomain: "vue-crm-project-41954.firebaseapp.com",
  projectId: "vue-crm-project-41954",
  storageBucket: "vue-crm-project-41954.appspot.com",
  messagingSenderId: "884401046952",
  appId: "1:884401046952:web:d4b97ac1af45fc24c7899d",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount("#app");
  }
});
