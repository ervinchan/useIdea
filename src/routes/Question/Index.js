import React, { Component } from 'react';
import { Tabs, Button, Upload } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';

import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import axios from 'axios'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import { POST } from '../../service/service'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import HotRead from '../../common/hotRead/Index'
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/question.less'

import banner from '../../static/images/jingjiao/banner.jpg'
import 'antd/lib/tabs/style/index.less';

const TabPane = Tabs.TabPane;

export default class Question extends Component {
    tabDom = null
    constructor(props) {
        super(props);
        this.state = {
            questionList: [],
            recoList: [],
            replyList: [],
            bannerAList: [],
            bannerBList: [],
            recommendBooks: [],
            activeKey: 'news',
            questionTit: "",
            questionTxt: "",
            fileList: []
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
        this.getQuestionList();
        this.getRecoList();
        this.getReplyList();
        this.getBannerA();
        this.getBannerB();
        this.getRecommendBooks();
    }

    getBannerA = () => {
        POST({
            url: "/a/cms/article/adsList?",
            opts: {
                categoryId: "981892a5c2394fe7b01ce706d917699e"
            }
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerAList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getBannerB = () => {
        POST({
            url: "/a/cms/article/adsList?",
            opts: {
                categoryId: "981892a5c2394fe7b01ce706d917699e"
            }
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerBList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })

    }
    createBannerA = () => {
        const { bannerAList } = this.state
        return bannerAList.map((item, index) => {
            return (
                <div className="swiper-slide">
                    <h1>{item.title}</h1>
                    <div className="txt">
                        {item.discript}
                    </div>
                    <div className="tag">
                        <a href={item.url} >#文案经验</a>
                    </div>
                </div>
            )
        })
    }
    createBannerB = () => {
        const { bannerBList } = this.state
        let bannerList = bannerBList.map((item, index) => {
            return <a href={item.url} className="seat-h100"><img src={item.imageSrc} /></a>
        })
        return (
            bannerList
        )
    }

    getQuestionList = () => {
        POST({
            url: "/a/cms/comment/consultationList"
        }).then((response) => {
            if (response.data.status === 1) {
                global.constants.loading = false
                let questionList = response.data.data
                this.setState({ questionList })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getRecoList = () => {
        POST({
            url: "/a/cms/comment/consultationList?",
            opts: {
                isRecommend: 1
            }
        }).then((response) => {
            if (response.data.status === 1) {
                let recoList = response.data.data
                this.setState({ recoList })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getReplyList = () => {
        POST({
            url: "/a/cms/comment/consultationList?",
            opts: {
                parentContentId: 1
            }
        }).then((response) => {
            if (response.data.status === 1) {
                let replyList = response.data.data
                this.setState({ replyList })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    createQuestionList = (data) => {
        let items = data.map((item, index) => {
            let Hours = FormatDate.apartHours(item.createDate)
            let Time = Hours > 24 ? FormatDate.customFormat(item.createDate, 'yyyy/MM/dd') : `${Hours}小时前`;
            if (item.isNewRecord) {
                return (
                    <div className="item">
                        <a href="javascript:;" onClick={() => this.gotoRouter(item.contentId)} className="thumb-img">
                            <img src={item.imageSrc} />
                        </a>
                        <h1><a href="javascript:;" onClick={() => this.gotoRouter(item.contentId)}>{item.title}</a></h1>
                        <div className="alt"><span>{Time}</span></div>
                        {item.isNewRecord && <a href="javascript:;" className="sponsor">赞助商提供</a>}
                    </div>
                )
            } else {
                return (
                    <div class="item">
                        <a href="javascript:;" class="thumb-img" onClick={() => this.gotoRouter(item.contentId)}>
                            <img src={item.imageSrc} />
                        </a>
                        <h1><a href="javascript:;" onClick={() => this.gotoRouter(item.contentId)}>{item.title}</a></h1>
                        <div class="alt">
                            <span>{Time}</span>
                            {item.isTop !=="0" && <span class="icon-top"></span>}
                            {item.isRecommend !== "0" && <span class="icon-jian"></span>}
                        </div>
                        <div class="txt">{item.content}</div>
                        <div class="f-bartool clearfix"><a href="javascript:;" onClick={() => this.gotoRouter(item.id)}><i class="icon-comment"></i><span>{item.commentNum}</span></a></div>
                    </div>
                )
            }
        })
        return (
            items
        )
    }

    //主编荐书
    getRecommendBooks = () => {
        POST({
            url: "/a/book/bookManager/bookSoft?",
            opts: {
                isRecommend: 1
            }
        }).then((response) => {
            if (response.data.status === 1) {
                let recommendBooks = response.data.data
                this.setState({ recommendBooks })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    createRecommonList = () => {
        const { recommendBooks } = this.state
        return recommendBooks && recommendBooks.list && recommendBooks.list.map((item, index) => {
            let bookImagUrl = item.bookImagUrl.split('|')[1]
            return (
                <li><a href={`/#/Bookstore/Bookbuy/${item.id}`} className="darken"><em><img src={bookImagUrl} /></em><h1>{item.bookName}</h1></a></li>
            )
        })
    }

    gotoRouter = (id) => {
        this.props.history.push(`/Question/Article/${id}`)
    }
    handleTabChange = (key) => {
        console.log(key);
    }

    setQuestionTxt = (e) => {
        this.setState({ questionTxt: e.target.value })
    }
    setQuestionTit = (e) => {
        this.setState({ questionTit: e.target.value })
    }
    submitQuestion = () => {
        const { questionTit, questionTxt, fileList } = this.state;
        var oMyForm = new FormData();
        oMyForm.append("userId", 1);
        oMyForm.append("categoryId", "4812062598ec4b10bedfb38b59ea3e94");
        oMyForm.append("title", questionTit);
        oMyForm.append("content", questionTxt);
        fileList.forEach((file) => {
            oMyForm.append('image', file);
        });
        // axios({
        //     url: "/zsl/a/cms/article/consultationSave?",
        //     method: "post",
        //     data: oMyForm,
        //     processData: false,// 告诉axios不要去处理发送的数据(重要参数)
        //     contentType: false,   // 告诉axios不要去设置Content-Type请求头
        // }).then((response) => {
        //     /*global layer */
        //     global.constants.loading = false
        //     layer.msg(response.data.message)
        // })
        //     .catch((error) => {
        //         global.constants.loading = false
        //         console.log(error)
        //     })
        POST({
            url: "/a/cms/article/consultationSave?",
            opts: {
                userId: 1,
                categoryId: "4812062598ec4b10bedfb38b59ea3e94",
                title: questionTit,
                content: questionTxt,
                image:fileList[0]
            },
            processData: false,
            data: oMyForm,
        }).then((response) => {
            /*global layer */
            global.constants.loading = false
            layer.msg(response.data.message)
        })
            .catch((error) => {
                global.constants.loading = false
                console.log(error)
            })
    }
    createCategory = () => {

    }

    render() {

        const { questionList, recoList, replyList, questionTit, questionTxt, fileList } = this.state;
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
                < Header />
                <div className="qj-banner">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {this.createBannerA()}
                        </div>
                    </div>
                    <div className="u-pagination wide"></div>
                </div>

                {/* <!--广告位--> */}
                <div className="m-seat-x4 wrapper">
                    <ul className="m-row">
                        {this.createRecommonList()}
                    </ul>
                </div>
                <div className="wrapper g-qingjiao">
                    <div className="g-left" data-fixed=".g-qingjiao">
                        <div className="fm-qj">
                            <div className="in_title">
                                <input type="text" placeholder="请在此输入请教的标题……" value={questionTit} onChange={this.setQuestionTit} />
                            </div>
                            <div className="in_txt">
                                <textarea placeholder="清晰简短的问题描述，能有效提升35%的请教成功率……" maxlength="500" value={questionTxt} onChange={this.setQuestionTxt}></textarea>
                            </div>
                        </div>
                        <div className="fm-qj-tool clearfix">
                            <Upload className="upload-btn" {...props}>
                                <a href="javascript:;" className="tl-img"><i className="icon-img"></i>图片</a>
                            </Upload>
                            {/* <a href="javascript:;" className="tl-img"><i className="icon-img"></i>图片</a> */}
                            <div className="u-select">
                                <div className="in_fenlei" role="note">选择分类</div>
                                <div data-for=".in_fenlei" role="menu">
                                    <ul>
                                        {this.createCategory()}
                                        <li>文案进阶</li>
                                        <li>设计审美</li>
                                        <li>写作经验</li>
                                        <li>新媒体运营</li>
                                        <li>营销思维</li>
                                        <li>案例剖析</li>
                                        <li>运营增长</li>
                                        <li>社群管理</li>
                                        <li>其他类型</li>
                                    </ul>
                                </div>
                            </div>
                            <span className="count">{questionTxt.length}/500 字</span>
                            <a href="javascript:;" onClick={this.submitQuestion} className="submit">提交请教</a>
                        </div>
                        {this.createBannerB()}
                        {/* <!--占位--> */}
                        {/* <a href="javascript:;" className="seat-x100"><img src="images/jingjiao/wb.jpg" /></a> */}
                    </div>
                    <div className="g-right">
                        <div className="qj-tabs u-tabs">
                            {/* <ul className="nav clearfix">
                                <li tabfor=".qj-news">最新请教</li>
                                <li tabfor=".qj-reco">编辑推荐</li>
                                <li tabfor=".qj-reply">消灭0回复</li>
                            </ul> */}
                            <Tabs ref={e => this.tabDom = e} className="nav clearfix" onChange={this.handleTabChange}>
                                <TabPane tab="最新请教" key="news" className="qj-news">{this.createQuestionList(questionList)}</TabPane>
                                <TabPane tab="编辑推荐" key="reco" className="qj-news">{this.createQuestionList(recoList)}</TabPane>
                                <TabPane tab="消灭0回复" key="reply" className="qj-news">{this.createQuestionList(replyList)}</TabPane>
                            </Tabs>
                            <div className="u-search">
                                <input type="text" placeholder="搜索与我有关的提问" />
                                <a href="javascript:;" className="fa-search"></a>
                            </div>
                        </div>
                        {/* <!--J进度条--> */}
                        <div className="u-pages">
                            <div className="box clearfix">
                                <a href="javascript:;">Prev</a>
                                <a href="javascript:;"><i className="fa-angle-double-left"></i></a>
                                <a href="javascript:;">1</a>
                                <b>2</b>
                                <a href="javascript:;">3</a>
                                <a href="javascript:;">4</a>
                                <a href="javascript:;">5</a>
                                <a href="javascript:;">6</a>
                                <a href="javascript:;">7</a>
                                <a href="javascript:;">8</a>
                                <a href="javascript:;">9</a>
                                <a href="javascript:;">10</a>
                                <span>…</span>
                                <a href="javascript:;"><i className="fa-angle-double-right"></i></a>
                                <a href="javascript:;">Next</a>
                            </div>
                        </div>
                        {/* <!--/J进度条--> */}
                    </div>
                </div>
                <HotRead />
                <Footer />
                <Loading />
            </div>
        );
    }
}