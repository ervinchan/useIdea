import React, { Component } from 'react';

import $ from 'jquery'
import Utils from '../../static/js/utils/utils.js'
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
            regEmail: "",
            regPsw: "",
            regPswConfirm: "",
            emailError: false,
            pswError: false,
            pswConfirmError: false,
            agree: false,
            displayPsw: true,
            userNameError: false,
            regUserName: ""
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
        this.setState({ emailError: false, pswError: false, pswConfirmError: false, userNameError: false })
        /*global layer */
        if (!regUserName) {
            return this.setState({ userNameError: true })
        }
        if (!regEmail || !Validate.checkEmail(regEmail)) {
            return this.setState({ emailError: true })
        } else if (!regPsw) {
            return this.setState({ pswError: true })
        } else if (regPsw !== regPswConfirm) {
            return this.setState({ pswConfirmError: true })
        } else if (!agree) {
            return layer.msg("请先阅读网站用户协议并同意")
        }
        Service.validateLoginName({
            name: regEmail
        }).then((response) => {
            console.log(response)
            if (response.data.status === 1) {
                let opts = {
                    password: regPsw,
                    loginName: regUserName,
                    email: regEmail,
                    passwordConfirm: regPswConfirm,
                    isCompany: "true"
                }
                sessionStorage.setItem("regInfo", JSON.stringify(opts))
                this.props.history.push("/RegInfo")
            } else {
                return layer.msg(response.data.message)
            }
        })


    }

    checkAgree = () => {
        this.setState({ agree: !this.state.agree })
    }

    changeDisplayPsw = () => {
        this.setState({ displayPsw: !this.state.displayPsw })
    }

    render() {
        const { Nav, emailError, userNameError, pswError, pswConfirmError, agree, displayPsw } = this.state
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
                        <div className="r-title">注册响创意机构号</div>
                        <div className="r-txt">
                            USEIDEA在传统创意门户基础上，引入社区设计的方法，为创意人之间的连接创造多一重可能。机构号基于创意社区生态结构设计开发，面向机构、品牌方和创意团体开放，通过发布项目、请教、活动、专访、招聘等8大功能，为传播创意赋能。
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
                            <a href="javascript:;" className="r-btn r-submit" onClick={this.RegConfirm}>提交注册</a>
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