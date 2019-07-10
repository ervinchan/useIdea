import React, { Component } from 'react';

import $ from 'jquery'
import axios from 'axios'
import Swiper from 'swiper/dist/js/swiper.min.js'
import Utils from '../../static/js/utils/utils.js'
import Validate from '../../static/js/utils/validate.js'
import '../../static/less/reg.qy.less';
import Service from '../../service/api.js'
import regBanner from '../../static/images/reg/4.jpg';
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
        if (!loginEmail) {
            return this.setState({ emailError: true })
        } else if (!loginPsw) {
            return this.setState({ pswError: true })
        }
        // let url = 'zsl/ValidateLoginName?'
        // let opts = {
        //     loginName: loginEmail,
        //     password: loginPsw,
        //     isCompany: "true"
        // }
        // for (var key in opts) {
        //     opts[key] && (url += "&" + key + "=" + opts[key])
        // }
        Service.Login({
            loginName: loginEmail,
            password: loginPsw,
            isCompany: "true"
        })
            .then((response) => {
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
            <div className="reg-qy-body">
                <div className="r-banner">
                    <img src={regBanner} />
                    <div className="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="txt">华语创意门户还有变好的空间<br /><span>所以，响创意和你站到了改变的起点</span></div>
                            </div>
                            <div class="swiper-slide"><div class="txt">“ 既然选择，就要热爱；既然热爱，就要坚持”<br /><span>—— Nokia N9不跟随广告文案</span></div></div>
                            <div class="swiper-slide"><div class="txt">“ 你是谁不重要，你试什么才重要 ”<br /><span>—— 纯喫茶X炉石战记广告文案</span></div></div>
                        </div>
                    </div>
                    <div className="u-pagination wide"></div>
                    <a href="index.html" className="r-logo">
                        <img src="images/reg_logo.png" />
                    </a>
                </div>
                <div className="reg-wrapper">
                    <div class="reg-cell">
                        <div className="reg-640">
                            <div class="r-title mb-20">
                                登录响创意机构号
                            </div>
                            <div class="r-txt  mb-60">
                                USEIDEA响创意，记录创造者的洞见。<br />
                                发掘驱动创作的思考，定义以人为尺度的创意社区。
                            </div>
                            <div class="reg-section ">
                                <div class="r-lable mb-30">立即登录，发布灵感创作</div>
                                <div className={"r-input  mb-30 " + (emailError ? "isError" : "")}>
                                    <i className="ico icon-mail-r"></i>
                                    <input type="text" placeholder="请输入用户名" onChange={this.handleEmail} />
                                    <div className="tipError">
                                        请输入用户名
                                    </div>
                                </div>
                                <div className={"r-input mb-10 " + (pswError ? "isError" : "")}>
                                    <i class="ico icon-password-r"></i>
                                    <input type={displayPsw ? "password" : "text"} placeholder="请输入密码" onChange={this.handlePsw} />
                                    <i class="tip icon-eye-r" onClick={this.changeDisplayPsw}></i>
                                    <div className="tipError">
                                        用户名和密码不匹配，请重新输入
                                    </div>
                                </div>
                                <div className="social-account clearfix mb-20">

                                    <a href="javascript:;" className="f-r">忘记密码？</a>
                                </div>
                                <a href="javascript:;" className="r-btn" onClick={this.Login}>机构登录</a>
                                <div className="r-right-txt f17">
                                    暂无帐号？免费<a href="/#/RegQy">创建账户</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}