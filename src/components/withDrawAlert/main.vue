<style rel="stylesheet/less" lang="less">
    @fontsize22: 11px;
    @fontsize34: 17px;
    .message {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 399;

        .backmask {
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, .7);

            display: flex;
            display: -webkit-flex;
            justify-content: center;
            align-items: center;

        }
        .content {
            background-color: #FFF;
            width: 72vw;
            text-align: center;
            &_avatar {
                background-color: #FFF;
                width: 72vw;
                padding-top: px2rem(60px);
                img{
                    width: px2rem(160px);
                    height: px2rem(160px);
                    background-size: 100% 100%;
                    border-radius: px2rem(80px);
                }
            }
            &_nickname{
                font-family: PingFangSC-Regular;
                padding-top: px2rem(10px);
                font-size: 14px;
                color: #000;
                line-height: px2rem(42px);
                text-align: center;
            }
            &_info {
                // padding-top: px2rem(52px);
                padding-bottom: px2rem(52px);
                &_pic{
                    display: inline-block;
                    width: px2rem(24px);
                    height:px2rem(24px);
                    margin-bottom: px2rem(30px);
                    background: data-uri("//img.58cdn.com.cn/fangrs/img/f5388b2449453580df4c6155b183e819.png");
                    background-size: 100% 100%;
                    overflow: hidden; 
                }
                &_text{
                    text-align: center;
                    display: inline-block;
                    width: px2rem(374px);
                    font-size: @fontsize22;
                    color: #AAAAAA;
                    line-height: px2rem(32px);
                }
            }
            &_button {
                background: #FFF;
                &_wx {
                    line-height: px2rem(88px);
                    font-size: @fontsize34;
                    color: #FF552E;
                }
                &_other {
                    
                    line-height: px2rem(88px);
                    font-size: @fontsize34;
                    color: #666;
                    border-top: 1px solid #F3F3F3;
                }
                &_cancle {
                    
                    line-height: px2rem(88px);
                    font-size: @fontsize34;
                    color: #666;
                    border-top: 1px solid #F3F3F3;
                }
            }

        }
    }
</style>

<template>
    <div class="message" v-if=value>
        <div class="backmask">
            <div class="content">
                <div class="content_avatar">
                    <img :src="image_url">
                </div>
                <div class="content_nickname">{{nickname}}</div>
                <div class="content_info">
                    <div class="content_info_pic"></div>
                    <div class="content_info_text">{{text}}</div>
                </div>
                <div class="content_button">
                    <div @click="handleWx" class="content_button_wx">{{button_wx}}</div>
                    <div @click="handleOther" class="content_button_other">{{button_other}}</div>
                    <div @click="handleCancle" class="content_button_cancle">{{button_cancle}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'withDrawAlert',
        props: {
            'value': {
                type: Boolean,
                required: true
            },
            'image_url':{
                type: String,
                required: true
            },
            'nickname':{
                type: String,
                required: true
            },
            'text': {
                type: String,
                required: true
            },
            'button_wx': {
                type: String,
                required: true
            },
            'button_other': {
                type: String,
                required: true
            },
            'button_cancle': {
                type: String,
                required: true
            }
        },
        data() {
            return {}
        },
        computed: {},
        methods: {
            
            handleWx(){
                this.$emit('handleWx', true);
            },
            handleOther(){
                this.$emit('handleOther', false);
            },
            handleCancle(){
                this.$emit('input', false);
            },
        }
    }
</script>