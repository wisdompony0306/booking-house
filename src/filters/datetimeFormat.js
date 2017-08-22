/**
 * Created by lunachi on 2017/7/5.
 */
exports.install = (Vue) => {
    Vue.filter('datetimeFormat', function (value) {
        if (value) {
            let fullDate = value.split("-");
            if (fullDate.length >= 3) {
                return `${fullDate[0]}年${fullDate[1]}月${fullDate[2]}日`;
            }
        }
        return "";
    })
};



