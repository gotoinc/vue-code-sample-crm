import localizeFilter from "@/filters/localize.filter";

export default {
    install(Vue) {
        Vue.prototype.$message = (html) => {
            M.toast({html : localizeFilter(html)})
        };

        Vue.prototype.$error = (html) => {
            M.toast({html: `[ERROR]: ${html}`})
        }

    }
}