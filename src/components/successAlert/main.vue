<style rel="stylesheet/less" lang="less">
    @fontsize28: 14px;
    @fontsize34: 17px;
    .message {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 299;
        
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
            padding: 0;
            &_text{
                    text-align: center;
                    font-size: @fontsize28;
                    color: #666;
                    line-height: px2rem(40px);
                    padding-bottom: 0;
            }
            &_avatar {
                background-color: #FFF;
                img{
                    width: px2rem(140px);
                    height: px2rem(140px);
                    background-size: 100% 100%;
                    border-radius: px2rem(70px);
                }
            }
            &_nickname{
                font-family: PingFangSC-Regular;
                padding-top: px2rem(10px);
                padding-bottom: px2rem(50px);
                font-size: @fontsize28;
                color: #000;
                line-height: px2rem(42px);
                text-align: center;
            }
            &_button {
                line-height: px2rem(88px);
                font-size: @fontsize34;
                color: #FF552E;
                border-top: 1px solid #F3F3F3;
            }

        }
    }
</style>

<template>
    <div class="message" v-if=value>
        <div class="backmask">
            <div class="content">
                <div class="content_text">{{text}}</div>
                <div class="content_avatar">
                    <img :src="image_url">
                </div>
                <div class="content_nickname">{{nickname}}</div>
                <div class="content_button"  @click="handleOk">{{button}}</div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'successAlert',
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
            'button': {
                type: String,
                required: true
            },
        },
        data() {
            return {}
        },
        computed: {},
        methods: {
            handleOk(){
                 this.$emit('handleOk', false);
            },
        }
    }
</script>