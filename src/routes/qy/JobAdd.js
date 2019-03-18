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
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'

import defaultPhoto from "../../static/images/user/default.png"
import Item from 'antd/lib/list/Item';
const TabPane = Tabs.TabPane;

export default class UserCenter extends Component {
    /* global $ */
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            myFocusList: [],
            myFansList: [],
            activeKey: 'news'
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
    }

    createList = (name) => {
        const listData = [];
        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );
        return (
            <div className="item">
                <a href="javascript:;" className="thumb-img">
                    <img src="css/images/1x1.png" />
                </a>
                <h1><a href="/#/Question/Article">请问大家有没有好用的微信排版工具？</a></h1>
                <div className="alt"><span>昨天 21:32</span></div>
                <a href="javascript:;" className="sponsor">赞助商提供</a>
            </div>
        )
    }
    handleTabChange = (key) => {
        console.log(key);
    }

    getMyFocus = () => {
        POST({
            url: "/a/attention/userAttentionUserids/attentionList?",
            opts: {
                userId: JSON.parse(sessionStorage.getItem("userInfo")).id
            }
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
        POST({
            url: "/a/attention/userAttentionUserids/attention2List?",
            opts: {
                userId: JSON.parse(sessionStorage.getItem("userInfo")).id
            }
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
                            <img src={item.photo  || defaultPhoto} />
                        </a>
                        <h1><a href="javascript:;" class="j_name">{item.name}</a></h1>
                        <div class="lx_txt">
                            {item.description}
                        </div>
                        <div class="lx_alt clearfix">
                            <a href="javascript:;" onClick={() => { this.gotoRouter(`/UserNews/${item.id}`) }}>作品<span>{item.attention2Num}</span></a>
                            <a href="javascript:;" onClick={() => { this.gotoRouter(`/MyFans/${item.id}`) }}>粉丝<span>{item.attention2Num}</span></a>
                        </div>
                        <a href="javascript:;" class="a_follow" onClick={() => this.handleFoucs(item.id)}>关注</a>
                    </div>
                </li>
            )
        })

    }
    handleFoucs = (uid) => {
        const { articleInfo } = this.state;
        POST({
            url: "/a/attention/userAttentionUserids/attention?",
            opts: {
                attention2UserId: uid,
                userId: JSON.parse(sessionStorage.getItem("userInfo")).id
            }
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
        return myFansList.map((item, index) => {
            return (
                <li>
                    <div class="lx-item">
                        <a href="javascript:;" class="face">
                            <img src={item.photo  || defaultPhoto} />
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

    render() {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
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
                                        <input type="text" class="u-input" placeholder="请填入职位名称" />
                                    </div>
                                </div>
                                <div class="u-inline width-v5">
                                    <label class="u-form-label"><i>*</i>薪资范围</label>
                                    <div class="u-select">
                                        <div class="in_province1" role="note">请选择薪资范围</div>
                                        <div data-for=".in_province1" role="menu">
                                            <ul>
                                                <li>不限</li>
                                                <li>3K以下</li>
                                                <li>3-5K</li>
                                                <li>5-8K</li>
                                                <li>8-10K</li>
                                                <li>10-15K</li>
                                                <li>15-20K</li>
                                                <li>20-30K</li>
                                                <li>30-50K</li>
                                                <li>50K以上</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="u-inline width-v5">
                                    <label class="u-form-label"><i>*</i>工作年限</label>
                                    <div class="u-select">
                                        <div class="in_province2" role="note">请选择工作经验年限</div>
                                        <div data-for=".in_province2" role="menu">
                                            <ul>
                                                <li>不限</li>
                                                <li>实习生</li>
                                                <li>应届毕业生</li>
                                                <li>1-3年</li>
                                                <li>3-5年</li>
                                                <li>5-8年</li>
                                                <li>8年以上</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="u-inline width-v5">
                                    <label class="u-form-label"><i>*</i>学历要求</label>
                                    <div class="u-select">
                                        <div class="in_province3" role="note">请选择学历要求</div>
                                        <div data-for=".in_province3" role="menu">
                                            <ul>
                                                <li>不限</li>
                                                <li>中专</li>
                                                <li>高中</li>
                                                <li>大专</li>
                                                <li>本科</li>
                                                <li>硕士</li>
                                                <li>博士及以上</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="u-inline width-v5">
                                    <label class="u-form-label"><i>*</i>招聘人数</label>
                                    <div class="u-form-input">
                                        <input type="text" class="u-input" placeholder="请填入招聘人数" />
                                    </div>
                                </div>
                                <div class="u-inline width-full">
                                    <label class="u-form-label"><i>*</i>工作地点</label>
                                    <ul class="select-group clearfix">
                                        <li>
                                            <div class="u-select">
                                                <div class="in_province" role="note">四川</div>
                                                <div data-for=".in_province" role="menu">
                                                    <ul>
                                                        <li>河南</li>
                                                        <li>河北</li>
                                                        <li>北京</li>
                                                        <li>天津</li>
                                                        <li>山西</li>
                                                        <li>黑龙江</li>
                                                        <li>吉林</li>
                                                        <li>辽宁</li>
                                                        <li>浙江</li>
                                                        <li>上海</li>
                                                        <li>四川</li>
                                                        <li>湖南</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="u-select">
                                                <div class="in_city" role="note">成都</div>
                                                <div data-for=".in_city" role="menu">
                                                    <ul>
                                                        <li>成都</li>
                                                        <li>绵阳</li>
                                                        <li>德阳</li>
                                                        <li>都江堰</li>
                                                        <li>广元</li>
                                                        <li>泸州</li>
                                                        <li>南充</li>
                                                        <li>广安</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="u-select">
                                                <div class="in_area" role="note">锦江区</div>
                                                <div data-for=".in_area" role="menu">
                                                    <ul>
                                                        <li>成华区</li>
                                                        <li>武候区</li>
                                                        <li>金牛区</li>
                                                        <li>新都区</li>
                                                        <li>青白江区</li>
                                                        <li>高新区</li>
                                                        <li>天府新区</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="u-inline width-full">
                                    <label class="u-form-label"><i>*</i>HR邮箱</label>
                                    <div class="u-form-input width-350">
                                        <input type="text" class="u-input" placeholder="请填入简历接收邮箱" />
                                    </div>
                                </div>
                                <div class="u-inline width-full">
                                    <label class="u-form-label"><i>*</i>福利关键词</label>
                                    <div class="art-keyword clearfix">
                                        <div class="u-add">
                                            <div class="editbox" data-tag="带薪年假,五险一金,年底双薪,团建旅游,在职培训,不限量下午茶">
                                                <ul>

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
                                        <input type="text" class="u-input" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ac-panel jb-req">
                            <div class="u-row">
                                <div class="u-inline width-full">
                                    <label class="u-form-label">岗位描述<br /><span>Job Description</span></label>
                                    <div class="u-form-input">
                                        <textarea class="u-textarea" placeholder="岗位描述"></textarea>
                                    </div>
                                </div>
                                <div class="u-inline width-full">
                                    <label class="u-form-label">岗位要求<br /><span>Job Requirement</span></label>
                                    <div class="u-form-input">
                                        <textarea class="u-textarea" placeholder="岗位要求"></textarea>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="f-right"><a href="javascript:;" class="ac-submit">确认发布</a></div>
                    </div>
                    <div class="g-right">
                        <div class="jb-qyinfo">
                            <div class="jname">
                                <img src="css/images/1x1.png" />
                                VML上海
                        </div>
                            <div class="jtxt">
                                壹娱观察想做中国电影产业和泛娱乐产业的望远镜和声呐——面对产业，除了要发们还想探索那些…
                            <a href="javascript:;">回到首页</a>
                            </div>
                            <ul class="qy-rjob">
                                <li><a href="javascript:;">美术指导/Art Director </a></li>
                                <li><a href="javascript:;">Art Director </a></li>
                                <li><a href="javascript:;">美术指导/Art Director </a></li>
                                <li><a href="javascript:;">美术指导/Art Director </a></li>
                                <li><a href="javascript:;">美术指导/Art Director </a></li>
                                <li><a href="javascript:;">Art Director </a></li>
                            </ul>
                            <a href="qy_myjob.html" class="more-a active">查看更多</a>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}