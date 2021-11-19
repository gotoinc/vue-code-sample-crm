import { config } from "@vue/test-utils";
import { en } from "@/locales/en";

config.mocks["$t"] = msg => en.messages[msg];
