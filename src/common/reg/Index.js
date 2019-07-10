import React, { Component } from 'react';

import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import Validate from '../../static/js/utils/validate.js'
import Service from '../../service/api.js'
import '../../static/less/reg.less';

import regBanner from '../../static/images/reg/1.jpg';
import logo from "../../static/images/reg_logo.png";

export default class Reg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Nav: [],
            userName: "",
            regEmail: "",
            regPsw: "",
            regPswConfirm: "",
            emailError: false,
            pswError: false,
            pswConfirmError: false,
            userNameError: false,
            agree: false,
            displayPsw: true
        }
    }

    componentDidMount() {
        //搜索
        var r_bannerswiper = new Swiper('.r-banner .swiper-container', {
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 3800
            },
            pagination: {
                el: '.r-banner .u-pagination',
                bulletClass: 'bull',
                bulletActiveClass: 'active',
                clickable: true
            }
        });

    }

    handleUserName = (e) => {
        this.setState({ 'regUserName': e.target.value })
    }
    handleEmail = (e) => {
        this.setState({ 'regEmail': e.target.value })
    }

    handlePsw = (e) => {
        this.setState({ 'regPsw': e.target.value })
    }

    handlePswConfirm = (e) => {
        this.setState({ 'regPswConfirm': e.target.value })
    }

    RegConfirm = () => {
        const { regUserName, regEmail, regPsw, regPswConfirm, agree } = this.state;
        this.setState({ emailError: false, pswError: false, pswConfirmError: false })
        /*global layer */
        if (!regUserName) {
            return this.setState({ userNameError: true })
        }
        else if (!regEmail || !Validate.checkEmail(regEmail)) {
            return this.setState({ emailError: true })
        } else if (!regPsw) {
            return this.setState({ pswError: true })
        } else if (regPsw !== regPswConfirm) {
            return this.setState({ pswConfirmError: true })
        } else if (!agree) {
            return layer.msg("请先阅读网站用户协议并同意")
        }
        let params = {
            email: regEmail,
            password: regPsw,
            loginName: regUserName,
            isCompany: "false"
        }
        Service.UserReg(params).then((response) => {
            if (response.data.status === 1) {
                this.props.history.push({ pathname: "/regFinish", state: { user: params } })
            } else {
                layer.msg(response.data.message)
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    checkAgree = () => {
        this.setState({ agree: !this.state.agree })
    }

    changeDisplayPsw = () => {
        this.setState({ displayPsw: !this.state.displayPsw })
    }

    openDoc = () => {
        var strVar = "";
        strVar += "<div class=\"agreement-box\">\n";
        strVar += "        在响创意网站注册是完全免费的，继续注册前请先阅读服务条款：用户单独承担发布内容的责任。<br>\n";
        strVar += "        用户对服务的使用是根据所有适用于服务的地方法律、国家法律和国际法律标准的。<br>\n";
        strVar += "        <b>用户承诺：<\/b><br/>\n";
        strVar += "        <b>一、在本站的网页上发布信息或者利用本站的服务时必须符合中国有关法规，不得在本站的网页上或者利用本站的服务制作、复制、发布、传播以下信息：<\/b><br/>\n";
        strVar += "        1) 反对宪法所确定的基本原则的；<br>\n";
        strVar += "        2) 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br>\n";
        strVar += "        3) 损害国家荣誉和利益的；<br>\n";
        strVar += "        4) 煽动民族仇恨、民族歧视，破坏民族团结的；<br>\n";
        strVar += "        5) 破坏国家宗教政策，宣扬邪教和封建迷信的；<br>\n";
        strVar += "        6) 散布谣言，扰乱社会秩序，破坏社会稳定的；<br>\n";
        strVar += "        7) 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br>\n";
        strVar += "        8) 侮辱或者诽谤他人，侵害他人合法权益的；<br>\n";
        strVar += "        9) 含有法律、行政法规禁止的其他内容的。<br><br>\n";
        strVar += "        <b>二、在本站的网页上发布信息或者利用本站的服务时还必须符合其他有关国家和地区的法律规定以及国际法的有关规定。<\/b><br/><br>\n";
        strVar += "        <b>三、不利用本站的服务从事以下活动：<\/b><br/>\n";
        strVar += "        1) 未经允许，进入计算机信息网络或者使用计算机信息网络资源的；<br>\n";
        strVar += "        2) 未经允许，对计算机信息网络功能进行删除、修改或者增加的；<br>\n";
        strVar += "        3) 未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；<br>\n";
        strVar += "        4) 故意制作、传播计算机病毒等破坏性程序的；<br>\n";
        strVar += "        5) 其他危害计算机信息网络安全的行为。<br><br>\n";
        strVar += "        <b>四、不以任何方式干扰本站的服务。<\/b><br><br/>\n";
        strVar += "        <b>五、遵守本站的所有其他规定和程序。<\/b><br/>\n";
        strVar += "        请确认您已仔细阅读了本服务条款，接受本站服务条款全部内容，成为响创意网站的正式用户。用户在享受233网校网站服务时必须完全、严格遵守本服务条款。<br/><br/>\n";
        strVar += "    <\/div>\n";
        layer.open({
            type: 1,
            area: ['80%', '80%'],
            title: "《响创意用户使用协议》",
            skin: 'lay-reg-modal',
            closeBtn: 1,
            anim: 0,
            shadeClose: true,
            content: strVar
        });
    }

    render() {
        const { Nav, userNameError, emailError, pswError, pswConfirmError, agree, displayPsw } = this.state
        return (
            <div className="reg-p-body">
                <a href="javascript:;" className="r-logo">
                    <img src="images/reg_logo.png" />
                </a>
                <div class="r-banner">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                华语创意门户还有变好的空间<br /><span>所以，响创意和你站到了改变的起点</span>
                            </div>
                            <div class="swiper-slide">“ 既然选择，就要热爱；既然热爱，就要坚持”<br /><span>—— Nokia N9不跟随广告文案</span></div>
                            <div class="swiper-slide">“ 你是谁不重要，你试什么才重要 ”<br /><span>—— 纯喫茶X炉石战记广告文案</span></div>
                        </div>
                    </div>
                    <div class="u-pagination wide"></div>
                </div>
                <div class="reg-wrapper">
                    <div class="reg-cell">
                        <div class="reg-640">
                            <div class="m1-rlogo">
                                <a href="javascript:;"><img src="css/images/m/r-logo.png" /></a>
                                <span>注 册</span>
                            </div>
                            <div class="reg-section">
                                <div class="r-lable mb-40">创建帐号，记录创作灵感</div>
                                <div class="r-fl50 clearfix">
                                    <div className={"r-input mb-20 " + (userNameError ? "isError" : "")}>

                                        <i className="ico icon-user-r"></i>
                                        <input type="text" placeholder="请输入用户名" onChange={this.handleUserName} />
                                        <div className="tipError">
                                            用户名为必填项
                                        </div>
                                    </div>
                                    <div className={"r-input mb-20 " + (emailError ? "isError" : "")}>
                                        <i className="ico icon-mail-r"></i>
                                        <input type="text" placeholder="请输入电子邮箱" onChange={this.handleEmail} />
                                        <div className="tipError">
                                            请输入正确的邮箱
                                        </div>
                                    </div>
                                </div>
                                <div className={"r-input mb-20 " + (pswError ? "isError" : "")}>
                                    <i className="ico icon-password-r"></i>
                                    <input type={displayPsw ? "password" : "text"} placeholder="请输入密码" onChange={this.handlePsw} />
                                    <i className="tip icon-eye-r" onClick={this.changeDisplayPsw}></i>
                                    <div className="tipError">
                                        请输入密码
                                    </div>
                                </div>
                                <div className={"r-input mb-10 " + (pswConfirmError ? "isError" : "")} >
                                    <i className="ico icon-password-r"></i>
                                    <input type={displayPsw ? "password" : "text"} placeholder="再次输入密码" onChange={this.handlePswConfirm} />
                                    <i className="tip icon-eye-r" onClick={this.changeDisplayPsw}></i>
                                    <div className="tipError">
                                        两次密码不一致，请重新输入
                                    </div>
                                </div>
                                <div class="r-agree f-right mb-40">
                                    <p>
                                        <input type="checkbox" id="inputChecked1" className="u-checkbox radius" value={agree} onClick={this.checkAgree} />
                                        <label for="inputChecked1"></label>
                                        我已完全阅读并承诺接受<a href="javascript:;" onClick={this.openDoc}>《响创意用户使用协议》</a>
                                    </p>
                                </div>
                                <a href="javascript:;" className="r-btn r-submit" onClick={this.RegConfirm}>验证邮箱</a>
                                <div className="r-right-txt">
                                    已有账户，<a href="/#/Login" className="">立即登录</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}