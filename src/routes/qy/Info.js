import React, { Component } from 'react';
import { Input, Tabs, Pagination, Upload } from 'antd';
import axios from 'axios'
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import QyHead from './qyHead'
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/u.myaccount.less'

const PAGESIZE = 3;

export default class QyInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            district: null,
            city: null,
            province: null,
            toolList: [],
            fileList: [],
            coverImgs: []
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
        this.getArticleInfo("7a8bbb7d262142cbb7ae5bf884935e81")
        this.getRegionDatas()
    }

    getArticleInfo = (categoryId) => {
        let url = '/zsl/a/cms/article/getAllArticle?'
        let opts = {
            hits: 1,
            categoryId: categoryId || ''
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                if (categoryId) {
                    let toolList = response.data.data
                    this.setState({ toolList })
                } else {
                    let hotBooks = response.data.data
                    this.setState({ hotBooks }, () => {
                        var swiper_read = new Swiper('.m-read-fade .swiper-container', {
                            effect: 'fade',
                            pagination: {
                                el: '.m-read-fade .u-pagination',
                                bulletclassName: 'bull',
                                bulletActiveclassName: 'active',
                                clickable: true
                            }
                        });
                    })
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
        const { } = this.state;
        let url = '/zsl/getArea?'
        let opts = {

        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
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

    setImg = (e, file, reader) => {
        // 图片base64化
        let newUrl = reader.result;
        this.setState(state => ({
            fileList: [...state.fileList, file],
            coverImgs: newUrl
        }));
    };

    setUploadPorps = (handleImg) => {
        const { fileList } = this.state;
        return {
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

                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => handleImg(e, file, reader)

                return false;
            },
            fileList,
            showUploadList: false
        }
    }

    render() {
        const { province, cityItem, districtItem, } = this.state;

        return (
            <div className="">
                <Header />
                < QyHead />
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
                                        网易云音乐
                        </div>
                                </div>
                                <div className="u-inline">
                                    <label className="u-form-label">办公地点</label>
                                    <ul className="select-group clearfix">
                                        <li>
                                            <div className="u-select">
                                                <div className="in_province" role="note">{(province && province.name) || "省份"}</div>
                                                <div data-for=".in_province" role="menu">
                                                    <ul>
                                                        {this.createRegion()}
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="u-select">
                                                <div className="in_city" role="note">{(cityItem && cityItem.name) || "城市"}</div>
                                                <div data-for=".in_city" role="menu">
                                                    <ul>
                                                        {this.createCity()}
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="u-select">
                                                <div className="in_area" role="note">{(districtItem && districtItem.name) || "县区"}</div>
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
                                                <div className="in_province1" role="note">1-10人</div>
                                                <div data-for=".in_province1" role="menu">
                                                    <ul>
                                                        <li>1-10人</li>
                                                        <li>10-20人</li>
                                                        <li>20-30人</li>
                                                        <li>30-50人</li>
                                                        <li>50-70人</li>
                                                        <li>70-100人</li>
                                                        <li>100人以上</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="u-inline">
                                    <label className="u-form-label">官网</label>
                                    <div className="u-form-input">
                                        <input type="text" className="u-input" name="input1" placeholder="官网选填" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ac-panel fr-envi">
                            <div className="ac-title"><i>*</i>创作环境</div>
                            <div className="u-row">
                                <ul className="ac-envi clearfix">
                                    <li>
                                        <img src="css/images/1x1.png" />
                                        <i className="fa-close"></i>
                                    </li>
                                    <li>
                                        <img src="css/images/1x1.png" />
                                        <i className="fa-close"></i>
                                    </li>
                                    <li>
                                        <img src="css/images/1x1.png" />
                                        <i className="fa-close"></i>
                                    </li>
                                    <li>
                                        <Upload
                                            name="avatar"
                                            className="avatar-uploader"
                                            {...this.setUploadPorps(this.setImg)}
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
                                    <input type="text" className="u-input" placeholder="ideazhu@gmail.com" />
                                </div>
                                <a href="javascript:;" className="ac-btn1">更换邮箱</a>
                            </div>
                            <div className="u-inline">
                                <label className="u-form-label">注册手机</label>
                                <div className="u-form-input width-250">
                                    <input type="text" className="u-input" placeholder="暂未绑定手机号" />
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
                            <ul className="clearfix">
                                <li>
                                    <span className="cimg"><i className="icon-wechat"></i></span>
                                    <span className="alt">* 请在这里上传你的公众平台二维码</span>
                                    <span className="cbtn"><a href="javascript:;">上传</a></span>
                                </li>
                                <li>
                                    <span className="cimg"><i className="icon-weibo"></i></span>
                                    <span className="cbtn"><a href="javascript:;">已绑定</a></span>
                                </li>
                                <li>
                                    <span className="cimg"><i className="icon-zhihu"></i></span>
                                    <span className="alt">* 请在这里上传你知乎首页链接</span>
                                    <input type="text" className="u-input" placeholder="上传你知乎首页链接" />
                                    <span className="cbtn"><a href="javascript:;" className="elclick"><span>点击绑定</span><b>点击提交</b></a></span>
                                </li>
                                <li>
                                    <span className="cimg"><i className="icon-dou"></i></span>
                                    <span className="cbtn"><a href="javascript:;">点击绑定</a></span>
                                </li>
                            </ul>
                        </div>
                        <div className="ac-panel ac-horizontal fr-safe">
                            <div className="ac-title ac-darken">密码安全</div>
                            <div className="u-inline">
                                <label className="u-form-label">验证密码：</label>
                                <div className="u-form-input width-250">
                                    <input type="text" className="u-input" placeholder="当前密码" />
                                </div>
                            </div>
                            <div className="u-inline">
                                <label className="u-form-label">新的密码：</label>
                                <div className="u-form-input width-250">
                                    <input type="text" className="u-input" placeholder="新密码" />
                                </div>
                                <div className="u-helptxt">密码由6~16位字母（区分大小写）、数字或符号组成</div>
                            </div>
                            <div className="u-inline">
                                <label className="u-form-label">确认密码：</label>
                                <div className="u-form-input width-250">
                                    <input type="text" className="u-input" placeholder="再次输入新密码" />
                                </div>
                                <div className="u-helptxt ac-red">
                                    * 两次密码不一致，请重新输入
                    </div>
                            </div>
                        </div>
                        <div className="f-right"><a href="javascript:;" className="ac-submit">确认提交</a></div>
                    </div>
                </div>
                <Footer />
                <Loading />
            </div>
        );
    }
}

