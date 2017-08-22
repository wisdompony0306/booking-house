/**
 * Created by lunachi on 17/6/12.
 * app_20264.js 封装,不直接调用app.js里的方法
 * 参考文档:http://apptest.58.com/static/doc/58app/index.html#!/api/app58
 * 参考文档:http://wiki.58corp.com/index.php?title=Web%26native%E9%80%9A%E4%BF%A1%E5%8D%8F%E8%AE%AE
 */

exports.install = Vue => {
    window.$ = window.$ || {};
    window.$.publish = window.$.publish || {};

    /**
     * app端更给页面title
     * @param title
     */
    function app_setTitle(title) {
        WBAPP.setTitle(title);
    }

    /**
     * 调用native返回上一页面功能
     */
    function app_goBack() {
        WBAPP.goBack();
    }

    /**
     * 调用native验证是否登录功能
     * @param callback 必填项，回调函数名 callback({state:true|false})
     */
    function app_isLogin(callback) {
        WBAPP.isLogin(callback);
    }

    /**
     *
     * @param url 必填项，登录成功后跳转页面url
     * @param title 必填项，登录成功后跳转页面title
     * @param pagetype 必填项，登录成功后跳转页面类型
     * @param isreload 选填项，登录成功后是否重载跳转页面
     * @param isfinish 选填项，登录成功后是否关闭调起页面
     */
    function app_login(url, title, pagetype = 'link', isreload = true, isfinish = false) {
        WBAPP.login(url, title, pagetype, isreload, isfinish);
    }

    /**
     * app端埋点方法
     * @param actiontype 必填项，埋点统计的动作类型
     * @param pagetype 必填项，埋点统计页面类型
     * @param cate 选填项，埋点统计页面分类 fullPath
     * @param params 选填项，埋点参数
     * @param area 选填项，区域信息
     */
    function app_setWebLog(actiontype, pagetype, cate = '', params = [], area = '') {
        WBAPP.setWebLog(actiontype, pagetype, cate, params, area);
    }

    /**
     * app端弹窗方法
     * @param type
     * @param title
     * @param content
     * @param callback
     * @param txt1
     * @param txt2
     */
    function app_showDialog(type, title, content, callback, txt1, txt2) {
        switch (type) {
            case 'single':
                WBAPP.showDialog(type, title, content, callback, txt1);
                break;
            case 'double':
                WBAPP.showDialog(type, title, content, callback, txt1, txt2);
                break;
            case 'pay':
                WBAPP.showDialog(type, title, content, callback, txt1, txt2, 'shield');
                break;
            default:
                break;
        }
    }

    function app_toastMsg(msg) {
        WBAPP.toastMsg(msg);
    }

    function app_nativeBridge(param) {
        WBAPP._nativeBridge(param);
    }

    function app_loadPage(pagetype, url, title, showarea = false, showpub = false, isfinish = true, top_right = false, is_recent = false, showsift = false, backtoroot = false) {
        WBAPP.loadPage(pagetype, url, title, showarea, showpub, isfinish, top_right, is_recent, showsift, backtoroot);
    }

    /**
     * app端页面跳转
     * @param nativeApp native跳转字符串型json
     * @param loadPage native跳转h5页面json {title:'',url:''}
     */
    function app_jumpPage(nativeApp, loadPage) {
        if (nativeApp) {
            let param = JSON.parse(nativeApp);
            app_nativeBridge(param);
        } else if (loadPage) {
            app_loadPage('link', loadPage.url, loadPage.title);
        } else {

        }
    }

    /**
     * 微聊
     * uname 用户名
     * nickname 昵称
     * online 是否在线
     * infoid  帖子id
     * url 帖子url
     * infoimg IM中经纪人头像url
     * catename 类别名称
     * price im来源中的价格
     * rootcateid 详情页所属大类id（归属）
     * cateid 详情页所属二级类id（归属）
     */
    function app_im(uid, uname, nickname, online, infoid) {
        let param = {
            "action": "im",
            "uid": uid,
            "uname": uname || '',
            "nickname": nickname || '',
            "online": online || '',
            "title": "",
            "url": "",
            "infoid": infoid || "",
            "infoimg": "",
            "catename": "",
            "price": "",
            "rootcateid": "",
            "cateid": ""
        };
        window.WBAPP._nativeBridge(param);
    }

    /**
     * cmd：show本地显示加载框  hide本地隐藏加载框
     */
    function app_loading(cmd = 'hide') {
        let param = {
            "action": "loadingbar",
            "cmd": cmd
        };
        window.WBAPP._nativeBridge(param);
    }

    function app_openFaceSdk(title, code, callback) {
        window.WBAPP.openFaceSdk(title, code, callback);
    }

    function app_os() {
        return window.WBAPP.os;
    }

    function app_appVersion() {
        return window.WBAPP.appVersion;
    }

    /**
     * 担保支付上线版本
     * @returns {*}
     */
    function app_appVersionOn() {
        let _version = '7.12.0';
        return _version;
    }
    /**
     * 提现解绑和绑定版本
     * @returns {*}
     */
    function app_appVersionOnBind() {
        let _version = '7.12.0';
        return _version;
    }

    /**
     * 人脸认证版本
     * @returns {*}
     */
    function app_appVersionFaceAuth() {
        return '7.10.0';
    }

    Vue.prototype.$app = {
        nativeBridge: app_nativeBridge,
        webLog: app_setWebLog,
        setTitle: app_setTitle,
        showDialog: app_showDialog,
        jumpPage: app_jumpPage,
        loadPage: app_loadPage,
        im: app_im,
        toastMsg: app_toastMsg,
        goBack: app_goBack,
        isLogin: app_isLogin,
        login: app_login,
        loading: app_loading,
        openFaceSdk: app_openFaceSdk,
        getOs: app_os,
        getAppVersion: app_appVersion,
        getAppVersionOn: app_appVersionOn,
        getAppVersionOnBind: app_appVersionOnBind,
        getAppVersionFaceAuth: app_appVersionFaceAuth,
    }
};