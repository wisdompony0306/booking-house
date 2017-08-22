<!--
    desc:demo
-->
<style rel="stylesheet/less" lang="less">
    .demoBox {
        margin: px2rem(30px);
        a {
            display: block;
            height: px2rem(46px);
            line-height: px2rem(46px);
            font-size: 12px;
        }
    }
</style>

<template>
    <div class="demoBox">
        <a :href="template.url" v-for="template in templates">{{template.title}}</a>
    </div>
</template>
<script>
    export default {
        name: 'demo',
        data() {
            return {
                templates: [{
                    title: '预订协议 agreement',
                    url: "/order/get_agreement"
                }, {
                    title: '预订填写post',
                    url: "/order/create_order"
                }, {
                    title: '订单列表 list',
                    url: "/order/get_order_list"
                }, {
                    title: '订单详情房东端 detailOwner',
                    url: "/order/get_owner_detail"
                }, {
                    title: '订单详情租客端 detailRenter',
                    url: "/order/get_renter_detail"
                }],
            }
        }
    }
</script>