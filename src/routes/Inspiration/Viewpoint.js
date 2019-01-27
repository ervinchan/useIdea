import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import axios from 'axios'
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import WheelBanner from '../../common/wheelBanner/Index'
import BookMenu from '../../common/bookMenu/Menu'
import HotRead from '../../common/hotRead/Index'
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/bigidea.less';
import { list } from 'postcss';

const PAGESIZE = 3;

export default class Viewpoint extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            viewPointList: [],
            menus: [],
            authorList: [],
            recommendList: []
        };
    }



    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {

        this.getViewPointMenu("846cd0769ef9452aad0cc9c354ba07e3");
        this.getViewPoints("846cd0769ef9452aad0cc9c354ba07e3");
        this.getHostAuthor();
        this.getRecommendList("846cd0769ef9452aad0cc9c354ba07e3");
    }

    getViewPoints = (categoryId) => {
        POST({
            url: "/a/cms/article/getAllArticle?",
            opts: {
                categoryId: categoryId || ''

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

    getViewPointMenu = (categoryId) => {
        POST({
            url: "/a/cms/category/navigationBar?",
            opts: {
                id: categoryId || ''

            }
        }).then((response) => {
            global.constants.loading = false
            let menus = response.data.data
            this.setState({ menus })
        })
            .catch((error) => {
                console.log(error)
            })
    }

    getRecommendList = (categoryId) => {
        POST({
            url: "/a/cms/category/navigationBar?",
            opts: {
                subscriber: 0

            }
        }).then((response) => {
            global.constants.loading = false
            let recommendList = response.data.data
            this.setState({ recommendList })
        })
            .catch((error) => {
                console.log(error)
            })
    }

    //热门作者
    getHostAuthor = (categoryId) => {
        POST({
            url: "/a/cms/article/getHostAuthor"
        }).then((response) => {
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
            let Hours = FormatDate.apartHours(item.updateDate)
            let Time = Hours > 24 ? FormatDate.customFormat(item.updateDate, 'yyyy/MM/dd') : `${Hours}小时前`
            return (
                <div class="item">
                    <a class="thumb-img" href={`/#/Inspiration/Article/${item.id}`}><img src="{item.imageSrc} " /></a>
                    <div class="tit"><a href={`/#/Inspiration/Article/${item.id}`}>{item.title}</a></div>
                    <div class="txt">
                        <span>{Time}</span><br />
                        <span>Brand：锤子科技</span>
                    </div>
                    <div class="bar">
                        <a href="javascript:;" class="user-img">
                            <img src={item.user.photo} />
                        </a>
                        <span class="name">{item.author}</span>
                        <div class="f-bartool clearfix"><a href="javascript:;" onClick={() => this.handleCollect(item)}><i className="icon-heart"></i><span>{item.collectNum}</span></a><a href="javascript:;" onClick={() => this.handleLike(item)}><i className="icon-thumbs"></i><span>{item.likeNum}</span></a><a href="javascript:;"><i className="icon-comment"></i><span>{item.commentNum}</span></a></div>

                    </div>
                </div>
            )
        })
    }

    createMenus = () => {
        const { menus } = this.state
        return menus && menus.map((item, index) => {
            return <li onClick={(e) => this.getViewPoints(item.id)}><a href="javascript:;">{item.name}</a><i class="fa-angle-right"></i></li>
        })
    }

    createAuthorList = () => {
        const { authorList } = this.state
        return authorList && authorList.map((item, index) => {
            return (
                <li>
                    <a href="javascript:;" onClick={this.gotoUserCenter}>
                        <em><img src={item.user.photo} /></em>
                        <span>{item.author}</span>
                        <i class="fa-angle-right"></i>
                    </a>
                </li>
            )
        })
    }

    createRecommendList = () => {
        const { recommendList } = this.state
        let items = recommendList.slice(0, 4)
        return items && items.map((item, index) => {
            return (
                <li>
                    <a class="thumb-img" href="javascript:;">
                        <img src={item.image} />
                        <span>{item.name}</span>
                    </a>
                    <h1><a href="#">{item.description}</a></h1>
                    <div class="f-bartool clearfix"><a href="javascript:;" onClick={() => this.handleCollect(item)}><i className="icon-heart"></i><span>{item.collectNum}</span></a><a href="javascript:;" onClick={() => this.handleLike(item)}><i className="icon-thumbs"></i><span>{item.likeNum}</span></a><a href="javascript:;"><i className="icon-comment"></i><span>{item.commentNum}</span></a></div>

                </li>
            )
        })
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
                <WheelBanner />

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
                        <a href="javascript:;" class="seat-x315"><img src="images/17.jpg" /></a>
                        <a href="javascript:;" class="seat-x315"><img src="images/d5.jpg" /></a>
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

