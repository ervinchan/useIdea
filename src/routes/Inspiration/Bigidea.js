import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import $ from 'jquery'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'
import Service from '../../service/api.js'
import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import WheelBanner from '../../common/wheelBanner/Index'
import HotRead from '../../common/hotRead/Index'
import Collect from '../../common/collect'
import Like from '../../common/like'
import Comment from '../../common/comment'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import LazyLoad from 'react-lazyload'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/bigidea.less';

const PAGESIZE = 10;

export default class Bigidea extends Component {
    categoryIds = global.constants.categoryIds['见识灵感']
    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            BigIdeaDatas: [],
            menus: [],
            //specialCol: [],
            bannerCList: [],
            bannerDList: [],
            recommendArticle: [],
            hitsArticleList: []
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
        this.getHitsArticle();
        this.getBannerC();
        this.getBannerD();
        this.getRecommendArticle();
    }

    getBannerC = () => {
        Service.GetADList({
            categoryId: this.categoryIds.id,
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
    getBannerD = () => {
        Service.GetADList({
            categoryId: this.categoryIds.id,
            id: "df2c63345f9b42beb860f9150d4002f7"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerDList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })

    }

    //主编推荐
    getRecommendArticle = () => {
        Service.GetAllArticle({
            isRecommend: 1,
            categoryId: this.categoryIds.id,
            pageNo: 1,
            pageSize: 4
        }).then((response) => {
            if (response.data.status === 1) {
                const recommendArticle = response.data.data
                this.setState({ recommendArticle })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    createBannerC = () => {
        const { bannerCList } = this.state
        return bannerCList.map((item, index) => {
            return <a href={item.link} target="_blank" className="seat-x110 lighten"><img src={item.image} /></a>
        })
    }
    createBannerD = () => {
        const { bannerDList } = this.state
        return bannerDList.map((item, index) => {
            return <a href={item.link} target="_blank" className="seat-x315 lighten"><img src={item.image} /></a>
        })
    }

    getBigIdeaDatas = (categoryId, pageNo) => {
        Service.GetAllArticle({
            categoryId: categoryId || '',
            pageNo: pageNo || 1,
            pageSize: PAGESIZE,
        })
            .then((response) => {
                let BigIdeaDatas = response.data.data
                this.setState({ BigIdeaDatas })
                global.constants.loading = false
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getBigIdeaMenu = (categoryId) => {
        Service.GetNav({
            id: categoryId
        })
            .then((response) => {
                let menus = response.data.data
                this.setState({ menus })
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

    //热门排行
    // getSpecialCol = () => {
    //     Service.GetNav({
    //         subscriber: 0
    //     })
    //         .then((response) => {
    //             let specialCol = response.data.data
    //             this.setState({ specialCol })
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    createBigIdeaList = () => {
        const { BigIdeaDatas } = this.state
        return BigIdeaDatas.list && BigIdeaDatas.list.map((item, index) => {
            let Time = FormatDate.formatTime(item.updateDate);
            return (
                <div className="item user">
                    <a className="thumb-img" href={`/#/Inspiration/Article/${item.id}`}>
                        <img src={item.image} />
                    </a>
                    <div className="tit"><a href={`/#/Inspiration/Article/${item.id}`}>{item.title}</a></div>
                    <div className="txt">{item.description}</div>
                    <div className="bar">
                        <span>{item.user.name}</span><span className="dot"></span><span>{Time}</span>
                        <div className="f-bartool clearfix">
                            <Collect item={item} />
                            <Like item={item} />
                            <Comment item={item} />
                        </div>

                    </div>
                </div>
            )
        })
    }

    createRecommendArticle = () => {
        const { recommendArticle } = this.state
        return recommendArticle.list && recommendArticle.list.map((item, index) => {
            return (
                <li key={index}>
                    <a className="thumb-img" href="javascript:;">
                        <img src={item.image} />
                        <span>{item.brand}</span>
                    </a>
                    <h1><a href="#">{item.description}</a></h1>
                    <div className="f-bartool clearfix">
                        <Collect item={item} />
                        <Like item={item} />
                        <Comment item={item} />
                    </div>

                </li>
            )
        })
    }

    createAuthorList = () => {
        const { authorList } = this.state
        return authorList && authorList.map((item, index) => {
            return (
                <li>
                    <a href="javascript:;" onClick={() => this.gotoRouter(`/UserNews/${item.user && item.user.id}`)}>
                        <em><img src={item.userImg} /></em>
                        <span>{item.name}</span>
                        <i className="fa-angle-right"></i>
                    </a>
                </li>
            )
        })
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }
    // createSpecialCol = () => {
    //     const { specialCol } = this.state
    //     return specialCol && specialCol.map((item, index) => {
    //         if (index === 0 || index === 1) {
    //             return (
    //                 <li>
    //                     <a href="#" className="thumb-img">
    //                         <span>{index + 1}</span>
    //                         <img src={item.image} />
    //                     </a>
    //                     <h1><a href="#">{item.name}</a></h1>
    //                     <h3>{item.user && item.user.name}</h3>
    //                 </li>
    //             )
    //         } else {
    //             return (
    //                 <li>
    //                     <a href="#" className="thumb-img">
    //                         <span>{index + 1}</span>
    //                         <img src={item.image} />
    //                     </a>
    //                     <h1><a href="#">{item.name}</a></h1>
    //                     <h3>{item.user && item.user.name}</h3>
    //                     <div className="alt">
    //                         <img src="css/images/1x1.png" />
    //                         <img src="css/images/1x1.png" />
    //                         <img src="css/images/1x1.png" />
    //                         <img src="css/images/1x1.png" />
    //                         <span className="dot"></span>
    //                         <span>{item.subscriber}人订阅</span>
    //                     </div>
    //                 </li>
    //             )
    //         }
    //     })
    // }

    handlePageChange = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ curPage: page })
        this.getBigIdeaDatas("b49c9133960c4700b253b7a3283dcbef", page)
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
    render() {
        const { BigIdeaDatas } = this.state;

        return (
            <div className="">
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}
                <WheelBanner categoryId={"b49c9133960c4700b253b7a3283dcbef"} />

                <div className="m-chartlist background">
                    <div className="wrapper">
                        <ul className="clearfix">
                            {this.createRecommendArticle()}

                        </ul>
                    </div>
                </div>
                <div className="wrapper g-index g-jianshi">
                    <div className="g-left">
                        <div className="m-artlist clearfix">
                            {this.createBigIdeaList()}
                        </div>
                        {
                            BigIdeaDatas && BigIdeaDatas.list && BigIdeaDatas.count > PAGESIZE && (
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
                        {this.createBannerC()}
                        {this.createBannerD()}
                        <div className="u-title4">
                            <b>热文排行</b>
                        </div>
                        <ul className="hot-article suite active">
                            {/* {this.createSpecialCol()} */}
                            {this.createHitsArticle()}
                        </ul>
                        {/* <div className="m-r-hot">
                            <div className="u-title">
                                <b>热文排行</b>
                            </div>
                            <ul className="hot-article active">
                                {this.createHitsArticle()}
                            </ul>
                        </div> */}
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

