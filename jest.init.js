import { config } from "@vue/test-utils";
import { en } from "@/locales/en";
import { ru } from "@/locales/ru";

const locale = "en";
// translations[locale][msg];

// VueTestUtils.config.mocks["$t"] = msg => {
//   switch (locale) {
//     case "en":
//       return en[msg];
//     case "ru":
//       return ru[msg];
//   }
// };

config.mocks["$t"] = msg => en.messages[msg];
