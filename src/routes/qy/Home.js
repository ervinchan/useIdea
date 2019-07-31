import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, Upload } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';

//import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import Service from '../../service/api.js'
import qyHead from './qyHead'
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/u.icenter.less'
import 'antd/lib/tabs/style/index.less';
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import userImg from "../../static/images/user/userTx.jpg"
import MyWork from '../User/MyWork.js';
import MyJob from './Job.js';
import Cooperative from './Cooperative.js';
const TabPane = Tabs.TabPane;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class qyHome extends Component {
    /* global $ */
    tabDom = null
    PAGESIZE = 6
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            activeKey: 'news',
            fileList: [],
            collectList: [],
            newsArticles: [],
            jobListData: [],
            cooperativeEnterpriseData: []
        };
    }

    componentDidMount() {
        var that = this
        var r_bannerswiper = new Swiper('.qy-envi .swiper-container', {
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3000
            },
            pagination: {
                el: '.qy-envi .u-pagination',
                bulletClass: 'bull',
                bulletActiveClass: 'active',
                clickable: true
            }
        });
        //this.getCollectList();
        //this.getMyWork();
        this.getUserInfo();
        this.getUserInfoDetail(userInfo.id);
        this.getNewsArticles(userInfo.id);
        this.getJobList()
        this.getCooperativeEnterprise()
    }

    getUserInfoDetail = (userId) => {
        Service.getQyInfoDetail({
            userId: userId
        })
            .then((response) => {
                let userInfoDetail = response.data.data;
                Object.assign(userInfo, userInfoDetail);
                //sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
            })
            .catch((error) => {
                console.log(error)
            })
    }
    handleTabChange = (key) => {
        console.log(key);
    }
    handleChangePhoto = () => {

    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }
    getUserInfo = () => {
        Service.getUserInfo({
            userId: userInfo && userInfo.id
        }).then((response) => {

        })
    }
    getJobList = () => {
        Service.GetAllArticle({
            userId: userInfo && userInfo.id,
            categoryId: global.constants.categoryIds['招聘'].id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ jobListData: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getCooperativeEnterprise = () => {
        Service.GetCooperativeEnterprise({
            userId: userInfo && userInfo.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ cooperativeEnterpriseData: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    // getCollectList = () => {
    //     POST({
    //         url: "/a/artuser/articleCollect/collectList?",
    //         opts: {
    //             userId: userInfo && userInfo.id
    //         }
    //     }).then((response) => {
    //         global.constants.loading = false
    //         if (response.data.status === 1) {
    //             this.setState({ collectList: response.data.data.articles })
    //         }
    //     })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }
    // getMyWork = () => {
    //     POST({
    //         url: "/a/cms/article/latestAction?",
    //         opts: {
    //             userId: userInfo && userInfo.id
    //         }
    //     }).then((response) => {
    //         global.constants.loading = false
    //         if (response.data.status === 1) {
    //             this.setState({ listData: response.data.data })
    //         }
    //     })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }
    getNewsArticles = (userId = userInfo.id, pageNo) => {
        Service.GetAllArticle({
            userId: userId,
            myUserId: userInfo && userInfo.id,
            pageSize: this.PAGESIZE,
            pageNo: pageNo
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ newsArticles: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    createJobList = () => {
        const { jobListData } = this.state;
        if (jobListData.list) {
            return (<ul class="qy-rjob">
                {jobListData.list && jobListData.list.map((item) => {
                    return <li><a href="javascript:;" onClick={() => this.gotoRouter(`/QyspaceJobInfo/${item.id}`)}>{item.title}</a></li>
                })}
            </ul>
            )
        } else {
            return (
                <div class="nolist">
                    <span>· 暂未发布招聘 ·</span>
                </div>
            )
        }


    }
    render() {
        const { fileList, newsArticles, cooperativeEnterpriseData, jobListData } = this.state;
        const officeImage = userInfo.officeImage && userInfo.officeImage.split(',');
        console.log(officeImage)
        const tabTit = `来信中心`;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
            showUploadList: false
        };
        return (
            <div className="">
                {/* 头部 */}
                <div class="g-left">
                    <div class="qy-info">
                        <p>{userInfo.officeIntroduction}</p>
                        {/* <p>
                            <a href="javascript:;">展开</a>
                        </p> */}
                    </div>
                    <div class="qy-envi">
                        <h1><b>创作环境</b></h1>
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                {
                                    officeImage && officeImage.length > 0 &&
                                    <div class="swiper-slide">
                                        <a href="javascript:;"><img src={officeImage[0]} /></a>
                                    </div>
                                }
                                {
                                    officeImage && officeImage.length > 1 &&
                                    <div class="swiper-slide">
                                        <a href="javascript:;"><img src={officeImage[1]} /></a></div>
                                }
                                {
                                    officeImage && officeImage.length > 2 &&
                                    <div class="swiper-slide">
                                        <a href="javascript:;"><img src={officeImage[2]} /></a></div>
                                }
                            </div>
                        </div>
                        <div class="u-pagination wide"></div>
                    </div>
                    <div class="u-title">
                        <b>最新文章</b>
                    </div>
                    <MyWork data={newsArticles} tab="最新文章" history={this.props.history} getData={this.getNewsArticles} params={this.props.match} />
                    {/* <div class="nolist" style={{ display: (newsArticles.length > 0 ? 'none' : 'block') }}>
                        <i class="icon-no-art"></i>
                        <span>· 暂未发表文章 ·</span>
                    </div> */}
                </div>
                <div class="g-right">
                    <div class="qy-r-team">
                        <div class="qy-title">近期合作机构</div>
                        <Cooperative data={cooperativeEnterpriseData} history={this.props.history} />
                        {/* <ul class="hot-team clearfix">
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                            <li>
                                <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            </li>
                        </ul> */}
                    </div>
                    <div class="qy-r-jobs clearfix">
                        <div class="qy-title">最新招聘 <a href="javascript:;" class="add" onClick={() => this.gotoRouter(`/QyJobAdd/${userInfo.id}`)}>发布招聘+</a></div>
                        {/* <MyJob data={this.state.jobListData} history={this.props.history} /> */}
                        {this.createJobList()}
                        {/* <div class="nolist">
                            <span>· 暂未发布招聘 ·</span>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}