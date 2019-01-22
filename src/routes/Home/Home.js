import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, List, Avatar, Divider, Button, Card, Popover } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.js'

import 'swiper/dist/css/swiper.min.css'

import LOGO from "../../static/images/m-logo.png"
import banner from "../../static/images/1.jpg"
import banner2 from "../../static/images/2.jpg"

const TabPane = Tabs.TabPane;

export default class App extends Component {

    componentDidMount() {
        $(function () {
            var swiper_banner = new Swiper('.f-banner .swiper-container', {
                slidesPerView: 'auto',
                loop: true,
                speed: 1000,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                    waitForTransition: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.f-banner .u-next',
                    prevEl: '.f-banner .u-prev'
                },
                pagination: {
                    el: '.f-banner .u-pagination',
                    bulletClass: 'bull',
                    bulletActiveClass: 'active',
                    clickable: true
                }
            });

            var swiper_read = new Swiper('.m-read .swiper-container', {
                slidesPerView: 4,
                slidesPerColumn: 2,
                spaceBetween: 10,
                slidesPerGroup: 8,
                pagination: {
                    el: '.m-read .u-pagination',
                    bulletClass: 'bull',
                    bulletActiveClass: 'active',
                    clickable: true
                }
            });

            var swiper_bzhd = new Swiper('.m-interact .swiper-container', {
                slidesPerView: 'auto',
                spaceBetween: 20,
                loop: true,
                loopFillGroupWithBlank: true,
                navigation: {
                    nextEl: '.m-interact .f-next',
                    prevEl: '.m-interact .f-prev'
                }
            });

            var swiper_txzd = new Swiper('.p-txzd .swiper-container', {
                autoHeight: true,
                slidesPerView: 4,
                spaceBetween: 10,
                slidesPerGroup: 4,
                loop: true,
                loopFillGroupWithBlank: true,
                autoplay: {
                    delay: 3600
                },
                navigation: {
                    nextEl: '.p-txzd .m-next',
                    prevEl: '.p-txzd .m-prev'
                },
                pagination: {
                    el: '.p-txzd .u-pagination',
                    bulletClass: 'bull',
                    bulletActiveClass: 'active',
                    clickable: true
                }
            });
            //下拉选择
            $(".u-select [role=note]").on("click", function (e) {
                e = window.event || e;
                e.stopPropagation();
                $(this).next().show();
            });

            $(".u-select li").on("click", function (e) {
                e = window.event || e;
                e.stopPropagation();
                $($(this).parents("[role=menu]").data("for")).html($(this).text());
                $(this).parents("[role=menu]").hide();
            });

            //搜索
            $(".m-head").on("click", ".f-item.search", function (e) {
                e = window.event || e;
                e.stopPropagation();
                $(".search-wrap").addClass("active");
                $(".search-wrap input").focus();
            });
            $(document).on("click", function (e) {
                e = window.event || e;
                e.stopPropagation();
                $(".u-select [role=menu]").hide();
                $(".search-wrap").removeClass("active");
                $(".search-wrap input").val("");
            }).on("keydown", function (e) {
                e = window.event || e;
                e.stopPropagation();
            });
            //全部显示
            $(".jq-hidden").on("click", function (e) {
                $($(this).data("for")).toggleClass("hidden");
            });

            $(".m-menu-shu .menu>li>a").on("click", function (e) {
                $(this).next().slideToggle(300);
            });

            $(window).on("click", ".layui-city .city-list a", function (e) {
                alert("sd");
                $(".jb-search .search-select").html($(this).text());
            });

            $(window).scroll(function () {
                var bar_scroll = $(window).scrollTop() + $(window).height();
                //浮动
                var $fixed = $("[data-fixed]");
                if ($fixed.length > 0) {
                    var bar_top = $($fixed.data("fixed")).offset().top;
                    if ($(window).scrollTop() >= bar_top) {
                        $fixed.addClass("fixed");
                    } else {
                        $fixed.removeClass("fixed");
                    }
                    if (bar_scroll > $(".fixed_bottom").offset().top) {
                        $fixed.removeClass("fixed");
                    }
                }
                if ($(".p-nav-a").length > 0) {
                    if ($(window).scrollTop() >= $(".g-index").offset().top) {
                        $(".p-nav-a").addClass("fixed");
                    } else {
                        $(".p-nav-a").removeClass("fixed");
                    }
                }
            });
        })
    }

    bannerSwiper = () => {

    }

    render() {
        const settingsBanner = {
            dots: true,
            className: "swiper-container",
            //centerMode: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            speed: 1000,
            nextArrow: <Icon type="right-circle" theme="filled" />,
            prevArrow: <Icon type="left-circle" theme="filled" />
        };
        return (
            <div className="">
                {/* 头部 */}
                <div className="m-head">
                    <div className="wrapper">
                        <a href="/" className="logo">
                            <img src={LOGO} alt="文案圈周刊" />
                        </a>
                        <div className="f-item user">
                            <a href="javascript:;" className="icon-user">
                                <i className="badge">42</i>
                            </a>

                            <div className="fm-userinfo">
                                <div className="info">
                                    <a href="javascript:;" className="thumb">
                                        <img src="css/images/1x1.png" />
                                    </a>
                                    <h1><a href="#">未登录</a></h1>
                                    <h3><a href="#">新用户请先注册</a></h3>
                                </div>
                                <div className="inlet clearfix">
                                    <a href="#"><img src="css/images/1x1.png" className="icon-gr" />个人登录</a>
                                    <a href="#"><img src="css/images/1x1.png" className="icon-qy" />企业登录</a>
                                </div>
                            </div>
                            <div className="fm-userinfo">
                                <div className="info">
                                    <a href="javascript:;" className="thumb">
                                        <img src="css/images/1x1.png" />
                                    </a>
                                    <h1><a href="#">Sophie</a></h1>
                                    <h3><a href="#">完善个人资料</a></h3>
                                </div>
                                <ul className="nav clearfix">
                                    <li>
                                        <a href="#">发表文章</a>
                                    </li>
                                    <li>
                                        <a href="#">我的首页</a>
                                    </li>
                                    <li>
                                        <a href="#">我的订阅</a>
                                    </li>
                                    <li>
                                        <a href="#">来 信<i className="badge">42</i></a>
                                    </li>
                                    <li className="esc">
                                        <a href="javascript:;"><span className="icon-exit"></span><span>登 出</span></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="fm-userinfo">
                                <div className="info">
                                    <a href="javascript:;" className="thumb qy">
                                        <img src="css/images/1x1.png" />
                                    </a>
                                    <h1><a href="#">VML 上海</a></h1>
                                    <h3><a href="#">修改企业资料</a></h3>
                                </div>
                                <ul className="nav clearfix">
                                    <li>
                                        <a href="#">发布项目</a>
                                    </li>
                                    <li>
                                        <a href="#">发布岗位</a>
                                    </li>
                                    <li>
                                        <a href="#">广告投放管理</a>
                                    </li>
                                    <li>
                                        <a href="#">来 信<i className="badge">42</i></a>
                                    </li>
                                    <li className="esc">
                                        <a href="javascript:;"><span className="icon-exit"></span><span>登 出</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="f-item search">
                            <a href="javascript:;" className="icon-search"></a>
                        </div>
                        <ul className="m-menu">
                            <li className="active"><a href="index.html">首 页</a></li>
                            <li><a href="question.html">请 教</a></li>
                            <li><a href="javascript:;">小专栏</a></li>
                            <li><a href="goodcopy.html">吃口文案</a></li>
                            <li>
                                <a href="javascript:;">灵感库</a>
                                <ul>
                                    <li><i className="fa-angle-right"></i><a href="bigidea.html">见识灵感</a></li>
                                    <li><i className="fa-angle-right"></i><a href="viewpoint.html">醒来再读</a></li>
                                    <li><i className="fa-angle-right"></i><a href="interview.html">专访幕后</a></li>
                                    <li><i className="fa-angle-right"></i><a href="tools.html">工具包</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:;">蜗牛翻书</a>
                                <ul>
                                    <li><i className="fa-angle-right"></i><a href="bookstore.html">书单上新</a></li>
                                    <li><i className="fa-angle-right"></i><a href="readingtime.html">阅读场景</a></li>
                                </ul>
                            </li>
                            <li><a href="jobs.html">招 聘</a></li>
                        </ul>
                    </div>
                    <div className="search-wrap">
                        <div className="wrapper">
                            <div className="u-search">
                                <input type="text" placeholder="搜索与我有关的提问" />
                                <a href="javascript:;" className="fa-search"></a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 轮播banner */}
                <div className="f-banner">
                    <div className="swiper-box">
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                <a className="swiper-slide" href="javascript:;"><img alt="example" src={banner} /><div className="txt"><span>描述关键词</span><h1>LUMINE 秋季表白季爱你</h1></div></a>
                                <a className="swiper-slide" href="javascript:;"><img alt="example" src={banner2} /><div className="txt"><span>描述关键词</span><h1>LUMINE 秋季表白季爱你</h1></div></a>
                                <a className="swiper-slide" href="javascript:;"><img alt="example" src={banner2} /><div className="txt"><span>描述关键词</span><h1>LUMINE 秋季表白季爱你</h1></div></a>
                                <a className="swiper-slide" href="javascript:;"><img alt="example" src={banner2} /><div className="txt"><span>描述关键词</span><h1>LUMINE 秋季表白季爱你</h1></div></a>
                                <a className="swiper-slide" href="javascript:;"><img alt="example" src={banner2} /><div className="txt"><span>描述关键词</span><h1>LUMINE 秋季表白季爱你</h1></div></a>
                                <a className="swiper-slide" href="javascript:;"><img alt="example" src={banner2} /><div className="txt"><span>描述关键词</span><h1>LUMINE 秋季表白季爱你</h1></div></a>
                                <a className="swiper-slide" href="javascript:;"><img alt="example" src={banner} /><div className="txt"><span>描述关键词</span><h1>LUMINE 秋季表白季爱你</h1></div></a>
                                <a className="swiper-slide" href="javascript:;"><img alt="example" src={banner} /><div className="txt"><span>描述关键词</span><h1>LUMINE 秋季表白季爱你</h1></div></a>
                            </div>
                        </div>
                    </div>
                    <div className="u-pagination"></div>
                    <div className="u-prev fa-angle-left"></div>
                    <div className="u-next fa-angle-right"></div>
                    <div className="contact-list">
                        <a href="javascript:;" title="微信" data-el="weixin"><i className="icon-wechat"></i></a>
                        <a href="javascript:;" title="微博"><i className="icon-weibo"></i></a>
                        <a href="javascript:;" title="商城"><i className="icon-buy"></i></a>
                        <a href="javascript:;" title="知乎"><i className="icon-zhihu"></i></a>
                    </div>
                </div>
                <div className="m-seat-x4 wrapper">
                    <ul className="m-row">
                        <li><a href="javascript:;" className="darken scale"><img src="images/d1.jpg" /></a></li>
                        <li><a href="javascript:;" className="darken scale"><img src="images/d2.jpg" /></a></li>
                        <li><a href="javascript:;" className="darken scale"><img src="images/d3.jpg" /></a></li>
                        <li><a href="javascript:;" className="darken scale"><img src="images/d4.jpg" /></a></li>
                    </ul>
                </div>
                <div className="wrapper g-index">
                    <div className="p-nav-a">
                        <ul className="clearfix ">
                            <li className="active">
                                <a href="javascript:;">主编推荐</a>
                            </li>
                            <li><a href="javascript:;">请 教</a></li>
                            <li><a href="javascript:;">小专栏</a></li>
                            <li><a href="javascript:;">醒来再读</a></li>
                            <li><a href="javascript:;">吃口文案</a></li>
                            <li><a href="javascript:;">书单上新</a></li>
                            <li><a href="javascript:;">招聘</a></li>
                        </ul>
                    </div>
                    <div className="g-left">
                        <div className="m-artlist clearfix">
                            <div className="item">
                                <a className="thumb-img" href="javascript:;"><img src="images/16.jpg" />
                                </a>
                                <div className="tit"><a href="javascript:;">锤子发布会最全总结：这次全是赚钱的产品，没有交朋友的</a></div>
                                <div className="txt">
                                    <span>今天 22:32</span><br />
                                    <span>Brand：锤子科技</span>
                                </div>
                                <div className="bar">
                                    <a href="javascript:;" className="user-img">
                                        <img src="css/images/1x1.png" />
                                    </a>
                                    <span className="name">企业用户名</span>
                                    <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div className="item">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="images/14.jpg" />
                                </a>
                                <div className="tit"><a href="javascript:;">索尼×王俊凯特别款套装，你pick了吗？</a></div>
                                <div className="txt">
                                    <span>昨天 21:32</span><br />
                                    <span>Brand：Sony 索尼</span>
                                </div>
                                <div className="bar">
                                    <a href="javascript:;" className="user-img">
                                        <img src="css/images/1x1.png" />
                                    </a>
                                    <span className="name">Amber China 琥珀传播</span>
                                    <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div className="item">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="images/15.jpg" />
                                </a>
                                <div className="tit"><a href="javascript:;">京东图书品牌TVC，带你「寻找更好的答案」</a></div>
                                <div className="txt">
                                    <span>昨天 18:32</span><br />
                                    <span>Brand：JD 京东</span>
                                </div>
                                <div className="bar">
                                    <a href="javascript:;" className="user-img">
                                        <img src="css/images/1x1.png" />
                                    </a>
                                    <span className="name">JD 京东</span>
                                    <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div className="item user">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="images/16.jpg" />
                                </a>
                                <div className="tit"><a href="javascript:;">Apple官网惊艳文案，值得所有文案从头看一遍！</a></div>
                                <div className="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div className="bar">
                                    <span>冴羽</span><span>·</span><span>昨天 09:32</span>
                                    <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <a href="javascript:;" className="seat-push" >
                                <img src="images/13.jpg" />
                                <span className="badge">推荐</span>
                                <p className="txt">夜猫子啤酒：十年之交，好事不怕晚 </p>
                            </a>
                            <div className="item user">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div className="tit"><a href="javascript:;">美美美！Lowrys Farm 长泽雅美、夏帆最新广告，新壁纸有了</a></div>
                                <div className="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div className="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div className="item user">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div className="tit"><a href="javascript:;">Apple官网惊艳文案，值得所有文案从头看一遍！</a></div>
                                <div className="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div className="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div className="item user">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div className="tit"><a href="javascript:;">美美美！Lowrys Farm 长泽雅美、夏帆最新广告，新壁纸有了</a></div>
                                <div className="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div className="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div className="item user">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div className="tit"><a href="javascript:;">美美美！Lowrys Farm 长泽雅美、夏帆最新广告，新壁纸有了</a></div>
                                <div className="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div className="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div className="item user">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div className="tit"><a href="javascript:;">Apple官网惊艳文案，值得所有文案从头看一遍！</a></div>
                                <div className="txt">最是那一低头的陌生又熟悉的风景:枯藤老树昏鸦，小桥流水人家。古朴中蕴含着自然，悠闲中透露出安谧。 见惯了城市拥挤嘈杂的人潮车流，便惊诧于乡村的悠闲自得；见惯了城市通宵达旦的</div>
                                <div className="bar">
                                    <span>冴羽</span><span>·</span><span>昨天 09:32</span>
                                    <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <a href="javascript:;" className="seat-push" >
                                <img src="images/d1t.jpg" />
                                <span className="badge">推荐</span>
                                <p className="txt">今年第55届金马奖海报设计师，一人承包了台湾大半个娱乐圈设计！</p>
                            </a>
                            <div className="item user">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div className="tit"><a href="javascript:;">美美美！Lowrys Farm 长泽雅美、夏帆最新广告，新壁纸有了</a></div>
                                <div className="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div className="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div className="item user">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div className="tit"><a href="javascript:;">Apple官网惊艳文案，值得所有文案从头看一遍！</a></div>
                                <div className="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div className="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div className="item user">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div className="tit"><a href="javascript:;">美美美！Lowrys Farm 长泽雅美、夏帆最新广告，新壁纸有了</a></div>
                                <div className="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div className="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div className="item user">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div className="tit"><a href="javascript:;">Apple官网惊艳文案，值得所有文案从头看一遍！</a></div>
                                <div className="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div className="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                        </div>
                        <a href="javascript:;" className="more-a">点击浏览更多</a>
                    </div>
                    <div className="g-right">
                        <a href="javascript:;" className="seat-h110 lighten"><img src="images/17.jpg" /></a>
                        <a href="javascript:;" className="seat-h110 lighten"><img src="css/images/315x115.png" /></a>
                        <a href="javascript:;" className="seat-h190 lighten"><img src="images/d5.jpg" /></a>
                        <a href="javascript:;" className="seat-h190 lighten"><img src="images/d6.jpg" /></a>
                        <a href="javascript:;" className="seat-h190 lighten"><img src="images/d7.jpg" /></a>
                        <div className="m-r-hot">
                            <div className="u-title">
                                <b>热文排行</b>
                            </div>
                            <ul className="hot-article active">
                                <li>
                                    <a href="#" className="thumb-img">
                                        <span>1</span>
                                        <img src="images/r1.jpg" />
                                    </a>
                                    <h1><a href="#">天猫拾光之旅：双11十年，都藏在这些彩蛋里了！</a></h1>
                                    <h3>jrainlau</h3>
                                </li>
                                <li>
                                    <a href="#" className="thumb-img">
                                        <span>2</span>
                                        <img src="images/r2.jpg" />
                                    </a>
                                    <h1><a href="#">《风味人间》的画面，每一帧都写着馋</a></h1>
                                    <h3>jrainlau</h3>
                                </li>
                                <li>
                                    <a href="#" className="thumb-img">
                                        <span>3</span>
                                        <img src="css/images/95x65.png" />
                                    </a>
                                    <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>
                                    <h3>jrainlau</h3>
                                </li>
                                <li>
                                    <a href="#" className="thumb-img">
                                        <span>4</span>
                                        <img src="css/images/95x65.png" />
                                    </a>
                                    <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>
                                    <h3>jrainlau</h3>
                                </li>
                                <li>
                                    <a href="#" className="thumb-img">
                                        <span>5</span>
                                        <img src="css/images/95x65.png" />
                                    </a>
                                    <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>
                                    <h3>jrainlau</h3>
                                </li>
                                <li>
                                    <a href="#" className="thumb-img">
                                        <span>6</span>
                                        <img src="css/images/95x65.png" />
                                    </a>
                                    <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>
                                    <h3>jrainlau</h3>
                                </li>
                                <li>
                                    <a href="#" className="thumb-img">
                                        <span>7</span>
                                        <img src="css/images/95x65.png" />
                                    </a>
                                    <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>
                                    <h3>jrainlau</h3>
                                </li>
                                <li>
                                    <a href="#" className="thumb-img">
                                        <span>8</span>
                                        <img src="css/images/95x65.png" />
                                    </a>
                                    <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>
                                    <h3>jrainlau</h3>
                                </li>
                                <li>
                                    <a href="#" className="thumb-img">
                                        <span>9</span>
                                        <img src="css/images/95x65.png" />
                                    </a>
                                    <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>
                                    <h3>jrainlau</h3>
                                </li>
                                <li>
                                    <a href="#" className="thumb-img">
                                        <span>10</span>
                                        <img src="css/images/95x65.png" />
                                    </a>
                                    <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>
                                    <h3>jrainlau</h3>
                                </li>
                            </ul>
                        </div>
                        <a href="javascript:;" className="seat-h110"><img src="images/d9.jpg" /></a>
                        <a href="javascript:;" className="seat-h110"><img src="images/d8.jpg" /></a>
                        <div className="m-hot-tabs u-tabs">
                            <ul className="nav">
                                <li tabfor=".tab-team">热门团队</li>
                                <li>/</li>
                                <li tabfor=".tab-writer">热门作者</li>
                            </ul>
                            <div className="tab-team">
                                <ul className="hot-team clearfix">
                                    <li>
                                        <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-writer">
                                <ul className="hot-writer clearfix">
                                    <li>
                                        <a href="javascript:;">
                                            <em><img src="css/images/1x1.png" /></em>
                                            <span>四郎</span>
                                            <i className="fa-angle-right"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <em><img src="css/images/1x1.png" /></em>
                                            <span>萌也</span>
                                            <i className="fa-angle-right"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <em><img src="css/images/1x1.png" /></em>
                                            <span>空空如也</span>
                                            <i className="fa-angle-right"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <em><img src="css/images/1x1.png" /></em>
                                            <span>kelloy</span>
                                            <i className="fa-angle-right"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <em><img src="css/images/1x1.png" /></em>
                                            <span>故乡原景</span>
                                            <i className="fa-angle-right"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <em><img src="css/images/1x1.png" /></em>
                                            <span>四郎</span>
                                            <i className="fa-angle-right"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <em></em>
                                            <span>四郎</span>
                                            <i className="fa-angle-right"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <em></em>
                                            <span>故乡原景</span>
                                            <i className="fa-angle-right"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <em></em>
                                            <span>四郎</span>
                                            <i className="fa-angle-right"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <em></em>
                                            <span>四郎</span>
                                            <i className="fa-angle-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 同行在读 */}
                <div className="m-fs-book p-txzd wrapper">
                    <div className="u-title2">
                        <h1>同行在读</h1>
                        <h3><a href="javascript:;" className="book">更多<i className="fa-angle-right"></i></a></h3>
                    </div>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <a className="swiper-slide" href="javascript:;">
                                <em><img src="images/b1.png" /> </em>
                                <h1>創意，從無到有（中英對照）</h1>
                                <h3> James Webb Young</h3>
                                <div className="txt">美國傳奇廣告大師楊傑美──唯一本專談創意的隨筆散文</div>
                            </a>
                            <a className="swiper-slide" href="javascript:;">
                                <em><img src="images/b2.png" /></em>
                                <h1>品牌的技術和藝術</h1>
                                <h3> James Webb Young</h3>
                                <div className="txt">台湾奥美策略长，集30年的工作经验之谈</div>
                            </a>
                            <a className="swiper-slide" href="javascript:;">
                                <em><img src="images/b3.png" /></em>
                                <h1>創意，博報堂最強腦力激盪術</h1>
                                <h3> James Webb Young</h3>
                                <div className="txt">博報堂台湾奥美策略长，集30年的工作经验之谈</div>
                            </a>
                            <a className="swiper-slide" href="javascript:;">
                                <em><img src="images/b4.png" /></em>
                                <h1>創意，從無到有（中英對照）</h1>
                                <h3> James Webb Young</h3>
                                <div className="txt">美國傳奇廣告大師楊傑美──唯一本專談創意的隨筆散文</div>
                            </a>
                            <a className="swiper-slide" href="javascript:;">
                                <em><img src="css/images/280x180.png" /></em>
                                <h1>品牌的技術和藝術</h1>
                                <h3> James Webb Young</h3>
                                <div className="txt">台湾奥美策略长，集30年的工作经验之谈</div>
                            </a>
                            <a className="swiper-slide" href="javascript:;">
                                <em><img src="css/images/280x180.png" /></em>
                                <h1>創意，博報堂最強腦力激盪術</h1>
                                <h3> James Webb Young</h3>
                                <div className="txt">博報堂台湾奥美策略长，集30年的工作经验之谈</div>
                            </a>
                            <a className="swiper-slide" href="javascript:;">
                                <em><img src="css/images/280x180.png" /></em>
                                <h1>博報堂最強腦力激盪術（中英對照）</h1>
                                <h3> James Webb Young</h3>
                                <div className="txt">台湾奥美策略长，集30年的工作经验之谈本專談創意的隨筆散文</div>
                            </a>
                            <a className="swiper-slide" href="javascript:;">
                                <em><img src="css/images/280x180.png" /></em>
                                <h1>博報堂最強腦力激盪術（中英對照）</h1>
                                <h3> James Webb Young</h3>
                                <div className="txt">台湾奥美策略长，集30年的工作经验之谈本專談創意的隨筆散文</div>
                            </a>
                        </div>
                        <div className="u-pagination wide"></div>
                    </div>
                    <div className="m-prev"></div>
                    <div className="m-next"></div>
                </div>
                {/* //本周互动 */}
                <div className="m-interact wrapper">
                    <div className="u-title3">
                        <b>本周互动</b><a href="#">更多></a>
                    </div>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="images/h1.jpg" />
                                </a>
                                <a className="btn" href="javascript:;">参加</a>
                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="images/h2.jpg" />
                                </a>
                                <a className="btn" href="javascript:;">参加</a>
                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="images/h3.jpg" />
                                </a>
                                <a className="btn" href="javascript:;">参加</a>
                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="images/h4.jpg" />
                                </a>
                                <a className="btn" href="javascript:;">参加</a>
                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="images/h3.jpg" />
                                </a>
                                <a className="btn" href="javascript:;">参加</a>
                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/225x275.png" />
                                </a>
                                <a className="btn" href="javascript:;">参加</a>
                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/225x275.png" />
                                </a>
                                <a className="btn" href="javascript:;">参加</a>
                            </div>
                        </div>
                    </div>
                    <div className="f-prev fa-angle-left"></div>
                    <div className="f-next fa-angle-right"></div>
                </div>
                {/* 热门阅读 */}
                <div className="m-read wrapper">
                    <div className="u-title2">
                        <h1>热门阅读</h1>
                    </div>
                    <div className="fixed_bottom"></div>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;"><img src="images/19.jpg" />
                                </a>
                                <h1><a href="#">野生中年不懂策略不该动笔写文案，90%的文案一犯再指南TOP</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="images/18.jpg" />
                                </a>
                                <h1><a href="#">野生中年文案，上岸指南</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="images/21.jpg" />
                                </a>
                                <h1><a href="#">不懂策略不该动笔写文案。这一常识错误，90%的文案一犯再犯</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="images/20.jpg" />
                                </a>
                                <h1><a href="#">文案开稿公式：4步推演完，才敢动笔写文案</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;"><img src="images/19.jpg" />
                                </a>
                                <h1><a href="#">野生中年文案，上岸指南</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/280x150.png" />
                                </a>
                                <h1><a href="#">野生中年文案，上岸指南</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/280x150.png" />
                                </a>
                                <h1><a href="#">野生中年文案，上岸指南</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/280x150.png" />
                                </a>
                                <h1><a href="#">野生中年文案，上岸指南</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/280x150.png" />
                                </a>
                                <h1><a href="#">野生中年文案，上岸指南</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/280x150.png" />
                                </a>
                                <h1><a href="#">野生中年文案，上岸指南</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/280x150.png" />
                                </a>
                                <h1><a href="#">不懂策略不该动笔写文案。这一常识错误，90%的文案一犯再犯</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/280x150.png" />
                                </a>
                                <h1><a href="#">文案开稿公式：4步推演完，才敢动笔写文案</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/280x150.png" />
                                </a>
                                <h1><a href="#">野生中年文案，上岸指南</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/280x150.png" />
                                </a>
                                <h1><a href="#">野生中年文案，上岸指南</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/280x150.png" />
                                </a>
                                <h1><a href="#">野生中年文案，上岸指南</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                            <div className="swiper-slide">
                                <a className="thumb-img" href="javascript:;">
                                    <img src="css/images/280x150.png" />
                                </a>
                                <h1><a href="#">野生中年文案，上岸指南END</a></h1>
                                <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                            </div>
                        </div>
                    </div>
                    <div className="u-pagination wide"></div>
                </div>
                {/* 底部 */}
                <div className="m-footer">
                    <div className="wrapper clearfix">
                        <div className="link">
                            <h1>
                                <b>响创意</b><br />记录创造者的洞见
                            </h1>
                            <p>
                                <a href="#">关于我们</a>
                                <a href="#">版权声明</a>
                                <a href="#">隐私保护</a>
                                <a href="#">联系我们</a>
                            </p>
                        </div>
                        <div className="info">
                            <img src="css/images/code.jpg" />
                            <br />
                            <div className="contact-list">
                                <a href="javascript:;" title="微博"><i className="icon-weibo"></i></a>
                                <a href="javascript:;" title="商城"><i className="icon-buy"></i></a>
                                <a href="javascript:;" title="视频"><i className="icon-tv"></i></a>
                                <a href="javascript:;" title="知乎"><i className="icon-zhihu1"></i></a>
                            </div>
                            <h3>
                                商务合作及媒介沟通请联系：ideazhu@gmail.com
                            </h3>
                            <h5>Copyright©响创意2018-2019  浙ICP备13019248号</h5>
                        </div>
                    </div>
                </div>
                <script src=""></script>
            </div>
        );
    }
}

