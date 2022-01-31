import Vue from "vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import Vuelidate from "vuelidate";
import VueMeta from "vue-meta";
import Paginate from "vuejs-paginate";
import FlagIcon from "vue-flag-icon";

import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";

import tooltipDirective from "@/directives/tooltip.directive";

import messagePlugin from "@/utils/message.plugin";
import titlePlugin from "@/utils/title.plugin";

import { i18n } from "@/plugins/i18n";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import Loader from "@/components/Common/Loader";
import App from "./App.vue";

import "materialize-css/dist/js/materialize.min.js";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.use(FlagIcon);
Vue.use(messagePlugin);
Vue.use(titlePlugin);

Vue.filter("dateFilter", dateFilter);
Vue.filter("currencyFilter", currencyFilter);

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
      i18n,
      render: h => h(App),
    }).$mount("#app");
  }
});
