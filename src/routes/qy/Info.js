import React, { Component } from 'react';
import { Input, Tabs, Pagination, Upload } from 'antd';
import axios from 'axios'
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'
import Validate from '../../static/js/utils/validate.js'
import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import QyHead from './qyHead'
import Service from '../../service/api.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/u.myaccount.less'

const PAGESIZE = 3;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class QyInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            district: null,
            city: null,
            province: null,
            toolList: [],
            fileList: [],
            coverImgs: [],
            officeEnvi: [],
            imageUrl: [],
            userPhoto: [],
            weChatCode: {},
            info: {
                name: "", sex: "", provence: {}, city: {}, district: {}, infomation: "", officeLink: "", subscription: "", douBan: "", zhiHu: "", weiBo: "", email: "", mobile: "", password: "", newPassword: "", teamSize: ""
            },
            media: {
                weiboInput: false,
                doubanInput: false,
                zhihuInput: false
            },
            teamSize: [
                { name: "1-10人" },
                { name: "20-30人" },
                { name: "30-50人" },
                { name: "50-70人" },
                { name: "70-100人" },
                { name: "100人以上" }
            ],
            teamsizeItem: "",
            pswConfirmError: false
        };
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        //下拉选择
        $(".u-select [role=note]").on("click", function (e) {
            e = window.event || e;
            e.stopPropagation();
            $(".u-select [role=menu]").hide();
            $(this).next().show();
        });

        $(".u-select li").on("click", function (e) {
            e = window.event || e;
            e.stopPropagation();
            $($(this).parents("[role=menu]").data("for")).html($(this).text());
            $(this).parents("[role=menu]").hide();
        });
        $('.ac-menu li[data-id]').click(function () {
            $("html,body").animate({ scrollTop: $($(this).data("id")).offset().top + "px" }, 500);
        });

        $(".ac-banding .elclick").click(function () {
            $(this).parent().parent().toggleClass("active");
        });

        var jsonStr = {};
        $(".ac-menu li[data-id]").each(function (index) {
            jsonStr[$(this).data("id").replace(".", "")] = $($(this).data("id")).offset().top;
        });

        $(window).scroll(function () {
            $.each(jsonStr, function (_key) {
                if ($(window).scrollTop() > parseInt(jsonStr[_key]) - 80 && $(window).scrollTop() < parseInt(jsonStr[_key]) + 80) {
                    $(".ac-menu li[data-id='." + _key + "']").addClass("active").siblings().removeClass("active");
                    return false;
                }
            });
        });
        $(window).scroll(function () {
            var bar_scroll = $(window).scrollTop() + $(window).height();
            //浮动
            var $fixed = $("[data-fixed]");
            if ($fixed.length > 0) {
                var bar_top = $($fixed.data("fixed")).offset().top;
                if ($(window).scrollTop() >= bar_top) {
                    $fixed.addClass("fixed");
                } else {
                    $fixed.removeClass("fixed");
                }
                if (bar_scroll > $(".fixed_bottom").offset().top) {
                    $fixed.removeClass("fixed");
                }
            }
            if ($(".p-nav-a").length > 0) {
                if ($(window).scrollTop() >= $(".g-index").offset().top) {
                    $(".p-nav-a").addClass("fixed");
                } else {
                    $(".p-nav-a").removeClass("fixed");
                }
            }
            if ($(".art-wrapper").length > 0) {
                if ($(window).scrollTop() >= $(".art-wrapper").offset().top) {
                    $(".art-wrapper").addClass("fixed");
                } else {
                    $(".art-wrapper").removeClass("fixed");
                }
            }
            if ($(".fixed-column").length > 0) {
                if ($(window).scrollTop() > 100) {
                    $(".fixed-column").show();
                } else {
                    $(".fixed-column").hide();
                }
            }
            if ($(".ac-menu").length > 0) {
                if ($(window).scrollTop() >= $(".g-myaccount .g-left").offset().top) {
                    $(".ac-menu").addClass("fixed");
                } else {
                    $(".ac-menu").removeClass("fixed");
                }
            }
        });
        this.getUserInfoDetail(userInfo && userInfo.id)
        this.getRegionDatas()
    }
    getUserInfoDetail = (userId) => {
        Service.getQyInfoDetail({
            userId: userId
        })
            .then((response) => {
                let userInfoDetail = response.data.data;
                Object.assign(userInfo, userInfoDetail);
                this.setState({ info: userInfo });
            })
            .catch((error) => {
                console.log(error)
            })
    }
    submitUserInfo = () => {
        const { info, userPhoto, weChatCode, teamsizeItem, province, cityItem, districtItem, pswConfirmError, officeEnvi } = this.state;
        this.setState({ pswConfirmError: false })
        if (info.newPassword !== info.confirmPassword) {
            return this.setState({ pswConfirmError: true })
        }
        if (!Validate.checkEmail(info.email)) {
            layer.msg("请填写正确的邮箱")
            return this.setState({ emailError: true })
        }
        if (!Validate.checkPhone(info.mobile)) {
            layer.msg("请填写正确的手机号码")
            return this.setState({ phoneError: true })
        }
        /*global layer */
        var oMyForm = new FormData();
        oMyForm.append("name", userInfo.name);
        oMyForm.append("provence", (province && province.id) || info.provence.id);
        oMyForm.append('city', cityItem && cityItem.id || info.city.id);
        oMyForm.append('district', districtItem && districtItem.id || info.district.id);
        oMyForm.append("subscription", info.subscription || '');
        oMyForm.append('teamSize', teamsizeItem.name);
        oMyForm.append("douBan", info.douBan || '');
        oMyForm.append('zhiHu', info.zhiHu || '');
        oMyForm.append("weiBo", info.weiBo || '');
        oMyForm.append('email', info.email || '');
        oMyForm.append('mobile', info.mobile || '');
        oMyForm.append('officeLink', info.officeLink || '');
        oMyForm.append('password', info.password || '');
        oMyForm.append('newPassword', info.newPassword || '');
        oMyForm.append('userId', userInfo.id);
        userPhoto.forEach((file) => {
            oMyForm.append('headImage', file);
        });
        oMyForm.append('weChatCode', weChatCode || '');
        oMyForm.append('file1', officeEnvi[0]);
        oMyForm.append('file2', officeEnvi[1]);
        oMyForm.append('file3', officeEnvi[2]);
        Service.updateInformation({
            form: oMyForm
        }).then((response) => {
            if (response.data.status === 1) {
                layer.msg("更新成功")
            } else {
                layer.msg(response.data.message)
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }


    createToolList = () => {
        const { toolList } = this.state
        return toolList && toolList.map((item, index) => {
            return (
                <li>
                    <div className="item">
                        <a className="thumb-img" href={`/#/Bookstore/Bookbuy/${item.id}`}><img src={item.image} /></a>
                        <div className="tag">{item.category.name}</div>
                        <h1><a href={`/#/Bookstore/Bookbuy/${item.id}`}>{item.title}</a></h1>
                        <div className="alt clearfix">
                            <a href="#" className="j_name"><img src={item.user.img} className="thumb-img" />{item.user.name}</a>
                            <span className="dot"></span>
                            <span>{item.description}</span>
                        </div>
                    </div>
                </li>
            )
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

    createRegion = () => {
        const { regionDatas } = this.state;
        return regionDatas && regionDatas.map((item) => {
            return <li onClick={() => this.setCity(item)}>{item.name}</li>
        })
    }
    setCity = (item) => {
        // let city = item.childList
        // let province = item
        // this.setState({ city, province, district: [], cityItem: null, districtItem: null })
        let province = item
        const { info } = this.state;
        Service.getArea({
            id: item.id
        })
            .then((response) => {
                if (response.data.status === 1) {
                    let city = response.data.data
                    const cityItem = { city: '', district: '' }
                    this.setState({ city, province, district: [], cityItem, districtItem: null, info: Object.assign(info, cityItem) })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    createCity = () => {
        const { city } = this.state;
        return city && city.map((item) => {
            return <li onClick={() => this.setDistrict(item)}>{item.name}</li>
        })
    }

    setDistrict = (item) => {
        // let district = item.childList
        // let cityItem = item
        // this.setState({ cityItem, district, districtItem: null })
        let cityItem = item
        Service.getArea({
            id: item.id
        })
            .then((response) => {
                if (response.data.status === 1) {
                    let district = response.data.data
                    this.setState({ cityItem, district, districtItem: null })
                }
            })
            .catch((error) => {
                console.log(error)
            })
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
    createTeamSize = () => {
        const { teamSize } = this.state;
        return teamSize && teamSize.map((item) => {
            return <li onClick={() => this.onSelectedTeamSize(item)}>{item.name}</li>
        })
    }
    onSelectedTeamSize = (item) => {
        this.setState({ teamsizeItem: item })
    }

    setImg = (file, newUrl) => {
        /** global layer */
        const { imageUrl } = this.state
        if (imageUrl.length >= 3) {
            return layer.msg("最多上传3张")
        }
        this.setState(state => ({
            officeEnvi: [...state.officeEnvi, file],
            imageUrl: [...state.imageUrl, newUrl]
        }), () => {

            $(".ac-envi").find("input[type=file]").css({
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                zIndex: 1,
                display: "block"
            })

        });
    };

    setUploadPorps = (files, handleImg) => {
        return Utils.uploadProps(files, (file, newUrl) => {
            handleImg(file, newUrl)
        }, this);
    }

    removeOfficeEnvi = (file, index) => {
        this.refs.officeEnvi.props.onRemove(file);
        this.state.imageUrl.splice(index, 1)
        console.log(this.refs.officeEnvi)
    }

    setWeChatCode = (file, newUrl) => {
        this.setState(state => ({
            weChatCode: file
        }), () => {
            $(".wechat-upload").find("input[type=file]").css({
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                zIndex: 1,
                display: "block"
            })

        })
    }

    setUserPhoto = (file, newUrl) => {
        this.setState(state => ({
            userPhoto: [...state.userPhoto, file],
            userImg: newUrl
        }), () => {
            $(".header-photo").find("input[type=file]").css({
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                zIndex: 1,
                display: "block"
            })

        })
    }

    changeInfo = (e, field) => {
        const { info } = this.state;
        info[field] = e.target.value
        this.setState({ info: info })
    }

    changeBindUrl = (input) => {
        const { media } = this.state;
        media[input] = !media[input];
        this.setState({ media: media })
    }

    render() {
        const { province, cityItem, districtItem, info, officeEnvi, imageUrl, media, weChatCode, teamsizeItem, pswConfirmError, userPhoto, userImg } = this.state;

        return (
            <div className="">
                <Header />
                < QyHead info={info} setUserPhoto={this.setUserPhoto} userPhoto={userPhoto} userImg={userImg} history={this.props.history} />
                <div className="wrapper g-myaccount">
                    <div className="g-left">
                        <ul className="ac-menu">
                            <li className="home"><i className="icon-home"></i><a href="javascript:;">我的首页</a></li>
                            <li className="active" data-id=".fr-info"><a href="javascript:;">机构信息</a></li>
                            <li data-id=".fr-envi"><a href="javascript:;">创作环境</a></li>
                            <li data-id=".fr-rss"><a href="javascript:;">运营者信息</a></li>
                            <li data-id=".fr-bind"><a href="javascript:;">账号绑定</a></li>
                            <li data-id=".fr-safe"><a href="javascript:;">密码安全</a></li>
                        </ul>
                    </div>
                    <div className="g-right">
                        <div className="ac-panel fr-info">
                            <div className="ac-title">机构信息</div>
                            <div className="u-row">
                                <div className="u-inline">
                                    <label className="u-form-label">用户昵称</label>
                                    <div className="ac-form-label">
                                        {userInfo && userInfo.name}
                                    </div>
                                </div>
                                <div className="u-inline">
                                    <label className="u-form-label">办公地点</label>
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
                                <div className="u-inline">
                                    <label className="u-form-label">团队规模</label>
                                    <ul className="select-group clearfix">
                                        <li>
                                            <div className="u-select">
                                                <div className="in_province1" role="note">{teamsizeItem && teamsizeItem.name}</div>
                                                <div data-for=".in_province1" role="menu">
                                                    <ul>
                                                        {this.createTeamSize()}

                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="u-inline">
                                    <label className="u-form-label">官网</label>
                                    <div className="u-form-input">
                                        <input type="text" className="u-input" name="input1" placeholder="官网选填" value={info.officeLink} onChange={(e) => this.changeInfo(e, 'officeLink')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ac-panel fr-envi">
                            <div className="ac-title"><i>*</i>创作环境</div>
                            <div className="u-row">
                                <ul className="ac-envi clearfix">
                                    <li>
                                        <img src={imageUrl && imageUrl[0]} />
                                        <i className="fa-close" onClick={() => this.removeOfficeEnvi(officeEnvi[0], 0)}></i>
                                    </li>
                                    <li>
                                        <img src={imageUrl && imageUrl[1]} />
                                        <i className="fa-close" onClick={() => this.removeOfficeEnvi(officeEnvi[1], 1)}></i>
                                    </li>
                                    <li>
                                        <img src={imageUrl && imageUrl[2]} />
                                        <i className="fa-close" onClick={() => this.removeOfficeEnvi(officeEnvi[2], 2)}></i>
                                    </li>
                                    <li>
                                        <Upload
                                            name="avatar"
                                            className="avatar-uploader"
                                            multiple
                                            ref="officeEnvi"
                                            {...this.setUploadPorps(officeEnvi, this.setImg)}
                                        >
                                            <a href="javascript:;">+ 添加图片</a>
                                        </Upload>
                                    </li>
                                </ul>
                                <div className="u-helptxt">标准尺寸  750*350  像素，最多上传3张，显示在机构中心首页</div>
                            </div>
                        </div>
                        <div className="ac-panel fr-rss">
                            <div className="u-inline">
                                <label className="u-form-label">登录邮箱</label>
                                <div className="u-form-input width-250">
                                    <input type="text" className="u-input" placeholder="ideazhu@gmail.com" value={info.email} onChange={(e) => this.changeInfo(e, 'email')} />
                                </div>
                                <a href="javascript:;" className="ac-btn1">更换邮箱</a>
                            </div>
                            <div className="u-inline">
                                <label className="u-form-label">注册手机</label>
                                <div className="u-form-input width-250">
                                    <input type="text" className="u-input" placeholder="暂未绑定手机号" value={info.mobile} onChange={(e) => this.changeInfo(e, 'mobile')} />
                                </div>
                                <a href="javascript:;" className="ac-btn1">绑定手机</a>
                            </div>
                            <div className="ac-choice">
                                <h1>每周精选推荐</h1>
                                <div className="radio">
                                    <input type="checkbox" id="inputChecked1" className="u-checkbox" checked />
                                    <label for="inputChecked1">订阅</label>
                                </div>
                                <div className="u-helptxt">* 绑定邮箱才能订阅每周精选</div>
                            </div>
                        </div>
                        <div className="ac-banding fr-bind">
                            <div className="ac-title">宣传绑定</div>
                            <ul className="clearfix wechat-upload">
                                <li>
                                    <span className="cimg"><i className="icon-wechat"></i></span>
                                    <span className="alt">{weChatCode.name || "* 请在这里上传你的公众平台二维码"}</span>
                                    <span className="cbtn">
                                        <Upload
                                            name="weChatCode"
                                            className="avatar-uploader"
                                            {...this.setUploadPorps(weChatCode, this.setWeChatCode)}
                                        >
                                            <a href="javascript:;">上传</a>
                                        </Upload>
                                    </span>
                                </li>
                                <li>
                                    <span className="cimg"><i className="icon-weibo"></i></span>
                                    <span className={"alt " + (media.weiboInput ? "hide" : "")}>{info.weiBo || "* 请在这里上传你微博首页链接"}</span>
                                    <input type="text" className={"u-input " + (!media.weiboInput ? "hide" : "show")} placeholder="上传你微博首页链接" value={info.weiBo} onChange={(e) => this.changeInfo(e, 'weiBo')} />
                                    <span className="cbtn"><a href="javascript:;" onClick={() => this.changeBindUrl("weiboInput")}>{!media.weiboInput ? "点击绑定" : "点击提交"}</a></span>
                                </li>
                                <li>
                                    <span className="cimg"><i className="icon-zhihu"></i></span>
                                    <span className={"alt " + (media.zhihuInput ? "hide" : "")}>{info.zhiHu || "* 请在这里上传你知乎首页链接"}</span>
                                    <input type="text" className={"u-input " + (!media.zhihuInput ? "hide" : "show")} placeholder="上传你知乎首页链接" value={info.zhiHu} onChange={(e) => this.changeInfo(e, 'zhiHu')} />
                                    <span className="cbtn"><a href="javascript:;" onClick={() => this.changeBindUrl("zhihuInput")}>{!media.zhihuInput ? "点击绑定" : "点击提交"}</a></span>
                                </li>
                                <li>
                                    <span className="cimg"><i className="icon-dou"></i></span>
                                    <span className={"alt " + (media.doubanInput ? "hide" : "")}>{info.douBan || "* 请在这里上传你豆瓣首页链接"}</span>
                                    <input type="text" className={"u-input " + (!media.doubanInput ? "hide" : "show")} placeholder="上传你豆瓣首页链接" value={info.douBan} onChange={(e) => this.changeInfo(e, 'douBan')} />
                                    <span className="cbtn"><a href="javascript:;" onClick={() => this.changeBindUrl("doubanInput")}>{!media.doubanInput ? "点击绑定" : "点击提交"}</a></span>
                                </li>
                            </ul>
                            {/* <ul className="clearfix">
                                <li>
                                    <span className="cimg"><i className="icon-wechat"></i></span>
                                    <span className="alt">{weChatCode.name || "* 请在这里上传你的公众平台二维码"}</span>
                                    <span className="cbtn">
                                        <Upload
                                            name="weChatCode"
                                            className="avatar-uploader"
                                            {...this.setUploadPorps(weChatCode, this.setWeChatCode)}
                                        >
                                            <a href="javascript:;">上传</a>
                                        </Upload>
                                    </span>
                                </li>
                                <li>
                                    <span className="cimg"><i className="icon-weibo"></i></span>
                                    <span className={"alt " + (media.weiboInput ? "hide" : "")}>{info.weibo || "* 请在这里上传你微博首页链接"}</span>
                                    <input type="text" className={"u-input " + (!media.weiboInput ? "hide" : "show")} placeholder="上传你微博首页链接" value={info.weiBo} onChange={(e) => this.changeInfo(e, 'weiBo')} />
                                    <span className="cbtn"><a href="javascript:;" onClick={() => this.changeBindUrl("weiboInput")}>{!media.weiboInput ? "点击绑定" : "点击提交"}</a></span>
                                </li>
                                <li>
                                    <span className="cimg"><i className="icon-zhihu"></i></span>
                                    <span className={"alt " + (media.zhihuInput ? "hide" : "")}>{info.zhiHu || "* 请在这里上传你知乎首页链接"}</span>
                                    <input type="text" className={"u-input " + (!media.zhihuInput ? "hide" : "show")} placeholder="上传你知乎首页链接" value={info.zhiHu} onChange={(e) => this.changeInfo(e, 'zhiHu')} />
                                    <span className="cbtn"><a href="javascript:;" onClick={() => this.changeBindUrl("zhihuInput")}>{!media.zhihuInput ? "点击绑定" : "点击提交"}</a></span>
                                </li>
                                <li>
                                    <span className="cimg"><i className="icon-dou"></i></span>
                                    <span className={"alt " + (media.doubanInput ? "hide" : "")}>{info.douban || "* 请在这里上传你豆瓣首页链接"}</span>
                                    <input type="text" className={"u-input " + (!media.doubanInput ? "hide" : "show")} placeholder="上传你豆瓣首页链接" value={info.douBan} onChange={(e) => this.changeInfo(e, 'douBan')} />
                                    <span className="cbtn"><a href="javascript:;" onClick={() => this.changeBindUrl("doubanInput")}>{!media.doubanInput ? "点击绑定" : "点击提交"}</a></span>
                                </li>
                            </ul> */}
                        </div>
                        <div className="ac-panel ac-horizontal fr-safe">
                            <div className="ac-title ac-darken">密码安全</div>
                            <div className="u-inline">
                                <label className="u-form-label">验证密码：</label>
                                <div className="u-form-input width-250">
                                    <input type="password" className="u-input" placeholder="当前密码" value={info.password} onChange={(e) => this.changeInfo(e, 'password')} />
                                </div>
                            </div>
                            <div className="u-inline">
                                <label className="u-form-label">新的密码：</label>
                                <div className="u-form-input width-250">
                                    <input type="password" className="u-input" placeholder="新密码" value={info.newPassword} onChange={(e) => this.changeInfo(e, 'newPassword')} />
                                </div>
                                <div className="u-helptxt">密码由6~16位字母（区分大小写）、数字或符号组成</div>
                            </div>
                            <div className={"u-inline " + (pswConfirmError ? "isError" : "")}>
                                <label className="u-form-label">确认密码：</label>
                                <div className="u-form-input width-250">
                                    <input type="password" className="u-input" placeholder="再次输入新密码" value={info.confirmPassword} onChange={(e) => this.changeInfo(e, 'confirmPassword')} />
                                </div>
                                <div className="u-helptxt">
                                    <span className={pswConfirmError ? "tipError ac-red" : "hide"}>* 两次密码不一致，请重新输入</span>
                                </div>
                            </div>
                        </div>
                        <div className="f-right"><a href="javascript:;" className="ac-submit" onClick={this.submitUserInfo}>确认提交</a></div>
                    </div>
                </div>
                <Footer />
                <Loading />
            </div>
        );
    }
}

