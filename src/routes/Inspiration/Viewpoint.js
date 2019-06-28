import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import WheelBanner from '../../common/wheelBanner/Index'
import HotRead from '../../common/hotRead/Index'
import Collect from '../../common/collect'
import Like from '../../common/like'
import Comment from '../../common/comment'
import Service from '../../service/api.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/bigidea.less';

import defaultPhoto from "../../static/images/user/default.png"
const PAGESIZE = 20;

export default class Viewpoint extends Component {
    categoryIds = global.constants.categoryIds['醒来再读']
    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            viewPointList: [],
            menus: [],
            authorList: [],
            recommendList: [],
            bannerAList: [],

        };
    }



    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {

        this.getViewPointMenu(this.categoryIds.id);
        this.getViewPoints();
        this.getHostAuthor();
        this.getAllTopArticle(this.categoryIds.id);
        this.getBannerA();
    }

    getBannerA = () => {
        Service.GetADList({
            categoryId: this.categoryIds.id,
            id: "37e7de978cc14723b8d51ec902ed0f73"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerAList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })

    }
    createBannerA = () => {
        const { bannerAList } = this.state
        return bannerAList.slice(0, 3).map((item, index) => {
            return <a href={item.url} className="seat-x315 lighten"><img src={item.image} /></a>
        })
    }
    getViewPoints = (categoryId) => {
        let params = categoryId ? {
            categoryId: this.categoryIds.id || '',
            cmsArticleClassifyId: categoryId,
            pageSize: PAGESIZE
        } : {
                categoryId: this.categoryIds.id || '',
                pageSize: PAGESIZE
            }
        Service.GetAllArticle(params).then((response) => {
            global.constants.loading = false
            let viewPointList = response.data.data
            this.setState({ viewPointList })
        })
            .catch((error) => {
                console.log(error)
            })
    }

    getViewPointMenu = (categoryId) => {
        Service.FindAllClassify({
            // id: categoryId || ''
        }).then((response) => {
            global.constants.loading = false
            let menus = response.data.data
            this.setState({ menus })
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getAllTopArticle = (categoryId, pageNo) => {
        Service.GetAllTopArticle({
            categoryId: this.categoryIds.id
        })
            .then((response) => {
                let recommendList = response.data.data
                this.setState({ recommendList })
                global.constants.loading = false
            })
            .catch((error) => {
                console.log(error)
            })
    }
    // getRecommendList = () => {
    //     Service.GetAllArticle({
    //         isTop: 1,
    //         categoryId: this.categoryIds.id,
    //         pageNo: 1,
    //         pageSize: 4
    //     }).then((response) => {
    //         if (response.data.status === 1) {
    //             const recommendList = response.data.data
    //             this.setState({ recommendList })
    //         }
    //     })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    //热门作者
    getHostAuthor = (categoryId) => {
        Service.GetHostAuthor().then((response) => {
            global.constants.loading = false
            let authorList = response.data.data
            this.setState({ authorList })
        })
            .catch((error) => {
                console.log(error)
            })
    }

    createViewPointList = () => {
        const { viewPointList } = this.state
        return viewPointList.list && viewPointList.list.map((item, index) => {
            let Time = FormatDate.formatTime(item.updateDate);
            if (item.user.isCompany === "false") {
                return (
                    <div class="item user">
                        <a class="thumb-img" href={`/#/Inspiration/Article/${item.id}`}><img src={item.image} /></a>
                        <div class="tit"><a href={`/#/Inspiration/Article/${item.id}`}>{item.title}</a></div>
                        <div class="txt">{item.description}</div>
                        <div class="bar">
                            <span>{item.user.name}</span><span class="dot"></span><span>{Time}</span>
                            <div class="f-bartool clearfix">
                                <Collect item={item} />
                                <Like item={item} />
                                <Comment item={item} />
                            </div>

                        </div>
                    </div>
                )
            } else {
                return (
                    <div class="item">
                        <a class="thumb-img" href={`/#/Inspiration/Article/${item.id}`}><img src={item.image} /></a>
                        <div class="tit"><a href={`/#/Inspiration/Article/${item.id}`}>{item.title}</a></div>
                        <div class="txt">
                            <span>{Time}</span><br />
                            <span>Brand：{item.user.brand}</span>
                        </div>
                        <div class="bar">
                            <a href="javascript:;" class="user-img">
                                <img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
                            </a>
                            <span class="name">{item.user.name}</span>
                            <div class="f-bartool clearfix">
                                <Collect item={item} />
                                <Like item={item} />
                                <Comment item={item} />
                            </div>

                        </div>
                    </div>
                )
            }

        })
    }

    createMenus = () => {
        const { menus } = this.state
        return menus && menus.map((item, index) => {
            return <li onClick={(e) => this.getViewPoints(item.id)}><a href="javascript:;">{item.articleClassify}</a><i class="fa-angle-right"></i></li>
        })
    }

    createAuthorList = () => {
        const { authorList } = this.state
        return authorList && authorList.map((item, index) => {
            return (
                <li>
                    <a href="javascript:;" onClick={() => this.gotoRouter(`/UserNews/${item.user && item.user.id}`)}>
                        <em><img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} /></em>
                        <span>{item.user.name}</span>
                        <i class="fa-angle-right"></i>
                    </a>
                </li>
            )
        })
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    createRecommendList = () => {
        const { recommendList } = this.state
        return recommendList && recommendList.map((item, index) => {
            return (
                <li key={index}>
                    <a className="thumb-img" href={`/#/Inspiration/Article/${item.id}`}>
                        <img src={item.image} />
                        <span>{item.brand}</span>
                    </a>
                    <h1><a href={`/#/Inspiration/Article/${item.id}`}>{item.description}</a></h1>
                    <div className="f-bartool clearfix">
                        <Collect item={item} />
                        <Like item={item} />
                        <Comment item={item} />
                    </div>

                </li>
            )
        })
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
            userId: 1,
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

    handlePageChange = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ curPage: page })
        this.getBooksList(this.props.match.params.tid, this.state.sortType, page)
    }

    render() {
        const { viewPointList } = this.state;

        return (
            <div className="">
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}
                <WheelBanner categoryId={this.categoryIds.id} />

                <div class="m-chartlist background">
                    <div class="wrapper">
                        <ul class="clearfix">
                            {this.createRecommendList()}

                        </ul>
                    </div>
                </div>
                <div class="wrapper g-index g-jianshi">
                    <div class="g-left">
                        <div class="m-artlist clearfix">
                            {this.createViewPointList()}
                            {/* <div class="item user">
                                <a class="thumb-img" href="javascript:;">
                                    <img src="images/16.jpg" />
                                </a>
                                <div class="tit"><a href="javascript:;">Apple官网惊艳文案，值得所有文案从头看一遍！</a></div>
                                <div class="txt">个人上传的文章这样显示，这是一段文章的摘要内容</div>
                                <div class="bar">
                                    <span>冴羽</span><span class="dot"></span><span>昨天 09:32</span>
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
                                    <span>alisecued</span><span class="dot"></span><span>2018/08/01</span>
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
                                    <span>alisecued</span><span class="dot"></span><span>2018/08/01</span>
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
                                    <span>alisecued</span><span class="dot"></span><span>2018/08/01</span>
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
                                    <span>alisecued</span><span class="dot"></span><span>2018/08/01</span>
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
                                    <span>冴羽</span><span class="dot"></span><span>昨天 09:32</span>
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
                                    <span>alisecued</span><span class="dot"></span><span>2018/08/01</span>
                                    <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                                </div>
                            </div> */}
                        </div>
                        {
                            viewPointList && viewPointList.list && (
                                <Pagination key="Pagination" className="u-pages" current={this.state.curPage} onChange={this.handlePageChange} total={viewPointList && viewPointList.count} pageSize={PAGESIZE} itemRender={(page, type, originalElement) => {
                                    switch (type) {
                                        case 'prev':
                                            return [<a key={type} href="javascript:;">{type}</a>,
                                            <a href="javascript:;" ><i className="fa-angle-double-left"></i></a>]
                                        case 'next':
                                            return [
                                                <a key={type} href="javascript:;" ><i className="fa-angle-double-right"></i></a>,
                                                <a href="javascript:;">{type}</a>
                                            ]
                                        default:
                                            return <a key={page} href="javascript:;">{page}</a>;

                                    }
                                }} />
                            )
                        }
                    </div>
                    <div class="g-right">
                        <div class="u-title5">
                            Deep Reading
                        </div>
                        <div class="u-r-menu hidden">
                            <ul class="clearfix">
                                {this.createMenus()}
                            </ul>
                            <a href="javascript:;" class="jq-hidden" data-for=".u-r-menu"><i class="fa-angle-up"></i></a>
                        </div>
                        <div class="u-title5">
                            Top Authors
                        </div>
                        <ul class="hot-writer clearfix">
                            {this.createAuthorList()}
                        </ul>
                        {/* <a href="javascript:;" class="seat-x315"><img src="images/17.jpg" /></a>
                        <a href="javascript:;" class="seat-x315"><img src="images/d5.jpg" /></a> */}
                        {this.createBannerA()}
                    </div>
                </div>
                <HotRead />
                {/* 底部 */}
                <Footer />
                <Loading />
            </div>
        );
    }
}

