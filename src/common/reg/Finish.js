import React, { Component } from 'react';

import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'

import '../../static/less/reg.less';

import regBanner from '../../static/images/reg/1.jpg';
import logo from "../../static/images/reg_logo.png";

export default class Reg extends Component {
    constructor(props) {
        super(props);
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
    gobackHome = () => {
        this.props.history.push("/")
    }

    render() {
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
                        <div className="r-title">
                            恭喜你！一身才华，从此迸发。
                        </div>
                        <div className="r-txt">
                            离正式踏上灵感旅程，只有一步之遥。我们已向您的邮箱（ideazhu@gmail.com）发送了一款验证邮件，请进入邮箱完成确认注册。
                        </div>
                        <div className="reg-section top80">
                            <a href="javascript:;" className="r-btn" onClick={this.gobackHome}>返回首页登录</a>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}