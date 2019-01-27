import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, List, Avatar, Divider, Button, Card, Popover } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import FormatDate from '../../static/js/utils/formatDate.js'
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
            bannerEList: [],
            questionList: [],
            viewPointList: [],
            goodcopyList: [],
            bootStoreList: [],
            recommendBooks: [],
            topAuthorList: [],
            hitsArticleList: [],
            jobList: []
        };
    }

    componentDidMount() {
        $(function () {
            $("#utabs").find("li").on("mouseenter", function () {
                let tab = $($(this).attr("tabfor"));
                $(this).addClass("active").siblings().removeClass("active")
                tab.show();
                tab.siblings().hide();
            })
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
        this.getBannerE();
        this.getRecommendBooks();
        this.getTopAuthor();
        this.getHitsArticle();

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
    getBannerE = () => {
        POST({
            url: "/a/cms/article/adsList?",
            opts: {
                categoryId: "981892a5c2394fe7b01ce706d917699e"
            }
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerEList: response.data.data })
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
        return bannerCList.slice(0, 3).map((item, index) => {
            return <a href={item.url} className="seat-h110 lighten"><img src={item.imageSrc} /></a>
        })
    }
    createBannerD = () => {
        const { bannerCList } = this.state
        let bannerDList = bannerCList.slice(3, 5)
        return bannerDList.map((item, index) => {
            return <a href={item.url} className="seat-h110 lighten"><img src={item.imageSrc} /></a>
        })
    }

    getViewPointList = () => {
        POST({
            url: "/a/cms/article/getAllArticle?",
            opts: {
                categoryId: "846cd0769ef9452aad0cc9c354ba07e3",
                pageNo: 1,
                pageSize: PAGESIZE
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
                categoryId: "ce009ff186fa4203ab07bd1678504228",
                pageNo: 1,
                pageSize: PAGESIZE
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

    createList = (data, router) => {
        return data.list && data.list.map((item, index) => {
            let Hours = FormatDate.apartHours(item.updateDate)
            let Time = Hours > 24 ? FormatDate.customFormat(item.updateDate, 'yyyy/MM/dd') : `${Hours}小时前`
            return (
                // <div className="item">
                //     <a className="thumb-img" href="javascript:;"><img src={item.imageSrc} />
                //     </a>
                //     <div className="tit"><a href="javascript:;">{item.title}</a></div>
                //     <div className="txt">
                //         <span>今天 22:32</span><br />
                //         <span>Brand：锤子科技</span>
                //     </div>
                //     <div className="bar">
                //         <a href="javascript:;" className="user-img">
                //             <img src="css/images/1x1.png" />
                //         </a>
                //         <span className="name">企业用户名</span>
                //         <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                //     </div>
                // </div>
                <div class="item user" onClick={() => this.gotoRouter(`${router}/${item.id}`)}>
                    <a class="thumb-img" href="javascript:;">
                        <img src={item.imageSrc} />
                    </a>
                    <div class="tit"><a href="javascript:;">{item.title || item.bookName}</a></div>
                    <div class="txt">{item.description}</div>
                    <div class="bar">
                        <span>{item.author}</span><span>·</span><span>{Time}</span>
                        <div class="f-bartool clearfix"><a href="javascript:;" onClick={() => this.handleCollect(item)}><i class="icon-heart"></i><span>{item.collectNum}</span></a><a href="javascript:;" onClick={() => this.handleLike(item)}><i class="icon-thumbs"></i><span>{item.likeNum || item.praiseNum}</span></a><a href="javascript:;"><i class="icon-comment"></i><span>0</span></a></div>

                    </div>
                </div>
            )
        })

    }

    createSameBookList = (router) => {
        const { bootStoreList } = this.state;

        return bootStoreList.list && bootStoreList.list.map((item, index) => {

            return (
                <a href="javascript:;" style={{width: "280px",marginRight: "10px"}} key={index} className="swiper-slide" onClick={() => this.gotoRouter(`${router}/${item.id}`)}>
                    <em><img src={item.img} /> </em>
                    <h1>{item.name}</h1>
                    <h3> {item.author}</h3>
                    <div className="txt">{item.editorRecommend}</div>
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

    //主编荐书
    getRecommendBooks = () => {
        POST({
            url: "/a/book/bookManager/bookSoft?",
            opts: {
                isRecommend: 1
            }
        }).then((response) => {
            if (response.data.status === 1) {
                let recommendBooks = response.data.data
                this.setState({ recommendBooks })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    createRecommonList = () => {
        const { recommendBooks, bannerEList } = this.state
        return recommendBooks && recommendBooks.list && recommendBooks.list.map((item, index) => {
            let Hours = FormatDate.apartHours(item.updateDate)
            let Time = Hours > 24 ? FormatDate.customFormat(item.updateDate, 'yyyy/MM/dd') : `${Hours}小时前`
            let bookImagUrl = item.bookImagUrl.split('|')[1]
            let banner = ''
            if ((index + 1) % 5 === 0) {
                let i = (index + 1) / 5
                let bannerItem = bannerEList[i - 1]
                if (bannerItem) {
                    banner = (
                        <a href={bannerItem.url} class="seat-push">
                            <img src={bannerItem.imageSrc} />
                            <span class="badge">推荐</span>
                            <p class="txt">{bannerItem.title}</p>
                        </a>
                    )
                }

            }
            return (
                [
                    banner,
                    <div class="item user">
                        <a class="thumb-img" href="javascript:;">
                            <img src={bookImagUrl} />
                        </a>
                        <div class="tit"><a href="javascript:;">{item.bookName}</a></div>
                        <div class="txt">{item.authorIntroduce}</div>
                        <div class="bar">
                            <span>{item.author}</span><span>·</span><span>{Time}</span>
                            <div class="f-bartool clearfix"><a href="javascript:;" onClick={() => this.handleCollect(item.id)}><i class="icon-heart"></i><span>{item.collectNum}</span></a><a href="javascript:;" onClick={() => this.handleLike(item.id)}><i class="icon-thumbs"></i><span>{item.praiseNum}</span></a><a href="javascript:;"><i class="icon-comment"></i><span>0</span></a></div>

                        </div>
                    </div>
                ]
            )
        })
    }

    getQuestionList = () => {
        POST({
            url: "/a/cms/comment/consultationList?",
            opts: {
                pageNo: 1,
                pageSize: PAGESIZE
            }
        }).then((response) => {
            if (response.data.status === 1) {
                global.constants.loading = false
                let questionList = response.data.data
                this.setState({ questionList })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    getTopAuthor = () => {
        POST({
            url: "/a/cms/article/getHostAuthor"
        }).then((response) => {
            if (response.data.status === 1) {
                global.constants.loading = false
                let topAuthorList = response.data.data
                this.setState({ topAuthorList })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    createTopAuthor = (router) => {
        const { topAuthorList } = this.state;

        return topAuthorList && topAuthorList.slice(0, 10).map((item, index) => {

            return (
                <li key={index}>
                    <a href="javascript:;" onClick={() => this.gotoRouter(router)}>
                        <em><img src={item.user.photo} /></em>
                        <span>{item.author}</span>
                        <i className="fa-angle-right"></i>
                    </a>
                </li>
            )
        })
    }

    getHitsArticle = () => {
        POST({
            url: "/a/cms/article/getAllArticle?",
            opts: {
                hits: 1
            }
        }).then((response) => {
            if (response.data.status === 1) {
                global.constants.loading = false
                let hitsArticleList = response.data.data
                this.setState({ hitsArticleList })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    createHitsArticle = () => {
        const { hitsArticleList } = this.state;
        return hitsArticleList && hitsArticleList.slice(0, 10).map((item, index) => {

            return (
                <li key={index} onClick={() => this.gotoRouter()}>
                    <a href="javascript:;" className="thumb-img">
                        <span>{index}</span>
                        <img src={item.imageSrc} />
                    </a>
                    <h1><a href="javascript:;">{item.title}</a></h1>
                    <h3>{item.author}</h3>
                </li>
            )
        })
    }

    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    handleLike = (item) => {
        POST({
            url: "/a/cms/article/like?",
            opts: {
                id: item.id
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.likeNum++
                this.setState({})
            }
            /* global layer */
            layer.msg(response.data.message)
        })
            .catch((error) => {
                console.log(error)
            })
    }
    handleCollect = (item) => {
        POST({
            url: "/a/artuser/articleCollect/collectArticle?",
            opts: {
                userId: 1,
                articleId: item.id
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.collectNum++
                this.setState({})
            }

            /* global layer */
            layer.msg(response.data.message)
        })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { questionList, viewPointList, goodcopyList, bootStoreList, jobList, recommendBooks } = this.state;
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
                            {/* <li><a href="javascript:;">小专栏</a></li> */}
                            <li><a href="javascript:;">醒来再读</a></li>
                            <li><a href="javascript:;">吃口文案</a></li>
                            <li><a href="javascript:;">书单上新</a></li>
                            <li><a href="javascript:;">招聘</a></li>
                        </ul>
                    </div>
                    <div id="tabCont" className="g-left">
                        <div className="group" index="0">
                            <div className="m-artlist clearfix">
                                {this.createRecommonList(recommendBooks)}
                            </div>
                            <a href="javascript:;" className="more-a" onClick={() => this.gotoRouter('/Bookstore')}>点击浏览更多</a>
                        </div>
                        <div className="group" index="1" style={{ display: "none" }}>
                            <div className="m-artlist clearfix">
                                {this.createList(questionList, `/Question/Article`)}
                            </div>
                            <a href="javascript:;" className="more-a" onClick={() => this.gotoRouter('/Question')}>点击浏览更多</a>
                        </div>
                        {/* <div className="group" index="2" style={{ display: "none" }}>
                            <div className="m-artlist clearfix">
                                {this.createList(questionList)}
                            </div>
                            <a href="javascript:;" className="more-a">点击浏览更多</a>
                        </div> */}
                        <div className="group" index="2" style={{ display: "none" }}>
                            <div className="m-artlist clearfix">
                                {this.createList(viewPointList, `/Inspiration/Article`)}
                            </div>
                            <a href="javascript:;" className="more-a" onClick={() => this.gotoRouter('/Inspiration/Viewpoint')}>点击浏览更多</a>
                        </div>
                        <div className="group" index="4" style={{ display: "none" }}>
                            <div className="m-artlist clearfix">
                                {this.createList(goodcopyList, `/Inspiration/Article`)}
                            </div>
                            <a href="javascript:;" className="more-a" onClick={() => this.gotoRouter('/GoodCopy')}>点击浏览更多</a>
                        </div>
                        <div className="group" index="5" style={{ display: "none" }}>
                            <div className="m-artlist clearfix">
                                {this.createList(bootStoreList, `/Bookstore/Bookbuy`)}
                            </div>
                            <a href="javascript:;" className="more-a" onClick={() => this.gotoRouter('/Bookstore')}>点击浏览更多</a>
                        </div>
                        <div className="group" index="6" style={{ display: "none" }}>
                            <div className="m-artlist clearfix">
                                {this.createList(jobList, `/Job`)}
                            </div>
                            <a href="javascript:;" className="more-a" onClick={() => this.gotoRouter('/Job')}>点击浏览更多</a>
                        </div>
                    </div>
                    <div className="g-right">
                        {this.createBannerC()}
                        <div className="m-r-hot">
                            <div className="u-title">
                                <b>热文排行</b>
                            </div>
                            <ul className="hot-article active">
                                {this.createHitsArticle()}
                            </ul>
                        </div>
                        {this.createBannerD()}
                        <div className="m-hot-tabs u-tabs">
                            <ul className="nav" id="utabs" name="utabs">
                                <li tabfor=".tab-team" className="active">热门团队</li>
                                <li>/</li>
                                <li tabfor=".tab-writer">热门作者</li>
                            </ul>
                            <div>
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
                                <div className="tab-writer" style={{ display: "none" }}>
                                    <ul className="hot-writer clearfix">
                                        {this.createTopAuthor()}
                                    </ul>
                                </div>
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
                            {this.createSameBookList(`/Bookstore/Bookbuy`)}
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

