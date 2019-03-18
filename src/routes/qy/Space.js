import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import axios from 'axios'
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import QyHead from './qyHead'
import Home from './SpaceHome.js';
import Article from './SpaceArticle.js'
import Job from './SpaceJobList.js'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/qy.space.less'
const TabPane = Tabs.TabPane;
const PAGESIZE = 3;

export default class MyHeart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            toolList: []
        };
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
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
    }

    handleTabChange = (key) => {
        console.log(key);
    }
    handleChangePhoto = () => {

    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    getCollectList = () => {
        POST({
            url: "/a/artuser/articleCollect/collectList?",
            opts: {
                userId: JSON.parse(sessionStorage.getItem("userInfo")).id
            }
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ collectList: response.data.data.articles })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getMyWork = () => {
        POST({
            url: "/a/cms/article/latestAction?",
            opts: {
                userId: JSON.parse(sessionStorage.getItem("userInfo")).id
            }
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

    render() {
        const { toolList } = this.state;

        return (
            <div className="">
                < Header />
                < QyHead />
                <div class="wrapper g-space">
                    <div class="uc-tabnav">
                        {/* <ul class="clearfix">
                            <li><a href="u_mylaixin.html">来信中心<i class="badge">99+</i> </a></li>
                            <li class="active"><a href="u_mywork.html">我的作品</a></li>
                            <li><a href="u_myheart.html">我的心选</a></li>
                            
                        </ul> */}
                        <Tabs ref={e => this.tabDom = e} className="clearfix" onChange={this.handleTabChange}>
                            <TabPane tab="机构首页" key="home"><Home data={this.state.listData} history={this.props.history} /></TabPane>
                            <TabPane tab="项目文章" key="work"><Article data={this.state.listData} history={this.props.history} /></TabPane>
                            <TabPane tab="最新招聘" key="ad"><Job data={this.state.collectList} history={this.props.history} /></TabPane>
                        </Tabs>
                    </div>

                </div>
                < Footer />
            </div>
        );
    }
}

