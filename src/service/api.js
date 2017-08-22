/**
 * Created by luanchi on 17/6/12.
 * 数据请求url
 */

let host = "//houserent.m.58.com";
let port = "";

if (process && process.env && process.env.NODE_ENV == 'devServer') {
    host = '//test.58.com';
    port = ":8007";
}

export default {
    /**
     * 说明:预订填写页面URL
     * 参数:
     *   infoId: 信息ID(infoid)
     */
    pageCreateOrder: {
        url: host + port + '/order/create_order'
    },
    /**
     * 说明:预订协议页面URL
     * 参数:(无)
     *   infoId: 信息ID(infoid)
     */
    pageGetAgreement: {
        url: host + port + '/order/get_agreement'
    },
    /**
     * 说明:预订协议页面URL
     * 参数:
     *   role: 角色 1租客 2房东
     */
    pageGetOrderList: {
        url: host + port + '/order/get_order_list'
    },
    /**
     * 说明:房东端订单详情页面URL
     * 参数:
     *   orderId: 订单id
     */
    pageGetOwnerDetail: {
        url: host + port + '/order/get_owner_detail'
    },
    /**
     * 说明:租客端订单详情页面URL
     * 参数:
     *   orderId: 订单id
     */
    pageGetRenterDetail: {
        url: host + port + '/order/get_renter_detail'
    },
    /**
     * 说明: 仲裁 租客端
     * 参数:
     *   orderNo: 订单id
     *   redirectUrl: 当前页面的url
     */
    plaintiff: {
        url: 'https://gpay.58.com/appeal/plaintiff/show',
    },
    /**
     * 说明: 微信支付 租客付款
     * 参数:
     *   orderNo: 订单id
     *   bizCode: 业务码(默认12)
     *   orderExpireTime:订单过期时间
     *   sign: 签名（用户下单，订单系统返回）
     */
    wxAppPay: {
        url: 'https://gpay.58.com/wxpay/app',
    },
    /**
     * 说明: 个人用户详情页
     * 参数:
     *   id: 用户id
     */
    userDetail: {
        url: '//houserent.m.58.com/landlord/userDetail',
    },
    /**
     * 说明: 生成订单接口
     * 请求方式: post
     * 参数:
     *   infoId: 信息id
     *   price:租金
     *   checkInDate：入住日期
     *   sellerName：房东姓名
     *   sellerCardId：房东身份证号
     *   buyerPhone：租客手机号
     *   isSee：是否看房  (是否看房：1，未看房，2:已看房)
     */
    createOrder: {
        url: host + port + '/order/api_create_order',
    },
    /**
     * 说明: 获取订单列表接口
     * 参数:
     *   pageNum: 页码，1:第一页
     *   role: 1:租客，2:房东
     */
    getOrderList: {
        url: host + port + '/order/api_get_order_list',
    },
    /**
     * 说明: 获取是否展示协议页面
     * 返回值:
     *  isShow:   0 不展示 1 展示
     */
    IsShowProtocol: {
        url: host + port + '/order/api_is_show_protocol'
    },
    /**
     * 说明: 获取生成订单时帖子信息接口
     * 参数:
     *   infoId: 信息id
     */
    getPostInfoById: {
        url: host + port + '/order/api_get_post_info_by_id'
    },
    /**
     * 说明: 获取订单信息接口
     * 参数:
     *   orderId: 订单Id
     *   role: 1:租客，2:房东
     */
    getOrderInfoById: {
        url: host + port + '/order/api_get_order_info_by_id'
    },
    /**
     * 说明: 取消订单接口
     * 参数:
     *   orderId:
     *   role:
     */
    cancelOrder: {
        url: host + port + '/order/api_cancel_order'
    },
    /**
     * 说明: 租客申请退款接口
     * 参数:
     *   orderId:
     */
    applyRefund: {
        url: host + port + '/order/api_apply_refund'
    },
    /**
     * 说明: 确认订单接口 (租客确认入住接口)
     * 参数:
     *   orderId:
     *   role:
     */
    confirmOrder: {
        url: host + port + '/order/api_confirm_order'
    },
    /**
     * 说明: 删除订单接口
     * 参数:
     *  orderId: 订单id
     *  role: 角色 (1:租客，2:房东)
     */
    deleteOrder: {
        url: host + port + '/order/api_delete_order'
    },
    /**
     * 说明: 房东同意或拒绝退款接口
     * 参数:
     *   orderId:
     *   isAgree: 1:房东同意，0:房东拒绝
     */
    confirmRefund: {
        url: host + port + '/order/api_confirm_refund'
    },

    /**
     * 说明: 房东提现接口
     * 参数:
     *   orderId:
     */
    withdrawCash: {
        url: host + port + '/order/api_with_draw_cash'
    },
    /**
     * 说明: 房东提现状态接口
     * 参数:
     *   orderId:
     */
    getTransferResult: {
        url: host + port + '/order/api_get_transfer_result'
    },
    /**
     * 说明: 获取绑定微信头像、昵称、openId接口
     * 参数:
     *   appId:      授权应用id
     * 返回值：
     *   opendId  openId
     *   imageUrl   微信头像链接
     *   nickName   微信昵称
     */
    bindWechat: {
        url: host + port + '/order/api_bind_wechat?appId=wxc7929cc3d3fda545'
    },

    /**
     * 说明: 根据信息id返回下单数量接口
     * 参数:
     *   infoId:
     */
    getOrderCountByInfoId: {
        url: host + port + '/order/api_get_order_count_by_info_id'
    },

    /**
     * 说明: 根据用户id返回下单数量接口
     * 参数:
     *   userId:用户id
     */
    getOrderCountByUserId: {
        url: host + port + '/order/api_get_order_count_by_user_id'
    },
    /**
     * 说明: 删除订单接口(房东端)
     * 请求参数：
     *  orderId: 订单id
     *  role: 角色 (1:租客，2:房东)
     */
    deleteOrderOwner: {
        url: host + port + '/order/api_delete_order'
    },
    /**
     * 说明:
     * 请求参数：
     */
    withdrawCash: {
        url: host + port + '/order/api_withdraw_cash'
    },
    /**
     * 说明: 纯净人脸认证接口
     * 请求参数：
     */
    userFaceAuth: {
        url: host + port + '/order/api_user_face_auth'
    },
    /**
     * 说明: 房东端申诉中的订单，提交证据页面，参数：orderNo=?&redirectUrl=?
     *返回json包含code属性
     *1成功，-1失败
     */
    defendantShow: {
        url: 'https://gpay.58.com/appeal/defendant/show'
    },
    /**
     * 说明: 房东端申诉中的订单，判断是否可以提交证据，参数：orderNo=?&callback=?
     */

     //gpay.58.com/appeal/defendant/isUncommitted?orderNo=xx&callback=xx
    defendantIsUncommitted: {
        url: 'https://gpay.58.com/appeal/defendant/isUncommitted'
    },
}



