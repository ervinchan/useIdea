import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, List, Avatar, Divider, Button, Card, Popover } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Service from '../../service/api.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import HotRead from '../../common/hotRead/Index'
import Collect from '../../common/collect'
import Like from '../../common/like'
import Comment from '../../common/comment'
import LazyLoad from 'react-lazyload';
import 'swiper/dist/css/swiper.min.css';
import '../../static/less/question.less'
import '../../static/less/index.less';
import 'antd/lib/tabs/style/index.less'
import Utils from '../../static/js/utils/utils.js';
import defaultPhoto from "../../static/images/user/default.png"

const TabPane = Tabs.TabPane;
const PAGESIZE = 15;
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bannerAList: [],
            bannerBList: [],
            bannerCList: [],
            bannerEList: [],
            bannerFList: [],
            bannerGList: [],
            questionList: [],
            viewPointList: [],
            goodcopyList: [],
            bootStoreList: [],
            recommendBooks: {},
            topAuthorList: [],
            hitsArticleList: [],
            jobList: [],
            hotCompanyList: [],
            pageNo: 1,
            noMore: false
        };
    }

    componentDidMount() {

        // this.getQuestionList();
        this.getViewPointList();
        this.getGoodCopyList();
        this.getBootStoreList();
        this.getJobsList();
        this.getBannerA();
        this.getBannerB();
        this.getBannerC();
        this.getBannerE();
        this.getBannerF();
        this.getBannerG();
        this.getRecommendBooks(this.state.pageNo);
        this.getTopAuthor();
        this.getHitsArticle();
        this.getHotCompany();
    }
    componentDidUpdate(prevProps, prevState) {
        $(function () {
            $("#utabs").find("li").on("mouseenter", function () {
                let tab = $($(this).attr("tabfor"));
                $(this).addClass("active").siblings().removeClass("active")
                tab.show();
                tab.siblings().hide();
            })
            // $("#tabNav").find("li").on("click", function () {
            //     let item = $("#tabCont").find(".group").eq($(this).index());
            //     $(this).addClass("active").siblings().removeClass("active")
            //     item.show();
            //     item.siblings().hide();
            // })


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
            var swiper_bzhd = new Swiper('.m-interact .swiper-container', {
                autoHeight: true,//新增
                slidesPerView: 'auto',
                spaceBetween: 20,
                loop: true,
                loopFillGroupWithBlank: true,
                navigation: {
                    nextEl: '.m-interact .f-next',
                    prevEl: '.m-interact .f-prev'
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

    getBannerA = () => {
        Service.GetADList({
            categoryId: "e12f2236bc134e18ac3db4028c626650",
            id: "588e4f30e9634523b34b5c913bfa4cd2"
        }).then((response) => {
            if (response.data.status === 1) {
                global.constants.loading = false
                this.setState({ bannerAList: response.data.data }, () => {
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
                })
            }
        })
            .catch((error) => {
                console.log(error)
            })
        // Service.GetBanners({
        //     categoryId: "981892a5c2394fe7b01ce706d917699e"
        // }).then((response) => {
        //     if (response.data.status === 1) {
        //         global.constants.loading = false
        //         this.setState({ bannerAList: response.data.data }, () => {
        //             var swiper_banner = new Swiper('.f-banner .swiper-container', {
        //                 slidesPerView: 'auto',
        //                 loop: true,
        //                 speed: 1000,
        //                 autoplay: {
        //                     delay: 3000,
        //                     disableOnInteraction: false,
        //                     waitForTransition: false
        //                 },
        //                 pagination: {
        //                     el: '.swiper-pagination',
        //                     clickable: true,
        //                 },
        //                 navigation: {
        //                     nextEl: '.f-banner .u-next',
        //                     prevEl: '.f-banner .u-prev'
        //                 },
        //                 pagination: {
        //                     el: '.f-banner .u-pagination',
        //                     bulletClass: 'bull',
        //                     bulletActiveClass: 'active',
        //                     clickable: true
        //                 }
        //             });
        //         })
        //     }
        // })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }
    getBannerB = () => {
        Service.GetADList({
            categoryId: "e12f2236bc134e18ac3db4028c626650",
            id: "243e981b6d30424c8f3fac513382483a"
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
        Service.GetADList({
            categoryId: "e12f2236bc134e18ac3db4028c626650",
            id: "37e7de978cc14723b8d51ec902ed0f73"
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
        Service.GetADList({
            categoryId: "e12f2236bc134e18ac3db4028c626650",
            id: "df2c63345f9b42beb860f9150d4002f7"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerEList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })

    }
    getBannerF = () => {
        Service.GetADList({
            categoryId: "e12f2236bc134e18ac3db4028c626650",
            id: "b3653c6c1da841569e04ccccd5c0a776"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerFList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })

    }
    getBannerG = () => {
        Service.GetADList({
            categoryId: "e12f2236bc134e18ac3db4028c626650",
            id: "3c43ad8ac9ad4a2b860e335aea1ae97c"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerGList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })

    }
    createBannerA = () => {
        const { bannerAList } = this.state
        let bannerList = bannerAList.map((item, index) => {
            return <a className="swiper-slide" href={item.link} target="_blank"><img alt={item.name} src={item.image} /><div className="txt"><span>{item.description}</span><h1>{item.name}</h1></div></a>
        })
        return (
            <div className="f-banner">
                <div className="swiper-box">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {[bannerList]}
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
            return <li><a href={item.link} target="_blank" className="darken scale"><img src={item.image} /></a></li>
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
            return <a href={item.link} target="_blank" className="seat-h110 lighten"><LazyLoad><img src={item.image} /></LazyLoad></a>
        })
    }
    createBannerD = () => {
        const { bannerCList } = this.state
        let bannerDList = bannerCList.slice(3)
        return bannerDList.map((item, index) => {
            return <a href={item.link} target="_blank" className="seat-h110 lighten"><LazyLoad><img src={item.image} /></LazyLoad></a>
        })
    }
    createBannerE = () => {
        const { bannerEList } = this.state
        return bannerEList.map((item, index) => {
            return <a href={item.link} target="_blank" className="seat-h190 lighten"><LazyLoad><img src={item.image} /></LazyLoad></a>
        })
    }
    createBannerG = () => {
        const { bannerGList } = this.state
        return bannerGList.map((item, index) => {
            return (
                <div className="swiper-slide">
                    <a className="thumb-img" href={item.link} target="_blank">
                        <LazyLoad><img src={item.image} /></LazyLoad>
                    </a>
                    <a className="btn" href={item.link} target="_blank">参加</a>
                </div>
            )
        })
    }


    getViewPointList = () => {
        Service.GetAllArticle({
            categoryId: "846cd0769ef9452aad0cc9c354ba07e3",
            pageNo: 1,
            pageSize: PAGESIZE
        }).then((response) => {

            let viewPointList = response.data.data
            this.setState({ viewPointList })
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getGoodCopyList = () => {
        Service.GetAllArticle({
            categoryId: "ce009ff186fa4203ab07bd1678504228",
            pageNo: 1,
            pageSize: PAGESIZE
        }).then((response) => {
            let goodcopyList = response.data.data
            this.setState({ goodcopyList })
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getBootStoreList = () => {
        Service.GetBooks({
            softType: 0,
            pageNo: 1,
            pageSize: PAGESIZE
        }).then((response) => {
            let bootStoreList = response.data.data
            this.setState({ bootStoreList })
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getJobsList = () => {
        Service.GetAllArticle({
            categoryId: "981892a5c2394fe7b01ce706d917699e",
            pageNo: 1,
            pageSize: PAGESIZE
        }).then((response) => {
            let jobList = response.data.data
            this.setState({ jobList })
        })
            .catch((error) => {
                console.log(error)
            })
    }

    createArticleForPerson = (item, router) => {
        let Time = FormatDate.formatTime(item.updateDate)
        return (
            <div class="item user">
                <a class="thumb-img" href="javascript:;" onClick={() => this.gotoRouter(`${router}/${item.id}`)}>
                    <LazyLoad><img src={item.image} /></LazyLoad>
                </a>
                <div class="tit"><a href="javascript:;" onClick={() => this.gotoRouter(`${router}/${item.id}`)}>{item.title || item.bookName}</a></div>
                <div class="txt">{item.description}</div>
                <div class="bar">
                    <span>{item.user.name}</span><span>·</span><span>{Time}</span>
                    <div class="f-bartool clearfix">
                        <Collect fn={this.handleCollect} item={item} />
                        <Like fn={this.handleLike} item={item} />
                        <Comment fn={this.handleLike} item={item} />
                    </div>
                </div>
            </div>

        )

    }
    createArticleForCompany = (item, router) => {
        let Time = FormatDate.formatTime(item.updateDate)
        return (
            <div className="item">
                <a className="thumb-img" href="javascript:;" onClick={() => this.gotoRouter(`${router}/${item.id}`)}><LazyLoad><img src={item.image} /></LazyLoad>
                </a>
                <div className="tit"><a href="javascript:;" onClick={() => this.gotoRouter(`${router}/${item.id}`)}>{item.title}</a></div>
                <div className="txt">
                    <span>{Time}</span><br />
                    <span>Brand：{item.brand}</span>
                </div>
                <div className="bar">
                    <a href="javascript:;" className="user-img">
                        <img src={item.user.photo} />
                    </a>
                    <span className="name">{item.user.name}</span>
                    <div class="f-bartool clearfix">
                        <Collect fn={this.handleCollect} item={item} />
                        <Like fn={this.handleLike} item={item} />
                        <Comment fn={this.handleLike} item={item} />
                        {/* <a href="javascript:;" onClick={() => this.handleCollect(item)}><i class="icon-heart"></i><span>{item.collectNum}</span></a>
                        <a href="javascript:;" onClick={() => this.handleLike(item)}><i class="icon-thumbs"></i><span>{item.praiseNum}</span></a>
                        <a href="javascript:;"><i class="icon-comment"></i><span>{item.commentNum}</span></a> */}
                    </div>
                </div>
            </div>
        )

    }

    createSameBookList = (router) => {
        const { bootStoreList } = this.state;

        return bootStoreList.list && bootStoreList.list.map((item, index) => {
            let bookImagUrl = item.bookImagUrl.split('|')[1]
            return (
                <a href="javascript:;" style={{ width: "280px", marginRight: "10px" }} key={index} className="swiper-slide" onClick={() => this.gotoRouter(`${router}/${item.id}`)}>
                    <em><img src={bookImagUrl} /> </em>
                    <h1>{item.bookName}</h1>
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
    getRecommendBooks = (pageNo) => {
        Service.GetAllArticle({
            isRecommend: 1,
            pageNo: pageNo || 1,
            pageSize: PAGESIZE
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                if (pageNo === 1) {
                    const recommendBooks = response.data.data
                    this.setState({ recommendBooks, pageNo: ++pageNo })
                } else {
                    if (this.state.recommendBooks.list.length < response.data.data.count) {
                        const list = this.state.recommendBooks.list.concat(response.data.data.list);
                        Object.assign(this.state.recommendBooks, { list })
                        this.setState({ recommendBooks: this.state.recommendBooks, pageNo: ++pageNo }, () => {
                            window.dispatchEvent(new Event('resize'));
                        })
                    } else {
                        this.setState({ noMore: true })
                    }

                }

            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    createRecommonList = () => {
        const { recommendBooks, bannerFList } = this.state;
        const categoryUrl = global.constants.categoryUrl;
        return recommendBooks && recommendBooks.list && recommendBooks.list.map((item, index) => {
            let Time = FormatDate.formatTime(item.updateDate)
            let banner = ''
            let isCompany = item.user.isCompany;
            if ((index + 1) % 5 === 0 && index < 14) {
                let i = (index + 1) / 5
                let bannerItem = bannerFList[i - 1]
                if (bannerItem) {
                    banner = (
                        <a href={bannerItem.link} target="_blank" class="seat-push">
                            <LazyLoad><img src={bannerItem.image} /></LazyLoad>
                            <span class="badge">推荐</span>
                            <p class="txt">{bannerItem.name}</p>
                        </a>
                    )
                }

            }
            return (
                [
                    banner,
                    isCompany === "true" ? this.createArticleForCompany(item, "/Inspiration/Article") : this.createArticleForPerson(item, "/Inspiration/Article")
                    // <div class="item user">
                    //     <a class="thumb-img" href="javascript:;" onClick={() => this.gotoRouter(`/Bookstore/Bookbuy/${item.id}`)}>
                    //         <img src={item.image} />
                    //     </a>
                    //     <div class="tit"><a href="javascript:;" onClick={() => this.gotoRouter(`/Bookstore/Bookbuy/${item.id}`)}>{item.title}</a></div>
                    //     <div class="txt">{item.authorIntroduce}</div>
                    //     <div class="bar">
                    //         <span>{item.user.name}</span><span>·</span><span>{Time}</span>
                    //         <div class="f-bartool clearfix">
                    //             <a href="javascript:;" onClick={() => this.handleCollect(item)}><i class="icon-heart"></i><span>{item.collectNum}</span></a>
                    //             <a href="javascript:;" onClick={() => this.handleLike(item)}><i class="icon-thumbs"></i><span>{item.praiseNum}</span></a>
                    //             <a href="javascript:;"><i class="icon-comment"></i><span>{item.commentNum}</span></a>
                    //         </div>

                    //     </div>
                    // </div>
                ]
            )
        })
    }

    // getQuestionList = () => {
    //     POST({
    //         url: "/a/cms/comment/consultationList?",
    //         opts: {
    //             pageNo: 1,
    //             pageSize: PAGESIZE
    //         }
    //     }).then((response) => {
    //         if (response.data.status === 1) {
    //             let questionList = response.data.data
    //             this.setState({ questionList })
    //         }
    //     })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    getTopAuthor = () => {
        Service.GetHostAuthor().then((response) => {
            if (response.data.status === 1) {
                let topAuthorList = response.data.data
                this.setState({ topAuthorList })
            }
        })
    }

    createTopAuthor = (router) => {
        const { topAuthorList } = this.state;

        return topAuthorList && topAuthorList.slice(0, 10).map((item, index) => {

            return (
                <li key={index}>
                    <a href="javascript:;" onClick={() => this.gotoRouter(`/UserNews/${item.user.id}`)}>
                        <em><LazyLoad><img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} /></LazyLoad></em>
                        <span>{item.user.name}</span>
                        <i className="fa-angle-right"></i>
                    </a>
                </li>
            )
        })
    }
    getHitsArticle = () => {
        Service.GetAllArticle({
            hits: 1
        }).then((response) => {
            if (response.data.status === 1) {
                let hitsArticleList = response.data.data
                this.setState({ hitsArticleList })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    getHotCompany = (categoryId) => {
        Service.GetAllArticle({
            hits: 1,
            categoryId: "981892a5c2394fe7b01ce706d917699e"
        }).then((response) => {
            let hotCompanyList = response.data.data
            this.setState({ hotCompanyList })


        })
    }

    createHotCompanyList = () => {
        const { hotCompanyList } = this.state;
        return hotCompanyList.map((item, index) => {
            return (
                <li>
                    <a href="javascript:;" onClick={() => this.gotoRouter(`/Qyspace/${item.user.id}`)}>
                        <LazyLoad><img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} /></LazyLoad>
                    </a>
                </li>
            )
        })
    }

    createHitsArticle = () => {
        const { hitsArticleList } = this.state;
        return hitsArticleList && hitsArticleList.slice(0, 10).map((item, index) => {

            return (
                <li key={index} onClick={() => this.gotoRouter(`/Inspiration/Article/${item.id}`)}>
                    <a href="javascript:;" className="thumb-img">
                        <span>{index + 1}</span>
                        <LazyLoad><img src={item.image} /></LazyLoad>
                    </a>
                    <h1><a href="javascript:;">{item.title}</a></h1>
                    <h3>{item.user.name}</h3>
                </li>
            )
        })
    }

    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    handleLike = (item) => {
        Service.AddLike({
            id: item.id
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
        Service.AddCollect({
            userId: userInfo && userInfo.id,
            articleId: item.id
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

    onLoadMore = () => {
        this.getRecommendBooks(this.state.pageNo);
    }

    render() {
        const { questionList, viewPointList, goodcopyList, bootStoreList, jobList, recommendBooks, noMore } = this.state;
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
                            <li><a href="javascript:;" onClick={() => this.gotoRouter('/Question')}>请 教</a></li>
                            {/* <li><a href="javascript:;">小专栏</a></li> */}
                            <li><a href="javascript:;" onClick={() => this.gotoRouter('/Viewpoint')}>醒来再读</a></li>
                            <li><a href="javascript:;" onClick={() => this.gotoRouter('/GoodCopy')}>吃口文案</a></li>
                            <li><a href="javascript:;" onClick={() => this.gotoRouter('/Bookstore')}>书单上新</a></li>
                            {/* <li><a href="javascript:;" onClick={() => this.gotoRouter('/Job')}>招聘</a></li> */}
                        </ul>
                    </div>

                    <div id="tabCont" className="g-left">
                        <div className="group" index="0">
                            <div className="m-artlist clearfix">
                                {this.createRecommonList(recommendBooks)}
                            </div>
                            <a style={{ display: !noMore ? "" : "none" }} href="javascript:;" className="more-a" onClick={() => this.onLoadMore()}>点击浏览更多</a>
                            <p style={{ display: noMore ? "" : "none", textAlign: 'center' }}>-------------已经全部加载-------------</p>
                        </div>
                        {/* <div className="group" index="1" style={{ display: "none" }}>
                            <div className="m-artlist clearfix">
                                {this.createList(questionList, `/Question/Article`)}
                            </div>
                            <a href="javascript:;" className="more-a" onClick={() => this.gotoRouter('/Question')}>点击浏览更多</a>
                        </div>
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
                        </div> */}
                    </div>
                    <div className="g-right">
                        {this.createBannerC()}
                        {this.createBannerE()}
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
                                        {this.createHotCompanyList()}
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
                </div >
                {/* 同行在读 */}
                < div className="m-fs-book p-txzd wrapper" >
                    <div className="u-title2">
                        <h1>同行在读</h1>
                        <h3><a href="javascript:;" className="book" onClick={() => this.gotoRouter('/Bookstore')}>更多<i className="fa-angle-right"></i></a></h3>
                    </div>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {this.createSameBookList(`/Bookstore/Bookbuy`)}
                        </div>
                        <div className="u-pagination wide"></div>
                    </div >
                    <div className="m-prev"></div>
                    <div className="m-next"></div>
                </div >
                {/* //本周互动 */}
                < div className="m-interact wrapper" >
                    <div className="u-title3">
                        <b>本周互动</b>
                        {/* <a href="#">更多></a> */}
                    </div>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {this.createBannerG()}

                        </div>
                    </div>
                    <div className="f-prev fa-angle-left"></div>
                    <div className="f-next fa-angle-right"></div>
                </div >
                {/* 热门阅读 */}
                < HotRead />
                {/* 底部 */}
                < Footer />
                <Loading />
            </div >
        );
    }
}

