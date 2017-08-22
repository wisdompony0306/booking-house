/**
 * 用于eventHub的静态事件名
 */
exports.install = (Vue) => {
    /*单独的事件中心管理组件间的通信*/
    let actions = {
        INPUT_FOCUS: 'INPUT_FOCUS',
        INPUT_BLUR: 'INPUT_BLUR',
        ORDER_TIMEOUT: 'ORDER_TIMEOUT',
    };
    Object.defineProperty(Vue.prototype, '$eventAction', {value: actions});
};