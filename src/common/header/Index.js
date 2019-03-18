import React, { Component } from 'react';
import { HashRouter, NavLink, Link } from 'react-router-dom'
import { Icon } from 'antd'
import $ from 'jquery'
import axios from 'axios'
import Utils from '../../static/js/utils/utils.js'
import Service from '../../service/api.js'
import LOGO from "../../static/images/m-logo.png"
import defaultPhoto from "../../static/images/user/default.png"
export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Nav: [],
            ActiveId: "",
            title: '响创意 记录创造者的洞见',
            roleNames: '游客',
            searchTxt: ""
        }
        const router = new HashRouter()

        router.history.listen((location) => {
            console.log(location.pathname)
            switch (location.pathname) {
                case '/Question':
                    document.title = "请教-" + this.state.title;
                    break;
                case '/Question/Article':
                    document.title = "请教详情-" + this.state.title;
                    break;
                case '/Bookstore':
                    document.title = "书单上新-" + this.state.title;
                    break;
                case '/Bookstore/Bookbuy':
                    document.title = "书单详情-" + this.state.title;
                    break;
                case '/ReadingTime':
                    document.title = "阅读场景-" + this.state.title;
                    break;
                case '/Inspiration':
                    document.title = "见识灵感-" + this.state.title;
                    break;
                case '/Inspiration/Interview':
                    document.title = "专访幕后-" + this.state.title;
                    break;
                case '/Inspiration/Viewpoint':
                    document.title = "醒来再读-" + this.state.title;
                    break;
                case '/Inspiration/Tool':
                    document.title = "工具包-" + this.state.title;
                    break;
                case '/Inspiration/Article':
                    document.title = "文章详情-" + this.state.title;
                    break;
                case '/GoodCopy':
                    document.title = "口吃文案-" + this.state.title;
                    break;
                case '/Job':
                    document.title = "招聘-" + this.state.title;
                    break;
                case '/Job/List':
                    document.title = "招聘列表-" + this.state.title;
                    break;
                default: break;
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location != this.props.location) {
            console.log(nextProps)
            let tid = this.props.match.params.tid
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }
    componentDidMount() {
        this.getNavData()
        //搜索
        $(".m-head").on("click", ".f-item.search", function (e) {
            e = window.event || e;
            e.stopPropagation();
            $(".search-wrap").addClass("active");
            $(".search-wrap input").focus();
        });
        $(document).on("click", function (e) {
            e = window.event || e;
            e.stopPropagation();
            $(".u-select [role=menu]").hide();
            $(".search-wrap").removeClass("active");
            $(".search-wrap input").val("");
        }).on("keydown", function (e) {
            e = window.event || e;
            e.stopPropagation();
        });

        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        if (userInfo) {
            switch (userInfo.isCompany) {
                case "true":
                    this.setState({ roleNames: "企业用户" })
                    break;
                case "false":
                    this.setState({ roleNames: "个人用户" })
                    break;
                default:
                    this.setState({ roleNames: "游客" })
                    break;
            }
        }
        this.setState({ userInfo: userInfo })
    }

    getNavData = () => {
        Service.GetNav()
            .then((response) => {
                let Nav = response.data.data
                this.setState({ Nav: Nav })
            })
    }
    createNav = (nav) => {
        return this.loop(nav)
    }

    loop = (data) => {
        const { ActiveId } = this.state;
        return data.map((item, index) => {
            let Lis = []
            let url = item.url.split("#")[1];
            //let isActive = (ActiveId || sessionStorage.getItem("ActiveId")) === item.id ? "active" : "";
            if (item.childList) {
                Lis = this.loopChildren(item, item.childList)
            }
            let Li = item.childList && item.name !== "招聘" ?
                <li key={index} ><NavLink to={{
                    pathname: `/${url}`,
                    state: { navId: item.id },
                    hash: item.id
                }} activeClassName="active" isActive={(match, location) => this.setActive(match, location, url)}>{item.name}</NavLink><ul>{Lis}</ul></li>
                :
                <li key={index} ><NavLink to={{
                    pathname: `/${url}`,
                    state: { navId: item.id },
                    hash: item.id
                }} activeClassName="active" isActive={(match, location) => this.setActive(match, location, url)}>{item.name}</NavLink></li>
            return Li
        })
    }

    loopChildren = (parent, items) => {
        let Lis = items.map((item, index) => {
            let url = item.url.split("#")[1];
            return <li ><i className="fa-angle-right"></i><Link to={{
                pathname: `/${url}`,
                state: { navId: item.id }
            }} activeClassName="active" id={item.id}>{item.name}</Link></li>
        })
        return Lis
    }

    setActive = (match, location, url) => {
        if (match) {
            if (match.url === `/${url}`) {
                return true;
            }
        }

    }

    setActiveId = (ActiveId) => {
        this.setState({ ActiveId }, () => {
            sessionStorage.setItem("ActiveId", this.state.ActiveId);
        })
    }

    logOut = () => {
        sessionStorage.clear()
        window.location.href = "/#/Login"
        //this.props.history.push("/Login")
    }

    // handleSearch = () => {
    //     const { searchTxt } = this.state;
    //     POST({
    //         url: "/a/cms/article/getAllArticle?",
    //         opts: {
    //             title: searchTxt,
    //             categoryId: "4812062598ec4b10bedfb38b59ea3e94"
    //         }
    //     }).then((response) => {
    //         /*global layer */
    //         global.constants.loading = false
    //         this.setState({ questionList: response.data.data })

    //     })
    //         .catch((error) => {
    //             global.constants.loading = false
    //             console.log(error)
    //         })
    // }
    handleChangeSearchTxt = (e) => {
        this.setState({ searchTxt: e.target.value })
    }

    render() {
        const { Nav, roleNames, userInfo, searchTxt } = this.state
        return (
            <div className="m-head">
                <div className="wrapper">
                    <a href="/" className="logo">
                        <img src={LOGO} alt="文案圈周刊" />
                    </a>
                    <div className="f-item user">
                        <a href="javascript:;" className="icon-user">
                            {userInfo && userInfo.attentionNum !== "0" && <i className="badge">{userInfo.attentionNum}</i>}
                        </a>

                        <div className="fm-userinfo" style={{ display: roleNames === "游客" ? '' : 'none' }}>
                            <div className="info">
                                <a href="javascript:;" className="thumb">
                                    <img src={defaultPhoto} />
                                </a>
                                <h1><a href="/#/Login">未登录</a></h1>
                                <h3><a href="/#/Reg">新用户请先注册</a></h3>
                            </div>
                            <div className="inlet clearfix">
                                <a href="/#/Login"><Icon type="solution" style={{ fontSize: '26px' }} />个人登录</a>
                                <a href="/#/LoginQy"><Icon type="reconciliation" style={{ fontSize: '26px' }} />企业登录</a>
                            </div>
                        </div>
                        {
                            userInfo &&
                            <div className="fm-userinfo" style={{ display: roleNames === "个人用户" ? '' : 'none' }}>
                                <div className="info">
                                    <a href={`/#/UserCenter/${userInfo.id}`} className="thumb">
                                        <img src={userInfo.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
                                    </a>
                                    <h1><a href={`/#/UserCenter/${userInfo.id}`}>{userInfo.name}</a></h1>
                                    <h3><a href={`/#/InfoUpDate/${userInfo.id}`}>完善个人资料</a></h3>
                                </div>
                                <ul className="nav clearfix">
                                    <li>
                                        <a href={`/#/ArticleEditor`}>发表文章</a>
                                    </li>
                                    <li>
                                        <a href={`/#/UserCenter/${userInfo.id}`}>我的首页</a>
                                    </li>
                                    <li>
                                        <a href={`/#/UserCenter/${userInfo.id}`}>我的订阅</a>
                                    </li>
                                    <li>
                                        <a href={`/#/UserCenter/${userInfo.id}`}>来 信{userInfo.attentionNum !== "0" && <i className="badge">{userInfo.attentionNum}</i>}</a>
                                    </li>
                                    <li className="esc">
                                        <a href="javascript:;" onClick={this.logOut}><span className="icon-exit"></span><span>登 出</span></a>
                                    </li>
                                </ul>
                            </div>
                        }
                        {
                            userInfo &&
                            <div className="fm-userinfo" style={{ display: roleNames === "企业用户" ? '' : 'none' }}>
                                <div className="info">
                                    <a href="javascript:;" className="thumb qy">
                                        <img src={userInfo.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
                                    </a>
                                    <h1><a href="#">VML 上海</a></h1>
                                    <h3><a href="#">修改企业资料</a></h3>
                                </div>
                                <ul className="nav clearfix">
                                    <li>
                                        <a href="#">发布项目</a>
                                    </li>
                                    <li>
                                        <a href="#">发布岗位</a>
                                    </li>
                                    <li>
                                        <a href="#">广告投放管理</a>
                                    </li>
                                    <li>
                                        <a href="#">来 信<i className="badge">42</i></a>
                                    </li>
                                    <li className="esc">
                                        <a href="javascript:;" onClick={this.logOut}><span className="icon-exit"></span><span>登 出</span></a>
                                    </li>
                                </ul>
                            </div>
                        }


                    </div>
                    <div className="f-item search">
                        <a href="javascript:;" className="icon-search"></a>
                    </div>
                    <ul className="m-menu">
                        {Nav.length && this.createNav(Nav)}
                        {/* <li className="active"><a href="/">首 页</a></li>
                        <li><a href="/#/Question">请 教</a></li>
                        <li><a href="javascript:;">小专栏</a></li>
                        <li><a href="/#/GoodCopy">吃口文案</a></li>
                        <li>
                            <a href="/#/Inspiration/Bigidea">灵感库</a>
                            <ul>
                                <li><i className="fa-angle-right"></i><a href="/#/Inspiration/Bigidea">见识灵感</a></li>
                                <li><i className="fa-angle-right"></i><a href="/#/Inspiration/Viewpoint">醒来再读</a></li>
                                <li><i className="fa-angle-right"></i><a href="/#/Inspiration/Interview">专访幕后</a></li>
                                <li><i className="fa-angle-right"></i><a href="/#/Inspiration/Tool">工具包</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="/#/Bookstore">蜗牛翻书</a>
                            <ul>
                                <li><i className="fa-angle-right"></i><a href="/#/Bookstore">书单上新</a></li>
                                <li><i className="fa-angle-right"></i><a href="/#/ReadingTime">阅读场景</a></li>
                            </ul>
                        </li>
                        <li><a href="/#/Job">招 聘</a></li> */}
                    </ul>
                </div>
                <div className="search-wrap">
                    <div className="wrapper">
                        <div className="u-search">
                            <input type="text" placeholder="搜索与我有关的提问" onChange={this.handleChangeSearchTxt} />
                            <a href={`/#/Question/${searchTxt}`} className="fa-search" ></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}