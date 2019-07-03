import React, { Component } from 'react';
import { Tabs, Button, Upload, Pagination } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';

import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Service from '../../service/api.js'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import HotRead from '../../common/hotRead/Index'
import Pager from '../../common/pager'
import 'swiper/dist/css/swiper.min.css'
import '../../static/less/question.less'
import 'antd/lib/tabs/style/index.less';
import 'antd/lib/upload/style/index.less';
import Utils from '../../static/js/utils/utils.js';
import defaultPhoto from "../../static/images/user/default.png"
const TabPane = Tabs.TabPane;
const PAGESIZE = 10;
export default class Question extends Component {
    tabDom = null;
    categoryIds = global.constants.categoryIds['请教'];
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
            fileList: [],
            categoryList: [],
            addCategoryId: "",
            addCategoryName: "",
            userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
            curPage: 1,
            searchTxt: "",
            pageData: [],
            getCurPageList: Function
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
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
        this.props.match.params.txt ? this.handleSearch() : this.getQuestionList()
        this.getRecoList();
        this.getReplyList();
        this.getBannerA();
        this.getBannerB();
        this.getBannerC();
        this.getBannerD();
        this.getBannerE();
        this.getCategory()
    }

    getCategory = () => {
        Service.FindClassifying().then((response) => {
            if (response.data.status === 1) {
                this.setState({ categoryList: response.data.data })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    getBannerA = () => {
        Service.GetADList({
            categoryId: this.categoryIds.id,
            id: "588e4f30e9634523b34b5c913bfa4cd2"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerAList: response.data.data })
            }
        })
    }
    getBannerB = () => {
        // Service.GetBanners({
        //     categoryId: "981892a5c2394fe7b01ce706d917699e"
        // }).then((response) => {
        //     if (response.data.status === 1) {
        //         this.setState({ bannerBList: response.data.data })
        //     }
        // })
        Service.GetADList({
            categoryId: this.categoryIds.id,
            id: "b3653c6c1da841569e04ccccd5c0a776"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerBList: response.data.data })
            }
        })
    }
    createBannerA = () => {
        const { bannerAList } = this.state
        return bannerAList.map((item, index) => {
            return (
                <div className="swiper-slide" >
                    <h1>{item.name}</h1>
                    <div className="txt">
                        {item.description}
                    </div>
                    <div className="tag">
                        <a href={item.link} target="_blank">#文案经验</a>
                    </div>
                </div>
            )
        })
    }
    createBannerB = () => {
        const { bannerBList } = this.state
        let bannerList = bannerBList.map((item, index) => {
            return <a href={item.link} className="seat-h100" target="_blank"><img src={item.image} /></a>
        })
        return (
            bannerList
        )
    }

    getQuestionList = (pageNo) => {
        Service.GetQuestion({
            pageNo: pageNo || 1,
            pageSize: PAGESIZE,
            categoryId: this.categoryIds.id
        }).then((response) => {
            if (response.data.status === 1) {
                global.constants.loading = false
                let questionList = response.data.data
                this.setState({ questionList }, () => {
                    this.handleTabChange('news')
                })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }
    getRecoList = (pageNo) => {
        Service.GetQuestion({
            isRecommend: 1,
            categoryId: this.categoryIds.id,
            pageNo: pageNo || 1,
            pageSize: PAGESIZE,
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
    getReplyList = (pageNo) => {
        Service.GetQuestion({
            parentContentId: 1,
            categoryId: this.categoryIds.id,
            pageNo: pageNo || 1,
            pageSize: PAGESIZE,
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

    getBannerC = () => {
        Service.GetADList({
            categoryId: this.categoryIds.id,
            id: "3c43ad8ac9ad4a2b860e335aea1bc68c"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerCList: response.data.data })
            }
        })
    }
    getBannerD = () => {
        Service.GetADList({
            categoryId: this.categoryIds.id,
            id: "3c43ad8ac9ad4a2b860e335abc1bc68c"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerDList: response.data.data })
            }
        })
    }

    createBannerC = () => {
        const { bannerCList } = this.state
        let bannerList = bannerCList.map((item, index) => {
            return <a href={item.url} className="seat-h100"><img src={item.image} /></a>
        })
        return (
            bannerList
        )
    }

    createBannerD = () => {
        const { bannerDList } = this.state
        let bannerList = bannerDList.map((item, index) => {
            return <a href={item.url} className="seat-h100"><img src={item.image} /></a>
        })
        return (
            bannerList
        )
    }

    createQuestionList = (data) => {
        const { bannerCList, bannerDList } = this.state;
        let items = data.list && data.list.map((item, index) => {
            let Time = FormatDate.formatTime(item.createDate)
            let bannerCDom = null, bannerDDom = null;
            if (bannerCList && (index % 6 === 0)) {
                const banner = bannerCList[Math.trunc(index / 6)]
                if (banner) {
                    const Time2 = FormatDate.formatTime(banner.createDate)
                    bannerCDom = (
                        <div className="item">
                            <a href={banner.link} target="_blank" className="thumb-img">
                                <img src={banner.image || defaultPhoto} onError={Utils.setDefaultPhoto} />
                            </a>
                            <h1><a href={banner.link} target="_blank">{banner.name}</a></h1>
                            <div className="alt"><span>{Time2}</span></div>
                            <a href="javascript:;" className="sponsor">赞助商提供</a>
                        </div>
                    )
                }


            }
            if (bannerDList && (index % 8 === 0) && index !== 0) {
                const banner = bannerDList[Math.trunc(index / 8) - 1]
                if (banner) {
                    bannerDDom = (
                        <a href={banner.link} target="_blank" class="seat-x100 darken scale"><img src={banner.image || defaultPhoto} onError={Utils.setDefaultPhoto} /></a>
                    )
                }
            }
            if (item.isNewRecord) {
                // return (
                //     <div className="item">
                //         <a href="javascript:;" onClick={() => this.gotoRouter(item.id)} className="thumb-img">
                //             <img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
                //         </a>
                //         <h1><a href="javascript:;" onClick={() => this.gotoRouter(item.id)}>{item.title}</a></h1>
                //         <div className="alt"><span>{Time}</span></div>
                //         {item.isNewRecord && <a href="javascript:;" className="sponsor">赞助商提供</a>}
                //     </div>
                // )
            } else {
                return (
                    [
                        bannerCDom,
                        bannerDDom,
                        <div class="item">
                            <a href="javascript:;" class="thumb-img" onClick={() => this.gotoRouter(item.id)}>
                                <img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} />
                            </a>
                            <h1><a href="javascript:;" onClick={() => this.gotoRouter(item.id)}>{item.title}</a></h1>
                            <div class="alt">
                                <span>{Time}</span>
                                {item.isTop !== "0" && <span class="icon-top"></span>}
                                {item.isRecommend !== "0" && <span class="icon-jian"></span>}
                            </div>
                            <div class="txt" dangerouslySetInnerHTML={{ __html: item.content }}></div>
                            <div class="f-bartool clearfix"><a href="javascript:;" onClick={() => this.gotoRouter(item.id)}><i class="icon-comment"></i><span>{item.commentNum}</span></a></div>
                        </div>
                    ]

                )
            }
        })
        return (
            items
        )
    }

    //主编荐书
    getRecommendBooks = () => {
        Service.GetBooks({
            isRecommend: 1
        }).then((response) => {
            if (response.data.status === 1) {
                let recommendBooks = response.data.data
                this.setState({ recommendBooks })
            }
        })
    }

    getBannerE = () => {
        Service.GetADList({
            categoryId: this.categoryIds.id,
            id: "243e981b6d30424c8f3fac513382483a"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerEList: response.data.data })
            }
        })
    }
    createBannerEList = () => {
        const { bannerEList } = this.state
        return bannerEList && bannerEList.map((item, index) => {

            return (
                <li><a href={item.url} className="darken" target="_blank"><em><img src={item.image} /></em><h1>{item.name}</h1></a></li>
            )
        })
    }

    gotoRouter = (id) => {
        this.props.history.push(`/Question/Article/${id}`)
    }
    handleTabChange = (key) => {
        const { questionList, recoList, replyList, getCurPageList } = this.state;
        console.log(key);
        switch (key) {
            case "reco":
                this.setState({ pageData: recoList, getCurPageList: this.getRecoList });
                break;
            case "reply":
                this.setState({ pageData: replyList, getCurPageList: this.getReplyList });
                break;
            default:
                this.setState({ pageData: questionList, getCurPageList: this.getQuestionList });
                break;
        }
    }

    setQuestionTxt = (e) => {
        this.setState({ questionTxt: e.target.value })
    }
    setQuestionTit = (e) => {
        this.setState({ questionTit: e.target.value })
    }
    submitQuestion = () => {
        const { questionTit, questionTxt, fileList, addCategoryId, userInfo } = this.state;
        var oMyForm = new FormData();
        oMyForm.append("userId", userInfo && userInfo.id);
        oMyForm.append("categoryId", this.categoryIds.id);
        oMyForm.append("classifying", addCategoryId);
        oMyForm.append("title", questionTit);
        oMyForm.append("content", questionTxt);
        fileList.forEach((file) => {
            oMyForm.append('homeImage', file);
        });
        Service.QuestionBuild({
            form: oMyForm
        }).then((response) => {
            /*global layer */
            global.constants.loading = false
            layer.alert(response.data.message, () => {
                window.location.reload()
            })

        })
            .catch((error) => {
                global.constants.loading = false
                console.log(error)
            })
    }
    createCategory = () => {
        const { categoryList } = this.state
        return categoryList.map((item, index) => {
            return <li onClick={() => this.setCategoryId(item)}>{item.classifying}</li>
        })
    }
    setCategoryId = (item) => {
        this.setState({ addCategoryId: item.id, addCategoryName: item.classifying })
    }
    handlePageChange = (page, pageSize) => {
        this.setState({ curPage: page })
        this.getQuestionList(page)
    }

    handleSearch = () => {
        const { searchTxt } = this.state;
        Service.GetAllArticle({
            title: searchTxt || this.props.match.params.txt,
            categoryId: this.categoryIds.id
        }).then((response) => {
            /*global layer */
            global.constants.loading = false
            this.setState({ questionList: response.data.data })

        })
            .catch((error) => {
                global.constants.loading = false
                console.log(error)
            })
    }
    handleChangeSearchTxt = (e) => {
        this.setState({ searchTxt: e.target.value })
    }
    render() {

        const { questionList, recoList, replyList, questionTit, questionTxt, fileList, addCategoryName, pageData, getCurPageList } = this.state;
        // const props = {
        //     onRemove: (file) => {
        //         this.setState((state) => {
        //             const index = state.fileList.indexOf(file);
        //             const newFileList = state.fileList.slice();
        //             newFileList.splice(index, 1);
        //             return {
        //                 fileList: newFileList,
        //             };
        //         });
        //     },
        //     beforeUpload: (file) => {
        //         this.setState(state => ({
        //             //fileList: [...state.fileList, file],
        //             fileList: [file]
        //         }));
        //         return false;
        //     },
        //     fileList,
        //     showUploadList: false
        // };
        const props = Utils.uploadProps(fileList, (file, newUrl) => {
            this.setState(state => ({
                fileList: [file]
            }), () => {
                $(".question-upload").find("input[type=file]").css({
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
        });
        return (
            <div className="question-container">
                {/* 头部 */}
                < Header />
                <div className="qj-banner">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {this.createBannerA()}
                        </div>
                    </div>
                    <div className="u-pagination wide"></div>
                    <em style={{ background: 'url(images/jingjiao/banner.jpg) center no-repeat' }}></em>
                </div>

                {/* <!--广告位--> */}
                <div className="m-seat-x4 wrapper">
                    <ul className="m-row">
                        {this.createBannerEList()}
                    </ul>
                </div>
                <div className="wrapper g-qingjiao">
                    <div className="g-left" data-fixed=".g-qingjiao">
                        <div className="fm-qj">
                            <div className="in_title">
                                <input type="text" placeholder="请在此输入请教的标题……" value={questionTit} onChange={this.setQuestionTit} />
                            </div>
                            <div className="in_txt">
                                <textarea placeholder="清晰简短的问题描述，能有效提升35%的请教成功率……" maxLength="500" value={questionTxt} onChange={this.setQuestionTxt}></textarea>
                            </div>
                        </div>
                        <div className="fm-qj-tool clearfix">
                            <Upload className="upload-btn question-upload" {...props}>
                                <a href="javascript:;" className="tl-img"><i className="icon-img"></i>{(fileList.length && fileList[0].name) || '图片'}</a>
                            </Upload>
                            {/* <a href="javascript:;" className="tl-img"><i className="icon-img"></i>图片</a> */}
                            <div className="u-select">
                                <div className="in_fenlei" role="note">{addCategoryName || "选择分类"}</div>
                                <div data-for=".in_fenlei" role="menu">
                                    <ul>
                                        {this.createCategory()}
                                        {/* <li>文案进阶</li>
                                        <li>设计审美</li>
                                        <li>写作经验</li>
                                        <li>新媒体运营</li>
                                        <li>营销思维</li>
                                        <li>案例剖析</li>
                                        <li>运营增长</li>
                                        <li>社群管理</li>
                                        <li>其他类型</li> */}
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
                                <input type="text" placeholder="搜索与我有关的提问" onChange={this.handleChangeSearchTxt} />
                                <a href="javascript:;" className="fa-search" onClick={this.handleSearch}></a>
                            </div>
                        </div>
                        {/* <!--J进度条--> */}
                        <Pager getData={getCurPageList} data={pageData} pageSize={PAGESIZE} />

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