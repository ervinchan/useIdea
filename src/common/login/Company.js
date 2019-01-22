import React, { Component } from 'react';

import $ from 'jquery'
import axios from 'axios'
import Swiper from 'swiper/dist/js/swiper.min.js'
import Utils from '../../static/js/utils/utils.js'
import Validate from '../../static/js/utils/validate.js'
import '../../static/less/reg.less';

import regBanner from '../../static/images/reg/1.jpg';
import logo from "../../static/images/reg_logo.png";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginEmail: "",
            loginPsw: "",
            emailError: false,
            pswError: false,
            displayPsw: true
        }
    }

    componentDidMount() {
        // $(document).ready(function () {
        //     setTimeout(function () {
        //         $("input[type=text],input[type=password]").removeAttr("style");
        //         $("input[data-value]").each(function () {
        //             $(this).val($(this).data("value"));
        //         });
        //     }, 500);

        //     setTimeout(function () {
        //         $("input[type=text],input[type=password]").removeAttr("style");
        //         $("input[data-value]").each(function () {
        //             $(this).val($(this).data("value"));
        //         });
        //     }, 2000);

        //     $(".r-input").on("click", function () {
        //         $(this).removeClass("isError");
        //     });
        // });
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

    handleEmail = (e) => {
        this.setState({ 'loginEmail': e.target.value })
    }

    handlePsw = (e) => {
        this.setState({ 'loginPsw': e.target.value })
    }

    changeDisplayPsw = () => {
        this.setState({ displayPsw: !this.state.displayPsw })
    }

    Login = () => {
        const { loginEmail, loginPsw } = this.state;
        this.setState({ emailError: false, pswError: false })
        /*global layer */
        if (!loginEmail || !Validate.checkEmail(loginEmail)) {
            return this.setState({ emailError: true })
        } else if (!loginPsw) {
            return this.setState({ pswError: true })
        }
        let url = 'zsl/ValidateLoginName?'
        let opts = {
            loginName: loginEmail,
            password: loginPsw,
            isCompany: "true"
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                let KeywordsList = response.data.data
                this.setState({ KeywordsList })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { emailError, pswError, displayPsw } = this.state
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
                        <div class="r-title">
                            响创意机构号登录
                        </div>
                        <div class="r-txt">
                            USEIDEA在传统创意门户基础上，引入社区设计的方法，为创意人之间的连接创造多一重可能。机构号基于创意社区生态结构设计开发，面向机构、品牌方和创意团体开放，通过发布项目、请教、活动、专访、招聘等8大功能，为传播创意赋能。
                        </div>
                        <div className="reg-section">
                            <div className="r-lable">E-mall  address</div>
                            <div className={"r-input " + (emailError ? "isError" : "")}>
                                <i className="ico icon-mail-r"></i>
                                <input type="text" placeholder="请输入电子邮箱" onChange={this.handleEmail} />
                                <div className="tipError">
                                    请输入邮箱
                                </div>
                            </div>
                            <div className="r-lable">Password</div>
                            <div className={"r-input " + (pswError ? "isError" : "")}>
                                <i className="ico icon-password-r"></i>
                                <input type={displayPsw ? "password" : "text"} placeholder="请输入密码" onChange={this.handlePsw} />
                                <i className="tip icon-eye-r" onClick={this.changeDisplayPsw}></i>
                                <div className="tipError">
                                    账号或密码有误，请重新输入
                                </div>
                            </div>
                            <div className="social-account clearfix">

                                <a href="javascript:;" className="f-r">忘记密码？</a>
                            </div>
                            <a href="javascript:;" className="r-btn" onClick={this.Login}>机构登录</a>
                            <div className="r-right-txt f17">
                                暂无账户？点此开启你的灵感旅程：<a href="/#/Reg">创建账户</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}