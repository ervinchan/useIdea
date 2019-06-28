import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'
import Service from '../../service/api.js'
import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import WheelBanner from '../../common/wheelBanner/Index'
import BookMenu from '../../common/bookMenu/Menu'
import HotRead from '../../common/hotRead/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/bookstore.less';

const PAGESIZE = 3;

export default class Bookstore extends Component {
    categoryIds = global.constants.categoryIds['阅读场景']
    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            hotBooks: [],

            bannerAList: [],
            readTimeHotBooks: [],
            recommendBooks: [],
            recommendList: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            this.fetchData(nextProps);
        }
    }

    componentDidMount() {
        this.getAllTopArticle();
        this.getReadData();

        this.getBannerA();
        let locationState = this.props.location.state
        this.getHotBooks(global.constants.categoryIds['阅读场景'].id);
    }


    getBannerA = () => {
        Service.GetADList({
            categoryId: this.categoryIds.id,
            id: "b3653c6c1da841569e04ccccd5c0a776"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerAList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
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
        this.getReadData(page)
    }

    //主编荐书
    getRecommendBooks = () => {
        Service.GetBooks({
            isRecommend: 1
        })
            .then((response) => {
                let recommendBooks = response.data.data
                this.setState({ recommendBooks })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getReadData = (pageNo) => {
        Service.GetAllArticle({
            categoryId: global.constants.categoryIds['阅读场景'].id,
            pageSize: global.constants.PAGESIZE,
            pageNo: pageNo
        })
            .then((response) => {
                let readList = response.data.data
                this.setState({ readList })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //获取阅读场景数据
    getHotBooks = (categoryId) => {
        Service.GetAllArticle({
            isRecommend: 1,
            categoryId: categoryId || '',
        })
            .then((response) => {
                if (categoryId) {
                    let readTimeHotBooks = response.data.data.list
                    this.setState({ readTimeHotBooks })
                } else {
                    let hotBooks = response.data.data
                    this.setState({ hotBooks }, () => {
                        var swiper_read = new Swiper('.m-read-fade .swiper-container', {
                            effect: 'fade',
                            pagination: {
                                el: '.m-read-fade .u-pagination',
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

    //阅读场景首位
    createReadTimeHot = () => {
        const { recommendList } = this.state
        let firstReadTimeHotBooks = recommendList.slice(0, 1);
        return (
            firstReadTimeHotBooks[0] &&
            <div className="fs-tuijian">
                <a className="thumb-img" href={`/#/Bookstore/Bookbuy/${firstReadTimeHotBooks[0].id}`}><img src={firstReadTimeHotBooks[0].image} /></a>
                <h1><a href="javascript:;">{firstReadTimeHotBooks[0].title}</a></h1>
                <div className="txt">
                    {firstReadTimeHotBooks[0].description}
                    {
                        firstReadTimeHotBooks[0].description.length > 150 &&
                        <a href={`/#/Bookstore/Bookbuy/${firstReadTimeHotBooks[0].id}`}>查看原文</a>
                    }
                </div>
                <ul>
                    <li>
                        <b>{firstReadTimeHotBooks[0].hits}</b>
                        <span>位读者</span>
                    </li>
                    <li>
                        <b>{firstReadTimeHotBooks[0].isRecommend}</b>
                        <span>人收藏</span>
                    </li>
                </ul>
            </div>

        )
    }

    //阅读场景列表
    createReadTimeHotList = () => {
        const { bannerAList } = this.state
        let readTimeHotList = bannerAList && bannerAList.slice(0, 4);
        return readTimeHotList && readTimeHotList.map((item, index) => {
            return (
                <li>
                    <a className="thumb-img" href={item.link} target="_blank"><img src={item.image} /></a>
                    <h1><a href={item.link} target="_blank">{item.name}</a></h1>
                    <div className="alt clearfix">
                        {/* <a href={item.link} className="j_name" ><img src={item.user && item.user.img} className="thumb-img" />{item.user && item.user.name}</a> */}
                        {/* <span className="dot"></span> */}
                        <span>{item.description}</span>
                    </div>
                </li>
            )
        })
    }



    render() {
        const { recommendBooks, banner, readList } = this.state;
        let Books = readList && readList.list && readList.list.map((item, index) => {
            let bookImagUrl = item.image
            let Time = FormatDate.formatTime(item.updateDate)
            return (
                // <li key={index}>
                //     <a className="swiper-slide" href={`/#/Bookstore/Bookbuy/${item.id}`}>
                //         <em><img src={bookImagUrl} /></em>
                //         <h1>{item.bookName}</h1>
                //         <h3> {item.user.name}</h3>
                //         <div className="txt">{item.authorIntroduce}</div>
                //     </a>
                // </li>
                <li className="item" key={index}>
                    <a className="thumb-img" href={`/#/Bookstore/Bookbuy/${item.id}`}>
                        <img src={bookImagUrl} />
                        <span>{item.cmsArticleClassify && item.cmsArticleClassify.articleClassify}</span>
                    </a>
                    <h4><i className="icon-book"></i>主编荐书</h4>
                    <h1><a href="#">{item.title}</a></h1>
                    <div className="txt">{item.description}</div>
                    <div className="bar">
                        <span>{item.user.name}</span><span>·</span><span>{Time}</span>
                    </div>
                </li>
            )
        })

        return (
            <div className="">
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}
                <WheelBanner categoryId={"dc1b3e874dcd4f808be1d90b68a85c3d"} />

                <div className="g-fanshu wrapper">
                    <div className="g-left">
                        {this.createReadTimeHot()}
                        <div className="fs-sight">
                            <ul className="clearfix">
                                {this.createReadTimeHotList()}
                            </ul>
                        </div>
                        <div className="fs-scene">
                            <ul className="clearfix">
                                {Books}
                            </ul>
                        </div>
                        {
                            readList && readList.list && readList.count > global.constants.PAGESIZE && (
                                <Pagination key="Pagination" className="u-pages" current={this.state.curPage} onChange={this.handlePageChange} total={readList && readList.count} pageSize={global.constants.PAGESIZE} itemRender={(page, type, originalElement) => {
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
                    <BookMenu categoryid={this.categoryIds.id} />
                </div>
                <div className="fixed_bottom"></div>
                <HotRead />
                {/* 底部 */}
                <Footer />
            </div>
        );
    }
}

