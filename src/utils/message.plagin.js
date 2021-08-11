export default {
    install(Vue) {
        Vue.prototype.$message = (html) => {
            // eslint-disable-next-line no-undef
            M.toast({html})
        };

        Vue.prototype.$error = (html) => {
            // eslint-disable-next-line no-undef
            M.toast({html: `[ERROR]: ${html}`})
        }


    }
}