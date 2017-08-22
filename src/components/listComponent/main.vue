<!--
    desc: loading组件
-->
<style rel="stylesheet/less" lang="less">
    .listComponent{
    margin-top:px2rem(20px);
    padding:px2rem(37px);
    background:#fff;
    overflow:hidden;
    dl{
        overflow:hidden;
        margin:0;
    }
    dt{
        position:relative;
        width:px2rem(150px);
        float:left;
        margin-top: 1px;
    }
    dd{
        width:px2rem(520px);
        float:right;
        margin:0;
    }
    .img{
        width:px2rem(140px);
        height:px2rem(105px);
        background:url('//img.58cdn.com.cn/fangrs/img/7d97970cd430765c8644d6048afb781c.png');
        background-size:cover;
        background-cover:center;
    }
    
    .imgTagSeccess{
        background:#45B78D;
    }
    .imgTagClose{
        background:#666;
    }
    .title{
        font-size:px2rem(24px);
        color:#000;
        line-height:px2rem(33px);
        margin-bottom:px2rem(10px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .details{
        font-size:px2rem(22px);
        margin-bottom:px2rem(11px);
        color:#999;
        line-height:px2rem(30px);
        float:left;
    }
    .detailsWrap{
        position:relative;
        overflow:hidden;
    }
    .satus{
        float:right;
        font-size:px2rem(26px);
        color:#FF552E;
        line-height:px2rem(35px);
    }
    .price{
        font-size:px2rem(22px);
        color:#000;
        line-height:px2rem(30px);
        span{
            font-size:px2rem(22px);
            color:#000;
            line-height:px2rem(30px);
            margin-right:2px;
            font-size:px2rem(26px);
        }
    }
    .imgTagSus{
        color:#999;
    }
    .imgTagWait{
        color:#FF5C37;
    }
    .imgTagClo{
        color:#ccc;
    }
    .btn{
        float:right;
        margin:px2rem(30px) 0 px2rem(0px);
        margin-left:px2rem(20px);
    }
    .btn1{
        width:px2rem(128px);
        height:px2rem(58px);
        font-size:px2rem(20px);
        color:#666;
        background:#fff;
        line-height:px2rem(58px);
        text-align:center;
        border-radius: px2rem(150px);
        padding:0 px2rem(10px);
        border: 1px solid rgba(153,153,153,0.5);
        border-radius: px2rem(2px);
    }
    .btn2{
        font-size:px2rem(20px);
        color:#666;
        background:#fff;
        display:block;
        width:px2rem(128px);
        height:px2rem(58px);
        text-align:center;
        line-height:px2rem(58px);
        border-radius: px2rem(150px);
        padding:0 px2rem(10px);
        border: 1px solid rgba(153,153,153,0.5);
        border-radius: px2rem(2px);
    }
    .otherWrap{
        overflow:hidden;
        line-height:px2rem(70px);
        padding-bottom:px2rem(10px);
        font-size:px2rem(24px);
        color:#000;
        .time{
            float:left;
        }
        .guarantee{
            float:right;
            .num{
                font-size:px2rem(38px);
                color:#333;
            }
            span.imgTagSus{
            color:#999;
            }
            span.imgTagWait{
                color:#FF5C37;
            }
            span.imgTagClo{
                color:#ccc;
            }
        }
    }
    .btnWrap{
        position:relative;
    }
    .line{
        width:100%;
        height:1px;
        background:#F3F3F3;
        position: absolute;
        left: 0;
        top: 0;
    }
}

div.imgTagClo{
    dl{
        color:#ccc;
        dd{
            div.title{
                color:#ccc;
            }
            div.details{
                color:#ccc;
            }
            div.price{
                color:#ccc;
                span{
                    color:#ccc;
                }
            }
        }
    }
    div.otherWrap{
        color:#ccc;
        div.guarantee{
            span.num{
                color:#ccc;
            }
        }
    }
}

</style>

<template>
    <div class="listComponent hairlines" :class="dataInfor.tag.tagClass">
        <dl @click="gotoDe(dataInfor.orderId)">
           <dt>
               <div class="img" :style="'background-image: url('+ dataInfor.infoDetail.picUrl +');'"></div>
               <!-- <div v-if="dataInfor.tag.tagShow" :class="dataInfor.tag.tagClass" >{{dataInfor.tag.tagValue}}</div> -->
           </dt>
           <dd>
               <div class="title">{{dataInfor.infoDetail.title}}</div>
               <div class="detailsWrap">
                   <div class="details">{{dataInfor.infoDetail.pLocalName}} <span v-if="dataInfor.infoDetail.pLocalName || dataInfor.infoDetail.pAreaLocalName">-</span>{{dataInfor.infoDetail.pAreaLocalName}} {{dataInfor.infoDetail.area}} <span v-if="dataInfor.infoDetail.chaoXiang">朝</span>{{dataInfor.infoDetail.chaoXiang}}</div>
                   <div class="satus" v-if="dataInfor.tag.tagShow" :class="dataInfor.tag.tagClass">{{dataInfor.tag.tagValue}}</div>
               </div>
               <div class="price" v-if="dataInfor.infoDetail.price">
                   <span>{{dataInfor.infoDetail.price}}</span>元/月
               </div>
           </dd>
        </dl>
        <div class="otherWrap">
            <div class="time"  v-if="dataInfor.orderDetail.checkInDate">入住时间:{{dataInfor.orderDetail.checkInDate}}</div>
            <div class="guarantee">58担保交易:订金 <span class="num"  :class="dataInfor.tag.tagClass">{{ dataInfor.totalAmount ||  500 }}</span><span :class="dataInfor.tag.tagClass"> 元</span></div>
        </div>
        
        <div class="btnWrap">
            <div class="btn" v-for="(item,index) in dataInfor.btnInfor" :key="index" v-if="item.btnShow" >
                <div class="line"></div>
                <div class="btn1" v-if="!item.noPhone" :class="item.btnClass" @click="deleteOrder(dataInfor.orderId)">{{ item.btnValue }}</div>
                <a class="btn2" v-if="item.noPhone" :class="item.btnClass" :href="'tel:'+dataInfor.sellerPhone" @click="trackLogw(roleNum)" >
                    {{ item.btnValue }}
                </a>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            dataInfor:{
                type: Object,
                default: function () {
                    return {
                        role:1,
                        orderId: '',
                        status: '',
                        totalAmount:'',
                        infoDetail: {
                            infoId: "25303286832562",
                            title: "贵园东里 三居室 中间楼层 全齐 离地铁近 随时看房",
                            picUrl: "http://pic6.58cdn.com.cn/anjuke_58/0ed84bafe4620476f6fe6f8883ed91ea?w=294&h=220&crop=1",
                            area: "26㎡",
                            pLocalName: "朝阳",
                            pAreaLocalName: "亚运村",
                            chaoXiang: "主",
                            price: "2000元",

                        },
                        orderDetail: {
                            sellerName: "小明",
                            sellerCardId: "12345199505051234",
                            buyerPhone: "15512341234",
                            sellerPhone: "15812344321",
                            isSee: "1"
                        },
                        tag:{
                            tagShow:1,
                            tagValue:'11',
                            tagClass:'imgTag'
                        },
                        btnInfor:[
                            {
                                btnShow:1,
                                btnValue:'支付',
                                btnClass:'pay'
                            }
                        ]
                    }
                }
            }
        },
        created() {
            this.dataInfor.role=this.$getParameter('role');
        },
        computed: {
             roleNum(){
                  let role=this.$getParameter('role');
                  return role;
             }
        },
        methods: {
            /*租客订单详情埋点*/
            trackLogw(roleNum){
                let actiontype='',i='';
                if(roleNum==1){
                    actiontype='ownertel';
                    i='renterlist';
                }else{
                    actiontype='rentertel';
                    i='ownerlist';
                }
                if (!actiontype) {
                    return;
                }
                this.$app.webLog(actiontype,i);
            },
            deleteOrder(orderId){
                console.log("点击",orderId);
                this.$emit('itemAction',{order:orderId,type:'q'});
            },
            gotoDe(orderId){
               console.log("点击",orderId);
                this.$emit('gotoDetail',{order:orderId});
            }
        }
    };
</script>