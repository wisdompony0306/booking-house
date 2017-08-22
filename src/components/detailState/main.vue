<!--
    desc: 订单详情--状态组件
-->
<style rel="stylesheet/less" lang="less">
    @fontsize60: 30px;
    @fontsize28: 14px;
    .detailState {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: px2rem(520px);
        color: #fff;
        overflow: hidden;
        .dsTitle {
            margin: px2rem(98px) 0 0 px2rem(78px);
            width: 100%;
            //height: px2rem(84px);
            font-size: @fontsize60;
            line-height: px2rem(84px);
            display: -webkit-flex;
            display: flex;
            align-items: center;
            &:before {
                content: "";
                display: inline-block;
                width: px2rem(50px);
                height: px2rem(50px);
                margin: 0 px2rem(12px) 0 0;
            }
        }
        .dsDesc {
            position: absolute;
            top: px2rem(315px);
            left: 0;
            width: 100%;
            padding: 0 px2rem(80px);
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            font-size: @fontsize28;
            em {
                font-weight: bold;
            }
        }
        .dsSpline {
            position: absolute;
            top: px2rem(278px);
            left: px2rem(80px);
            width: px2rem(240px);
            height: 1px;
            background: #fff;
        }
        /*等待(进行态) */
        &.wait {
            background: #F1A82A;
            .dsTitle:before {
                width: px2rem(50px);
                height: px2rem(50px);
                background: data-uri("./images/detailState_wait.png") no-repeat;
                background-size: cover;
            }
        }

        /*退款(进行态)*/
        &.refund {
            background: #F1A82A;
            .dsTitle:before {
                width: px2rem(56px);
                height: px2rem(52px);
                background: data-uri("./images/detailState_refund.png") no-repeat;
                background-size: cover;
            }
        }
        /*仲裁(进行态)*/
        &.arbitration {
            background: #F1A82A;
            .dsTitle:before {
                width: px2rem(51px);
                height: px2rem(51px);
                background: data-uri("./images/detailState_arbitration.png") no-repeat;
                background-size: cover;
            }
        }
        /*完成(完成态)*/
        &.complete {
            background: #2FB033;
            .dsTitle:before {
                width: px2rem(50px);
                height: px2rem(50px);
                background: data-uri("./images/detailState_complete.png") no-repeat;
                background-size: cover;
            }

        }
        /*拒绝退款(完成态)*/
        &.rejectRefund {
            background: #FF7758;
            .dsTitle:before {
                width: px2rem(56px);
                height: px2rem(52px);
                background: data-uri("./images/detailState_refund.png") no-repeat;
                background-size: cover;
            }
        }
        /*关闭(完成态)*/
        &.close {
            background: #A0AAAD;
            .dsTitle:before {
                width: px2rem(50px);
                height: px2rem(50px);
                background: data-uri("./images/detailState_close.png") no-repeat;
                background-size: cover;
            }
        }
    }
</style>

