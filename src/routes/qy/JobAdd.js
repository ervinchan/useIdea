import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, List, Avatar, Divider, Button, Card, Popover } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';

//import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import axios from 'axios'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'

import 'swiper/dist/css/swiper.min.css'
import '../../static/less/u.myaccount.less'
import 'antd/lib/tabs/style/index.less';
import Service from '../../service/api.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'

import defaultPhoto from "../../static/images/user/default.png"
import Item from 'antd/lib/list/Item';
import JobList from '../Job/List.js';
const TabPane = Tabs.TabPane;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class UserCenter extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            myFocusList: [],
            myFansList: [],
            activeKey: 'news',
            info: {},
            keywords: [],
            experienceList: [
                { name: "不限" },
                { name: "实习生" },
                { name: "应届毕业生" },
                { name: "1-3年" },
                { name: "3-5年" },
                { name: "5-8年" },
                { name: "8年以上" },

            ],
            payList: [
                { name: "不限" },
                { name: "3K以下" },
                { name: "3-5K" },
                { name: "5-8K" },
                { name: "8-10K" },
                { name: "10-15K" },
                { name: "15-20K" },
                { name: "20-30K" },
                { name: "30-50K" },
                { name: "50K以上" },

            ],
            educationList: [
                { name: "不限" },
                { name: "中专" },
                { name: "高中" },
                { name: "大专" },
                { name: "本科" },
                { name: "硕士" },
                { name: "博士及以上" }

            ],
            payItem: {},
            educationItem: {},
            experienceItem: {},
            JobList: {}
        };
    }

    componentDidMount() {
        var that = this
        var swiper_qj_banner = new Swiper('.qj-banner .swiper-container', {
            autoHeight: true,
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                waitForTransition: false
            },
            pagination: {
                el: '.qj-banner .u-pagination',
                bulletClass: 'bull',
                bulletActiveClass: 'active',
                clickable: true
            }
        });
        var swiper_read = new Swiper('.m-read .swiper-container', {
            slidesPerView: 4,
            slidesPerColumn: 2,
            spaceBetween: 10,
            slidesPerGroup: 8,
            pagination: {
                el: '.m-read .u-pagination',
                bulletClass: 'bull',
                bulletActiveClass: 'active',
                clickable: true
            }
        });
        $(".u-select [role=note]").on("click", function (e) {
            e = window.event || e;
            e.stopPropagation();
            $(".u-select [role=menu]").hide();
            $(this).next().show();
        });
        this.getRegionDatas();
        this.getJobList();
        this.getUserInfoDetail(userInfo && userInfo.id);
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    getUserInfoDetail = (userId) => {
        Service.getUserInfoDetail({
            userId: userId
        })
            .then((response) => {
                let userInfoDetail = response.data.data;
                Object.assign(userInfo, userInfoDetail);
                this.setState({ info: userInfo });
                console.log(userInfo)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getRegionDatas = () => {
        Service.getArea({
            type: 2
        })
            .then((response) => {
                if (response.data.status === 1) {
                    let regionDatas = response.data.data
                    this.setState({ regionDatas })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getJobList = () => {
        Service.GetAllArticle({
            userId: userInfo.id,
            categoryId: global.constants.categorys[8].id,
            createTimeSort: 1
        })
            .then((response) => {
                if (response.data.status === 1) {
                    let JobList = response.data.data
                    this.setState({ JobList })
                }
            })
    }

    createRegion = () => {
        const { regionDatas } = this.state;
        return regionDatas && regionDatas.map((item) => {
            return <li onClick={() => this.setCity(item)}>{item.name}</li>
        })
    }
    setCity = (item) => {
        let city = item.childList
        let province = item
        this.setState({ city, province, district: [], cityItem: null, districtItem: null })
    }

    createCity = () => {
        const { city } = this.state;
        return city && city.map((item) => {
            return <li onClick={() => this.setDistrict(item)}>{item.name}</li>
        })
    }

    setDistrict = (item) => {
        let district = item.childList
        let cityItem = item
        this.setState({ cityItem, district, districtItem: null })
    }
    createDistrict = () => {
        const { district } = this.state;
        return district && district.map((item) => {
            return <li onClick={() => this.onSelectedDistrict(item)}>{item.name}</li>
        })
    }
    onSelectedDistrict = (item) => {
        this.setState({ districtItem: item })
    }

    createEducationList = () => {
        const { educationList } = this.state;
        return educationList && educationList.map((item) => {
            return <li onClick={() => this.onSelectedEducation(item)}>{item.name}</li>
        })
    }
    onSelectedEducation = (item) => {
        this.setState({ educationItem: item })
    }

    createExperienceList = () => {
        const { experienceList } = this.state;
        return experienceList && experienceList.map((item) => {
            return <li onClick={() => this.onSelectedExperience(item)}>{item.name}</li>
        })
    }
    onSelectedExperience = (item) => {
        this.setState({ experienceItem: item })
    }

    createPayList = () => {
        const { payList } = this.state;
        return payList && payList.map((item) => {
            return <li onClick={() => this.onSelectedPay(item)}>{item.name}</li>
        })
    }
    onSelectedPay = (item) => {
        this.setState({ payItem: item })
    }

    addJob = () => {
        const { info, payItem, experienceItem, educationItem, province, cityItem, districtItem, keywords } = this.state;
        let params = {
            pay: payItem.name || "",
            experience: info.experience || "",
            education: educationItem.name || "",
            jobNum: experienceItem.name || "",
            area: province.name || "",
            city: cityItem.name || "",
            district: districtItem.name || "",
            email: info.email || "",
            keywords: keywords || "",
            description: info.description || "",
            jobDescription: info.jobDescription || "",
            content: info.content || "",
            title: info.title || "",
            company: info.company || "",
            phone: info.phone || "",
            categoryId: global.constants.categorys[0].id || "",
            userId: (userInfo && userInfo.id) || "",
        }
        var oMyForm = new FormData();

        for (let key in params) {
            oMyForm.append(key, params[key]);
        }
        Service.addJob({
            form: oMyForm
        }).then((response) => {

        })
            .catch((error) => {
                console.log(error)
            })
    }

    setKeywords = (item) => {
        const { keywords } = this.state;
        if (item.keywords) {
            keywords.push(item.keywords)
        } else if (item.target.value) {
            keywords.push(item.target.value)
        }
        this.setState({ keywords: keywords, keyword: "" })
    }
    createKeywords = () => {
        const { keywords } = this.state;
        return keywords.slice(0, 8).map((item, index) => {
            return <li><span>{item}</span><i className="icon-close" onClick={() => this.deleteKeywords(index)}></i></li>
        })
    }
    deleteKeywords = (index) => {
        const { keywords } = this.state;
        keywords.splice(index, 1)
        this.setState({ keywords: keywords })
    }
    handleChangeKeyword = (e) => {
        this.setState({ keyword: e.target.value })
    }

    changeInfo = (e, field) => {
        const { info } = this.state;
        info[field] = e.target.value
        this.setState({ info: info }, () => {

        })
    }
    createJobList = () => {
        const { JobList } = this.state;
        JobList.list && JobList.list.map((item) => {
            return <li><a href="javascript:;" onClick={this.gotoRouter(`/QyspaceJobInfo/${item.id}`)}>{item.name}</a></li>
        })

    }

    render() {
        const { province, cityItem, districtItem, info, keyword, payItem, educationItem, experienceItem } = this.state;
        return (
            <div className="">
                < Header />
                <div class="wrapper g-myjobs">
                    <div class="jb-t1">加 <span>*</span> 内容，在确认发布成功后，将无法修改</div>
                    <div class="g-left">
                        <div class="ac-panel jb-info">
                            <div class="ac-title">岗位信息</div>
                            <div class="u-row">
                                <div class="u-inline width-full">
                                    <label class="u-form-label"><i>*</i>职位名称</label>
                                    <div class="u-form-input width-180">
                                        <input type="text" class="u-input" placeholder="请填入职位名称" value={info.information} onChange={(e) => this.changeInfo(e, 'information')} />
                                    </div>
                                </div>
                                <div class="u-inline width-v5">
                                    <label class="u-form-label"><i>*</i>薪资范围</label>
                                    <div class="u-select">
                                        <div class="in_province1" role="note">{payItem.name || "请选择薪资范围"}</div>
                                        <div data-for=".in_province1" role="menu">
                                            <ul>
                                                {this.createPayList()}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="u-inline width-v5">
                                    <label class="u-form-label"><i>*</i>工作年限</label>
                                    <div class="u-select">
                                        <div class="in_province2" role="note">{experienceItem.name || "请选择工作经验年限"}</div>
                                        <div data-for=".in_province2" role="menu">
                                            <ul>
                                                {this.createExperienceList()}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="u-inline width-v5">
                                    <label class="u-form-label"><i>*</i>学历要求</label>
                                    <div class="u-select">
                                        <div class="in_province3" role="note">{educationItem.name || "请选择学历要求"}</div>
                                        <div data-for=".in_province3" role="menu">
                                            <ul>
                                                {this.createEducationList()}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="u-inline width-v5">
                                    <label class="u-form-label"><i>*</i>招聘人数</label>
                                    <div class="u-form-input">
                                        <input type="text" class="u-input" placeholder="请填入招聘人数" value={info.jobNum} onChange={(e) => this.changeInfo(e, 'jobNum')} />
                                    </div>
                                </div>
                                <div class="u-inline width-full">
                                    <label class="u-form-label"><i>*</i>工作地点</label>
                                    <ul className="select-group clearfix">
                                        <li>
                                            <div className="u-select">
                                                <div className="in_province" role="note">{(province && province.name) || (info.provence && info.provence.name) || "省份"}</div>
                                                <div data-for=".in_province" role="menu">
                                                    <ul>
                                                        {this.createRegion()}
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="u-select">
                                                <div className="in_city" role="note">{(cityItem && cityItem.name) || (info.city && info.city.name) || "城市"}</div>
                                                <div data-for=".in_city" role="menu">
                                                    <ul>
                                                        {this.createCity()}
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="u-select">
                                                <div className="in_area" role="note">{(districtItem && districtItem.name) || (info.district && info.district.name) || "县区"}</div>
                                                <div data-for=".in_area" role="menu">
                                                    <ul>
                                                        {this.createDistrict()}
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="u-inline width-full">
                                    <label class="u-form-label"><i>*</i>HR邮箱</label>
                                    <div class="u-form-input width-350">
                                        <input type="text" class="u-input" placeholder="请填入简历接收邮箱" value={info.email} onChange={(e) => this.changeInfo(e, 'email')} />
                                    </div>
                                </div>
                                <div class="u-inline width-full">
                                    <label class="u-form-label"><i>*</i>福利关键词</label>
                                    <div class="art-keyword clearfix">
                                        <div class="u-add">
                                            <div class="editbox" data-tag="带薪年假,五险一金,年底双薪,团建旅游,在职培训,不限量下午茶">
                                                <ul>
                                                    {this.createKeywords()}
                                                    {
                                                        <li className="in_add"><input type="text" value={keyword} onChange={this.handleChangeKeyword} onBlur={this.setKeywords} /></li>
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <script type="text/javascript">
                                        $(".art-keyword").utag();
                                </script>
                                    <div class="u-helptxt">* 福利关键词最多填写8个，会展现在岗位信息页面中</div>
                                </div>
                                <div class="u-inline width-full">
                                    <label class="u-form-label">一句描述</label>
                                    <div class="u-form-input">
                                        <input type="text" class="u-input" value={info.description} onChange={(e) => this.changeInfo(e, 'description')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ac-panel jb-req">
                            <div class="u-row">
                                <div class="u-inline width-full">
                                    <label class="u-form-label">岗位描述<br /><span>Job Description</span></label>
                                    <div class="u-form-input">
                                        <textarea class="u-textarea" placeholder="岗位描述" value={info.jobDescription} onChange={(e) => this.changeInfo(e, 'jobDescription')}></textarea>
                                    </div>
                                </div>
                                <div class="u-inline width-full">
                                    <label class="u-form-label">岗位要求<br /><span>Job Requirement</span></label>
                                    <div class="u-form-input">
                                        <textarea class="u-textarea" placeholder="岗位要求" value={info.content} onChange={(e) => this.changeInfo(e, 'content')}></textarea>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="f-right"><a href="javascript:;" class="ac-submit" onClick={this.addJob}>确认发布</a></div>
                    </div>
                    <div class="g-right">
                        <div class="jb-qyinfo">
                            <div class="jname">
                                <img src={userInfo && (userInfo.photo || defaultPhoto)} />
                                {userInfo.name || userInfo.loginName}
                            </div>
                            <div class="jtxt">
                                {userInfo.subscription}
                                <a href="/">回到首页</a>
                            </div>
                            <ul class="qy-rjob">
                                {this.createJobList()}
                            </ul>
                            <a href="javascrip:;" class="more-a active">查看更多</a>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}