<!--
    desc:租房订单发布
-->
<style rel="stylesheet/less" lang="less">
    @import './index.less';
</style>

<template>
    <div class="postBox">
        <!--页面提示-->
        <section class="tips"><i></i>{{orderTips}}</section>
        <!--房源信息-->
        <PostHouse :data-house="dataHouse"/>
        <!--预订表单信息-->
        <section class="formBox">
            <div class="rowBox lineBottom">
                <PostInput title="订金" type="tel" name="price" v-model="formData.price"
                           :rules="rules.price" placeholder="订金" :hasLine="true"/>
                <PostSelect title="入住日期" type="data" name="checkInDate" v-model="formData.checkInDate"
                            :rules="rules.checkInDate" placeholder="入住日期" @click="handlerClickCheckInDate"/>
            </div>
            <div class="rowBox lineBottom">
                <PostInput title="房东姓名" type="text" name="sellerName" v-model="formData.sellerName"
                           :rules="rules.sellerName" placeholder="房东姓名" :hasLine="false" width="1.0"/>
            </div>
            <div class="rowBox lineBottom">
                <PostInput title="房东身份证号" type="text" name="sellerCardId" v-model="formData.sellerCardId"
                           :rules="rules.sellerCardId" placeholder="房东身份证号"/>
            </div>
            <div class="rowBox lineBottom">
                <PostInput title="手机号" type="tel" name="buyerPhone" v-model="formData.buyerPhone"
                           :rules="rules.buyerPhone" placeholder="填写你的手机号"/>
            </div>
            <div class="rowBox">
                <PostRadio name="isSee" v-model="formData.isSee" :dataSource="dataSource.isSee" :rules="rules.isSee"
                           v-on:click="handleWeblog"/>
            </div>
        </section>
        <!--预订协议-->
        <section class="protocolJump">
            <i class="agreeIcon" :class="{checked:isProtocol}" @click="handlerClickProtocol"></i>
            同意
            <span class="openProtocol" @click="handleGoProtocol">租房保障协议</span>
        </section>
        <!--提交按钮-->
        <DetailBottomBar :data-position="dataBottomBar.barPosition">
            <DetailButton :data-button="dataButton" @click="handleClickButton"/>
        </DetailBottomBar>
        <!--警告提示-->
        <ShowAlert :text=dataDialog.text :button=dataDialog.cancelButton :next=dataDialog.confirmButton
                   v-model=dataDialog.show @nextStep='handlerDialogConfirm'/>
        <!--日期选择键盘-->
        <KeyboardSelect :show="keyboardShow" :dataSource="dataSource.checkInDate" :value="formData.checkInDate"
                        @confirm="handlerKeyboardConfirm"/>
        <!--协议弹窗-->
        <ProtocolDialog v-model="isProtocolShow"/>
        <!--加载提示-->
        <Loading :isShow="isLoading"/>
    </div>
