import VueTestUtils from "@vue/test-utils";
import localeEN from "./src/locales/en";
import localeRU from "./src/locales/ru";

const locale = "en";
// translations[locale][msg];

VueTestUtils.config.mocks["$t"] = msg => {
  switch (locale) {
    case "en":
      return localeEN[msg];
    case "ru":
      return localeRU[msg];
  }
};
