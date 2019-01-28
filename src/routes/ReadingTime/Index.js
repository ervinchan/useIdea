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
import SwiperList from '../../common/swiperList/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/bookstore.less';
import { list } from 'postcss';

const PAGESIZE = 3;

export default class Bookstore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            hotBooks: [],
            readTimeHotBooks: [],
            recommendBooks: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            this.fetchData(nextProps);
        }
    }

    componentDidMount() {
        this.getRecommendBooks();
        let locationState = this.props.location.state
        this.getHotBooks(locationState.navId);
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
        this.getRecommendBooks(this.props.match.params.tid, this.state.sortType, page)
    }

    //主编荐书
    getRecommendBooks = () => {
        let url = '/zsl/a/book/bookManager/bookSoft?isRecommend=1'
        axios.post(url)
            .then((response) => {
                let recommendBooks = response.data.data
                this.setState({ recommendBooks })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //获取阅读场景数据
    getHotBooks = (categoryId) => {
        let url = '/zsl/a/cms/article/getAllArticle?'
        let opts = {
            hits: 1,
            categoryId: categoryId || ''
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                if (categoryId) {
                    let readTimeHotBooks = response.data.data
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

    //阅读场景首位
    createReadTimeHot = () => {
        const { readTimeHotBooks } = this.state
        let firstReadTimeHotBooks = readTimeHotBooks.slice(0, 1);
        return (
            firstReadTimeHotBooks[0] &&
            <div className="fs-tuijian">
                <a className="thumb-img" href={`/#/Bookstore/Bookbuy/${firstReadTimeHotBooks[0].id}`}><img src={firstReadTimeHotBooks[0].imageSrc} /></a>
                <h1><a href="javascript:;">{firstReadTimeHotBooks[0].title}</a></h1>
                <div className="txt">
                    {firstReadTimeHotBooks[0].description}
                    <a href="javascript:;">查看原文</a>
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
        const { readTimeHotBooks } = this.state
        let readTimeHotList = readTimeHotBooks.slice(1, 5);
        return readTimeHotList && readTimeHotList.map((item, index) => {
            return (
                <li>
                    <a className="thumb-img" href={`/#/Bookstore/Bookbuy/${item.id}`}><img src={item.imageSrc} /></a>
                    <h1><a href={`/#/Bookstore/Bookbuy/${item.id}`}>{item.title}</a></h1>
                    <div className="alt clearfix">
                        <a href={`/#/Bookstore/Bookbuy/${item.id}`} className="j_name"><img src={item.user.img} className="thumb-img" />{item.author}</a>
                        <span className="dot"></span>
                        <span>{item.description}</span>
                    </div>
                </li>
            )
        })
    }



    render() {
        const { recommendBooks, banner, readList } = this.state;
        let Books = recommendBooks && recommendBooks.list && recommendBooks.list.map((item, index) => {
            let bookImagUrl = item.bookImagUrl.split('|')[1]
            let Hours = FormatDate.apartHours(item.updateDate)
            let Time = Hours > 24 ? FormatDate.customFormat(item.updateDate, 'yyyy/MM/dd') : `${Hours}小时前`
            return (
                // <li key={index}>
                //     <a className="swiper-slide" href={`/#/Bookstore/Bookbuy/${item.id}`}>
                //         <em><img src={bookImagUrl} /></em>
                //         <h1>{item.bookName}</h1>
                //         <h3> {item.author}</h3>
                //         <div className="txt">{item.authorIntroduce}</div>
                //     </a>
                // </li>
                <li className="item" key={index}>
                    <a className="thumb-img" href={`/#/Bookstore/Bookbuy/${item.id}`}>
                        <img src={bookImagUrl} />
                        <span>{item.firstClassId.name}</span>
                    </a>
                    <h4><i className="icon-book"></i>主编荐书</h4>
                    <h1><a href="#">{item.bookName}</a></h1>
                    <div className="txt">{item.authorIntroduce}</div>
                    <div className="bar">
                        <span>{item.author}</span><span>·</span><span>{Time}</span>
                    </div>
                </li>
            )
        })

        return (
            <div className="">
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}
                <WheelBanner />

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
                            recommendBooks && recommendBooks.list && (
                                <Pagination key="Pagination" className="u-pages" current={this.state.curPage} onChange={this.handlePageChange} total={recommendBooks && recommendBooks.count} pageSize={PAGESIZE} itemRender={(page, type, originalElement) => {
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
                    <BookMenu />
                </div>
                <div className="fixed_bottom"></div>
                <HotRead />
                {/* 底部 */}
                <Footer />
            </div>
        );
    }
}

