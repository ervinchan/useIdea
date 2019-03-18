import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import $ from 'jquery'
import FormatDate from '../../static/js/utils/formatDate.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import CityGroup from '../../common/cityGroup/Index'
import Service from '../../service/api.js'
import Utils from '../../static/js/utils/utils.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/jobs.less';

import defaultPhoto from "../../static/images/user/default.png"
const PAGESIZE = 3;

export default class JobList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            jobList: [],
            city: '',
            searchTxt: "",
            educationList: [],
            experienceList: [],
            payList: [],
            pay: "1",
            education: "1",
            experience: "1"
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
        /* global layer */
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
        let params = this.props.match.params
        this.getCityList();
        this.getPayList();
        this.getEducationList();
        this.getExperienceList();
        this.getHotPost();
        this.getHotCompany();
        this.setState({ searchTxt: params ? params.txt : '', city: params ? params.city : '' }, () => {
            this.onSearch()
        })

    }

    getCityList = () => {
        Service.JobCity().then((response) => {
            global.constants.loading = false
            let cityList = response.data.data
            this.setState({ cityList })
        })
    }
    getPayList = (categoryId) => {
        Service.JobFilters()({
            type: 'pay'
        }).then((response) => {
            global.constants.loading = false
            let payList = response.data.data
            this.setState({ payList })
        })
    }
    getEducationList = (categoryId) => {
        Service.JobFilters()({
            type: 'education'
        }).then((response) => {
            global.constants.loading = false
            let educationList = response.data.data
            this.setState({ educationList })
        })
    }
    getExperienceList = (categoryId) => {
        Service.JobFilters()({
            type: 'experience'
        }).then((response) => {
            global.constants.loading = false
            let experienceList = response.data.data
            this.setState({ experienceList })
        })
    }
    getHotPost = () => {
        Service.GetHotPost()({
            categoryId: "981892a5c2394fe7b01ce706d917699e"
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ hotPosts: response.data.data })
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    createCityList = () => {
        const { cityList, city } = this.state
        return cityList && cityList.slice(0, 20).map((item, index) => {
            return (
                <a href="javascript:;" className={city === item.city ? "active" : ""} onClick={() => this.onChangeCity(item.city)}>{item.city}</a>
            )
        })
    }
    createPayList = () => {
        const { payList, pay } = this.state
        return payList && payList.map((item, index) => {
            return (
                <a key={index} href="javascript:;" className={pay === item.label || pay === item.value ? "active" : ""} onClick={() => this.onChangePay(item.label === "不限" ? "1" : item.label)}>{item.label}</a>
            )
        })
    }
    createEducationList = () => {
        const { educationList, education } = this.state
        return educationList && educationList.map((item, index) => {
            return (
                <a href="javascript:;" className={education === item.label || education === item.value ? "active" : ""} onClick={() => this.onChangeEducation(item.label === "不限" ? "1" : item.label)}>{item.label}</a>
            )
        })
    }
    createExperienceList = () => {
        const { experienceList, experience } = this.state
        return experienceList && experienceList.map((item, index) => {
            return (
                <a href="javascript:;" className={experience === item.label || experience === item.value ? "active" : ""} onClick={() => this.onChangeExperience(item.label === "不限" ? "1" : item.label)}>{item.label}</a>
            )
        })
    }

    onChangeCity = (value) => {
        this.setState({ city: value }, () => {
            this.onSearch()
        })
    }
    onChangePay = (value) => {
        this.setState({ pay: value }, () => {
            this.onSearch()
        })
    }
    onChangeEducation = (value) => {
        this.setState({ education: value }, () => {
            this.onSearch()
        })
    }
    onChangeExperience = (value) => {
        this.setState({ experience: value }, () => {
            this.onSearch()
        })
    }

    createHotPost = () => {
        const { hotPosts } = this.state;
        return hotPosts && hotPosts.map((item) => {
            return <a href="javascript:;" onClick={() => this.setSearchTxt(item.category.name)}>{item.category.name}</a>
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
        return hotCompanyList && hotCompanyList.map((item, index) => {
            return (
                <li>
                    <div className="infos">
                        <a className="thumb-img" href="javascript:;" onClick={this.gotoRouter(item.id)}>
                            <img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
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

    getJobLists = (curPage) => {
        Service.GetAllArticle({
            categoryId: "981892a5c2394fe7b01ce706d917699e",
            pageNo: this.state.curPage || 1
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
    createJobList = () => {
        const { jobList } = this.state;
        return jobList.list && jobList.list.map((item, index) => {
            let Time = FormatDate.formatTime(item.updateDate)
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

    gotoRouter = () => {

    }

    onSearch = () => {
        const { city, pay, education, experience } = this.state;
        Service.GetAllJob({
            company: this.state.searchTxt,
            categoryId: "981892a5c2394fe7b01ce706d917699e",
            area: city === "不限" ? "1" : city,
            pay: pay,
            education: education,
            experience: experience
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ jobList: response.data.data })
            }
        })
    }

    changeSearchTxt = (e) => {
        this.setState({ searchTxt: e.target.value })
    }
    handlePageChange = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ curPage: page }, () => {
            this.getJobLists(page)
        })

    }
    selectCity = (name) => {
        layer.closeAll();
        this.setState({ city: name })
    }

    render() {
        const { jobList, searchTxt, city, education, pay, experience } = this.state;

        return (
            <div className="">
                {/* 头部 */}
                < Header />
                <div className="jb-search-hd ">
                    <div className="jb-search">
                        <div className="box">
                            <div className="jb-select">
                                <span className="search-select">{city}</span>
                                <i className="fa-caret-down"></i>
                            </div>
                            <input type="text" className="search-input" id="searchInput" placeholder="搜索公司、岗位名称" value={searchTxt} onChange={this.changeSearchTxt} />
                            <a href="javascript:;" className="search-submit" onClick={this.onSearch}>搜索</a>
                        </div>
                        <div className="tag">
                            <span>热门岗位：</span>
                            {this.createHotPost()}
                        </div>
                    </div>
                </div>
                <div className="jb-search-where wrapper">
                    <ul className="clearfix">
                        <li>
                            <b>热门城市</b><a href="javascript:;" onClick={() => this.onChangeCity("不限")} className={city === "不限" ? "active" : ""}>不限</a>{this.createCityList()}
                        </li>
                        <li>
                            <b>薪资</b>{this.createPayList()}
                        </li>
                        <li>
                            <b>学历</b>{this.createEducationList()}
                        </li>
                        <li>
                            <b>经验</b>{this.createExperienceList()}
                        </li>
                    </ul>
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
                <CityGroup selectCity={this.selectCity} />
                {/* 底部 */}
                <Footer />
                <Loading />
            </div>
        );
    }
}

