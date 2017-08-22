/**
 * Created by luanchi on 17/6/12.
 */

import Request from './request';
import AppShim from './appShim';
import EventHub from './eventHub';
import EventHubAction from './eventHubAction';
import Utils from './utils'

import DatetimeFormat from '../filters/datetimeFormat';

/*通用组件*/
import Loading from '../components/loading/main.vue';//加载中组件

exports.install = (Vue)=> {
    Vue.prototype.$isLoading = false;

    /*后端请求*/
    Vue.use(Request);

    /*app方法封装*/
    Vue.use(AppShim);

    /*事件中心*/
    Vue.use(EventHub);

    /*事件中心action*/
    Vue.use(EventHubAction);

    /*帮助类*/
    Vue.use(Utils);

    /*全局过滤器*/
    Vue.use(DatetimeFormat);


    Vue.mixin({
        mounted() {
            let _this = this;
            _this.userIsLogin();
        },
        methods: {
            /*用户登录态判断*/
            userIsLogin(){
                let _this = this;
                _this.$app.isLogin(function (data) {
                    if (data && data.state == true) {
                        console.log("user is logged");
                    } else {
                        _this.userLogin();
                    }
                });
            },
            userLogin(){
                let _this = this;
                let _currentUrl = window.location.href;
                _this.$app.login(_currentUrl, '', 'link', !0, !0);
            },
        },
        components: {
            Loading
        }
    });
};
