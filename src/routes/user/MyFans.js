import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, List, Avatar, Divider, Button, Card, Popover } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';

//import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import Utils from '../../static/js/utils/utils.js'
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/u.icenter.less'
import 'antd/lib/tabs/style/index.less';
import Service from '../../service/api.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import Item from 'antd/lib/list/Item';
import defaultPhoto from "../../static/images/user/default.png"
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
            visibleWexin: false,
            userToolNum: {}
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
        this.getMyFans();
        this.getMyFocus();
        this.getNumberByUser()
    }
    handleTabChange = (key) => {
        console.log(key);
    }

    getMyFocus = () => {
        Service.GetAttentionList({
            userId: JSON.parse(sessionStorage.getItem("userInfo")).id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ myFocusList: response.data.data.userList })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getMyFans = () => {
        Service.GetFansList({
            userId: JSON.parse(sessionStorage.getItem("userInfo")).id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ myFansList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    createMyFocus = () => {
        const { myFocusList } = this.state;
        return myFocusList.map((item, index) => {
            return (
                <li>
                    <div class="lx-item">
                        <a href="javascript:;" class="face">
                            <img src={item.photo || defaultPhoto} />
                        </a>
                        <h1><a href="javascript:;" class="j_name">{item.name}</a></h1>
                        <div class="lx_txt">
                            {item.description}
                        </div>
                        <div class="lx_alt clearfix">
                            <a href="javascript:;" onClick={() => { this.gotoRouter(`/UserNews/${item.id}`) }}>作品<span>{item.attention2Num}</span></a>
                            <a href="javascript:;" onClick={() => { this.gotoRouter(`/MyFans/${item.id}`) }}>粉丝<span>{item.attention2Num}</span></a>
                        </div>
                        <a href="javascript:;" class="a_follow" onClick={() => this.handleFoucs(item.id)}>已关注</a>
                    </div>
                </li>
            )
        })

    }
    handleFoucs = (uid) => {
        const { articleInfo } = this.state;
        Service.AddAttention({
            attention2UserId: uid,
            userId: userInfo.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {

                this.setState({ isFans: response.data.status })
            }

            /* global layer */
            layer.msg(response.data.message)
        })
            .catch((error) => {
                console.log(error)
            })
    }
    createMyFans = () => {
        const { myFansList } = this.state;
        return myFansList.list && myFansList.list.map((item, index) => {
            return (
                <li>
                    <div class="lx-item">
                        <a href="javascript:;" class="face">
                            <img src={item.photo || defaultPhoto} />
                        </a>
                        <h1><a href="javascript:;" class="j_name">{item.name}</a></h1>
                        <div class="lx_txt">
                            {item.description}
                        </div>
                        <div class="lx_alt clearfix">
                            <a href="javascript:;">作品<span>{item.attention2Num}</span></a>
                            <a href="javascript:;">粉丝<span>{item.attention2Num}</span></a>
                        </div>
                        <a href="javascript:;" class="a_follow" onClick={() => this.handleFoucs(item.id)}>关注</a>
                    </div>
                </li>
            )
        })
    }
    hide = () => {
        this.setState({
            visibleWexin: false,
        });
    };

    handleVisibleChange = visible => {
        this.setState({ visibleWexin: visible });
    };

    getNumberByUser = () => {
        Service.FindNumberByUserId({
            userId: userInfo && userInfo.id,
            myUserId: 'tourists'
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                this.setState({ userToolNum: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { userToolNum } = this.state;
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        return (
            <div className="">
                {/* 头部 */}
                < Header />
                <div className="ue-head">
                    <div className="wrapper">
                        <div className="userTx">
                            <a href="javascript:;">
                                <img src={userInfo.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
                                <p><i className="icon-user-img"></i><span>更新个人头像</span></p>
                            </a>
                        </div>
                        <div class="nick-name">
                            <h1><b>{userInfo.name}</b><a href="javascript:;" class="follow" onClick={() => this.handleFoucs(userInfo.id)}>关注</a></h1>
                        </div>
                        <div className="nick-data">
                            <p>
                                <span>作品</span><a href="javascript:;" onClick={() => this.gotoRouter(`/UserCenter/${userInfo && userInfo.id}`)}>{userToolNum && userToolNum.articleNum}</a>
                                {/* <span>关注</span><a href={`/#/MyFans/${userInfo && userInfo.id}`} >{userToolNum && userToolNum.attentionNum}</a>
                                <span>粉丝</span><a href={`/#/MyFans/${userInfo && userInfo.id}`}>{userToolNum && userToolNum.fansNum}</a> */}
                                <span>关注</span><a href="javascript:;" onClick={() => this.gotoRouter(`/MyFans/${userInfo && userInfo.id}`)} >{userToolNum && userToolNum.attentionNum}</a>
                                <span>粉丝</span><a href="javascript:;" onClick={() => this.gotoRouter(`/MyFans/${userInfo && userInfo.id}`)}>{userToolNum && userToolNum.fansNum}</a>
                            </p>
                        </div>
                        <div className="address"><i className="icon-address-w"></i>上海  卢湾</div>
                        <div class="userFx">
                            {
                                userInfo.weiXin &&
                                <Popover
                                    content={<img src={userInfo.weiXin} alt="关注微信" />}
                                    title=""
                                    trigger="click"
                                    visible={this.state.visibleWexin}
                                    onVisibleChange={this.handleVisibleChange}
                                >
                                    <a href="javascript:;" className="uweixin" ><i className="icon-weixin-in"></i></a>
                                </Popover>
                            }
                            {userInfo.weiBo && <a href={userInfo.weiBo} target="_blank" className="uweibo"><i className="icon-weibo-in"></i></a>}
                            {userInfo.zhiHu && <a href={userInfo.zhiHu} target="_blank" className="uzhihu"><i className="icon-zhihu-in"></i></a>}
                            {userInfo.douBan && <a href={userInfo.douBan} target="_blank" className="udou"><i className="icon-dou-in"></i></a>}
                        </div>

                    </div>
                </div>
                <div class="wrapper g-icenter minpage">
                    <div class="ue-minav">
                        {/* <ul class="clearfix">
                            <li><a href="u_mylaixin.html">来信中心<i class="badge">99+</i> </a></li>
                            <li class="active"><a href="u_mywork.html">我的作品</a></li>
                            <li><a href="u_myheart.html">我的心选</a></li>
                            
                        </ul> */}
                        <Tabs ref={e => this.tabDom = e} className="clearfix" onChange={this.handleTabChange}>
                            <TabPane tab={["我关注的人", <span>{userToolNum && userToolNum.attentionNum}</span>]} key="news" className="qj-news lx-fans clearfix">{this.createMyFocus()}</TabPane>
                            <TabPane tab={["我的粉丝", <span>{userToolNum && userToolNum.fansNum}</span>]} key="reco" className="qj-news lx-fans clearfix">{this.createMyFans()}</TabPane>
                        </Tabs>
                        {/* <a href="u_myaccount.html" class="edit">更新个人资料</a> */}
                    </div>

                </div>
                < Footer />
            </div>
        );
    }
}