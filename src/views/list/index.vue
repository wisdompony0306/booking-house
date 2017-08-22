<!--
    desc:租房订单页
-->
<style rel="stylesheet/less" lang="less">
    @import './index.less';
</style>

<template>
    <div class="listBox">
        <PullRefresh :next="refresh" v-if="!errorShow">
            <!-- 租房订单列表 -->
            <ListComponent @gotoDetail="gotoDetail2" v-for="(item,index) in dataInfor" :key="index" :data-infor="item"
                           @itemAction="handlerEeleteOrder"/>
        </PullRefresh>

        <div v-if="errorShow" class="listError">
            <div class="logo"></div>
            <div class="msg" v-if="role==1">你还没有预订过房源喔～</div>
            <div class="msg" v-if="role==2">你还没有订单哦～</div>
            <div class="btn" v-if="role==1" @click="jumpPage()">去看看</div>
        </div>
        <Loading :isShow="isLoading"/>
    </div>
</template>
<script type="text/ecmascript-6">
    import {ListComponent, PullRefresh} from '../../components/index';
    import API from '../../service/api';

    export default {
        name: 'orderList',
        data() {
            return {
                isLoading: false,//后端加载状态
                role: this.$getParameter('role'),
                orderId: 0,
                dataInfor: {},
                errorShow: 0,
                //始终有的按钮
                generalBtn: {
                    btnShow: 1,
                    btnValue: '联系租客',
                    btnClass: 'connect',
                    noPhone: 1
                },
                /*埋点通用数据*/
                dataLog: {
                    pagetype: {
                       1:'renterlist',
                       2:'ownerlist',
                    }
                },
                //根据状态不同配置的按钮
                statusBtn: [
                    /*status=0*/
                    {},
                    /*待付款  status=1*/
                    {
                        btnShow: 0,               //按钮是否显示
                        btnValue: '',         //按钮文案
                        btnClass: '',         //按钮class名
                        tagValue: '',       //左上角tag文案，接口给返回，写''即可
                        tagClass: 'imgTagWait'   //左上角tag背景色. imgTagWait等待 imgTagSus成功  imgTagClo关闭
                    },
                    /*待房东确认  status=2*/
                    {
                        btnShow: 0,
                        btnValue: '',
                        btnClass: '',
                        tagValue: '',
                        tagClass: 'imgTagWait'
                    },
                    /*待租客确认  status=3*/
                    {
                        btnShow: 0,
                        btnValue: '',
                        btnClass: '',
                        tagValue: '',
                        tagClass: 'imgTagWait'
                    },
                    /*租客已确认  status=4*/
                    {
                        btnShow: 0,
                        btnValue: '',
                        btnClass: '',
                        tagValue: '',
                        tagClass: 'imgTagSus'
                    },
                    /*取消订单   status=5*/
                    {
                        btnShow: 1,
                        btnValue: '删除订单',
                        btnClass: 'connect',
                        tagValue: '',
                        tagClass: 'imgTagClo'
                    },
                    /*   status=6*/
                    {},
                    /* 交易成功  status=7*/
                    {
                        btnShow: 0,
                        btnValue: '',
                        btnClass: '',
                        tagValue: '',
                        tagClass: 'imgTagSus'
                    },
                    /* status=8*/
                    {
                        btnShow: 0,
                        btnValue: '',
                        btnClass: '',
                        tagValue: '',
                        tagClass: 'imgTagWait'
                    },
                    /* 房东拒绝退款  status=9*/
                    {
                        btnShow: 0,
                        btnValue: '',
                        btnClass: '',
                        tagValue: '',
                        tagClass: 'imgTagWait'
                    },
                    {
                        btnShow: 0,
                        btnValue: '',
                        btnClass: '',
                        tagValue: '',
                        tagClass: 'imgTagWait'
                    },
                    {
                        btnShow: 0,
                        btnValue: '',
                        btnClass: '',
                        tagValue: '',
                        tagClass: 'imgTagWait'
                    },
                    {
                        btnShow: 0,
                        btnValue: '',
                        btnClass: '',
                        tagValue: '',
                        tagClass: 'imgTagWait'
                    },
                    /*关闭交易   status=13*/
                    {
                        btnShow: 1,
                        btnValue: '删除订单',
                        btnClass: 'connect',
                        tagValue: '',
                        tagClass: 'imgTagClo',
                        btnEvent: 'deleteOrder'
                    },
                    {
                        btnShow: 0,
                        btnValue: '',
                        btnClass: '',
                        tagValue: '',
                        tagClass: 'imgTagWait'
                    },
                    {
                        btnShow: 0,
                        btnValue: '',
                        btnClass: '',
                        tagValue: '',
                        tagClass: 'imgTagWait'
                    },
                    /*提现之后   status=16*/
                    {
                        btnShow: 1,
                        btnValue: '删除订单',
                        btnClass: 'connect',
                        tagValue: '',
                        tagClass: 'imgTagClo',
                        btnEvent: 'deleteOrder'
                    }
                ]
            }
        },
        watch: {},
        created() {
        },
        mounted() {
            this.getOrderList();
            //埋点
            this.trackLog('show',this.$getParameter('role'));
        },
        methods: {
            /*租客订单详情埋点*/
            trackLog(actiontype,i){
                if (!actiontype) {
                    return;
                }
                let _this = this;
                let _pagetype = _this.dataLog.pagetype[i];
                _this.$app.webLog(actiontype, _pagetype);
            },
            refresh(){
                let _this = this;
                return new Promise((resolve, reject) => {
                    _this.getOrderList();
                    resolve();
                })
            },
            gotoDetail2(orderId){
                let _currentUrl = '';
                if (this.$getParameter('role') == 1) {
                    _currentUrl = window.location.protocol + "//houserent.m.58.com/order/get_renter_detail?orderId=" + orderId.order
                }
                if (this.$getParameter('role') == 2) {
                    _currentUrl = window.location.protocol + "//houserent.m.58.com/order/get_owner_detail?orderId=" + orderId.order
                }
                this.$app.loadPage('link', _currentUrl, '订金订单详情', 0, 0, 0);

            },
            handlerEeleteOrder(orderId){
                var _this = this;
                _this.orderId = orderId.order;
                _this.$app.showDialog('double', '删除确认弹窗', '确定删除此订单吗？', _this.deleteOrder, '我再想想', '确定删除');
            },
            deleteOrderCb(state, res){
                this.isLoading = false;
                var _this = this;
                if (res.code == 0) {
                    location.reload();
                } else {
                    _this.$app.toastMsg(res.message);
                    location.reload();
                }
            },
            deleteOrder(index){
                var _this = this;
                if (index == 1) {
                    this.isLoading = true;
                    _this.$request.jsonp({
                        url: API.deleteOrderOwner.url,
                        data: {
                            role: _this.$getParameter('role'),
                            orderId: _this.orderId,
                        },
                        callback: _this.deleteOrderCb,
                        jsonpName: "jsoncallback",
                    });
                }
                _this.trackLog('delete',_this.$getParameter('role'));
            },
            /*数据请求: 获取当前城市信息*/
            getOrderList() {
                this.isLoading = true;
                this.$request.jsonp({
                    url: API.getOrderList.url,
                    data: {
                        role: this.$getParameter('role'),
                        pageNum: 1
                    },
                    callback: this.getOrderListCb,
                    jsonpName: "jsoncallback",
                });
            },
            changeTime(time){
                var time1 = time.replace(/-/, "年");
                var time2 = time1.replace(/-/, "月");
                return time2 + '日';
            },
            getOrderListCb(state, res){
                this.isLoading = false;
                let _this = this;
                if (res.code == 0) {
                    _this.dataInfor = res.data.recordList;
                    if (res.data.recordList) {
                        let cellNum = res.data.recordList.length;

                        //设置文案
                        if (this.$getParameter('role') == 2) {
                            _this.generalBtn.btnValue = '联系租客';
                        } else {
                            _this.generalBtn.btnValue = '联系房东';
                        }

                        for (let i = 0; i < cellNum; i++) {
                            let status = res.data.recordList[i].status;

                            _this.statusBtn[status].tagValue = res.data.recordList[i].statusDes == null ? '' : res.data.recordList[i].statusDes ;

                            //获取房东和租客的电话号码
                            if(res.data.recordList[i].orderDetail==null){
                                res.data.recordList[i].orderDetail={
                                    buyerPhone:'',
                                    checkInDate:'',
                                    isSee:'',
                                    mihao:'',
                                    sellerCardId:'',
                                    sellerName:'',
                                    sellerPhone:'',
                                    weiliao:''
                                }
                            }
                            _this.dataInfor[i].buyerPhone = res.data.recordList[i].orderDetail.buyerPhone;
                            _this.dataInfor[i].sellerPhone = res.data.recordList[i].orderDetail.sellerPhone;

                            //租客端 按钮判断
                            //设置隐私通话或只支持微聊的房源，租客在(3待租客确认4租客已确认7交易成功8申请退款9卖家拒绝退款11申诉中12已延期)状态中，租客订单列表页展示房东电话按钮，其他状态均不展示。房东端始终展示租客电话。部分状态的订单可进行删除操作：租客：交易成功、交易关闭；房东：交易关闭、已提现
                            if(_this.role==1){
                                if(_this.dataInfor[i].sellerPhone!=''){
                                    if(status == 3 || status == 4 || status == 8 || status == 9 || status == 11 || status == 12){
                                        _this.dataInfor[i].btnInfor = [_this.generalBtn];
                                    }
                                    if(status == 7){
                                        _this.dataInfor[i].btnInfor = [_this.statusBtn[status],_this.generalBtn];
                                    }
                                    if(status == 13){
                                        _this.dataInfor[i].btnInfor = [_this.statusBtn[status]];
                                    }
                                }else{
                                    if(status == 13 || status == 7){
                                        //如果房东电话==空 并且 为13或者7状态的,显示删除按钮，其余的什么按钮都不显示
                                        _this.dataInfor[i].btnInfor = [_this.statusBtn[status]];
                                    }else{
                                        _this.dataInfor[i].btnInfor = [];
                                    }
                                }
                            }

                            //房东端 按钮判断
                            if(_this.role==2){
                                if(_this.dataInfor[i].buyerPhone!=''){
                                    //如果租客电话不为空
                                    if(status == 13 || status == 16){
                                        //如果房东电话不为空 并且 为13或者7状态的 就有两个按钮
                                        _this.dataInfor[i].btnInfor = [_this.statusBtn[status],_this.generalBtn];
                                    }else{
                                        _this.dataInfor[i].btnInfor = [_this.generalBtn];
                                    }
                                }else{
                                    if(status == 13 || status == 16){
                                        //如果房东电话==空 并且 为13或者7状态的
                                        _this.dataInfor[i].btnInfor = [_this.statusBtn[status]];
                                    }else{
                                        _this.dataInfor[i].btnInfor = [];
                                    }
                                }
                            }

                            _this.dataInfor[i].orderDetail.checkInDate = _this.changeTime(res.data.recordList[i].orderDetail.checkInDate);

                            // 逐条的向dataInfor（所有数据）里面加左上角tag数据
                            _this.dataInfor[i].tag = {
                                tagShow: 1,
                                tagValue: _this.statusBtn[status].tagValue,
                                tagClass: _this.statusBtn[status].tagClass
                            };
                        }
                    } else {
                        console.log('列表为空');
                        _this.errorShow = 1;
                    }
                } else {
                    console.error("jsonp请求失败");
                }
            },
            getCookie(c_name){
                if (document.cookie.length > 0) {
                    var c_start = document.cookie.indexOf(c_name + "=");
                    if (c_start != -1) {
                        c_start = c_start + c_name.length + 1
                        var c_end = document.cookie.indexOf(";", c_start)
                        if (c_end == -1) c_end = document.cookie.length
                        return unescape(document.cookie.substring(c_start, c_end))
                    }
                }
                return ""
            },
            jumpPage(){
                let _this = this;
                let city = _this.getCookie('58home');
                WBAPP.loadNativeList("house", "租房", "chuzu", "37031", '{"list_extra":"geren"}', '{"biz":"0","param9095":"2"}', false, city, 'https://apphouse.58.com/api/list/', false);
                 _this.trackLog('more',_this.$getParameter('role'));
            },
        },
        components: {
            ListComponent,
            PullRefresh,
        }
    }
</script>