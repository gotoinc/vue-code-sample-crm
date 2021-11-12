import Vue from "vue";
import VueI18n from "vue-i18n";
import { ru } from "@/locales/ru.js";
import { en } from "@/locales/en.js";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "ru",
  messages: {
    en: en,
    ru: ru,
  },
});
