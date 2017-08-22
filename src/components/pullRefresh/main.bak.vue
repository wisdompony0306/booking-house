<!--
    desc: 下拉刷新组件
-->
<style rel="stylesheet/less" lang="less">
    @height50: px2rem(50px);
    @fontSize24: px2rem(24px);
    .pullRefresh {
        width: 100vw;
        min-height: 100vh;
        overflow: auto;
        transition: 330ms;
        -webkit-overflow-scrolling: touch;

        .prText {
            width: 100%;
            margin: 0 auto;
            height: @height50;
            line-height: @height50;
            font-size: @fontSize24;
            text-align: center;
            color: #9B9B9B;
        }
    }
</style>

<template>
    <div class="pullRefresh" ref="container" @touchstart="handleStart" @touchmove="handleMove" @touchend="handleEnd">
        <div class="prText" v-if="isRefresh">
            {{message}}
        </div>
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                isRefresh: false,//是否显示刷新加载

                message: '',
                flag: 0, //表示是否达到刷新条件
                loading: 0, //表示是否正在刷新中
                startY: 0, //手指触摸屏幕的起点
                distance: 0, //手指滑动的距离
                maxDistance: 80, //最大距离
                minDistance: 55, //最小距离
            }
        },
        props: {
            next: { // 刷新函数
                type: Function,
                required: true
            }
        },
        methods: {
            handleStart(e){
                let _this = this;
                const container = _this.$refs.container;
                let scrollTop = container.scrollTop;

                if (scrollTop == 0) {
                    if (_this.loading) {
                        e.preventDefault();
                        return;
                    }
                    // 取第一个手指的触摸点作为起始点
                    _this.startY = e.targetTouches[0].clientY;
                } else {
                    _this.isRefresh = false;//关闭刷新功能
                }
            },
            handleMove(e){
                let _this = this;
                const container = _this.$refs.container;
                let scrollTop = container.scrollTop;

                if (scrollTop > 0) {
                    _this.isRefresh = false;//关闭刷新功能
                    return;
                }
                // 如果没有触摸起始点，返回
                if (!_this.startY) {
                    return;
                }
                if (_this.loading) {
                    e.preventDefault();
                    return;
                }
                let touch = e.targetTouches[0];
                _this.distance = touch.clientY - this.startY;
                if (_this.distance > 0) {
                    _this.isRefresh = true;//开启刷新功能
                    //e.preventDefault();
                    if (_this.distance < _this.maxDistance) {
                        const container = _this.$refs.container;
                        container.style.transform = 'translate(0, ' + this.$px2rem(this.distance) + ')';
                        if (_this.distance > _this.minDistance) {
                            _this.message = '释放刷新';
                            _this.flag = 1
                        } else {
                            _this.message = '下拉刷新'
                        }
                    }
                } else {
                    _this.isRefresh = false;//关闭刷新功能
                }
            },
            handleEnd(e){
                let _this = this;
                const container = _this.$refs.container;

                if (!_this.isRefresh) {
                    return;
                }
                if (_this.loading) {
                    e.preventDefault();
                    return;
                }
                if (_this.distance <= 0) {
                    return;
                }

                if (_this.flag && _this.distance > 0) {
                    container.style.transform = 'translate(0, ' + _this.$px2rem(50) + ')';
                    _this.loading = 1;
                    _this.message = '正在加载';
                    _this.next().then(() => {
                        _this.loading = 0;
                        _this.message = '';

                        _this.isRefresh = false;
                        _this.flag = 0;

                        container.style.transform = 'translate(0, 0)';
                        container.scrollTop = 0;
                        window.scrollTo(0, 0);
                    });
                    return;
                }
                // 重置变量
                _this.isRefresh = false;
                _this.message = '';
                _this.flag = 0;
                _this.loading = 0;
                //container.scrollTop = 0;
                //window.scrollTo(0, 0);
                container.style.transform = 'translate(0, 0)';
            },
        },
    }
</script>