</template>
<script type="text/ecmascript-6">
    import {
            Loading, PostHouse, PostRadio, PostInput, PostSelect,
            DetailBottomBar, DetailButton, ShowAlert, KeyboardSelect, ProtocolDialog
    } from '../../components/index';
    import API from '../../service/api';

    export default {
        name: 'orderBooking',
        data() {
            return {
                isLoading: false,//后端加载状态
                orderTips: '以下是订金有效性的重要依据,请确保在了解后再交订金。',
                infoId: '',
                isProtocol: true,//是否点击预订协议,默认点击
                isProtocolShow: false,//是否弹起协议弹窗
                keyboardShow: false,//键盘是否弹起
                dataHouse: {
                    infoId: '',
                    title: '',
                    picUrl: '',
                    area: '',
                    pLocalName: '',
                    pAreaLocalName: '',
                    chaoXiang: '',
                    price: '',
                    nativeApp: '',
                    buyerPhone: '',
                },
                increaseDay: 30,//入住日期 增加天数
                /*数据源*/
                dataSource: {
                    checkInDate: {
                        items: {},//对象
                        default: '',
                        tips: '我们建议 <span style="color: #FF552E;">1个月内</span>',
                    },
                    isSee: {
                        items: [{
                            value: '1',
                            text: '未看房',
                        }, {
                            value: '2',
                            text: '已看房',
                        }],
                        default: '1',
                    },
                },
                /*表单提交数据*/
                formData: {
                    /*订金*/
                    price: '',
                    /*入住日期*/
                    checkInDate: '',
                    /*房东姓名*/
                    sellerName: '',
                    /*房东身份证号*/
                    sellerCardId: '',
                    /*手机号*/
                    buyerPhone: '',
                    /*是否看房 1|0*/
                    isSee: '',
                },
                /*校验规则*/
                rules: {
                    price: {
                        required: true,
                        reg: '^[\\s\\S]+$#^([1-9]\\d{2}|1\\d{3}|2000)$',
                        msg: '请填写订金#订金范围为100-2000元，请先和房东协商',
                    },
                    checkInDate: {
                        required: true,
                        reg: '^[\\s\\S]+$',
                        msg: '请选择入住日期',
                    },
                    sellerName: {
                        required: true,
                        reg: '^[\\S]+$#^(.){2,5}$#^[\\w\\d\\s\\u4e00-\\u9fa5]*$',
                        msg: '请填写房东姓名#房东姓名最少2个字，最多5个字#房东姓名不能填写特殊符号',
                    },
                    sellerCardId: {
                        required: true,
                        reg: '^[\\s\\S]+$#^\\d{17}[0-9xX]$',
                        msg: '请填写房东身份证号#房东身份证号为18位,最后一位x大小写均可',
                    },
                    buyerPhone: {
                        required: true,
                        reg: '^[\\s\\S]+$#^1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|7[0-35-8])\\d{8}$',
                        msg: '请填写手机号#请填写有效手机号',
                    },
                    isSee: {
                        required: true,
                        reg: '^[\\s\\S]+$',
                        msg: '请选择是否看房',
                    },
                },
                dataBottomBar: {
                    barPosition: '',//控制按钮吸底
                },
                dataButton: {
                    text: '确定',
                    class: 'orange',
                },
                //显示弹框
                dataDialog: {
                    show: false,
                    text: '未看房交易订金有风险，找房东索要并准确填写姓名、身份证号码将降低被骗风险。',
                    cancelButton: '取消',
                    confirmButton: '继续',
                },
                /*页面跳转配置*/
                loadPage: {
                    /*租客订单详情页*/
                    renterDetail: {
                        title: "订金订单详情",
                        url: API.pageGetRenterDetail.url,//租客定金订单详情页面地址
                    }
                },
                pageHeight: window.innerHeight,
            }
        },
        created() {
            this.infoId = this.$getParameter("infoId");
            this.checkInDateInit();
        },
        mounted() {
            let _this = this;
            if (_this.infoId) {
                _this.getPostInfoById();//房源数据请求
            } else {
                _this.$app.showDialog("single", "提示", "页面请求错误,缺少infoId参数", function (index) {
                    _this.$app.goBack();
                }, "返回");
            }
            //页面展现埋点
            _this.$app.webLog("show", "renterinputpage");

            this.$eventHub.$on(this.$eventAction.INPUT_FOCUS, () => {
                this.dataBottomBar.barPosition = 'absolute';
            });
            this.$eventHub.$on(this.$eventAction.INPUT_BLUR, () => {
                this.dataBottomBar.barPosition = '';
            });
        },
        methods: {
            /*用户登录*/
            userLogin(){
                let _this = this;
                let _currentUrl = window.location.href;
                _this.$app.login(_currentUrl, "");
            },
            /*初始化入住日期*/
            checkInDateInit(){
                let _this = this;
                _this.checkInDateDataSource();
                _this.checkInDateDefaultValue();
            },
            /**
             * 计算起租日期数据源:
             * 起租日期：默认为今天，需要用户主动选择，
             * 最长时间不得超过：今日+30天。
             * 即不可预订1个月以后的房子。提示文案：只能预订1个月以内的房子
             */
            checkInDateDataSource(){
                let _this = this;
                let startDate = new Date(), endDate = new Date();
                endDate.setDate(endDate.getDate() + (this.increaseDay - 1));
                let dateObj = {};
                while ((endDate.getTime() - startDate.getTime()) >= 0) {
                    let year = startDate.getFullYear().toString();
                    let month = (startDate.getMonth() + 1).toString();
                    let day = startDate.getDate().toString();
                    if (dateObj[year] == undefined) {
                        dateObj[year] = {value: year, text: `${year}年`, items: {}};
                        dateObj[year]["items"][month] = {value: month, text: `${month}月`, items: {}};
                        dateObj[year]["items"][month]["items"][day] = {value: day, text: `${day}日`};
                    } else if (dateObj[year]["items"][month] == undefined) {
                        dateObj[year]["items"][month] = {value: month, text: `${month}月`, items: {}};
                        dateObj[year]["items"][month]["items"][day] = {value: day, text: `${day}日`};
                    } else if (dateObj[year]["items"][month]["items"][day] == undefined) {
                        dateObj[year]["items"][month]["items"][day] = {value: day, text: `${day}日`};
                    }
                    startDate.setDate(startDate.getDate() + 1);
                }
                _this.dataSource.checkInDate.items = dateObj;
            },
            /*起租日期默认时间*/
            checkInDateDefaultValue(){
                let checkInDate = new Date();
                let _checkInDate = [checkInDate.getFullYear(), checkInDate.getMonth() + 1, checkInDate.getDate()].join("-");
                this.dataSource.checkInDate.default = _checkInDate;
            },
            handlerClickCheckInDate(event){
                this.dataBottomBar.barPosition = 'absolute';
                let _this = this;
                if (_this.pageHeight == window.innerHeight) {
                    _this.keyboardShow = true;
                } else {
                    setTimeout(function () {
                        _this.keyboardShow = true;
                    }, 1000);
                }
            },
            getPostInfoById() {
                let _this = this;
                _this.isLoading = true;
                _this.$request.jsonp({
                    url: API.getPostInfoById.url,
                    data: {
                        infoId: _this.infoId,
                    },
                    callback: _this.getPostInfoByIdCb,
                    jsonpName: "jsoncallback",
                });
            },
            getPostInfoByIdCb(state, res){
                let _this = this;
                _this.isLoading = false;
                if (!state) {
                    this.$app.toastMsg("服务器接口异常");
                    return;
                }
                if (!res || res.code == undefined) {
                    this.$app.toastMsg("服务器接口数据异常");
                    return;
                }
                switch (+res.code) {
                    case 0://正常
                        if (res.data) {
                            ({
                                infoId: _this.dataHouse.infoId = '',
                                title: _this.dataHouse.title = '',
                                picUrl: _this.dataHouse.picUrl = '',
                                area: _this.dataHouse.area = '',
                                pLocalName: _this.dataHouse.pLocalName = '',
                                pAreaLocalName: _this.dataHouse.pAreaLocalName = '',
                                chaoXiang: _this.dataHouse.chaoXiang = '',
                                price: _this.dataHouse.price = '',
                                nativeApp: _this.dataHouse.nativeApp = '',
                                /*表单信息*/
                                buyerPhone: _this.formData.buyerPhone = _this.formData.buyerPhone,
                            } = res.data);
                        } else {
                            _this.$app.showDialog("single", "提示", "服务器房源数据异常", function (index) {
                                _this.$app.goBack();
                            }, "返回");
                        }
                        break;
                    case 1000007://未登录
                        _this.userLogin();//用户登录弹窗
                        break;
                    default:
                        _this.$app.showDialog("single", "提示", res.message, function (index) {
                            _this.$app.goBack();
                        }, "返回");
                        break;
                }
            },
            /*创建订单前*/
            createOrderBefore(){
                let _this = this;
                //是否通过协议
                if (_this.isProtocol) {
                    //表单验证
                    let _validateResult = this.formValidate();
                    if (_validateResult.state) {
                        let _formData = _this.formData;
                        //若未看房点击确定，需弹窗提示用户风险，仍然可以提交订单
                        if (_formData.isSee == "1") {
                            _this.dataDialog.show = true;
                        } else {
                            this.createOrder();
                        }
                    } else {
                        _this.$app.toastMsg(_validateResult.msg);
                    }
                }
            },
            createOrder(){
                //表单再次验证
                let _this = this;
                let _data = Object.assign(this.formData, {infoId: _this.infoId});
                _this.isLoading = true;
                _this.$request.post({
                    url: API.createOrder.url,
                    data: _data,
                    callback: _this.createOrderCb,
                });
            },
            createOrderCb(state, res){
                let _this = this;
                _this.isLoading = false;
                if (!state) {
                    this.$app.toastMsg("服务器接口异常");
                    return;
                }
                if (!res || res.code == undefined) {
                    this.$app.toastMsg("服务器接口数据异常");
                    return;
                }
                switch (+res.code) {
                    case 0:
                        if (res.data) {
                            let _loadPage = _this.loadPage.renterDetail;
                            let _url = _loadPage.url + "?orderId=" + res.data.orderId;//待确认的参数
                            _this.$app.loadPage('link', _url, _loadPage.title);
                        }
                        break;
                    case 1000007://请登录
                        _this.userLogin();
                        break;
                    case 1000008://请进行人脸识别
                        _this.$app.openFaceSdk("人脸认证", '3', (state) => {
                            if (state == 0) {
                                //认证成功 重新提交订单
                                _this.createOrderBefore();
                            } else if (state == 2) {
                                //取消认证操作
                                _this.$app.showDialog("single", "提示", "您取消了人脸认证,请先认证再进行其他操作", function (index) {
                                }, "确定");
                            } else {
                                _this.$app.showDialog("single", "提示", "人脸认证失败,请稍后再试!", function (index) {
                                }, "确定");
                            }
                        });
                        break;
                    case 1000009://已被预订
                        _this.$app.showDialog("single", "提示", res.message, function (index) {
                        }, "确认");
                        break;
                    default:
                        _this.$app.showDialog("single", "提示", res.message, function (index) {
                        }, "确定");
                        break;
                }
            },
            /*确认发布按钮*/
            handleClickButton(){
                let _this = this;
                //点击确定埋点
                _this.$app.webLog("confirm", "renterinputpage");
                //判断用户是否登录
                _this.$app.isLogin(function (data) {
                    if (data && data.state == true) {
                        _this.createOrderBefore();//创建订单
                    } else {
                        _this.userLogin();//用户登录
                    }
                });
            },
            handlerKeyboardConfirm(event, value){
                this.keyboardShow = false;
                this.formData.checkInDate = value;
                this.dataBottomBar.barPosition = '';
            },
            handlerClickProtocol(){
                let _this = this;
                if (_this.isProtocol) {
                    _this.isProtocol = false;
                    _this.dataButton.class = 'grey';
                } else {
                    _this.isProtocol = true;
                    _this.dataButton.class = 'orange';
                }
            },
            /*协议跳转*/
            handleGoProtocol(){
                let _this = this;
                _this.$app.webLog("contract", "renterinputpage");
                _this.isProtocolShow = true;
            },
            /*弹窗继续按钮*/
            handlerDialogConfirm(){
                this.dataDialog.show = true;
                this.createOrder();
            },
            /**
             * 遍历表单中有validate方法的元素,逐个进行校验
             * @param callback
             * @returns {boolean}
             */
            formValidate(){
                let _this = this;
                let _validateResult = {
                    state: true,
                    msg: ''
                };
                const _children = _this.$children;
                const _len = _children.length;
                if (_len) {
                    for (let i = 0; i < _len; ++i) {
                        const record = _children[i];
                        if (record && typeof record.validate === "function") {
                            const result = record.validate();
                            if (result && !result.state) {
                                _validateResult.state = result.state;
                                _validateResult.msg = result.msg;
                                break;
                            }
                        }
                    }
                }
                return _validateResult;
            },
            handleWeblog(value){
                let _this = this;
                if (value == 2) {
                    _this.$app.webLog("saw-click", "renterinputpage");
                } else {
                    _this.$app.webLog("nosee", "renterinputpage");
                }
            },
        },
        components: {
            Loading,
            PostHouse,
            PostInput,
            PostRadio,
            PostSelect,
            DetailBottomBar,
            DetailButton,
            ShowAlert,
            KeyboardSelect,
            ProtocolDialog,
        }
    }
</script>