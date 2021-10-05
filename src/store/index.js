import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth";
import { errors } from "./modules/errors";
import { info } from "./modules/info";
import { category } from "@/store/modules/category";
import { record } from "@/store/modules/record";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    errors,
    info,
    category,
    record,
  },
});
