var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.set('jsonp callback name', 'jsoncallback');

    //=S 模板页面设置
    app.get('/', function (req, res) {
        res.render('test/demo');
    });
    app.get('/demo', function (req, res) {
        res.render('test/demo');
    });

    app.get('/order/create_order', function (req, res) {
        res.render('html/post');
    });
    app.get('/order/get_agreement', function (req, res) {
        res.render('html/agreement');
    });
    app.get('/order/get_order_list', function (req, res) {
        res.render('html/list');
    });
    app.get('/order/get_owner_detail', function (req, res) {
        res.render('html/detailOwner');
    });
    app.get('/order/get_renter_detail', function (req, res) {
        res.render('html/detailRenter');
    });

    function getDateString() {
        let _date = new Date();
        let _s = parseInt(100 * Math.random());
        let _time = _date.getTime() + _s * 1000;
        let _date1 = new Date(_time);
        let year = _date1.getFullYear().toString();
        let month = (_date1.getMonth() + 1).toString();
        let day = _date1.getDate().toString();
        let hour = _date1.getHours().toString();//小时
        let minute = _date1.getMinutes().toString();//分
        let second = _date1.getSeconds().toString();//秒
        let _dateStr = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        return _dateStr;
    }

    //=E 模板页面设置
    //获取订单信息接口

    app.get('/order/api_get_order_info_by_id', function (req, res) {
        var query = req.query;
        console.log("query=", query);

        let {orderId, role, status, jsoncallback}=query;

        var resultJson = {};

        resultJson = {
            "code": 0,
            "message": "success",
            "data": {
                "orderId": "4769011150107196",
                "bizCode": 11,
                "status": 16,
                "statusDes": "\u5df2\u63d0\u73b0",
                "statusAct": "\u5df2\u63d0\u73b0\u6210\u529f\uff0c\u8bf7\u5728\u5fae\u4fe1\u96f6\u94b1\u4e2d\u67e5\u6536",
                "buyerId": 18666226342150,
                "sellerId": 40977436182805,
                "createTime": "2017-07-18 18:50:12",
                "infoDetail": {
                    "infoId": 30611034085681,
                    "title": "\u5c06\u5e9c\u5bb6\u56ed\u5c0f\u533a 2\u5ba42\u53852\u536b",
                    "picUrl": "http:\/\/pic4.58cdn.com.cn\/mobile\/big\/n_v1bkuymc6ygbnvthtjc5uq.jpg",
                    "area": "100.0",
                    "pLocalName": "\u671d\u9633",
                    "pAreaLocalName": "\u5c06\u53f0\u8def",
                    "chaoXiang": "\u5357",
                    "price": "5000",
                    "nativeApp": "{\"action\":\"pagetrans\",\"tradeline\":\"house\",\"content\":{\"action\":\"pagetrans\",\"countType\":\"\",\"full_path\":\"1,8\",\"infoID\":30611034085681,\"infoSource\":\"14\",\"list_name\":\"zufang\",\"local_name\":\"bj\",\"pagetype\":\"detail\",\"title\":\"\\u8be6\\u60c5\",\"use_cache\":true,\"userId\":40977436182805,\"data_url\":\"https:\\\/\\\/apphouse.58.com\\\/api\\\/detail\\\/\"}}"
                },
                "orderDetail": {
                    "sellerName": "\u9ad8\u5c0f\u6d32",
                    "sellerCardId": "152628199203290234",
                    "buyerPhone": "18500096333",
                    "sellerPhone": "",
                    "checkInDate": "2017-7-18",
                    "isSee": "2",
                    "mihao": 1,
                    "weiliao": 0,
                    "buyerName": "\u5218\u9633",
                    "buyerPic": "http:\/\/pic.58.com\/m1\/bigimage\/n_v21e623c29ca7243fca892774f16c4d828.jpg",
                    "sellerPic": "http:\/\/pic.58.com\/m1\/bigimage\/n_v27d4b8b5e8e0a486bad74695dedfded7f.jpg"
                },
                "totalAmount": 1,
                "buyerDeadline": "2017-07-25 00:00:00",
                "sellerDeadline": "2017-07-19 18:52:49",
                "sellerRefundDeadline": "2017-07-20 19:04:49",
                "buyerAppealDeadline": "2017-07-20 19:04:49",
                "sellerAppealDeadline": "2017-07-20 19:04:49",
                "buyerPayDeadline": "2017-07-18 20:23:41",
                "transferNo": null,
                "cateDispid": 8,
                "cateListname": "zufang",
                "cityDispid": 1,
                "cityListname": "bj",
                "payTime": "2017-07-18 18:52:49",
                "nowTime": "2017-07-18 20:23:41",

                "agreeTime": '2017-07-18 18:52:49',//房东同意出租时间
                "checkinTime": '2017-07-18 18:52:49',//租客确认入住时间
                "closeTime": '2017-07-18 18:52:49',//交易关闭时间
                "successTime": '2017-07-18 18:52:49',//交易成功时间
            }
        };

        if (status == 1) {
            console.log("1 api_get_order_info_by_id status=", status);
            //待付款
            resultJson = {
                "code": 0,
                "message": "success",
                "data": {
                    "orderId": "4744011150925802",
                    "bizCode": 11,
                    "status": 1,
                    "statusDes": "\u5f85\u4ed8\u6b3e",
                    "statusAct": "#time# \u8bf7\u5728\u89c4\u5b9a\u65f6\u95f4\u5185\u5b8c\u6210\u652f\u4ed8\uff0c\u82e5\u8d85\u65f6\u7cfb\u7edf\u5c06\u81ea\u52a8\u53d6\u6d88\u8ba2\u5355",
                    "buyerId": 18666226342150,
                    "sellerId": 18529529655814,
                    "createTime": "2017-07-17 17:23:40",
                    "infoDetail": {
                        "infoId": 28728641441334,
                        "title": "\u5e73\u8c37\u9a6c\u574a\u9996\u57ce 3\u5ba42\u5385 134\u5e73\u7c73 \u7cbe\u88c5\u4fee \u534a\u5e74\u4ed8",
                        "picUrl": "http:\/\/pic4.58cdn.com.cn\/mobile\/big\/n_v1bkuymc6ygbnvthtjc5uq.jpg",
                        "area": "134.0",
                        "pLocalName": "",
                        "pAreaLocalName": "",
                        "chaoXiang": "\u5357\u5317",
                        "price": "2500",
                        "nativeApp": "{\"action\":\"pagetrans\",\"tradeline\":\"house\",\"content\":{\"action\":\"pagetrans\",\"countType\":\"\",\"full_path\":\"1,8\",\"infoID\":28728641441334,\"infoSource\":\"0\",\"list_name\":\"zufang\",\"local_name\":\"bj\",\"pagetype\":\"detail\",\"title\":\"\\u8be6\\u60c5\",\"use_cache\":true,\"userId\":18529529655814,\"data_url\":\"https:\\\/\\\/apphouse.58.com\\\/api\\\/detail\\\/\"}}"
                    },
                    "orderDetail": {
                        "sellerName": "\u5218\u9633",
                        "sellerCardId": "152628199203290234",
                        "buyerPhone": "18500096333",
                        "sellerPhone": "",
                        "checkInDate": "2017-7-17",
                        "isSee": "2",
                        "buyerName": "baishikele313313",
                        "buyerPic": "http:\/\/img.58cdn.com.cn\/ui8\/house\/detail\/images\/defaulthead.png",
                        "sellerPic": "http:\/\/img.58cdn.com.cn\/ui8\/house\/detail\/images\/defaulthead.png"
                    },
                    "totalAmount": 1,
                    "buyerDeadline": "2017-07-24 00:00:00",
                    "sellerRefundDeadline": "2017-07-19 17:23:40",
                    "sellerAppealDeadline": "2017-07-19 17:23:40",
                    "tradeNo": "",
                    "buyerPayDeadline": "2017-07-17 17:53:40",
                    "tid": "111074",
                    "sign": "FC1263F3A8597AD41501DBAED2F5867C",
                    "cateDispid": 8,
                    "cateListname": "zufang",
                    "cityDispid": 1,
                    "cityListname": "bj",
                    "nowTime": "2017-07-17 17:23:41"
                }
            };
        } else if (status == 2) {
            console.log("2 api_get_order_info_by_id status=", status);
            //已付款
            resultJson = {
                "code": 0,
                "message": "success",
                "data": {
                    "orderId": "4744011150925802",
                    "bizCode": 11,
                    "status": 2,
                    "statusDes": "\u5f85\u623f\u4e1c\u786e\u8ba4",
                    "statusAct": "#time# \u7b49\u5f85\u623f\u4e1c\u786e\u8ba4\u4e2d\uff0c\u623f\u4e1c\u8d85\u65f6\u4e0d\u786e\u8ba4\u5c06\u81ea\u52a8\u53d6\u6d88\u8ba2\u5355",
                    "buyerId": 18666226342150,
                    "sellerId": 18529529655814,
                    "createTime": "2017-07-17 17:23:40",
                    "infoDetail": {
                        "infoId": 28728641441334,
                        "title": "\u5e73\u8c37\u9a6c\u574a\u9996\u57ce 3\u5ba42\u5385 134\u5e73\u7c73 \u7cbe\u88c5\u4fee \u534a\u5e74\u4ed8",
                        "picUrl": "http:\/\/pic6.58cdn.com.cn\/p1\/big\/n_v1bj3gzr3qzj5fquwuvjba.jpg",
                        "area": "134.0",
                        "pLocalName": "",
                        "pAreaLocalName": "",
                        "chaoXiang": "\u5357\u5317",
                        "price": "2500",
                        "nativeApp": "{\"action\":\"pagetrans\",\"tradeline\":\"house\",\"content\":{\"action\":\"pagetrans\",\"countType\":\"\",\"full_path\":\"1,8\",\"infoID\":28728641441334,\"infoSource\":\"0\",\"list_name\":\"zufang\",\"local_name\":\"bj\",\"pagetype\":\"detail\",\"title\":\"\\u8be6\\u60c5\",\"use_cache\":true,\"userId\":18529529655814,\"data_url\":\"https:\\\/\\\/apphouse.58.com\\\/api\\\/detail\\\/\"}}"
                    },
                    "orderDetail": {
                        "sellerName": "\u5218\u9633",
                        "sellerCardId": "152628199203290234",
                        "buyerPhone": "18500096333",
                        "sellerPhone": "",
                        "checkInDate": "2017-7-17",
                        "isSee": "2",
                        "buyerName": "baishikele313313",
                        "buyerPic": "http:\/\/img.58cdn.com.cn\/ui8\/house\/detail\/images\/defaulthead.png",
                        "sellerPic": "http:\/\/img.58cdn.com.cn\/ui8\/house\/detail\/images\/defaulthead.png"
                    },
                    "totalAmount": 1,
                    "buyerDeadline": "2017-07-24 00:00:00",
                    "sellerDeadline": "2017-07-18 17:24:07",
                    "sellerRefundDeadline": "2017-07-19 17:24:07",
                    "sellerAppealDeadline": "2017-07-19 17:24:07",
                    "tradeNo": "2017071717232121163421506683",
                    "cateDispid": 8,
                    "cateListname": "zufang",
                    "cityDispid": 1,
                    "cityListname": "bj",
                    "payTime": "2017-07-17 17:24:07",
                    "nowTime": "2017-07-17 17:24:10"
                }
            };
        }

        res.jsonp(resultJson);
    });

    //取消订单接口
    app.post('/order/DeleteOrder', function (req, res) {
        var query = req.query;
        var body = req.body;
        console.log("query\n", query, "body\n", body);

        var resultJson = {};
        resultJson = {
            code: 0,
            message: "success",
            data: {}
        };
        res.jsonp(resultJson);
    });


    //删除订单接口
    app.get('/order/api_cancel_order', function (req, res) {
        var query = req.query;
        var body = req.body;
        console.log("query\n", query, "body\n", body);

        var resultJson = {};
        resultJson = {
            code: 0,
            message: "success",
            data: {}
        };

        res.jsonp(resultJson);
    });


    //租客退款接口
    app.post('/order/api_apply_refund', function (req, res) {
        var query = req.query;
        var body = req.body;
        console.log("query\n", query, "body\n", body);

        var resultJson = {};
        resultJson = {
            code: 0,
            message: "success",
            data: {}
        };

        res.jsonp(resultJson);
    });

    //租客确认入住接口
    app.get('/order/api_get_order_list', function (req, res) {
        var query = req.query;
        var body = req.body;
        console.log("query\n", query, "body\n", body);

        var resultJson = {};
        resultJson = {
            "code": 0,
            "message": "success",
            "data": {
                "currentPage": 1,
                "pageSize": 5,
                "totalCount": 33,
                "totalPage": 7,
                "recordList": [{
                    "orderId": "170710011105288690",
                    "status": 13,
                    "statusDes": "\u4ea4\u6613\u5173\u95ed",
                    "infoDetail": {
                        "infoId": 27006604788800,
                        "title": "1 \u6c38\u6cf0\u4e1c\u91cc 2\u5ba41\u5385 \u6b21\u5367 \u671d\u5317 \u7cbe\u88c5\u4fee",
                        "picUrl": "http:\/\/pic7.58cdn.com.cn\/mobile\/big\/n_v1bkuyfvoox4zvtzg6vjuq.jpg",
                        "area": "12.0",
                        "pLocalName": "\u6d77\u6dc0",
                        "pAreaLocalName": "\u897f\u4e09\u65d7",
                        "chaoXiang": "",
                        "price": "2200"
                    },
                    "orderDetail": {
                        "sellerName": "\u6d4b\u6d4b",
                        "sellerCardId": "123456789012345678",
                        "buyerPhone": "18810667777",
                        "sellerPhone": "15910610825",
                        "checkInDate": "2017-7-10",
                        "isSee": "2"
                    }
                }, {
                    "orderId": "170710011105450980",
                    "status": 13,
                    "statusDes": "\u4ea4\u6613\u5173\u95ed",
                    "infoDetail": {
                        "infoId": 30399190216886,
                        "title": "2 \u4e16\u7eaa\u4e1c\u65b9\u5609\u56ed(\u5357\u533a) 1\u5ba41\u53851\u536b",
                        "picUrl": "http:\/\/pic7.58cdn.com.cn\/mobile\/big\/n_v1bj3gzr2nmzbftofnyysa.jpg",
                        "area": "70.0",
                        "pLocalName": "\u671d\u9633",
                        "pAreaLocalName": "\u5357\u78e8\u623f",
                        "chaoXiang": "\u5357",
                        "price": "5600"
                    },
                    "orderDetail": {
                        "sellerName": "\u54c8\u54c8\u54c8\u54c8",
                        "sellerCardId": "555553333366666444",
                        "buyerPhone": "18810667777",
                        "sellerPhone": "18600407338",
                        "checkInDate": "2017-7-10",
                        "isSee": "2"
                    }
                }, {
                    "orderId": "170710011105968872",
                    "status": 13,
                    "statusDes": "\u4ea4\u6613\u5173\u95ed",
                    "infoDetail": {
                        "infoId": 26440166621232,
                        "title": "3 \u65b0\u5bab\u5bb6\u56ed\u5317\u533a 2\u5ba41\u5385 \u6b21\u5367 \u671d\u5357\u5317 \u7cbe\u88c5\u4fee",
                        "picUrl": "http:\/\/pic1.58cdn.com.cn\/p1\/big\/n_v1bkuymczh7ruvpdh3gj5q.jpg",
                        "area": "86.0",
                        "pLocalName": "\u4e30\u53f0",
                        "pAreaLocalName": "\u65b0\u5bab",
                        "chaoXiang": "",
                        "price": "2200"
                    },
                    "orderDetail": {
                        "sellerName": "\u6d4b\u6d4b",
                        "sellerCardId": "123456789012345678",
                        "buyerPhone": "18810667777",
                        "sellerPhone": "18610827208",
                        "checkInDate": "2017-7-10",
                        "isSee": "1"
                    }
                }, {
                    "orderId": "170710011105211822",
                    "status": 13,
                    "statusDes": "\u4ea4\u6613\u5173\u95ed",
                    "infoDetail": {
                        "infoId": 30565648973639,
                        "title": "4 \u9a9a\u5b50\u8425\u540e\u8857 1\u5ba41\u53851\u536b",
                        "picUrl": "http:\/\/pic6.58cdn.com.cn\/p1\/big\/n_v2ac6396c4e1c24e119347e6ca7a70c9e4.jpg",
                        "area": "25.0",
                        "pLocalName": "\u6d77\u6dc0",
                        "pAreaLocalName": "\u8096\u5bb6\u6cb3",
                        "chaoXiang": "\u5357\u5317",
                        "price": "2500"
                    },
                    "orderDetail": {
                        "sellerName": "hhh",
                        "sellerCardId": "555556666633333555",
                        "buyerPhone": "18810667777",
                        "sellerPhone": "13161179794",
                        "checkInDate": "2017-7-10",
                        "isSee": "2"
                    }
                }, {
                    "orderId": "170701011105863460",
                    "status": 13,
                    "statusDes": "\u4ea4\u6613\u5173\u95ed",
                    "infoDetail": {
                        "infoId": 23125638648224,
                        "title": "5 \u9996\u5ea7\u5fa1\u56ed 2\u5ba41\u53851\u536b",
                        "picUrl": "http:\/\/pic6.58cdn.com.cn\/p1\/big\/n_v2eae12ad12bea4b4eb90b9f2678d04797.jpg",
                        "area": "79.0",
                        "pLocalName": "",
                        "pAreaLocalName": "",
                        "chaoXiang": "\u5357\u5317",
                        "price": "2300"
                    },
                    "orderDetail": {
                        "sellerName": "\u6d4b\u6d4b",
                        "sellerCardId": "123456789012345678",
                        "buyerPhone": "18810667777",
                        "sellerPhone": "13911256362",
                        "checkInDate": "2017-7-10",
                        "isSee": "1"
                    }
                }, {
                    "orderId": "170701011105863460",
                    "status": 13,
                    "statusDes": "\u4ea4\u6613\u5173\u95ed",
                    "infoDetail": {
                        "infoId": 23125638648224,
                        "title": "6 \u9996\u5ea7\u5fa1\u56ed 2\u5ba41\u53851\u536b",
                        "picUrl": "http:\/\/pic6.58cdn.com.cn\/p1\/big\/n_v2eae12ad12bea4b4eb90b9f2678d04797.jpg",
                        "area": "79.0",
                        "pLocalName": "",
                        "pAreaLocalName": "",
                        "chaoXiang": "\u5357\u5317",
                        "price": "2300"
                    },
                    "orderDetail": {
                        "sellerName": "\u6d4b\u6d4b",
                        "sellerCardId": "123456789012345678",
                        "buyerPhone": "18810667777",
                        "sellerPhone": "13911256362",
                        "checkInDate": "2017-7-10",
                        "isSee": "1"
                    }
                }, {
                    "orderId": "170701011105863460",
                    "status": 13,
                    "statusDes": "\u4ea4\u6613\u5173\u95ed",
                    "infoDetail": {
                        "infoId": 23125638648224,
                        "title": "7 \u9996\u5ea7\u5fa1\u56ed 2\u5ba41\u53851\u536b",
                        "picUrl": "http:\/\/pic6.58cdn.com.cn\/p1\/big\/n_v2eae12ad12bea4b4eb90b9f2678d04797.jpg",
                        "area": "79.0",
                        "pLocalName": "",
                        "pAreaLocalName": "",
                        "chaoXiang": "\u5357\u5317",
                        "price": "2300"
                    },
                    "orderDetail": {
                        "sellerName": "\u6d4b\u6d4b",
                        "sellerCardId": "123456789012345678",
                        "buyerPhone": "18810667777",
                        "sellerPhone": "13911256362",
                        "checkInDate": "2017-7-10",
                        "isSee": "1"
                    }
                }, {
                    "orderId": "170701011105863460",
                    "status": 13,
                    "statusDes": "\u4ea4\u6613\u5173\u95ed",
                    "infoDetail": {
                        "infoId": 23125638648224,
                        "title": "8 \u9996\u5ea7\u5fa1\u56ed 2\u5ba41\u53851\u536b",
                        "picUrl": "http:\/\/pic6.58cdn.com.cn\/p1\/big\/n_v2eae12ad12bea4b4eb90b9f2678d04797.jpg",
                        "area": "79.0",
                        "pLocalName": "",
                        "pAreaLocalName": "",
                        "chaoXiang": "\u5357\u5317",
                        "price": "2300"
                    },
                    "orderDetail": {
                        "sellerName": "\u6d4b\u6d4b",
                        "sellerCardId": "123456789012345678",
                        "buyerPhone": "18810667777",
                        "sellerPhone": "13911256362",
                        "checkInDate": "2017-7-10",
                        "isSee": "1"
                    }
                }]
            }
        };

        res.jsonp(resultJson);
    });

    app.get('/order/api_get_post_info_by_id', function (req, res) {
        var query = req.query;
        console.log("query=", query);
        var resultJson = {
            code: 0,//状态码 0表示成功,非0表示失败
            message: "success",//状态信息
            data: {
                infoId: '30388787454515',//帖子id
                title: '安慧里五区 1室1厅1卫',//帖子标题
                picUrl: '//pic1.58cdn.com.cn/anjuke_58/17a84101fd6df5f6cf8f990d8cff5a73',//帖子图片
                area: '60',//面积 单位【㎡】前端控制
                pLocalName: '朝阳',//区域
                pAreaLocalName: '亚运村',//商圈
                chaoXiang: '南',//朝向 【朝】前缀 前端控制
                price: '1650',//月租金 单元【元/月】前端控制
                nativeApp: '',//详情页native形式,
                //loadPage: '{title:"详情",url:""}',//【去掉】详情页非native,与nativeApp互斥
            }
        };
        res.jsonp(resultJson);
    });
};



