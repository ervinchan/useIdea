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

export default class Bigidea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            BigIdeaDatas: [],
            menus: [],
            specialCol: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            console.log(nextProps)
        }
    }

    componentDidMount() {
        this.getBigIdeaDatas('b49c9133960c4700b253b7a3283dcbef');
        this.getBigIdeaMenu('b49c9133960c4700b253b7a3283dcbef');
        this.getSpecialCol();
    }

    getBigIdeaDatas = (categoryId,pageNo) => {
        let url = '/zsl/a/cms/article/getAllArticle?'
        let opts = {
            categoryId: categoryId || '',
            pageNo: pageNo || 1,
            pageSize: global.constants.PAGESIZE,
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                let BigIdeaDatas = response.data.data
                this.setState({ BigIdeaDatas })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    getBigIdeaMenu = (categoryId) => {
        let url = '/zsl/a/cms/category/navigationBar?'
        let opts = {
            id: categoryId
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                let menus = response.data.data
                this.setState({ menus })
            })
            .catch((error) => {
                console.log(error)
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

    //热门作者
    // getHostAuthor = (categoryId) => {
    //     let url = '/zsl/a/cms/article/getHostAuthor?'
    //     axios.post(url)
    //         .then((response) => {
    //             let authorList = response.data.data
    //             this.setState({ authorList })
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    //热门专栏
    getSpecialCol = () => {
        let url = '/zsl/a/cms/category/navigationBar?subscriber=0'
        axios.post(url)
            .then((response) => {
                let specialCol = response.data.data
                this.setState({ specialCol })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    createBigIdeaList = () => {
        const { BigIdeaDatas } = this.state
        return BigIdeaDatas.list && BigIdeaDatas.list.map((item, index) => {
            let Hours = FormatDate.apartHours(item.updateDate)
            let Time = Hours > 24 ? FormatDate.customFormat(item.updateDate, 'yyyy/MM/dd') : `${Hours}小时前`
            return (
                <div className="item user">
                    <a className="thumb-img" href={`/#/Inspiration/Article/${item.id}`}>
                        <img src={item.imageSrc} />
                    </a>
                    <div className="tit"><a href={`/#/Inspiration/Article/${item.id}`}>{item.title}</a></div>
                    <div className="txt">{item.description}</div>
                    <div className="bar">
                        <span>{item.author}</span><span className="dot"></span><span>{Time}</span>
                        <div className="f-bartool clearfix"><a href="javascript:;" onClick={() => this.handleCollect(item)}><i className="icon-heart"></i><span>{item.collectNum}</span></a><a href="javascript:;" onClick={() => this.handleLike(item)}><i className="icon-thumbs"></i><span>{item.likeNum}</span></a><a href="javascript:;"><i className="icon-comment"></i><span>{item.commentNum}</span></a></div>

                    </div>
                </div>
            )
        })
    }

    createMenus = () => {
        const { menus } = this.state
        return menus && menus.map((item, index) => {
            return (
                <li key={index}>
                    <a className="thumb-img" href="javascript:;">
                        <img src={item.image} />
                        <span>{item.name}</span>
                    </a>
                    <h1><a href="#">{item.description}</a></h1>
                    <div className="f-bartool clearfix"><a href="javascript:;"><i className="icon-heart"></i><span>99</span></a><a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i className="icon-comment"></i><span>51</span></a></div>

                </li>
            )
        })
    }

    createAuthorList = () => {
        const { authorList } = this.state
        return authorList && authorList.map((item, index) => {
            return (
                <li>
                    <a href="javascript:;" onClick={this.gotoUserCenter}>
                        <em><img src={item.userImg} /></em>
                        <span>{item.name}</span>
                        <i className="fa-angle-right"></i>
                    </a>
                </li>
            )
        })
    }

    createSpecialCol = () => {
        const { specialCol } = this.state
        return specialCol && specialCol.map((item, index) => {
            if (index === 0 || index === 1) {
                return (
                    <li>
                        <a href="#" className="thumb-img">
                            <span>{index + 1}</span>
                            <img src={item.image} />
                        </a>
                        <h1><a href="#">{item.name}</a></h1>
                        <h3>{item.author}</h3>
                    </li>
                )
            } else {
                return (
                    <li>
                        <a href="#" className="thumb-img">
                            <span>{index + 1}</span>
                            <img src={item.imageSrc} />
                        </a>
                        <h1><a href="#">{item.name}</a></h1>
                        <h3>{item.author}</h3>
                        <div className="alt">
                            <img src="css/images/1x1.png" />
                            <img src="css/images/1x1.png" />
                            <img src="css/images/1x1.png" />
                            <img src="css/images/1x1.png" />
                            <span className="dot"></span>
                            <span>{item.subscriber}人订阅</span>
                        </div>
                    </li>
                )
            }
        })
    }

    handleFavorite = (index) => {
        const { readList } = this.state;
        readList[index].favorite++;
        this.setState(readList);
    }

    handleLikes = (index) => {
        const { readList } = this.state;
        readList[index].like++;
        this.setState(readList);
    }

    handlePageChange = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ curPage: page })
        this.getBigIdeaDatas("b49c9133960c4700b253b7a3283dcbef", page)
    }

    render() {
        const { BigIdeaDatas } = this.state;

        return (
            <div className="">
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}
                <WheelBanner />

                <div className="m-chartlist background">
                    <div className="wrapper">
                        <ul className="clearfix">
                            {this.createMenus()}

                        </ul>
                    </div>
                </div>
                <div className="wrapper g-index g-jianshi">
                    <div className="g-left">
                        <div className="m-artlist clearfix">
                            {this.createBigIdeaList()}
                        </div>
                        {
                            BigIdeaDatas && BigIdeaDatas.list && (
                                <Pagination key="Pagination" className="u-pages" current={this.state.curPage} onChange={this.handlePageChange} total={BigIdeaDatas && BigIdeaDatas.count} pageSize={PAGESIZE} itemRender={(page, type, originalElement) => {
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
                    <div className="g-right">
                        <a href="javascript:;" className="seat-x315"><img src="images/17.jpg" /></a>
                        <a href="javascript:;" className="seat-x315"><img src="css/images/315x115.png" /></a>
                        <a href="javascript:;" className="seat-x315"><img src="images/d5.jpg" /></a>
                        <a href="javascript:;" className="seat-x315"><img src="images/d6.jpg" /></a>
                        <a href="javascript:;" className="seat-x315"><img src="images/d7.jpg" /></a>
                        <div className="u-title4">
                            <b>热门专栏</b>
                        </div>
                        <ul className="hot-article suite active">
                            {this.createSpecialCol()}
                        </ul>
                        <a href="javascript:;" className="seat-x315"><img src="images/jingjiao/wb.jpg" /></a>
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

