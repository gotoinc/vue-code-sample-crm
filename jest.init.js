import { config } from "@vue/test-utils";
import { en } from "@/locales/en";
import { ru } from "@/locales/ru";

config.mocks["$t"] = msg => en.messages[msg];
