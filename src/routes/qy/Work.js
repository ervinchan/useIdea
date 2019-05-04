import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, Upload } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';

//import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import Service from '../../service/api.js'
import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import MyWork from '../User/MyWork.js';
import MyJob from './Job.js';
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/u.icenter.less'
import 'antd/lib/tabs/style/index.less';
import '../../Constants'
import Loading from '../../common/Loading/Index'
import userImg from "../../static/images/user/userTx.jpg"
const TabPane = Tabs.TabPane;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class QyWork extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            activeKey: 'news',
            fileList: [],
            collectList: [],
            jobListData: [],
            hitsArticleList: []
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
        this.getMyWork();
        this.getJobList();
    }
    handleTabChange = (key) => {
        console.log(key);
    }
    handleChangePhoto = () => {

    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    getMyWork = () => {
        Service.GetAllArticle({
            userId: userInfo && userInfo.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ listData: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getJobList = () => {
        Service.GetAllArticle({
            userId: userInfo && userInfo.id,
            categoryId: global.constants.categorys[8].id
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

    getHitsArticle = () => {
        Service.GetAllArticle({
            hits: 1,
            userId: userInfo && userInfo.id
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

    createHitArticle = () => {
        const { hitsArticleList } = this.state;
        return hitsArticleList && hitsArticleList.slice(0, 10).map((item, index) => {

            return (

                <li key={index} onClick={() => this.gotoRouter(`/Inspiration/Article/${item.id}`)}>
                    <a href="javascript:;" className="thumb-img">
                        <span>{index + 1}</span>
                        <img src={item.image} />
                    </a>
                    <h1><a href="javascript:;">{item.title}</a></h1>
                </li>
            )
        })
    }
    render() {
        return (
            <div className="work-job">
                {/* 头部 */}


                <div class="g-left">
                    <Tabs ref={e => this.tabDom = e} className="clearfix" onChange={this.handleTabChange}>
                        <TabPane tab="最新作品" key="home"><MyWork data={this.state.listData.list} history={this.props.history} /></TabPane>
                        <TabPane tab="最新岗位" key="work"><MyJob data={this.state.jobListData} history={this.props.history} /></TabPane>
                    </Tabs>

                </div>
                <div class="g-right">
                    <div class="qy-r-team">
                        <div class="qy-title">近期合作机构</div>
                        <ul class="hot-team clearfix">
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
                        </ul>
                    </div>
                    <div class="qy-r-hotart">
                        <div class="qy-title">机构热文排行</div>
                        <ul class="qy-hotart">
                            {this.createHitArticle()}

                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}