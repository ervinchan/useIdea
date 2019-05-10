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

    render() {
        const { Nav, userNameError, emailError, pswError, pswConfirmError, agree, displayPsw } = this.state
        return (
            <div className="reg-body">
                <div className="r-banner">
                    <img src={regBanner} />
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="txt">华语创意门户还有变好的空间<br /><span>所以，响创意和你站到了改变的起点</span></div>
                            </div>
                            <div className="swiper-slide"><div className="txt">“ 既然选择，就要热爱；既然热爱，就要坚持”<br /><span>—— Nokia N9不跟随广告文案</span></div></div>
                            <div className="swiper-slide"><div className="txt">“ 你是谁不重要，你试什么才重要 ”<br /><span>—— 纯喫茶X炉石战记广告文案</span></div></div>
                        </div>
                    </div>
                    <div className="u-pagination wide"></div>
                    <a href="index.html" className="r-logo">
                        <img src={logo} />
                    </a>
                </div>
                <div className="reg-wrapper">
                    <div className="reg-640">
                        <div className="r-txt">
                            终于等到你一起做件够酷的事儿。USEIDEA响创意立足华语创意圈，以联络、发掘、记录、传播创造者的闪现灵感、精准洞见为主旨，邀你合力参与营造属于创造者的独立创意社区，一同雕刻华语创造人生长轨迹的时代年轮。
                        </div>
                        <div className="reg-section">
                            <div className="r-lable">User Name</div>
                            <div className={"r-input " + (userNameError ? "isError" : "")}>
                                <i className="ico icon-mail-r"></i>
                                <input type="text" placeholder="请输入用户名" onChange={this.handleUserName} />
                                <div className="tipError">
                                    用户名为必填项
                                </div>
                            </div>
                            <div className="r-lable">E-mall  address</div>
                            <div className={"r-input " + (emailError ? "isError" : "")}>
                                <i className="ico icon-mail-r"></i>
                                <input type="text" placeholder="请输入电子邮箱" onChange={this.handleEmail} />
                                <div className="tipError">
                                    请输入正确的邮箱
                                </div>
                            </div>
                            <div className="r-lable">Password</div>
                            <div className={"r-input " + (pswError ? "isError" : "")}>
                                <i className="ico icon-password-r"></i>
                                <input type={displayPsw ? "password" : "text"} placeholder="请输入密码" onChange={this.handlePsw} />
                                <i className="tip icon-eye-r" onClick={this.changeDisplayPsw}></i>
                                <div className="tipError">
                                    请输入密码
                                </div>
                            </div>
                            <div className="r-lable">Confirm Password</div>
                            <div className={"r-input " + (pswConfirmError ? "isError" : "")} >
                                <i className="ico icon-password-r"></i>
                                <input type={displayPsw ? "password" : "text"} placeholder="再次输入密码" onChange={this.handlePswConfirm} />
                                <i className="tip icon-eye-r" onClick={this.changeDisplayPsw}></i>
                                <div className="tipError">
                                    两次密码不一致，请重新输入
                                </div>
                            </div>
                            <div className="r-agree f-right">
                                <p>
                                    <input type="checkbox" id="inputChecked1" className="u-checkbox radius" value={agree} onClick={this.checkAgree} />
                                    <label for="inputChecked1"></label>
                                    我已完全阅读并承诺接受<a href="#">《XXX网站用户协议》</a>
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
        )
    }
}