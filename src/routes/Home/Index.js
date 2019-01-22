import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, List, Avatar, Divider, Button, Card, Popover } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import HotRead from '../../common/hotRead/Index'
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/index.less';
import 'antd/lib/tabs/style/index.less'


const TabPane = Tabs.TabPane;
const PAGESIZE = 15;

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bannerAList: [],
            bannerBList: [],
            bannerCList: [],
            questionList: [],
            viewPointList: [],
            goodcopyList: [],
            bootStoreList: [],
            jobList: []
        };
    }

    componentDidMount() {
        $(function () {
            $("#tabNav").find("li").on("click", function () {
                let item = $("#tabCont").find(".group").eq($(this).index());
                $(this).addClass("active").siblings().removeClass("active")
                item.show();
                item.siblings().hide();
            })
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
        this.getQuestionList();
        this.getViewPointList();
        this.getGoodCopyList();
        this.getBootStoreList();
        this.getJobsList();
        this.getBannerA();
        this.getBannerB();
        this.getBannerC();
    }

    getBannerA = () => {
        POST({
            url: "/a/cms/article/adsList?",
            opts: {
                categoryId: "981892a5c2394fe7b01ce706d917699e"
            }
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerAList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getBannerB = () => {
        POST({
            url: "/a/cms/article/adsList?",
            opts: {
                categoryId: "981892a5c2394fe7b01ce706d917699e"
            }
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerBList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })

    }
    getBannerC = () => {
        POST({
            url: "/a/cms/article/adsList?",
            opts: {
                categoryId: "981892a5c2394fe7b01ce706d917699e"
            }
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerCList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })

    }
    createBannerA = () => {
        const { bannerAList } = this.state
        let bannerList = bannerAList.map((item, index) => {
            return <a className="swiper-slide" href={item.url}><img alt={item.title} src={item.imageSrc} /><div className="txt"><span>{item.descript}</span><h1>{item.title}</h1></div></a>
        })
        return (
            <div className="f-banner">
                <div className="swiper-box">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {bannerList}
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
        )
    }
    createBannerB = () => {
        const { bannerBList } = this.state
        let bannerList = bannerBList.map((item, index) => {
            return <li><a href={item.url} className="darken scale"><img src={item.imageSrc} /></a></li>
        })
        return (
            <div className="m-seat-x4 wrapper">
                <ul className="m-row">
                    {bannerList}
                </ul>
            </div>
        )
    }
    createBannerC = () => {
        const { bannerCList } = this.state
        return bannerCList.map((item, index) => {
            return <a href={item.url} className="seat-h110 lighten"><img src={item.imageSrc} /></a>
        })
    }
    getQuestionList = () => {
        POST({
            url: "/a/cms/article/getAllArticle?",
            opts: {
                categoryId: "846cd0769ef9452aad0cc9c354ba07e3"

            }
        }).then((response) => {
            global.constants.loading = false
            let viewPointList = response.data.data
            this.setState({ viewPointList })
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getViewPointList = () => {
        POST({
            url: "/a/cms/article/getAllArticle?",
            opts: {
                categoryId: "846cd0769ef9452aad0cc9c354ba07e3"

            }
        }).then((response) => {
            global.constants.loading = false
            let viewPointList = response.data.data
            this.setState({ viewPointList })
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getGoodCopyList = () => {
        POST({
            url: "/a/cms/article/getAllArticle?",
            opts: {
                categoryId: "ce009ff186fa4203ab07bd1678504228"

            }
        }).then((response) => {
            global.constants.loading = false
            let goodcopyList = response.data.data
            this.setState({ goodcopyList })
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getBootStoreList = () => {
        POST({
            url: "/a/book/bookManager/bookSoft?",
            opts: {
                softType: 0,
                pageNo: 1,
                pageSize: PAGESIZE
            }
        }).then((response) => {
            global.constants.loading = false
            let bootStoreList = response.data.data
            this.setState({ bootStoreList })
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getJobsList = () => {
        POST({
            url: "/a/cms/article/getAllArticle?",
            opts: {
                categoryId: "981892a5c2394fe7b01ce706d917699e",
                pageNo: 1,
                pageSize: PAGESIZE
            }
        }).then((response) => {
            global.constants.loading = false
            let jobList = response.data.data
            this.setState({ jobList })
        })
            .catch((error) => {
                console.log(error)
            })
    }

    createList = (data) => {
        // const listData = [];
        // for (let i = 0; i < 3; i++) {
        //     listData.push({
        //         href: '#',
        //         title: `${name}-索尼X王俊凯特别套装 ${i}，你pick了吗`,
        //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        //         description: '本栏所有精品美文都是从文章阅读网里面精选出来的,包括爱情美文欣赏,经典亲情、友情等情感美文摘抄,欢迎读者慢慢品味。',
        //         content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        //     });
        // }
        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );
        return data.list && data.list.map((item, index) => {
            return (
                <div className="item">
                    <a className="thumb-img" href="javascript:;"><img src={item.imageSrc} />
                    </a>
                    <div className="tit"><a href="javascript:;">{item.title}</a></div>
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
            )
        })

    }

    createSameBookList = () => {
        const { bootStoreList } = this.state;

        return bootStoreList.list && bootStoreList.list.map((item, index) => {
            return (
                <a key={index} className="swiper-slide" href={`/Bookbuy/${item.id}`}>
                    <em><img src={item.img} /> </em>
                    <h1>{item.name}</h1>
                    <h3> {item.author}</h3>
                    <div className="txt">{item.descri}</div>
                </a>
            )
        })
    }


    renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={80}>
            {({ style }) => {
                return <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
            }}
        </Sticky>
    );

    render() {
        const { questionList, viewPointList, goodcopyList, bootStoreList, jobList } = this.state;
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
                < Header />
                {/* 轮播banner */}
                {this.createBannerA()}
                {this.createBannerB()}

                <div className="wrapper g-index">
                    <div className="p-nav-a">
                        <ul id="tabNav" className="tab-nav clearfix ">
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
                    <div id="tabCont" className="g-left">
                        <div className="group" index="0">
                            <div className="m-artlist clearfix">
                                {this.createList(questionList)}
                            </div>
                            <a href="javascript:;" className="more-a">点击浏览更多</a>
                        </div>
                        <div className="group" index="1" style={{ display: "none" }}>
                            <div className="m-artlist clearfix">
                                {this.createList(questionList)}
                            </div>
                            <a href="javascript:;" className="more-a">点击浏览更多</a>
                        </div>
                        <div className="group" index="2" style={{ display: "none" }}>
                            <div className="m-artlist clearfix">
                                {this.createList(questionList)}
                            </div>
                            <a href="javascript:;" className="more-a">点击浏览更多</a>
                        </div>
                        <div className="group" index="2" style={{ display: "none" }}>
                            <div className="m-artlist clearfix">
                                {this.createList(viewPointList)}
                            </div>
                            <a href="javascript:;" className="more-a">点击浏览更多</a>
                        </div>
                        <div className="group" index="4" style={{ display: "none" }}>
                            <div className="m-artlist clearfix">
                                {this.createList(goodcopyList)}
                            </div>
                            <a href="javascript:;" className="more-a">点击浏览更多</a>
                        </div>
                        <div className="group" index="5" style={{ display: "none" }}>
                            <div className="m-artlist clearfix">
                                {this.createList(bootStoreList)}
                            </div>
                            <a href="javascript:;" className="more-a">点击浏览更多</a>
                        </div>
                        <div className="group" index="6" style={{ display: "none" }}>
                            <div className="m-artlist clearfix">
                                {this.createList(jobList)}
                            </div>
                            <a href="javascript:;" className="more-a">点击浏览更多</a>
                        </div>
                    </div>
                    <div className="g-right">
                        {this.createBannerC()}
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
                            {this.createSameBookList()}
                        </div>
                        <div className="u-pagination wide"></div>
                    </div>
                    <div className="m-prev"></div>
                    <div className="m-next"></div>
                </div>
                {/* //本周互动 */}
                {/* <div className="m-interact wrapper">
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
                </div> */}
                {/* 热门阅读 */}
                <HotRead />
                {/* 底部 */}
                <Footer />
                <Loading />
            </div>
        );
    }
}

