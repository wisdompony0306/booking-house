    <!--
    desc:租房订单房东详情
-->
<style rel="stylesheet/less" lang="less">
    @import './index.less';
</style>

<template>
        <div class="detailOwnerBox" :class="[isPageNoScroll?'detailNoScroll':'']">
            <DetailState :data-state="dataState"/>
            <DetailPerson :data-user="dataPerson"/>
            <DetailHouse :data-house="dataHouse"/>
            <Detailbooking :data-booking="dataBooking"/>
            <DetailOrder :data-order="dataOrder"/>
            <DetailBottomBar v-if="Object.keys(dataButtons).length>0">
                <DetailButton :data-button="dataButton" v-for="(dataButton,index) in dataButtons"
                              :key="'DetailButton_'+index" @click="handlerClickButton(dataButton)"/>
            </DetailBottomBar>
            <div class="mask" v-if="xieyiShow || agreechuzuShow"></div>
            <div class="xieyiLog" v-if="xieyiShow">
                <!-- <div class="xieyiLog"> -->
                <div class="title">58预订金保护协议</div>
                <div class="content">
                    <p style="font-weight:bold;"> 特别提示：</p>
                    <p>
                        1、本租房保证协议（以下称"本协议"）系用户（以下“用户”）与58同城网站（www.58.com）、无线站点（包括wap.58.com, m.58.com）及58同城移动应用软件（APP）（以下简称“58同城平台”或”乙方平台“）的所有者及其关联服务提供方共同签署。
                    </p>
                    <p>
                        2、用户一旦勾选了“同意”《租房保证协议》或者实际接受或使用了58同城平台”租房交易保障服务”，就表示用户已接受了本协议的全部约定并愿意受其约束。请用户在勾选同意或使用58同城平台”租房交易保障服务”前务必仔细阅读本协议，<span
                            style="font-weight:bold;">充分理解各条款内容，特别是免除或者限制责任的条款、管辖与法律适用条款，如果用户不同意本协议或其中任何条款约定，应立即停止使用本协议项下的推广服务。</span>如发生纠纷，用户不能以未经仔细阅读为由进行抗辩。
                    </p>
                    <p>
                        3、本服务协议内容包括协议正文及所有58同城平台已经发布的或将来可能发布的各类规则。所有规则为协议不可分割的组成部分，与本协议正文具有同等效力。本协议是《58同城使用协议》的有效组成部分，本协议未涉及的事项依照《58同城使用协议》处理。
                    </p>
                    <p>
                        4、58同城平台有权根据国家法律法规的更新、产品和服务规则的调整不时地调整、修订本协议并以平台公示的方式通知用户，58同城平台无需另行以邮件、电话或任何书面函件的方式通知用户。如用户继续使用58同城平台“租房交易保障服务“的，即表示用户接受最新的协议约束。
                    </p>
                    <p style="font-weight:bold;">一、定义</p>
                    <p>1、用户：是指注册或登陆使用58同城平台服务且具有完全民事权利能力和完全民事行为能力的自然人，用户分为“承租人用户“及”出租人用户“。</p>
                    <p>
                        2、“租房交易保障服务”：系指为保障承租人用户及出租人用户的合法权益，58同城根据租赁交易双方不可撤销的电子指令及授权为用户提供的房源信息存储、推广、房源锁定、部分或全部保证金在线支付的网络推广信息技术服务。</p>
                    <p>3、<span style="font-weight:bold;">订金（也称“保证金”）：即承租人用户为表示租房诚意使用58同城的租房交易保障推广服务而向58同城缴纳的款项，承租人用户支付了该笔款项后可以与出租人用户进行自主沟通联系现场查看房源以及进行租房交易的洽谈并达成交易签署租房相关法律文件等，待出租人用户点击确认“同意出租”按钮后视为承租人用户与出租人用户达成了租赁交易，出租人用户与承租人用户需约定入住日期，待承租人用户确认入住后，承租人用户委托并同意58同城根据承租人用户发出的“确认入住“之不可撤销的电子指令将出租人用户缴纳的该笔保证金转移支付给出租人用户用于抵扣房租或押金等租房相关费用；如承租人用户在约定入住日期之日起7日内未确认入住且未申请退款的，承租人用户确认并同意58同城有权默认承租人用户已经入住，该笔保证金将于7天期满后自动转移给出租人用户；如承租人用户与出租人用户未达成租赁交易的或者承租人用户申请退还保证金经58同城审核通过的，则58同城将该笔保证金退还给承租人用户。</span>
                    </p>
                    <p>4、 标的房源：即指出租人用户发布的当承租人用户在线支付了保障金后可以进行锁定的房源信息。
                        租赁交易双方：即指本协议项下的出租人用户和承租人用户。</p>
                    <p style="font-weight:bold;">二、租赁交易保障服务内容及相关规则</p>
                    <p>1、
                        【适用情形】：本协议适用于承租人用户在乙方平台页面查看了租房房源信息，经与出租人用户通过乙方平台提供的在线沟通方式进行了沟通确认或承租人用户与出租人用户先行进行了线下沟通、实际查看过标的房源、双方已经初步达成租赁意，同意通过乙方平台在线支付保证金以锁定该房源的情形。</p>
                    <p>
                        2、【服务性质】：本协议项下的保障服务系58同城为保障租赁交易双方合法权益提升用户使用58同城的服务体验而提供，具体房源信息系由出租人用户自行编辑发布，58同城不对租赁交易双方之间就线下租赁交易过程提供任何撮合、代理、中介服务且不收取任何服务费，租赁交易双方因签订及履行租赁合同或者达成租赁交易中的任何事宜（包括但不限于签订房屋租赁合同、交房、验收、租赁费用结算、税费缴纳、备案登记及其他相关事宜）均独立承担责任。58同城不介入任何线下交易过程，58同城所提供的服务仅限于辅助性交易保障服务，58同城作为中立的第三方服务平台，应遵守公平公正合法合理以事实为依据的原则对租赁交易双方在使用该服务过程中发生的纠纷进行调解，如租赁交易双方对该调解不予接受的，租赁交易双方可另行诉讼方式解决争议。</p>
                    <p>
                        3、【保证金的申请支付及房源锁定】：承租人用户可按乙方平台相关指示申请在线支付保证金，保证金金额以承租人用户自行填写并在乙方平台页面公示为准；承租人用户申请在线支付后，该房源信息被锁定；承租人用户需在30分钟内缴纳完毕，如承租人用户未在30分钟内缴纳的（包括承租人用户缴纳后自动取消申请或者过期未进行支付等），则该笔订单将失效关闭，如承租人用户仍有租赁意向的，可以重新申请支付；承租人提交了在线支付申请后，出租人用户有权决定拒绝或同意承租人用户的申请；承租人用户在线支付了保证金后，出租人用户确认是否同意出租前，标的房源均被锁定，即一套标的房源在同一时间段仅可被一位承租人用户锁定。承租人在连续14天内最多发起3次交保证金操作，若超过3次的则不能再使用租房交易保障服务进行房源的额锁定。如果承租人用户有未完成订单，则需完成该笔订单后才能对其他房源申请缴纳保证金进行锁定，如有未完成订单的则不能对其他房源发起缴纳保证金进行锁定的申请。</p>
                    <p>
                        4、【保证金的缴纳】：承租人用户确定在线支付保证金的，可点击”确认支付“按钮向58同城发出不可撤销的电子指令，通过第三方支付机构向58同城支付该笔保证金，承租人用户确认支付后该笔保证金暂时托管于第三方支付机构的账户中。</p>
                    <p>
                        5、【保证金的使用】：租赁交易用户双方均知悉并确认，保证金的缴纳不是58同城的强制性要求，承租人用户实际看房后有权选择不支付保证金，且通过乙方平台在线支付的保证金，当该笔保证金58同城根据本协议的规则即承租人用户的委托转移支付给出租人用户后，具体使用方式即用途由租赁交易双方自行协商确定。</p>
                    <p>
                        6、【线下交易及出租人用户确认同意】：承租人用户缴纳保证金后，出租人用户需在24小时内确认是否同意出租给该承租人用户，如出租人用户同意出租的，则标的房源将被下架，租赁交易用户双方需线下签署租赁合同，<span
                            style="font-weight:bold;">当出租人用户点击同意出租的，则视为出租人用户与承租人用户已经签署了租赁书面合同达成租赁交易；</span>如出租人用户不同意出租的，承租人用户需点击确认不同意出租或在24小时内未确认同意出租的，则该承租人的承租申请视为被拒绝。
                    <p>7、【约定入住时间】承租人用户需与出租人用户自行沟通协商具体入住日期，并按双方协商确定的入住日期在58同城平台页面填写确认，出租人用户在确认是否同意出租前亦需对承租人用户填写的入住日期审核，并根据审核的结果点击确认同意或不同意出租。
                    </p>
                    <p>8、<span style="font-weight:bold;">【确认入住及保证金转移支付】：承租人用户需按约定的入住时间入住并点击确认是否入住，如确实入住的需点击“确认入住”按钮，承租人用户点击确认后视为委托并同意58同城将保证金转移支付给出租人用户；如承租人用户申请退款的，需说明申请退款原因经58同城审核确认同意后退还；如承租人用户在约定的入住日期之日起7天内未申请退款的，承租人用户知悉并确认同意58同城有权视承租人用户默认确认已经入住，7天到期后58同城将自动将保证金转移给出租人用户。</span>
                    </p>
                    <p>
                        9、【保证金的退还】：在以下情形下，承租人用户支付的保证金可以申请退还：1）无条件退款：出租人用户点击确认同意出租前，承租人用户自己主动申请退款或者出租人用户自承租人用户在线缴纳保证金后24小时内出租人用户未确认同意出租的，则承租人用户缴纳的保证金自动退还至承租人账户；2）需审核通过后退还：出租人用户与承租人用户约定的入住日期之日起7日内，需审核确认后退还：A.出租人用户发布的房源信息虚假（包括图片虚假、价格虚假、地理位置虚假）；B.承租人用户已经将标的房屋出租给其他承租人导致交易客观无法实现；C.承租人用户因其他出租人用户的原因无法入住标的房屋；</p>
                    <p>10、【保证金的不退还】承租人用户点击确认入住或者自出租人用户与承租人用户约定的入住日期之日起7日内承租人用户未申请退款的，则保证金转移给出租人用户后承租人无法申请退还。</p>
                    <p>
                        11、【争议纠纷调解】：上述承租人申请退还保证金需审核确认后退还的情形，承租人用户向58同城提供相应的书面证据材料及申请调解的申请，58同城对承租人用户提交的书面证明材料及调解申请，协助承租人用户向承租人用户进行沟通协调，承租人用户需于收到58同城发出的协助调解反馈通知之日起3个工作日内未提供有效的相反书面证明材料的，则保证金自退还给承租人用户。书面证据材料包括但不限于承租人用户与出租人用户的电话沟通录音记录、微信沟通记录、短信沟通记录、邮件沟通记录、标的房屋室内照片（不少于3张、不小于50kb、均清晰完整）、结算单据凭证等。
                    <p>12、【实际到账】：用户知悉并确认，保证金的实际退款或支付到账时限由第三方支付机构或银行根据实际结算时限处理，最迟不超过自办理退款或申请提现之日起的7个工作日，具体时限以银行公示为准。</p>
                    <p style="font-weight:bold;">三、用户的权利义务</p>
                    <p>1、
                        【陈述与保证】用户需承诺并保证均系具备合法民事权利能力及行为能力的自然人，均具备签订及履行本协议相适应的能力和资格。用户保证向58同城提交的个人信息（包括但不限于姓名、地址、联系方式、身份证号及收付款账户信息等）均真实准确合法有效，且如用户的个人信息如发生变更的，用户需及时予以更新或通知58同城，如因用户信息发生变更未及时更新产生的不利后果，由用户自行承担。</p>
                    <p>2、
                        【出租人用户的义务】：1）出租人用户应保证对所发布的标的房源拥有合法的所有权或处分权已经获得了其他相关权利人的合法授权，本协议签订及履行不侵犯任何第三方的合法权益；2）出租人用户应保证其所发布的房源信息均真实合法准确完整有效，均符合国家法律法规相关政策及地方性法规文件等对房源信息的发布规定，且符合乙方平台关于房源信息发布审核规则的规定（58同城首页-帮助中心http://about.58.com/89.html?cateid=1）；3）出租人用户应向58同城提交证明自己具备对标的房源所有权或合法处分权的书面证明资料并应保证所提供资料的真实性合法性有效性；4）出租人用户知悉并同意按本协议约定的争议纠纷调解规则处理，并配合提供相关书面证明材料，同时应保证所提供的书面证明材料的真实准确完整合法有效。5）出租人用户应保证所提供的收款账户信息系本人的有效账户信息，如因出租人用户提供的收款账户信息错误导致支付不成功的，责任由出租人用户自行承担。</p>
                    <p>3、 【承租人用户的义务】：1）承租人用户应在支付保证金前与出租人审慎沟通了解，并实地查看标的房源，确认该标的房屋的出租状态后及标的房屋的情况符合自身需求后再进行支付；<span
                            style="font-weight:bold;"> 2）承租人用户应及时查看保障服务状态，按实际情况确认是否入住或者是否申请退款，如因承租人用户未及时确认或者怠于行使自己的权利导致保证金无法被退还的，责任由承租人自行承担；</span>
                        3）承租人用户应保证向58同城提交的投诉举报情形及所提交的相关证明材料的真实合法有效，不虚假恶意投诉；4）承租人用户知悉并确认，非可申请退款情形的，承租人缴纳的保证金将无法退还；5）承租人用户同意遵守本协议项下的争议纠纷调解规则，并按规则规定提供相应证据材料并保证所提交证据材料的真实性合法性准确性有效性；6）承租人用户知悉并确认在58同城进行的操作发出的指令均为不可撤销的指令，一经点击或确认后将视为用户自主发出的有效指令，58同城根据用户发出的电子指令而进行的后续操作处理（包括但不限于转移支付、退款等）责任后果将有承租人用户自行承担。
                    </p>
                    <p>4、
                        【争议解决途径】用户进行投诉举报时必须通过58同城平台页面公示的【虚假举报】程序进行举报，如用户通过电话，短信，邮件，或者其他非在线举报方式进行举报的，视为用户举报无效，用户将无法获得有效的处理结果。</p>
                    <p style="font-weight:bold;">四、58同城的权利义务</p>
                    <p>1、
                        58同城如发现用户有如下行为之一：有任何违反国家有关法律、法规及中国承认或加入的国际条约的行为（包括但不限于危害国家安全、淫秽色情、虚假、违法、诽谤、恐吓或骚扰、侵犯他人知识产权、人身权或其他合法权益或利益以及有违公序良俗的行为）；假冒、欺诈等欺骗行为；采取任何违法或者作弊的行为获取不正当交易机会；其他违反本协议约定的行为，则58同城有权直接终止为用户提供服务。</p>
                    <p>2、
                        用户知悉并同意58同城在58同城平台服务器上保留用户的信息，包括但不限于注册信息、登陆信息、标的房源信息及保证金的支付缴纳退还等记录信息等并同意58同城基于系统升级、测试、更新、为用户提供服务等目的使用用户上述信息。</p>
                    <p>3、
                        用户知悉58同城平台相关支付功能系由第三方提供技术支持及服务，用户在点击“确认支付”前，请用户仔细确认和了解第三方服务内容特别是风险情况，以决定是否接受第三方的服务；请合理判断用户的风险承受能力，用户应按照第三方服务提供者的相关协议与规则使用第三方服务，58同城平台不属于支付功能的服务提供方且不承担由此可能产生的任何责任。</p>
                    <p>4、 58同城对因用户自身原因所造成的错误支付指令（包括但不限于用户未按规定操作、用户未妥善保管其账号及密码而致使他人盗用、冒用）而引起的资金损失不承担任何责任。</p>
                    <p>5、 58同城应建立完整客服体系并承担用户服务支撑工作，及时处理用户投诉、争议事项。</p>
                    <p>6、
                        58同城承诺在产品的合作中提供技术支持以完成技术对接，采取合理及必要的网络系统安全措施，保护自身技术系统的安全和稳定运行。但用户知悉并同意58同城有权定期或不定期地对58同城平台或相关设备进行检查和维护，如因此类情况而造成服务在合理时间内中断的，58同城无需为此承担任何责任。58同城保留不经事先通知为维修、升级或其它目的暂停全部或部分服务的权利</p>
                    <p style="font-weight:bold;">五、不可抗力</p>
                    <p>1、
                        58同城平台会在现有技术基础上尽力向用户提供服务，用户完全理解并同意，58同城平台涉及互联网、移动通讯等服务，可能会受到各个环节不稳定因素的影响。因此，58同城平台对由于信息网络设备维护、连接故障，电脑、通讯或其他系统故障，计算机病毒，黑客攻击，电力故障，罢工，暴乱，火灾，洪水，风暴，爆炸，战争，政府行为等不可抗力情形给用户造成的损害不承担责任。</p>
                    <p>2、
                        如在签订或履行本协议中发生突发疾病住院、交通事故重伤或死亡意外情形不能按时进行操作发出相关指令的，与用户有三代以内直系血亲关系的亲属或配偶向58同城提供合法证明文件，58同城按本协议约定的争议纠纷调解规则进行处理。</p>
                    <p style="font-weight:bold;">六、其他</p>
                    <p>1、 本协议的订立、执行、解释及争议解决均适用中华人民共和国法律。</p>
                    <p>2、 因本协议的履行或本协议引起的任何争议双方应通过友好协商方式解决，如无法通过友好协商方式解决的，双方一致同意通过58同城平台住所地有管辖权的人民法院以诉讼方式解决。</p>
                    <p>3、 本协议采用电子文本形式制成，由用户及58同城平台通过58同城平台签署并永久保存在58同城平台为此设立的专用服务器上备查，同时，双方均认可该形式的协议效力。</p>
                </div>
                <div class="btnWrap">
                    <div class="btn btn1" @touchend="agreeXieyi">同意</div>
                    <div class="btn btn2" @touchend="qxchuzuBtn">我再想想</div>
                </div>
            </div>
            <div class="agreeChuzuLast" v-if="agreechuzuShow">
                <div class="dec">
                 <!--    <p>确认信息无误，</p>
                    <p>同意出租给租客<span>{{ dataPerson.name }} </span>,3天内和</p>
                    <p>租客签约即可获得订金。</p> -->
                    <p>
                    确认信息无误，同意将房屋出租给租客<span>{{ dataPerson.name }} </span>,租客确认入住后订金会打给您冲抵租金。同意出租后即代表签署合同，不可取消，请谨慎选择!
                    </p>
                </div>
                <div class="btn btn1" @touchend="agreechuzuBtn">同意出租</div>
                <div class="btn btn2" @touchend="qxchuzuBtn">我再想想</div>
            </div>
            <WithDrawAlert :text=dataDialog.text
                           :image_url=dataDialog.image_url
                           :nickname=dataDialog.nickname
                           :button_wx=dataDialog.button_wx
                           :button_other=dataDialog.button_other
                           :button_cancle=dataDialog.button_cancle
                           v-model=dataDialog.show
                           @nextStep='handlerDialogConfirm'
                           @handleWx="handleWx"
                           @handleOther="handleOther"/>
            <SuccessAlert :text=dataAlert.text 
                          :image_url=dataAlert.image_url 
                          :nickname=dataAlert.nickname
                          :button=dataAlert.button
                          v-model=dataAlert.show 
                          @handleOk='handleOk'/>
            <Loading mode="pop" :isShow="isLoading"/>
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
            DetailBottomBar,
            WithDrawAlert,
            SuccessAlert,
    } from '../../components/index';

    import API from '../../service/api';

    export default {
        name: 'orderDetailOwner',
        data() {
            return {
                isPageNoScroll:false,//页面不能滚动控制
                isOverdue:false,   //房东端仲裁情况下看是否过期，提示不同的toust文案
                isLoading:false,
                isUncommit:false,  //记录是否提交过证据，false没提交过，true提交过
                xieyiShow: false,
                agreechuzuShow: false,
                orderId: '',
                appId:'wxc7929cc3d3fda545',
                /* 身份 1:租客，2:房东*/
                role: '2',
                sign: '',
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
                    buyerAppealDeadline:'',
                    sellerAppealDeadline:'',
                    nowTime: '',//接口系统当前时间,用于有倒计时的情况下计算时间
                },
                /*租客信息数据*/
                dataPerson: {
                    role: '1',
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
                    nativeApp: '',
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
                },
                //显示弹框
                dataDialog: {
                    show: false,
                    image_url: '',
                    nickname: 'sss张',
                    text: '微信身份证信息需和人脸认证信息一致方可成功提现。',
                    button_wx: '提取到此微信',
                    button_other: '提取到其他微信',
                    button_cancle: '取消',
                },
                //显示提现成功弹框
                dataAlert: {
                    show: false,
                    image_url: '',
                    nickname: '',
                    text: '订金已提取至以下账户',
                    button: '好',

                },
                /*埋点通用数据*/
                dataLog: {
                    pagetype: 'wonerdetail'
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
                                content: '不同意该租客预定本房源，取消后其他租客可预定本房源。',
                                text1: '我再想想',
                                text2: '取消订单',
                            },
                            log: 'dfkcancle',//埋点
                        },
                        connect: {
                            text: '联系租客',
                            class: 'orange',
                            action: 'connect',
                            tel: '123456',
                        },
                    },
                    /*待房东确认*/
                    2: {
                        cancel: {
                            text: '不同意出租',
                            class: 'grey',
                            action: 'cancel',
                            dialog: {
                                title: '',
                                content: '未与租客达成签约意向，订金将退还给租客。',
                                text1: '我再想想',
                                text2: '无签约意向',
                                log2:'disaggrerent'
                            }
                        },
                        agree: {
                            text: '同意出租',
                            class: 'orange',
                            action: 'agreechuzu',
                            dialog: {
                                title: '',
                                content: '',
                                text1: '我再想想',
                                text2: '同意',
                            }
                        },
                    },
                    /*待确认入住*/
                    3: {
                        connect: {
                            text: '联系租客',
                            class: 'orange',
                            action: 'connect',
                            tel: '123456',
                        },
                    },
                    /*申请退款中*/
                    8: {
                        refuse: {
                            text: '拒绝退款',
                            class: 'grey',
                            action: 'againstRefuse',
                            dialog: {
                                title: '',
                                content: '拒绝退款后，租客可向58申请调解。您需要上传租客违约的证据，供58工作人员审核。确认拒绝退款吗？',
                                text1: '我再想想',
                                text2: '拒绝退款',
                            },
                            log: 'disaggrerefund',//埋点
                        },
                        agree: {
                            text: '同意退款',
                            class: 'orange',
                            action: 'agreeRefuse',
                            dialog: {
                                title: '',
                                content: '同意退款后，订金将退还给租客。确认同意退款吗？',
                                text1: '我再想想',
                                text2: '同意退款',
                            },
                            log: 'aggrerefund',//埋点
                        },
                    },
                    /*房东拒绝退款*/
                    9: {
                        connect: {
                            text: '联系租客',
                            class: 'orange',
                            action: 'connect',
                            tel: '123456',
                        },
                    },
                    /*仲裁中*/
                    11: {
                        //connect: {
                        //    text: '联系租客',
                        //    class: 'orange',
                        //    action: 'connect',
                        //    tel: '123456',
                        //},
                        submitEvidence: {
                            text: '提交证据',
                            class: 'orange',
                            action: 'submitEvidence',
                            dialog: {
                                title: '',
                                content: '租客已申请调解，需要您上传证据证明租客违约。您只有一次上传证据的机会，确认提交证据吗？',
                                text1: '我再想想',
                                text2: '确认提交',
                            },
                            log:'submit evidence',//埋点
                        }
                    },
                    /*交易关闭13*/
                    13: {
                        
                    },

                    /*交易成功*/
                    7: {
                        tixian: {
                            text: '提取现金',
                            class: 'orange',
                            action: 'tixian',
                            log:'withdrawal',//埋点
                            // action: 'tixianWait',  //提现上线前提示弹窗
                        }
                    },
                    /*提现失败14*/

                    14: {
                        tixianError: {
                            text: '提取现金',
                            class: 'orange',
                            action: 'tixian',
                            log:'withdrawal',//埋点
                        }
                    },
                    /*已提现16*/

                    16: {
                        tixianEnd: {
                            text: '已提现',
                            class: 'gray',
                            action: 'tixianEnd',
                            // log:'withdrawal',//埋点
                        }
                    }
                }
            }
        },
        computed: {
            dataButtons(){
                let _this = this;
                let _buttons = {};
                if (_this.statusButtonEnum[_this.dataState.status]) {
                    _buttons = _this.statusButtonEnum[_this.dataState.status];
                    if(_this.dataState.status==13){
                        if(_this.dataState.isWithDrawCash==1){
                            _buttons =  {
                                tixian: {
                                    text: '提取现金',
                                    class: 'orange',
                                    action: 'tixian',
                                    log:'withdrawal',//埋点
                                }
                            }
                        }
                    }

                    if(_this.dataState.status==14 || _this.dataState.status==7){
                        _buttons =  {
                            tixian: {
                                text: '提取现金',
                                class: 'orange',
                                action: 'tixian',
                                log:'withdrawal',//埋点
                            }
                        }
                    }

                    //仲裁中有两种情况使提交证据按钮置灰，一个是提交过证据（根据后端字段判断isUncommitted），另一种是过期时置灰isOverdue==true时
                    if(_this.dataState.status==11){  //仲裁中
                        //提交过证据
                        if(_this.isUncommit){
                            _buttons =  {
                                submitEvidence: {
                                    text: '提交证据',
                                    class: 'grey',
                                    action: 'submitEvidenceNone',
                                    toast:{
                                        content: '已经上传过证据',
                                    }
                                }
                            }
                        }else{
                            //倒计时过期
                            if(_this.isOverdue){
                                _buttons =  {
                                    submitEvidence: {
                                        text: '提交证据',
                                        class: 'grey',
                                        action: 'submitEvidenceNone',
                                        toast:{
                                            content: '已经超过上传证据时间',
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (_buttons.connect) {
                        _buttons.connect.tel = _this.dataPerson.phone;
                    }
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
            }else {
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
            agreechuzuBtn(){
                var _this = this;
                _this.checkFace();
                _this.trackLog('aggrerent');
            },
            agreeXieyi(){
                var _this=this;
                _this.agreechuzuShow = true;
                setTimeout(function(){
                    _this.xieyiShow = false;
                },0);
                _this.trackLog('contract');
            },
            qxchuzuBtn(){ 
                var _this=this; 
                setTimeout(function(){
                    _this.xieyiShow = false;
                    _this.agreechuzuShow = false;
                },500);
                _this.isPageNoScroll=false;
                _this.trackLog('disaggrerent');
            },
            checkFaceOnly(){
                let _this = this;
                _this.$request.jsonp({
                    url: API.userFaceAuth.url,
                    data: {
                    },
                    callback: _this.checkFaceOnlyCb,
                    jsonpName: "jsoncallback",
                });
            },
            checkFaceOnlyCb(a, res){
                let _this = this;
                if(res.code==0){
                    if(res.data==1){
                        //人脸认证通过，弹出协议弹窗
                        _this.xieyiShow = true;
                        _this.agreechuzuShow = false;

                        _this.isPageNoScroll=true;

                    }else{
                        //人脸认证未通过
                        _this.$app.openFaceSdk("人脸认证", '3', (state)=> {
                            //页面从新渲染数据
                            // _this.getOrderInfoById();
                            if (state == 0) {
                            //认证成功
                            //人脸认证通过，弹出协议弹窗
                            _this.xieyiShow = true;
                            _this.agreechuzuShow = false;
                                _this.isPageNoScroll=true;

                        } else if (status == 2) {
                            _this.$app.showDialog("single", "提示", "您取消了人脸认证,请先认证再进行其他操作", function (index) {
                            }, "确定");
                        } else {
                            _this.$app.showDialog("single", "提示", "人脸认证失败,请稍后再试!", function (index) {
                            }, "确定");
                        }
                    });
                    }
                }else{
                    _this.$app.toastMsg(res.message);
                }
            },
            checkFace(){
                var _this = this;
                _this.$request.jsonp({
                    url: API.confirmOrder.url,
                    data: {
                        orderId: _this.orderId,
                        role: 2,
                    },
                    callback: _this.checkFaceCb,
                    jsonpName: "jsoncallback",
                });
            },
            checkFaceCb(a, res){
                var _this = this;
                //_this.xieyiShow = false;
                //_this.agreechuzuShow = false;
                if (res.code == 1000008) {
                    _this.$app.openFaceSdk("人脸认证", '3', (state)=> {
                        //页面从新渲染数据
                        if (state == 0) {
                            //人脸认证通过，直接改变状态
                            _this.xieyiShow = false;
                            _this.agreechuzuShow = false;
                            _this.getOrderInfoById();
                        } else if (status == 2) {
                            _this.xieyiShow = false;
                            _this.agreechuzuShow = false;
                            _this.$app.showDialog("single", "提示", "您取消了人脸认证,请先认证再进行其他操作", function (index) {
                            }, "确定");
                        } else {
                            _this.xieyiShow = false;
                            _this.agreechuzuShow = false;
                            _this.$app.showDialog("single", "提示", "人脸认证失败,请稍后再试!", function (index) {
                            }, "确定");
                        }
                    });
                } else if (res.code == 0) {
                    //人脸认证通过，直接改变状态
                    _this.xieyiShow = false;
                    _this.agreechuzuShow = false;
                    _this.getOrderInfoById();
                } else {
                    _this.xieyiShow = false;
                    _this.agreechuzuShow = false;
                    _this.$app.toastMsg(res.message);
                }
            },
            shouqvan(){
                window.bb = function (res) {
                    // -1，系统异常
                    // -2，非法请求
                    // 0，成功
                    // 1549，授权码失效
                    // 1551，更新授权信息失败
                    // WBAPP.toastMsg('进_nativeBridge之后，返回code');
                    if (res == 0) {
                        // _this.$app.toastMsg("成功code： " + res);
                        //授权成功再次调接口
                        _this.handleWithDraw();
                        // _this.dataDialog.show = true;
                    } else {
                        _this.$app.toastMsg("失败code： " + res);
                    }
                }
                let _this = this;
                // WBAPP.toastMsg('进_nativeBridge之前');
                WBAPP._nativeBridge({
                    "action": "wx_auth",
                    "callback": 'bb'
                })
            },
            //绑定微信和换绑协议
            bindWeiXin(){
                WBAPP._nativeBridge({
                    action:"pagetrans",
                    tradeline:"core",
                    content:{
                        pagetype:"userInfoDetail"
                    }
                });
            },
            bindWXCb(res){
                let _this = this;
                //  0：成功
                // -1：失败
                if (res == 0) {
                    _this.$app.toastMsg("绑定成功： " + res);
                } else if (res == 1) {
                    _this.$app.toastMsg("绑定失败： " + res);
                }
            },
            handleWithDraw(){
                let _this = this;
                _this.$request.post({
                    url: API.bindWechat.url,
                    data: {
                        appId:_this.appId
                    },
                    callback: _this.withDrawCb,
                    // jsonpName: "jsoncallback",
                });
            },
            withDrawCb(state, res){
                let _this = this;
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
                        if(res.data.opendId!==''){
                            if(res.data.imageUrl!==''&&res.data.nickName!==''){
                                _this.dataDialog.nickname=_this.dataAlert.nickname=res.data.nickName;
                                _this.dataDialog.image_url=_this.dataAlert.image_url=res.data.imageUrl;
                                _this.dataDialog.show = true;
                            }else{
                                _this.shouqvan();
                            }
                        }else{
                            _this.$app.showDialog("double", "提示", "订金将提取到微信中,请先授权微信。", function (index) {
                                if (index == 0) {
                                    console.log("取消");
                                } else if (index == 1) {
                                    _this.shouqvan();
                                    _this.$app.webLog("accreditwechat", "wonerdetail");
                                }
                            }, "取消", "授权微信");
                        }
                        break;
                    case -1:
                        _this.$app.showDialog("double", "提示", "订金将提取到微信中,请先绑定微信。", function (index) {
                            if (index == 0) {
                                console.log("取消");
                            } else if (index == 1) {
                                _this.bindWeiXin();
                                _this.$app.webLog("bindwechat", "wonerdetail");
                            }
                        }, "取消", "绑定微信");
                    default:
                        _this.$app.showDialog("single", "提示", res.message, function (index) {
                        }, "确定");
                        break;
                }
            },
            //提现上线前弹窗
            // tixianWait(){
            //     let _this=this;
            //     _this.$app.showDialog("single", "提示", '提现功能即将上线，请耐心等待' , function (index) {
            //             }, "确定");
            // },
            tixian(){
                let _this = this;
                _this.isLoading = true;
                _this.$request.post({
                    url: API.withdrawCash.url,
                    data: {
                        orderId: _this.orderId
                    },
                    callback: _this.tixianCb,
                    // jsonpName: "jsoncallback",
                });
            },
            tixianCb(state, res){
                let _this=this;
                _this.isLoading = false;
                // alert(state);
                // alert(res.code);
                if (!state) {
                    this.$app.toastMsg("服务器接口异常");
                    return;
                }
                if (!res || res.code == undefined) {
                    this.$app.toastMsg("服务器接口数据异常");
                    return;
                }
                if (res.code == 0) {
                    setTimeout(function(){
                        _this.getTransferResult();
                    },3000);
                } else {
                    _this.$app.toastMsg("提现失败");
                }
            },
            getTransferResult(){
                let _this = this;
                _this.$request.post({
                    url: API.getTransferResult.url,
                    data: {
                        orderId: _this.orderId
                    },
                    callback: _this.getTransferResultCb,
                });
            },
            getTransferResultCb(state, res){

                let _this=this;
                if (!state) {
                    this.$app.toastMsg("服务器接口异常");
                    return;
                }
                if (!res || res.code == undefined) {
                    this.$app.toastMsg("服务器接口数据异常");
                    return;
                }
                if (res.code == 0) {
                    if(res.data.status== 0){//提现中
                        // _this.dataAlert.show = true;
                       _this.getOrderInfoById();
                    }else if(res.data.status == -1){//提现失败
                        _this.getOrderInfoById();
                        if(res.data.message=='NAME_MISMATCH'||res.data.message=='V2_ACCOUNT_SIMPLE_BAN'){
                            _this.$app.showDialog("double", "提现失败", '可能的原因为:1.微信没有绑定银行卡2.微信绑定银行卡户主实名信息同58人脸认证信息一致。请在微信中绑定银行卡或更换微信提取订金。', function (index){
                                if (index == 0) {
                                    console.log('取消');
                                } else if (index == 1) {
                                    _this.bindWeiXin();
                                }
                            }, "我知道了", "更换微信");
                        }else{
                            _this.$app.showDialog("single", "提现失败", res.data.reason, function (index){
                            }, "好");
                        }
                    }else if(res.data.status== 1){//提现成功
                        // _this.dataAlert.show = true;
                        _this.getOrderInfoById();
                    }
                } else {
                   _this.$app.toastMsg("服务器开小差...");
                }
            },
            requestInit(){
                this.getOrderInfoById();
            },
            /**
             * 获取订单信息接口
             */
            getOrderInfoById(){
                let _this = this;
                _this.isLoading = true;
                _this.$request.jsonp({
                    url: API.getOrderInfoById.url,
                    data: {
                        orderId: _this.orderId,
                        role: _this.role,
                    },
                    callback: _this.getOrderInfoByIdCb,
                    jsonpName: "jsoncallback",
                });
            },
            getOrderInfoByIdCb(state, res){
                let _this = this;
                _this.isLoading = false;
                _this.isPageNoScroll=false;
                if (res&&res.code == 0 && res.data) {
                    ({
                        /*订单状态数据*/
                        status: _this.dataState.status = '',
                        isWithDrawCash: _this.dataState.isWithDrawCash = '',
                        statusDes: _this.dataState.statusDes = '',
                        statusAct: _this.dataState.statusAct = '',
                        buyerPayDeadline: _this.dataState.buyerPayDeadline = '',
                        buyerDeadline: _this.dataState.buyerDeadline = '',
                        sellerDeadline: _this.dataState.sellerDeadline = '',
                        sellerRefundDeadline: _this.dataState.sellerRefundDeadline = '',
                        buyerAppealDeadline:_this.dataState.buyerAppealDeadline = '',
                        sellerAppealDeadline:_this.dataState.sellerAppealDeadline = '',
                        nowTime: _this.dataState.nowTime = '',
                        /*租客或房东数据*/
                        buyerId: _this.dataPerson.userid = '',
                        orderDetail: {
                            buyerPic: _this.dataPerson.pic = '',
                            buyerName: _this.dataPerson.name = '',
                            buyerCardId: _this.dataPerson.cardId = '',
                            buyerPhone: _this.dataPerson.phone = '',
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
                    } = res.data);
                    if(_this.dataState.status==11){
                        _this.pdIsOverdue(_this.dataState.sellerAppealDeadline);
                        _this.isUncommitted();
                    }
                } else if(res){
                    _this.$app.toastMsg(res.message);
                }else{
                    _this.$app.toastMsg("服务器开小差...");
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
                switch (_action) {
                    case 'cancel'://取消订单
                        if (dataButton.dialog) {
                            let _this = this;
                            let _dialog = dataButton.dialog;
                            _this.$app.showDialog('double', _dialog.title, _dialog.content, _this.cancelOrder, _dialog.text1, _dialog.text2);
                            //埋点
                            if(_dialog.log2){
                                let _log2 = _dialog.log2;
                                if (_log2 && _log2 != '') {
                                    _this.trackLog(_log2);
                                }
                            }
                        }
                        break;
                    case 'agreechuzu'://同意出租
                        if (dataButton.dialog) {
                            let _this = this;

                            //版本控制
                            //app当前版本
                            let _currentAppVersion = _this.$app.getAppVersion();
                            //人脸版本
                            let _getAppVersionFaceAuth = _this.$app.getAppVersionFaceAuth();
                            //比较
                            let isEgt = _this.$compareEgt(_currentAppVersion, _getAppVersionFaceAuth);

                            if (!isEgt) {
                                _this.$app.showDialog("single", "版本过低", "升级58app至最新版本才可微信付款哦~", function (index) {
                                }, "好");
                                return;
                            }else{
                                //先人脸认证
                                _this.checkFaceOnly();
                            }
                        }
                        break;
                    case 'pay'://付款
                        if (dataButton.loadPage) {
                            let _loadPage = dataButton.loadPage;
                            let _url = _loadPage.url + "?orderNo=" + _this.orderId + "&sign=" + _this.sign;
                            _this.$app.loadPage('link', _url, _loadPage.title);
                        }
                        break;
                    case 'refund'://退款
                        if (dataButton.dialog) {
                            let _dialog = dataButton.dialog;
                            _this.$app.showDialog('double', _dialog.title, _dialog.content, _this.applyRefund, _dialog.text1, _dialog.text2);
                        }
                        break;
                    case 'agreeRefuse'://房东同意退款
                        if (dataButton.dialog) {
                            let _this = this;
                            let _dialog = dataButton.dialog;
                            _this.$app.showDialog('double', _dialog.title, _dialog.content, _this.agreeRefuse, _dialog.text1, _dialog.text2);
                        }
                        break;
                    case 'againstRefuse'://房东拒绝退款
                        if (dataButton.dialog) {
                            let _this = this;
                            let _dialog = dataButton.dialog;
                            _this.$app.showDialog('double', _dialog.title, _dialog.content, _this.againstRefuse, _dialog.text1, _dialog.text2);
                        }
                        break;
                    case 'checkIn'://确认入住
                        if (dataButton.dialog) {
                            let _dialog = dataButton.dialog;
                            let _content = _dialog.content.replace("#name#", _this.dataPerson.name);
                            _this.$app.showDialog('double', _dialog.title, _content, _this.confirmOrder, _dialog.text1, _dialog.text2);
                        }
                        break;
                    case 'arbitration'://发起仲裁
                        if (dataButton.loadPage) {
                            let _loadPage = dataButton.loadPage;
                            let _url = _loadPage.url + "?orderNo=" + _this.orderId;
                            _this.$app.loadPage('link', _url, _loadPage.title);
                        }
                        break;
                    case 'updateArbitration'://修改证据
                        if (dataButton.loadPage) {
                            let _loadPage = dataButton.loadPage;
                            let _url = _loadPage.url + "?orderNo=" + _this.orderId;
                            _this.$app.loadPage('link', _url, _loadPage.title);
                        }
                        break;
                    case 'delete'://删除订单
                        // let _loadPage = dataButton.loadPage;
                        // let _url = _loadPage.url + "?orderNo=" + _this.orderId;
                        // _this.$app.loadPage('link', _url, _loadPage.title);
                        _this.$request.jsonp({
                            url: API.deleteOrderOwner.url,
                            data: {
                                orderId: _this.orderId,
                                role: _this.role,
                            },
                            callback: _this.deleteOrderOwnerCb,
                            jsonpName: "jsoncallback",
                        });
                        break;
                    case 'tixian'://提取现金
                        // let _this = this;
                        let _currentAppVersion = _this.$app.getAppVersion();
                        let _getAppVersionOn = _this.$app.getAppVersionOn();
                        let isEgt = _this.$compareEgt(_currentAppVersion, _getAppVersionOn);
                        if (!isEgt) {
                            _this.$app.showDialog("single", "版本过低", "升级58app至最新版本才可微信提现哦~", function (index) {
                            }, "好");
                            return;
                        }else{
                            _this.handleWithDraw();
                        }
                        // _this.$app.toastMsg("提现功能即将上线，请耐心等待");
                        break;
                    case 'tixianEnd':
                        // _this.dataAlert.show = true;
                        // _this.$app.showDialog("single", "版本过低", "升级58app至最新版本才可微信付款哦~", function (index) {
                                // }, "好");
                        _this.$app.toastMsg('已提现，请到微信零钱中查看');
                        _this.$app.webLog("hadwithdrawal", "wonerdetail");
                        break;
                    case 'tixianError'://提现失败 保留提现按钮
                        let _currentAppVersionOn = _this.$app.getAppVersion();
                        let _getAppVersionOnMore = _this.$app.getAppVersionOn();
                        let _isEgt = _this.$compareEgt(_currentAppVersionOn, _getAppVersionOnMore);
                        if (!_isEgt) {
                            _this.$app.showDialog("single", "版本过低", "升级58app至最新版本才可微信提现哦~", function (index) {
                            }, "好");
                            return;
                        }else{
                            _this.handleWithDraw();
                        }
                        break;
                        
                    case 'submitEvidence':
                        this.submitEvidence();
                        break;
                    case 'submitEvidenceNone':
                        if (dataButton.toast) {
                            let _this = this;
                            let _toast = dataButton.toast;
                            _this.$app.toastMsg(_toast.content);
                        }
                        break;
                    default:
                        break;
                }
            },
            //判断仲裁是否过期
            pdIsOverdue(timeLine){
               this.isOverdue=Date.parse(new Date(timeLine.replace(/-/g, "/"))) > Date.parse(Date()) ? false : true;
               console.log(' this.isOverdue:   '+ this.isOverdue);
            },
            //房东端仲裁阶段，判断是否提交过证据
            isUncommitted(){
                let _this = this;
                _this.$request.jsonp({
                    url: API.defendantIsUncommitted.url,
                    data: {
                        orderNo: _this.orderId,
                    },
                    callback: _this.isUncommittedCb,
                    jsonpName: "callback",
                });
            },
            isUncommittedCb(a,res){
                var _this=this;
                console.log('是否可以提交证据:  '+res.code);
                if(res.code==1){
                    //code=1 没有提交过，可以提交
                    _this.isUncommit=false;
                }
                if(res.code==-1){
                    _this.isUncommit=true;
                }
            },
            submitEvidence(){
                let _this = this;
                let _url = API.defendantShow.url+'?orderNo='+_this.orderId+'&redirectUrl='+window.location.href;
                _this.$app.loadPage('link', _url,'');
            },
            deleteOrderOwnerCb(state, res){
                let _this = this;
                if (res.code == 0) {
                    _this.$app.toastMsg('删除成功');
                    let _url = window.location.protocol + "//houserent.m.58.com/order/get_order_list?role=2";
                    _this.$app.loadPage('link', _url);
                } else {
                    _this.$app.toastMsg(res.message);
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
             * 房东同意退款操作
             */
            agreeRefuse(index){
                let _this = this;
                if (index == 1) {
                    // _this.$app.toastMsg(2);
                    this.buttonRequestOwner(API.confirmRefund.url, 1);
                }
            },
            /**
             * 房东拒绝退款操作
             */
            againstRefuse(index){
                let _this = this;
                if (index == 1) {
                    // _this.$app.toastMsg(2);
                    this.buttonRequestOwner(API.confirmRefund.url, 2);
                }
            },
            /**
             * 按钮操作数据请求
             * requestUrl: 操作请求URL
             */
            buttonRequestOwner(requestUrl, num){
                let _this = this;
                _this.isLoading = true;
                _this.$request.jsonp({
                    url: requestUrl,
                    data: {
                        orderId: _this.orderId,
                        isAgree: num,
                        role: 2,
                        jsonpName: "jsoncallback",
                    },
                    callback: (state, res)=> {
                    _this.isLoading = false;
                if (!state) {
                    _this.$app.toastMsg("服务器接口异常");
                    return;
                }
                if (res.code == 0) {
                    //页面从新渲染数据
                    _this.getOrderInfoById();
                } else {
                    _this.$app.toastMsg(res.message);
                }
            },
            });
            },

            buttonRequest(requestUrl){
                let _this = this;
                _this.isLoading = true;
                _this.$request.jsonp({
                    url: requestUrl,
                    data: {
                        orderId: _this.orderId,
                        role: 2,
                        jsonpName: "jsoncallback",
                    },
                    callback: (state, res)=> {
                    _this.isLoading = false;
                    if (!state) {
                        _this.$app.toastMsg("服务器接口异常");
                        return;
                    }
                    if (res.code == 0) {
                        //页面从新渲染数据
                        _this.getOrderInfoById();
                    } else {
                        _this.$app.toastMsg(res.message);
                    }
                },
            });
            },
            /*弹窗继续按钮*/
            handlerDialogConfirm(){
                this.dataDialog.show = false;
            },
            handleWx(){
                let _this=this;
                _this.dataDialog.show = false;
                _this.$app.webLog("confirmwithdrawal2", "wonerdetail");
                console.log("提现到此微信");
                _this.$app.showDialog("double", "提示", "确定提取订金到微信吗？", function (index) {
                    if (index == 0) {
                         console.log('取消');
                    } else if (index == 1) {
                        _this.tixian();
                        _this.$app.webLog("confirmwithdrawal", "wonerdetail");
                    }
                }, "取消", "确定");
            },
            handleOther(){
                let _this = this;
                let osType=_this.$app.getOs();
                console.log("提现到其他微信");
                _this.dataDialog.show = false;
                _this.$app.webLog("changewechat", "wonerdetail");
                //跳转页面
                WBAPP._nativeBridge({action:'loadpage',pagetype:'userInfoDetail'});
                //跳转页面
                // 1秒后显示弹窗 是否换绑成功
                if(osType=="andriod"){
                    setTimeout(function () {
                        _this.$app.showDialog("double", "提示", "是否已经换绑成功？", function (index) {
                            if (index == 0) {
                                console.log("换绑成功");
                                _this.tixian();
                                _this.$app.webLog("bindwechatnum", "wonerdetail");
                            } else if (index == 1) {
                                _this.handleWithDraw();
                                console.log("换绑失败");
                            }
                        }, "换绑成功", "换绑失败");
                    }, 1000);
                }
                
            },
            handleOk(){
                let _this=this;
                _this.dataAlert.show = false;
                _this.getOrderInfoById();
                console.log("提现成功");
            }
        },
        components: {
            DetailState,
            DetailPerson,
            DetailHouse,
            Detailbooking,
            DetailOrder,
            DetailButton,
            DetailBottomBar,
            WithDrawAlert,
            SuccessAlert,
        }
    }
</script>