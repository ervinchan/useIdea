import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import axios from 'axios'
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'
import { POST } from '../../service/service'
import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import Menu from './Menu'
import CityGroup from '../../common/cityGroup/Index'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/jobs.less';
import { list } from 'postcss';

const PAGESIZE = 3;

export default class Job extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            jobList: [],
            hotCompanyList: [],
            hotPosts: [],
            adsList: [],
            searchTxt: "",
            city: '上海',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            console.log(nextProps)
            this.fetchData(nextProps);
        }
    }

    componentDidMount() {
        let that = this
        //招聘选择城市
        /*global layer */
        $(".jb-search .jb-select").on("click", function (e) {
            layer.open({
                type: 1,
                area: '700px',
                title: false,
                skin: 'layui-fromui',
                closeBtn: 0,
                anim: 0,
                shadeClose: true,
                content: $(".layui-city"),
                end: () => {
                    that.setState({ visible: false })
                    $(".layui-city").hide()
                }
            });
        });

        // $(window).on("click", ".layui-city .city-list a", function (e) {
        //     $(".jb-search .search-select").html($(this).text());
        //     that.setState({ city: $(this).text() })
        // });
        this.getHotCompany()
        this.getJobLists();
        this.getHotPost();
        this.getAds();
    }

    getHotCompany = (categoryId) => {
        POST({
            url: "/a/cms/article/getAllArticle?",
            opts: {
                hits: 1,
                categoryId: "981892a5c2394fe7b01ce706d917699e"
            }
        }).then((response) => {
            let hotCompanyList = response.data.data
            this.setState({ hotCompanyList })


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
        this.setState({ curPage: page }, () => this.getJobLists())

    }

    onSearch = () => {
        this.props.history.push(`/Job/List/${this.state.city || $(".search-select").text()}/${this.state.searchTxt}`)

    }

    getJobLists = () => {
        POST({
            url: "/a/cms/article/getAllArticle?",
            opts: {
                categoryId: "981892a5c2394fe7b01ce706d917699e",
                pageNo: this.state.curPage || 1
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ jobList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    gotoRouter = () => {

    }

    createJobList = () => {
        const { jobList } = this.state;
        return jobList.list && jobList.list.map((item, index) => {
            let Hours = FormatDate.apartHours(item.updateDate)
            let Time = Hours > 24 ? FormatDate.customFormat(item.updateDate, 'yyyy/MM/dd') : `${Hours + 1}小时前`
            return (
                <li>
                    <a className="thumb-img" href="javascript:;" onClick={this.gotoRouter(item.id)}>
                        <img src={item.image} />
                    </a>
                    <h1><a href="javascript:;" onClick={this.gotoRouter(item.id)}>{item.title}</a></h1>
                    <h3>{Time}</h3>
                    <div className="bar"><a href="javascript:;" onClick={this.gotoRouter(item.id)}><i className="icon-qiye"></i>{item.company}</a><span><i className="icon-money"></i>{item.pay}</span></div>
                    <span className="cost"><i className="icon-address"></i>{item.jcity}</span>
                </li>
            )
        })
    }

    createHotCompanyList = () => {
        const { hotCompanyList } = this.state;
        return hotCompanyList.map((item, index) => {
            let Hours = FormatDate.apartHours(item.updateDate)
            let Time = Hours > 24 ? FormatDate.customFormat(item.updateDate, 'yyyy/MM/dd') : `${Hours + 1}小时前`
            return (
                <li>
                    <div className="infos">
                        <a className="thumb-img" href="javascript:;" onClick={this.gotoRouter(item.id)}>
                            <img src={item.user.photo} />
                        </a>
                        <h1><a href="javascript:;" onClick={this.gotoRouter(item.id)}>{item.company}</a></h1>
                        <div className="bar">
                            <span><i className="icon-address-o"></i>{item.jcity}</span><span><i className="icon-large"></i>{item.hits}个</span>
                        </div>
                    </div>
                    <div className="txt">{`“${item.description}”`}</div>
                </li>
            )
        })
    }

    getHotPost = () => {
        POST({
            url: "/a/cms/article/getHostPost?",
            opts: {
                categoryId: "981892a5c2394fe7b01ce706d917699e"
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ hotPosts: response.data.data })
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    createHotPost = () => {
        const { hotPosts } = this.state;
        return hotPosts.map((item) => {
            return <a href="javascript:;" onClick={() => this.setSearchTxt(item.category.name)}>{item.category.name}</a>
        })
    }

    getAds = () => {
        POST({
            url: "/a/cms/article/adsList?",
            opts: {
                categoryId: "981892a5c2394fe7b01ce706d917699e"
            }
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ adsList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })

    }

    createAds = () => {
        const { adsList } = this.state;
        let top3 = []
        let top5 = []
        adsList && adsList.map((item, index) => {
            if (index < 3) {
                top3.push(<li><a href={item.url}><img src={item.image} /></a></li>)
            } else if (index >= 3 && index < 5) {
                top5.push(<li><a href={item.url}><img src={item.image} /></a></li>)
            }
        })


        return (
            [<ul className="jb-seat-x3">
                {top3}
            </ul>,
            <ul className="jb-seat-x2">
                {top5}
            </ul>]
        )
    }

    setSearchTxt = (txt) => {
        this.setState({ searchTxt: txt }, () => this.onSearch())
    }

    changeSearchTxt = (e) => {
        this.setState({ searchTxt: e.target.value })
    }

    selectCity = (name) => {
        layer.closeAll();
        this.setState({ city: name })
    }

    render() {
        const { searchTxt, jobList, city } = this.state;

        return (
            <div className="">
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}
                <div className="jb-head wrapper">
                    <Menu setSearchTxt={this.setSearchTxt} />

                    <div className="jb-search">
                        <div className="box">
                            <div className="jb-select">
                                <span className="search-select">{city}</span>
                                <i className="fa-caret-down"></i>
                            </div>
                            <input type="text" className="search-input" id="searchInput" placeholder="搜索公司、岗位名称" onChange={this.changeSearchTxt} />
                            <a href="javascript:;" className="search-submit" onClick={this.onSearch}>搜索</a>
                        </div>
                        <div className="tag">
                            <span>热门岗位：</span>
                            {this.createHotPost()}

                        </div>
                    </div>
                    {this.createAds()}
                </div>
                <div className="wrapper g-jobs">
                    <div className="g-left">
                        <div className="m-joblist">
                            <ul className="clearfix">
                                {this.createJobList()}
                            </ul>
                        </div>
                        {
                            jobList && jobList.list && (
                                <Pagination key="Pagination" className="u-pages" current={this.state.curPage} onChange={this.handlePageChange} total={jobList && jobList.count} pageSize={PAGESIZE} itemRender={(page, type, originalElement) => {
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
                        <a href="javascript:;" className="seat-h110 lighten"><img src="images/17.jpg" /></a>
                        <a href="javascript:;" className="seat-h190 lighten"><img src="images/d5.jpg" /></a>
                        <div className="hot-qiye">
                            <div className="tit">热门公司</div>
                            <ul className="clearfix">
                                {this.createHotCompanyList()}
                            </ul>
                        </div>
                    </div>
                </div>
                <CityGroup selectCity={this.selectCity} visible={this.state.visible} />

                {/* 底部 */}
                <Footer />
                <Loading />
            </div>
        );
    }
}

