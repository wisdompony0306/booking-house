/**
 * Created by lunachi on 2017/7/10.
 */

exports.install = (Vue) => {

    //从当前URL里面提取参数值
    Vue.prototype.$getParameter = name => {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    };

    /**
     * desc:px转rem
     * @param px 没有单位
     * @returns {string}
     */
    Vue.prototype.$px2rem = (px = 0) => {
        let rem = px / 75 + 'rem';
        return rem;
    };

    /**
     * version1>=version2 true
     * version1<version2 false
     * 以逗号分隔的两个字符串比较大小
     * @param version1
     * @param version2
     * @returns {*}
     */
    Vue.prototype.$compareEgt = (version1, version2) => {
        if (typeof version1 !== 'string' || typeof version2 !== 'string') {
            return false;
        }
        let version1Arr = version1.split('.');
        let version2Arr = version2.split('.');
        let len = version1Arr.length > version2Arr.length ? version1Arr.length : version2Arr.length;
        for (let i = 0; i < len; i++) {
            let v1 = version1Arr[i] ? parseInt(version1Arr[i]) : 0;
            let v2 = version2Arr[i] ? parseInt(version2Arr[i]) : 0;
            if (v1 == v2) {

            } else if (v1 > v2) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    };

};