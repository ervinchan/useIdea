import React, { Component } from 'react';

import $ from 'jquery'
import axios from 'axios'
import Swiper from 'swiper/dist/js/swiper.min.js'
import Utils from '../../static/js/utils/utils.js'
import Validate from '../../static/js/utils/validate.js'
import Service from '../../service/api.js'
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
        if (!loginEmail) {// !Validate.checkEmail(loginEmail)
            return this.setState({ emailError: true })
        } else if (!loginPsw) {
            return this.setState({ pswError: true })
        }
        Service.Login({
            loginName: loginEmail,
            password: loginPsw,
            isCompany: "false"
        }).then((response) => {
            if (response.data.status === 1) {
                sessionStorage.setItem('userInfo', JSON.stringify(response.data.data))
                setTimeout(this.props.history.push("/"), 300)
            } else {
                layer.msg(response.data.message)
            }

        })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { emailError, pswError, displayPsw } = this.state
        return (
            <div className="reg-p-user">
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
                {/* <div className="r-banner">
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
                </div> */}
                <div class="reg-wrapper">
                    <div class="reg-cell">
                        <div class="reg-640">
                            <div class="m1-rlogo">
                                <a href="javascript:;"><img src="css/images/m/r-logo.png" /></a>
                                <span>登 录</span>
                            </div>
                            <div class="reg-section">
                                <div class="r-lable mb-40">立即登录，发布灵感创作</div>
                                {/* <div class="r-input mb-40">
                                    <i class="ico icon-user-r"></i>
                                    <input type="text"   placeholder="请输入用户名" />
                                </div>  */}
                                <div className={"r-input mb-40 " + (emailError ? "isError" : "")}>
                                    <i className="ico icon-user-r"></i>
                                    <input type="text" placeholder="请输入用户名" onChange={this.handleEmail} />
                                    <div className="tipError">
                                        请输入用户名
                                    </div>
                                </div>
                                <div className={"r-input mb-10 " + (pswError ? "isError" : "")}>
                                    <i className="ico icon-password-r"></i>
                                    <input type={displayPsw ? "password" : "text"} placeholder="请输入密码" onChange={this.handlePsw} />
                                    <i className="tip icon-eye-r" onClick={this.changeDisplayPsw}></i>
                                    <div className="tipError">
                                        用户名和密码不匹配，请重新输入
                                    </div>
                                </div>
                                <div class="social-account clearfix mb-40">
                                    <span>
                                        第三方登录：
                                    </span>
                                    <a href="javascript:;" title="功能开发中"><i class="icon-weixin-r"></i></a>
                                    <a href="javascript:;" title="功能开发中"><i class="icon-weibo-r"></i></a>
                                    <a href="javascript:;" class="f-r">忘记密码？</a>
                                </div>
                                <a href="javascript:;" className="r-btn" onClick={this.Login}>现在加入</a>
                                <div className="r-right-txt mb-30">
                                    暂无帐号？点击<a href="/#/Reg">创建账户</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="reg-wrapper">
                    <div className="reg-640">
                        <div className="r-txt">
                            终于等到你一起做件够酷的事儿。USEIDEA响创意立足华语创意圈，以联络、发掘、记录、传播创造者的闪现灵感、精准洞见为主旨，邀你合力参与营造属于创造者的独立创意社区，一同雕刻华语创造人生长轨迹的时代年轮。
                    </div>
                        <div className="reg-section">
                            <div className="r-lable">E-mall  address</div>
                            <div className={"r-input " + (emailError ? "isError" : "")}>
                                <i className="ico icon-mail-r"></i>
                                <input type="text" placeholder="请输入用户名" onChange={this.handleEmail} />
                                <div className="tipError">
                                    请输入用户名
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
                                <span>
                                    第三方登录：
                            </span>
                                <a href="javascript:;"><i className="icon-weixin-r"></i></a>
                                <a href="javascript:;"><i className="icon-weibo-r"></i></a>
                                <a href="javascript:;" className="f-r">忘记密码？</a>
                            </div>
                            <a href="javascript:;" className="r-btn" onClick={this.Login}>现在加入</a>
                            <div className="r-right-txt f17">
                                暂无账户？点此开启你的灵感旅程：<a href="/#/Reg">创建账户</a>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}