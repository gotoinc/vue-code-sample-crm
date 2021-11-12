import { i18n } from "@/plugins/i18n";

export default {
  install(Vue) {
    Vue.prototype.$title = function (titleKey) {
      const appName = process.env.VUE_APP_TITLE;
      return `${i18n.t(titleKey)} | ${appName}`;
    };
  },
};
