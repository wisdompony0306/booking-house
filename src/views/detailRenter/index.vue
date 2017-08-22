<!--
    desc:租房订单租客详情
-->
<style rel="stylesheet/less" lang="less">
    @import './index.less';
</style>

<template>
    <div class="detailRenterBox">
        <DetailState :data-state="dataState"/>
        <DetailPerson :data-user="dataPerson"
                      @clickUser="trackLog(dataLog.person.ownerphoto)"
                      @clickChat="trackLog(dataLog.person.im)"
                      @clickTel="trackLog(dataLog.person.tel)"/>
        <DetailHouse :data-house="dataHouse" @clickInfo="trackLog(dataLog.house.info)"/>
        <Detailbooking :data-booking="dataBooking"/>
        <DetailOrder :data-order="dataOrder"/>

        <DetailBottomBar v-if="Object.keys(dataButtons).length>0">
            <DetailButton :data-button="dataButton" v-for="(dataButton,index) in dataButtons"
                          :key="'DetailButton_'+index" @click="handlerClickButton(dataButton)"/>
        </DetailBottomBar>
        <Loading :isShow="isLoading"/>
    </div>
</template>

<script type="text/ecmascript-6">
    import {
            DetailState,
            DetailPerson,
            DetailHouse,
            Detailbooking,
            DetailOrder,
            DetailButton,
            DetailBottomBar
    } from '../../components/index';

    import API from '../../service/api';

    export default {
        name: 'orderDetailRenter',
        data() {
            return {
                isLoading: false,//后端加载状态
                orderId: '',
                /* 身份 1:租客，2:房东*/
                role: '1',
                sign: '',
                bizCode: '',//付款接口需要的业务码
                tid: '',//支付接口需要
                cateDispid: '',
                cateListname: '',
                cityDispid: '',
                cityListname: '',
                /*订单状态数据*/
                dataState: {
                    status: '',
                    statusDes: '',
                    statusAct: '',
                    buyerPayDeadline: '',
                    buyerDeadline: '',
                    sellerDeadline: '',
                    sellerRefundDeadline: '',
                    buyerAppealDeadline: '',
                    sellerAppealDeadline: '',
                    nowTime: '',//接口系统当前时间,用于有倒计时的情况下计算时间
                },
                /*房东信息数据*/
                dataPerson: {
                    role: '2',
                    userid: '',
                    pic: '',
                    name: '',
                    cardId: '',
                    phone: '',
                    infoId: '',
                },
                /*帖子信息数据*/
                dataHouse: {
                    infoId: '',
                    title: '',
                    picUrl: '',
                    area: '',
                    pLocalName: '',
                    pAreaLocalName: '',
                    chaoXiang: '',
                    price: '',
                    buyerPhone: '',
                },
                /*预订数据*/
                dataBooking: {
                    checkInDate: '',
                    totalAmount: '',
                },
                /*订单数据*/
                dataOrder: {
                    orderId: '',
                    tradeNo: '',
                    transferNo: '',
                    createTime: '',
                    payTime: '',
                    agreeTime: '',
                    checkinTime: '',
                    closeTime: '',
                    successTime: '',

                },
                /*埋点通用数据*/
                dataLog: {
                    pagetype: 'renterdetail',
                    person: {
                        ownerphoto: 'ownerphoto',
                        im: 'im',
                        tel: 'tel',
                    },
                    house: {
                        info: 'info',
                    },
                },
                /*订单状态与操作枚举数据*/
                statusButtonEnum: {
                    /*待付款*/
                    1: {
                        cancel: {
                            text: '取消订单',
                            class: 'grey',
                            action: 'cancel',
                            dialog: {
                                title: '',
                                content: '取消后您可再次预定房源，但14天内最多预定3条。',
                                text1: '我再想想',
                                text2: '取消订单',
                            },
                            log: 'dfkcancle',//埋点
                        },
                        pay: {
                            text: '微信付款',
                            class: 'orange',
                            action: 'pay',
                            log: 'pay',//埋点
                        },
                    },
                    /*待房东确认*/
                    2: {
                        cancel: {
                            text: '取消订单',
                            class: 'grey',
                            action: 'cancel',
                            dialog: {
                                title: '',
                                content: '取消后订金将于3个工作日内退还至支付账户。',
                                text1: '我再想想',
                                text2: '取消订单',
                            },
                            log: 'dfdqrcancle',//埋点
                        },
                    },
                    /*待确认入住*/
                    3: {
                        cancel: {
                            text: '取消订单',
                            class: 'grey lineRight',
                            action: 'cancel',
                            dialog: {
                                title: '',
                                content: '依据《租房保障协议》，主动取消订单后订金将直接打给房东。确定取消订单吗?',
                                text1: '我再想想',
                                text2: '取消订单',
                            },
                            log: 'dqrrzcancle',//埋点
                        },
                        refund: {
                            text: '退款',
                            class: 'grey',
                            action: 'refund',
                            dialog: {
                                title: '是否退款',
                                content: '申请退款后，若房东同意退款或在48小时内未操作，订金将退还至您的支付账户。确认申请退款吗？',
                                text1: '我再想想',
                                text2: '申请退款',
                            },
                            log: 'refund',//埋点
                        },
                        checkIn: {
                            text: '确认入住',
                            class: 'orange',
                            action: 'checkIn',
                            dialog: {
                                title: '是否确认入住',
                                content: '请确保和房东#name#签定租房合同并入住后再点击[确认入住]，点击后订金将直接打给房东并冲抵租金。确定已经入住吗？',
                                text1: '我再想想',
                                text2: '确认入住',
                            },
                            log: 'checkin',//埋点
                        },
                    },
                    /*房东拒绝退款*/
                    9: {
                        arbitration: {
                            text: '发起调解',
                            class: 'grey',
                            action: 'arbitration',
                            dialog: {
                                title: '是否发起调解',
                                content: '申请调解后，您只有一次机会上传房东违约的证据，供58工作人员审核。确认申请调解吗？',
                                text1: '我再想想',
                                text2: '申请调解',
                            },
                            loadPage: {
                                title: "",
                                url: API.plaintiff.url,
                            },
                            log: 'arbitrate',//埋点
                        },
                    },
                },
            }
        },
        computed: {
            dataButtons(){
                let _this = this;
                let _buttons = {};
                if (_this.statusButtonEnum[_this.dataState.status]) {
                    _buttons = _this.statusButtonEnum[_this.dataState.status]
                }
                return _buttons;
            },
        },
        created() {
            this.orderId = this.$getParameter("orderId");
        },
        mounted() {
            let _this = this;
            if (_this.orderId) {
                _this.getOrderInfoById();
            } else {
                _this.$app.showDialog("single", "提示", "页面请求错误,缺少orderId参数", function (index) {
                    _this.$app.goBack();
                }, "返回");
            }
            //埋点
            _this.trackLog('show');
        },
        methods: {
            /*租客订单详情埋点*/
            trackLog(actiontype){
                if (!actiontype) {
                    return;
                }
                let _this = this;
                let _pagetype = _this.dataLog.pagetype;
                _this.$app.webLog(actiontype, _pagetype);
            },
            /**
             * 获取订单信息接口
             */
            getOrderInfoById(){
                let _this = this;
                _this.isLoading = true;
                let _timestamp = (new Date()).getTime();
                _this.$request.jsonp({
                    url: API.getOrderInfoById.url,
                    data: {
                        orderId: _this.orderId,
                        role: _this.role,
                        random: _timestamp,
                    },
                    callback: _this.getOrderInfoByIdCb,
                    jsonpName: "jsoncallback",
                });
            },
            getOrderInfoByIdCb(state, res){
                let _this = this;
                _this.isLoading = false;
                if (!state) {
                    this.$app.toastMsg("服务器接口异常");
                    return;
                }
                if (!res) {
                    this.$app.toastMsg("服务器接口数据异常");
                    return;
                }

                if (res.code == 0 && res.data) {
                    ({
                        /*订单状态数据*/
                        status: _this.dataState.status = '',
                        statusDes: _this.dataState.statusDes = '',
                        statusAct: _this.dataState.statusAct = '',
                        buyerPayDeadline: _this.dataState.buyerPayDeadline = '',
                        buyerDeadline: _this.dataState.buyerDeadline = '',
                        sellerDeadline: _this.dataState.sellerDeadline = '',
                        sellerRefundDeadline: _this.dataState.sellerRefundDeadline = '',
                        buyerAppealDeadline: _this.dataState.buyerAppealDeadline = '',
                        sellerAppealDeadline: _this.dataState.sellerAppealDeadline = '',
                        nowTime: _this.dataState.nowTime = '',
                        /*租客或房东数据*/
                        sellerId: _this.dataPerson.userid = '',
                        orderDetail: {
                            sellerPic: _this.dataPerson.pic = '',
                            sellerName: _this.dataPerson.name = '',
                            sellerCardId: _this.dataPerson.cardId = '',
                            sellerPhone: _this.dataPerson.phone = '',
                        },
                        infoDetail: {
                            infoId: _this.dataPerson.infoId = '',
                        },
                        /*房源数据*/
                        infoDetail: {
                            infoId: _this.dataHouse.infoId = '',
                            title: _this.dataHouse.title = '',
                            picUrl: _this.dataHouse.picUrl = '',
                            area: _this.dataHouse.area = '',
                            pLocalName: _this.dataHouse.pLocalName = '',
                            pAreaLocalName: _this.dataHouse.pAreaLocalName = '',
                            chaoXiang: _this.dataHouse.chaoXiang = '',
                            price: _this.dataHouse.price = '',
                            nativeApp: _this.dataHouse.nativeApp = '',
                        },
                        /*预订数据*/
                        totalAmount: _this.dataBooking.totalAmount = '',
                        orderDetail: {
                            checkInDate: _this.dataBooking.checkInDate = '',
                        },
                        /*订单信息*/
                        orderId: _this.dataOrder.orderId = '',
                        createTime: _this.dataOrder.createTime = '',
                        tradeNo: _this.dataOrder.tradeNo = '',
                        transferNo: _this.dataOrder.transferNo = '',
                        payTime: _this.dataOrder.payTime = '',
                        agreeTime: _this.dataOrder.agreeTime = '',
                        checkinTime: _this.dataOrder.checkinTime = '',
                        successTime: _this.dataOrder.successTime = '',
                        closeTime: _this.dataOrder.closeTime = '',
                        /*其他信息*/
                        sign: _this.sign = '',
                        cateDispid: _this.cateDispid = '',
                        cateListname: _this.cateListname = '',
                        cityDispid: _this.cityDispid = '',
                        cityListname: _this.cityListname = '',
                        bizCode: _this.bizCode = '',
                        tid: _this.tid = '',
                    } = res.data);
                } else if (res.code == 1000007) {//用户未登陆
                    this.userLogin();
                } else {
                    _this.$app.showDialog("single", "提示", res.message, function (index) {
                    }, "确定");
                }
            },
            /**
             * 订单详情按钮操作
             */
            handlerClickButton(dataButton){
                let _this = this;
                let _action = dataButton.action;
                //埋点
                let _log = dataButton.log;
                if (_log && _log != '') {
                    _this.trackLog(_log);
                }
                //具体操作
                switch (_action) {
                    case 'cancel'://取消订单
                        if (dataButton.dialog) {
                            let _dialog = dataButton.dialog;
                            _this.$app.showDialog('double', _dialog.title, _dialog.content, _this.cancelOrder, _dialog.text1, _dialog.text2);
                        }
                        break;
                    case 'pay'://付款
                        _this.payOrder();
                        break;
                    case 'refund'://退款
                        if (dataButton.dialog) {
                            let _dialog = dataButton.dialog;
                            _this.$app.showDialog('double', _dialog.title, _dialog.content, _this.applyRefund, _dialog.text1, _dialog.text2);
                        }
                        break;
                    case 'checkIn'://确认入住
                        if (dataButton.dialog) {
                            let _dialog = dataButton.dialog;
                            let _content = _dialog.content.replace("#name#", _this.dataPerson.name);
                            _this.$app.showDialog('double', _dialog.title, _content, _this.confirmOrder, _dialog.text1, _dialog.text2);
                        }
                        break;
                    case 'arbitration'://发起调解
                        if (dataButton.dialog) {
                            let _dialog = dataButton.dialog;
                            _this.$app.showDialog('double', _dialog.title, _dialog.content, _this.arbitrationOrder, _dialog.text1, _dialog.text2);
                        }
                        break;
                    default:
                        break;
                }
            },
            /*支付订单操作*/
            payOrder(){
                let _this = this;
                //版本控制
                let _currentAppVersion = _this.$app.getAppVersion();
                let _onAppVersion = _this.$app.getAppVersionOn();
                let isEgt = _this.$compareEgt(_currentAppVersion, _onAppVersion);
                if (!isEgt) {
                    _this.$app.showDialog("single", "版本过低", "升级58app至最新版本才可微信付款哦~", function (index) {
                    }, "好");
                    return;
                }
                _this.isLoading = true;
                _this.$request.jsonp({
                    url: API.wxAppPay.url,
                    data: {
                        orderNo: _this.orderId,
                        bizCode: _this.bizCode,
                        sign: _this.sign,
                        tid: _this.tid,
                        orderExpireTime: _this.dataState.buyerPayDeadline,
                    },
                    callback: _this.payOrderCb,
                    jsonpName: "jsonpCallback",
                });
            },
            /*支付订单操作回调*/
            payOrderCb(state, res){
                let _this = this;

                if (res && res.data && res.code && res.code == 1) {
                    window.payOrderWechatCallback = function (state) {
                        if (state == 0) {//成功
                            _this.isLoading = true;
                            window.setTimeout(function () {
                                _this.getOrderInfoById();//页面从新渲染数据
                            }, 6000);
                        } else if (state == -1) {//错误
                            _this.$app.toastMsg("付款操作错误,请稍后再试!");
                        } else if (state == -2) {//用户取消
                            _this.$app.toastMsg("您取消了支付操作,如需付款,请再次点击付款按钮!");
                        } else {
                            _this.$app.toastMsg("付款数据异常,请稍后再试!");
                        }
                    };

                    let _data = res.data;
                    if (typeof _data === "string") {
                        _data = JSON.parse(_data);
                    }
                    let param = {
                        "action": "wechat_pay",
                        "appid": _data.appid,
                        "partnerid": _data.partnerid,
                        "prepayid": _data.prepayid,
                        "package": _data.package,
                        "noncestr": _data.noncestr,
                        "timestamp": _data.timestamp,
                        "sign": _data.sign,
                        "callback": "payOrderWechatCallback"
                    };
                    setTimeout(function () {
                        _this.isLoading = false;
                        _this.$app.nativeBridge(param);
                    }, 500);
                } else if (res) {
                    _this.isLoading = false;
                    _this.$app.toastMsg(res.message);
                } else {
                    _this.isLoading = false;
                    _this.$app.toastMsg("服务器接口数据异常");
                }
            },
            /**
             * 取消订单操作
             * index: native showDialog 按钮索引
             */
            cancelOrder(index){
                if (index == 1) {
                    this.buttonRequest(API.cancelOrder.url);
                }
            },
            /**
             * 租客申请退款操作
             * index: native showDialog 按钮索引
             */
            applyRefund(index){
                if (index == 1) {
                    this.buttonRequest(API.applyRefund.url);
                }
            },
            /**
             * 租客确认入住操作
             * index: native showDialog 按钮索引
             */
            confirmOrder(index){
                if (index == 1) {
                    this.buttonRequest(API.confirmOrder.url);
                }
            },
            /**
             *  申请仲裁操作
             */
            arbitrationOrder(index){
                if (index == 1) {
                    let _this = this;
                    let _loadPage = _this.statusButtonEnum[9].arbitration.loadPage;
                    let _url = _loadPage.url + "?orderNo=" + _this.orderId + "&redirectUrl=" + window.location.href;
                    _this.$app.loadPage('link', _url, _loadPage.title, !1, !1, !1);
                }
            },
            /**
             * 按钮操作数据请求
             * requestUrl: 操作请求URL
             */
            buttonRequest(requestUrl){
                let _this = this;
                _this.isLoading = true;
                _this.$request.jsonp({
                    url: requestUrl,
                    data: {
                        orderId: _this.orderId,
                        role: _this.role,
                    },
                    jsonpName: "jsoncallback",
                    callback: _this.buttonRequestCb
                });
            },
            buttonRequestCb(state, res){
                let _this = this;
                _this.isLoading = false;
                if (!state) {
                    _this.$app.toastMsg("服务器接口异常");
                    return;
                }
                if (res.code == 0) {
                    _this.isLoading = true;
                    window.setTimeout(function () {
                        _this.getOrderInfoById();//页面从新渲染数据
                    }, 3000);
                } else {
                    _this.$app.toastMsg(res.message);
                }
            },

        },
        components: {
            DetailState,
            DetailPerson,
            DetailHouse,
            Detailbooking,
            DetailOrder,
            DetailButton,
            DetailBottomBar,
        }
    }
</script>