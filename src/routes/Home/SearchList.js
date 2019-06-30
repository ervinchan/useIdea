import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, List, Avatar, Divider, Button, Card, Popover } from 'antd';
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Service from '../../service/api.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import Collect from '../../common/collect'
import Like from '../../common/like'
import Comment from '../../common/comment'
import LazyLoad from 'react-lazyload';
import 'swiper/dist/css/swiper.min.css';
import '../../static/less/question.less'
import '../../static/less/index.less';
import 'antd/lib/tabs/style/index.less'
import Utils from '../../static/js/utils/utils.js';
const PAGESIZE = 15;
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
export default class SearchList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bannerAList: [],
            bannerBList: [],
            bannerCList: [],
            hitsArticleList: [],
            pageNo: 1,
            noMore: false
        };
    }

    componentDidMount() {

        this.getBannerA();
        this.getBannerB();
        this.getBannerC();
        this.getHitsArticle();
    }
    componentDidUpdate(prevProps, prevState) {
        $(function () {
            $("#utabs").find("li").on("mouseenter", function () {
                let tab = $($(this).attr("tabfor"));
                $(this).addClass("active").siblings().removeClass("active")
                tab.show();
                tab.siblings().hide();
            })
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
        // this.getRecommendBooks(this.state.pageNo);
    }

    render() {
        const { recommendBooks, noMore } = this.state;
        return (
            <div className="">

                {/* 头部 */}
                < Header />
                {/* 轮播banner */}
                <div class="search-hd">
                    <div class="wrapper">
                        <div class="searchbox">
                            <div class="box">
                                <div class="u-select">
                                    <div class="in_fenlei" role="note">所有文章</div>
                                    <div data-for=".in_fenlei" role="menu">
                                        <ul>
                                            <li>所有文章</li>
                                            <li>搜索分类1</li>
                                            <li>搜索分类2</li>
                                            <li>搜索分类3</li>
                                            <li>搜索分类3</li>
                                            <li>搜索分类4</li>
                                        </ul>
                                    </div>
                                </div>
                                <input type="text" class="search-input" id="searchInput" placeholder="宜家" />
                                <a href="javascript:;" class="search-submit">搜索</a>
                            </div>
                            <div class="tag">
                                <span>热门搜索：</span>
                                <a href="javascript:;">Apple</a>
                                <a href="javascript:;">天猫</a>
                                <a href="javascript:;">MUJI</a>
                                <a href="javascript:;">京东</a>
                                <a href="javascript:;">宜家</a>
                                <a href="javascript:;">Kindle</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrapper g-search">

                    <div class="g-left">
                        <div class="m-artlist clearfix">
                            <div class="item">
                                <a class="thumb-img" href="javascript:;">
                                    <img src="http://47.94.253.240/zsl/userfiles/homeImage/%E4%B8%93%E8%AE%BF%E5%B9%95%E5%90%8E/hanzilab@163.com/20190410100328eace320d%20%E6%8B%B7%E8%B4%9D.jpg" />
                                </a>
                                <div class="tit"><a href="javascript:;">青岛啤酒：听一听，《夜猫子的歌》背后的故事</a></div>
                                <div class="txt">
                                    <span>今天 22:32</span><br />
                                    <span>Brand：锤子科技</span>
                                </div>
                                <div class="bar">
                                    <a href="javascript:;" class="user-img">
                                        <img src="css/images/1x1.png" />
                                    </a>
                                    <span class="name">Adel</span>
                                    <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div class="item">
                                <a class="thumb-img" href="javascript:;">
                                    <img src="http://47.94.253.240/zsl/userfiles/homeImage/%E8%A7%81%E8%AF%86%E7%81%B5%E6%84%9F/hanzilab@163.com/2019041617004904b1b99c.jpg" />
                                </a>
                                <div class="tit"><a href="javascript:;">RIO《微醺恋爱物语》，享受一个人的微醺时间！</a></div>
                                <div class="txt">
                                    <span>昨天 21:32</span><br />
                                    <span>Brand：Sony 索尼</span>
                                </div>
                                <div class="bar">
                                    <a href="javascript:;" class="user-img">
                                        <img src="css/images/1x1.png" />
                                    </a>
                                    <span class="name">Amber China 琥珀传播</span>
                                    <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div class="item">
                                <a class="thumb-img" href="javascript:;">
                                    <img src="http://47.94.253.240/zsl/userfiles/homeImage/%E9%86%92%E6%9D%A5%E5%86%8D%E8%AF%BB/hanzilab@163.com/1.jpeg" />
                                </a>
                                <div class="tit"><a href="javascript:;">京东图书品牌TVC，带你「寻找更好的答案」</a></div>
                                <div class="txt">
                                    <span>昨天 18:32</span><br />
                                    <span>Brand：JD 京东</span>
                                </div>
                                <div class="bar">
                                    <a href="javascript:;" class="user-img">
                                        <img src="css/images/1x1.png" />
                                    </a>
                                    <span class="name">JD 京东</span>
                                    <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div class="item user">
                                <a class="thumb-img" href="javascript:;">
                                    <img src="http://47.94.253.240/zsl/userfiles/d27e6fc55a8747a5a63fd5345d8ad627/images/cms/article/2019/03/%E9%A6%96%E9%A1%B5%E8%BD%AE%E6%92%AD%E5%9B%BE-8.jpg" />
                                </a>
                                <div class="tit"><a href="javascript:;">Apple官网惊艳文案，值得所有文案从头看一遍！</a></div>
                                <div class="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div class="bar">
                                    <span>冴羽</span><span>·</span><span>昨天 09:32</span>
                                    <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div class="item user">
                                <a class="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div class="tit"><a href="javascript:;">美美美！Lowrys Farm 长泽雅美、夏帆最新广告，新壁纸有了</a></div>
                                <div class="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div class="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div class="item user">
                                <a class="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div class="tit"><a href="javascript:;">Apple官网惊艳文案，值得所有文案从头看一遍！</a></div>
                                <div class="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div class="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div class="item user">
                                <a class="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div class="tit"><a href="javascript:;">美美美！Lowrys Farm 长泽雅美、夏帆最新广告，新壁纸有了</a></div>
                                <div class="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div class="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div class="item user">
                                <a class="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div class="tit"><a href="javascript:;">美美美！Lowrys Farm 长泽雅美、夏帆最新广告，新壁纸有了</a></div>
                                <div class="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div class="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div class="item user">
                                <a class="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div class="tit"><a href="javascript:;">Apple官网惊艳文案，值得所有文案从头看一遍！</a></div>
                                <div class="txt">最是那一低头的陌生又熟悉的风景:枯藤老树昏鸦，小桥流水人家。古朴中蕴含着自然，悠闲中透露出安谧。 见惯了城市拥挤嘈杂的人潮车流，便惊诧于乡村的悠闲自得；见惯了城市通宵达旦的</div>
                                <div class="bar">
                                    <span>冴羽</span><span>·</span><span>昨天 09:32</span>
                                    <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div class="item user">
                                <a class="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div class="tit"><a href="javascript:;">美美美！Lowrys Farm 长泽雅美、夏帆最新广告，新壁纸有了</a></div>
                                <div class="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div class="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div class="item user">
                                <a class="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div class="tit"><a href="javascript:;">Apple官网惊艳文案，值得所有文案从头看一遍！</a></div>
                                <div class="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div class="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div class="item user">
                                <a class="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div class="tit"><a href="javascript:;">美美美！Lowrys Farm 长泽雅美、夏帆最新广告，新壁纸有了</a></div>
                                <div class="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div class="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                            <div class="item user">
                                <a class="thumb-img" href="javascript:;">
                                    <img src="css/images/255x160.png" />
                                </a>
                                <div class="tit"><a href="javascript:;">Apple官网惊艳文案，值得所有文案从头看一遍！</a></div>
                                <div class="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div class="bar">
                                    <span>alisecued</span><span>·</span><span>2018/08/01</span>
                                    <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div>
                        </div>
                        <a href="javascript:;" class="more-a">点击浏览更多</a>
                    </div>
                    <div className="g-right">
                        {this.createBannerA()}
                        {this.createBannerB()}
                        <div className="m-r-hot">
                            <div className="u-title">
                                <b>热文排行</b>
                            </div>
                            <ul className="hot-article active">
                                {this.createHitsArticle()}
                            </ul>
                        </div>
                        {this.createBannerC()}
                    </div>
                </div >
                {/* 底部 */}
                < Footer />
                <Loading />
            </div >
        );
    }
}