<template>
    <section class="detailState" :class="[state.class]">
        <div class="dsTitle" v-html="state.title"></div>
        <div class="dsSpline"></div>
        <div class="dsDesc" v-html="state.desc"></div>
    </section>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                statusEnum: {
                    1: {
                        class: 'wait',
                        dataTime: 'buyerPayDeadline',//租客支付截至时间,对应dataState传递的值
                        desc: '待付款',
                    },
                    2: {
                        class: 'wait',
                        dataTime: 'sellerDeadline',//房东确认截至时间,对应dataState传递的值
                        desc: '待房东确认',
                    },
                    3: {
                        class: 'wait',
                        dataTime: 'buyerDeadline',//租客确认截至时间,对应dataState传递的值
                        desc: '待确认入住',
                    },
                    6: {
                        class: 'wait',
                        desc: '提现中',
                    },
                    7: {
                        class: 'complete',
                        desc: '交易成功',
                    },
                    8: {
                        class: 'refund',
                        dataTime: 'sellerRefundDeadline',//待房东确认是否退款的截至时间,对应dataState传递的值
                        desc: '申请退款中',
                    },
                    9: {
                        class: 'rejectRefund',
                        dataTime: 'buyerAppealDeadline',
                        desc: '房东拒绝退款',
                    },
                    10: {
                        class: 'refund',
                        desc: '退款中',
                    },
                    11: {
                        class: 'arbitration',
                        dataTime: 'sellerAppealDeadline',
                        desc: '调解中',
                    },
                    13: {
                        class: 'close',
                        desc: '交易关闭',
                    },
                    14: {
                        class: 'close',
                        desc: '提现失败',
                    },
                    15: {
                        class: 'close',
                        desc: '退款失败',
                    },
                    16: {
                        class: 'complete',
                        desc: '已提现',
                    },
                },
                /*intervalTimer: null,
                countDownTime: '',*/
            }
        },
        props: {
            dataState: {
                type: Object,
                default: function () {
                    return {
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
                    }
                }
            }
        },
        /*
         * 没有直接替换属性dataState的值,方便定位数据
         */
        computed: {
            state(){
                let _this = this;
                let _title = _this.dataState.statusDes;
                let _desc = _this.dataState.statusAct;
                let _class = '';

                let _state = _this.dataState.status;
                let _stateConfig = _this.statusEnum[_state];
                if (_stateConfig) {
                    _class = _stateConfig.class;
                    if (_stateConfig.dataTime && _this.dataState[_stateConfig.dataTime]) {
                        //alert(_this.dataState[_stateConfig.dataTime]);
                        let [_dateTimeStart,_dateTimeEnd]=[_this.dataState.nowTime, _this.dataState[_stateConfig.dataTime]];
                        let _time = _this.toDateFormat(_dateTimeStart, _dateTimeEnd);//时间倒计时
                        _desc = _desc.replace("#time#", _time);
                    }
                }
                return {
                    title: _title,
                    desc: _desc,
                    class: _class,
                };
            },
        },
        methods: {
            toDateFormat(startDateStr, endDateStr){
                let _this = this;
                //校验
                if (!(startDateStr && typeof startDateStr === 'string' && endDateStr && typeof endDateStr === 'string')) {
                    return;
                }
                let [_milliscond,_oneMinuteSecond,_oneHourSecond,_oneDaySecond]=[1000, 60, 60 * 60, 24 * 60 * 60];
                let _startDate = new Date(startDateStr.replace(/-/g, "/"));
                let _endDate = new Date(endDateStr.replace(/-/g, "/"));
                let _totalSecond = Math.floor((_endDate.getTime() - _startDate.getTime()) / _milliscond);

                if (_totalSecond >= 0) {
                    let days = Math.floor(_totalSecond / _oneDaySecond);
                    let hours = Math.floor((_totalSecond - days * _oneDaySecond) / _oneHourSecond);
                    let minutes = Math.floor((_totalSecond - days * _oneDaySecond - hours * _oneHourSecond) / _oneMinuteSecond);
                    let seconds = Math.floor(_totalSecond - days * _oneDaySecond - hours * _oneHourSecond - minutes * _oneMinuteSecond);

                    let _dateFormat = '';
                    if (_totalSecond >= _oneDaySecond) {
                        _dateFormat = `<em>[ ${days}天${hours}小时${minutes}分钟 ]</em>`;
                    } else if (_totalSecond >= _oneHourSecond) {
                        _dateFormat = `<em>[ ${hours}小时${minutes}分钟 ]</em>`;
                    } else if (_totalSecond >= _oneMinuteSecond) {
                        _dateFormat = `<em>[ ${minutes}分钟 ]</em>`;
                    } else {
                        _dateFormat = `<em>[ ${seconds}秒 ]</em>`;
                    }
                    return _dateFormat;
                } else {
                    return '';
                }
            },

            /**
             * 时间倒计时
             * yyyy-MM-dd hh:mm:ss时间格式存在兼容性问题,app里会出现转换为NaN的情况 应改成yyyy/MM/dd hh:mm:ss再转成时间
             */
            /*countDownDateTime(startDateStr, endDateStr){
                let _this = this;
                //校验
                if (!(startDateStr && typeof startDateStr === 'string' && endDateStr && typeof endDateStr === 'string')) {
                    return;
                }
                let [_milliscond,_oneMinuteSecond,_oneHourSecond,_oneDaySecond]=[1000, 60, 60 * 60, 24 * 60 * 60];
                let _startDate = new Date(startDateStr.replace(/-/g, "/"));
                let _endDate = new Date(endDateStr.replace(/-/g, "/"));
                let _totalSecond = Math.floor((_endDate.getTime() - _startDate.getTime()) / _milliscond);
                if (_totalSecond <= 0) {
                    console.log("开始时间大于结束时间,不做任何操作");
                    return;
                }

                _this.intervalTimer = window.setInterval(function () {
                    if (_totalSecond >= 0) {
                        let days = Math.floor(_totalSecond / _oneDaySecond);
                        let hours = Math.floor((_totalSecond - days * _oneDaySecond) / _oneHourSecond);
                        let minutes = Math.floor((_totalSecond - days * _oneDaySecond - hours * _oneHourSecond) / _oneMinuteSecond);
                        let seconds = Math.floor(_totalSecond - days * _oneDaySecond - hours * _oneHourSecond - minutes * _oneMinuteSecond);

                        let _dateFormat = '';
                        if (_totalSecond >= _oneDaySecond) {
                            _dateFormat = `${days}天${hours}小时${minutes}分钟`;
                        } else if (_totalSecond >= _oneHourSecond) {
                            _dateFormat = `${hours}小时${minutes}分钟`;
                        } else if (_totalSecond >= _oneMinuteSecond) {
                            _dateFormat = `${minutes}分钟`;
                        } else {
                            _dateFormat = `${seconds}秒`;
                        }
                        _totalSecond--;
                        _this.countDownTime = _dateFormat;
                    } else {
                        //刷新接口,停止倒计时
                        _this.$eventHub.$emit(_this.$eventAction.ORDER_TIMEOUT, _this);
                        window.clearInterval(_this.intervalTimer);
                    }
                }, _milliscond);
            },*/
        }
    };
</script>