import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, List, Avatar, Divider, Button, Card, Popover } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';
import { } from 'redux'
import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import MyWork from './MyWork.js';
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/u.icenter.less'
import 'antd/lib/tabs/style/index.less';
import Service from '../../service/api.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import Utils from '../../static/js/utils/utils.js'
import defaultPhoto from "../../static/images/user/default.png"
const TabPane = Tabs.TabPane;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class UserNews extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            news: [],
        };
    }

    componentDidMount() {
        var that = this
        const userId = this.props.match.params.uid
        this.getNews(userId)
        this.getNewsArticles(userId)
    }

    getNews = (userId) => {
        Service.GetLatestAction({
            userId: userId
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ news: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getNewsArticles = (userId) => {
        Service.GetAllArticle({
            userId: userId
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
    handleTabChange = (key) => {
        console.log(key);
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    render() {
        return (
            <div className="">
                {/* 头部 */}
                < Header />
                <div className="ue-head">
                    <div className="wrapper">
                        <div className="userTx">
                            <a href="javascript:;">
                                <img src={(userInfo && userInfo.photo) || defaultPhoto} onError={Utils.setDefaultPhoto} />
                                {/* <p><i className="icon-user-img"></i><span>更新个人头像</span></p> */}
                            </a>
                        </div>
                        <div className="nick-name">
                            <h1><b>{userInfo && userInfo.name}</b></h1>
                        </div>
                        <div className="nick-data">
                            <p>
                                <span>作品</span><a href="javascript:;">{userInfo.attentionNum}</a>
                                <span>关注</span><a href="javascript:;">{userInfo.attentionNum}</a>
                                <span>粉丝</span><a href="javascript:;" onClick={() => this.gotoRouter(`/MyFans/${userInfo.id}`)}>{userInfo.attention2Num}</a>
                            </p>
                        </div>
                        <div className="address"><i className="icon-address-w"></i>{userInfo.city}</div>
                        {/* <a href="javascript:;" className="add_upload" onClick={() => this.gotoRouter(`/ArticleEditor`)}>发表作品/经验</a> */}
                    </div>
                </div>
                <div class="wrapper g-icenter minpage">
                    <div class="ue-tabnav">
                        <Tabs ref={e => this.tabDom = e} className="clearfix" onChange={this.handleTabChange}>
                            <TabPane tab="最新动态" key="news" className="qj-news">
                                <MyWork data={this.state.news} history={this.props.history} />
                            </TabPane>
                            <TabPane tab="最新文章" key="reco">
                                <MyWork data={this.state.newsArticles && this.state.newsArticles.list} history={this.props.history} />
                            </TabPane>
                        </Tabs>
                        {/* <a href="javascript:;" class="edit">更新个人资料</a> */}
                    </div>

                </div>
                < Footer />
            </div>
        );
    }
}