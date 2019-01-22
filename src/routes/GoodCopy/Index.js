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
import SwiperList from '../../common/swiperList/Index'
import HotRead from '../../common/hotRead/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/goodcopy.less';
import { list } from 'postcss';

const PAGESIZE = 3;

export default class GoodCopy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            goodcopyList: [],
            KeywordsList: [],
            HotKeywords: [],
            keywords: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            console.log(nextProps)
            this.fetchData(nextProps);
        }
    }

    componentDidMount() {

        this.getDatas("ce009ff186fa4203ab07bd1678504228");
        //this.getHotKeywords("ce009ff186fa4203ab07bd1678504228")
    }

    getDatas = (categoryId) => {
        let url = '/zsl/a/cms/article/getAllArticle?'
        let opts = {
            categoryId: categoryId || ''
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                if (categoryId) {
                    let goodcopyList = response.data.data
                    this.setState({ goodcopyList })
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

    getHotKeywords = (categoryId) => {
        let url = '/zsl/a/cms/article/getHostKeywords?'
        let opts = {
            categoryId: categoryId || ''
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                let HotKeywords = response.data.data
                this.setState({ HotKeywords })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    getKeywordsList = (keyword) => {
        let url = '/zsl/a/cms/article/getAllArticle?'
        let opts = {
            categoryId: "ce009ff186fa4203ab07bd1678504228",
            keywords: keyword
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                let KeywordsList = response.data.data
                this.setState({ KeywordsList })

            })
            .catch((error) => {
                console.log(error)
            })
    }


    createList = () => {
        const { goodcopyList } = this.state
        return goodcopyList.list && goodcopyList.list.map((item, index) => {
            return (
                <li>
                    <a className="thumb-img" href={`/#/Bookstore/Bookbuy/${item.id}`}><img src={item.imageSrc} /><span>{item.category.name}</span></a>
                    <h1><a href={`/#/Bookstore/Bookbuy/${item.id}`}>{item.title}</a></h1>
                    <div className="alt clearfix">
                        <a href="#" className="j_name"><img src={item.user.img} className="thumb-img" />{item.author}</a>
                        <span className="dot"></span>
                        <span>{item.description}</span>
                    </div>
                </li>
            )
        })
    }

    createTagGroup = () => {
        const { HotKeywords } = this.state
        return HotKeywords.list && HotKeywords.list.map((item, index) => {
            return (
                <a href="javascript:;" onClick={() => this.getKeywordsList(item.name)}>{item.name}</a>
            )
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
        this.getBooksList(this.props.match.params.tid, this.state.sortType, page)
    }

    handleSetKeywords = (e) => {
        this.setState({ keywords: e.target.value })
    }

    render() {
        const { goodcopyList, keywords } = this.state;

        return (
            <div className="">
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}
                <WheelBanner />
                <div className="wa-search wrapper">
                    <div className="bar">
                        <div className="u-search">
                            <input type="text" placeholder="搜索与我有关的提问" onChange={this.handleSetKeywords} />
                            <a href="javascript:;" className="fa-search" onClick={() => this.getKeywordsList(keywords)}></a>
                        </div>
                        <div className="alt">
                            * 若暂未收录，你也可上传喜欢的经典文案
                        </div>
                    </div>
                    <div className="tag">
                        {this.createTagGroup()}
                    </div>
                </div>
                <div className="wa-list wrapper">
                    <ul className="clearfix">
                        {this.createList()}
                    </ul>
                </div>
                {
                    goodcopyList && goodcopyList.list && (
                        <Pagination key="Pagination" className="u-pages" current={this.state.curPage} onChange={this.handlePageChange} total={goodcopyList && goodcopyList.count} pageSize={PAGESIZE} itemRender={(page, type, originalElement) => {
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
                <HotRead />
                {/* 底部 */}
                <Footer />

            </div>
        );
    }
}

