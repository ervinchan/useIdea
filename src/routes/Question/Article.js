import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import HotRead from '../../common/hotRead/Index'
import Collect from '../../common/collect'
import Like from '../../common/like'
import Comment from '../../common/comment'
import Service from '../../service/api.js'
import Utils from '../../static/js/utils/utils.js'
//import Editor from 'rc-wang-editor'
import ed from 'wangeditor'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'
import LazyLoad from 'react-lazyload'
import 'antd/lib/pagination/style/index.css';
import '../../static/less/question.less'
//import { userInfo } from 'os';

import defaultPhoto from "../../static/images/user/default.png"
const PAGESIZE = 3;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
export default class QuestionArticle extends Component {
    editor = new ed('#qeditorContainer');
    categoryIds = global.constants.categoryIds['请教']
    aid = sessionStorage.getItem('aid');
    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            bannerAList: [],
            bannerBList: [],
            toolList: [],
            questionList: [],
            commentList: [],
            articleInfo: {},
            commentRenderLen: 2,
            replyId: '',
            hitsArticleList: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.getArticleInfo(nextProps)
        this.getHitsArticle(nextProps)
        this.getQuestionList(nextProps)
        this.getCommentList(nextProps)
    }

    componentDidMount() {
        var swiper_wheel = new Swiper('.slide-seat-315 .swiper-container', {
            loop: true,
            autoplay: true,
            pagination: {
                el: '.slide-seat-315 .u-pagination',
                bulletClass: 'bull',
                bulletActiveClass: 'active',
                clickable: true
            }
        });
        $(".jq-hidden").on("click", function (e) {
            $($(this).data("for")).toggleClass("hidden");
        });
        this.editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'image',  // 插入图片
            'undo',  // 撤销
            'redo'  // 重复
        ]
        this.editor.customConfig.onchange = this.setEditorVal
        this.editor.create()

        this.getArticleInfo()
        this.getHitsArticle()
        this.getQuestionList()
        this.getCommentList()
        this.getBannerA()
        this.getBannerB()
        this.getBannerC()
    }

    getBannerA = () => {
        Service.GetADList({
            categoryId: this.categoryIds.id,
            id: "37e7de978cc14723b8d51ec902ed0f73"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerAList: response.data.data })
            }
        })
    }
    getBannerB = () => {
        Service.GetADList({
            categoryId: this.categoryIds.id,
            id: "df2c63345f9b42beb860f9150d4002f7"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerBList: response.data.data })
            }
        })
    }
    getBannerC = () => {
        Service.GetADList({
            categoryId: this.categoryIds.id,
            id: "f5552d56238d4eb58e83d1966ebca68f"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerCList: response.data.data })
            }
        })
    }
    createBannerA = () => {
        const { bannerAList } = this.state
        return bannerAList.map((item, index) => {
            return <a href={item.url} className="seat-x315"><img src={item.image} /></a>
        })
    }
    createBannerB = () => {
        const { bannerBList } = this.state
        return bannerBList.map((item, index) => {
            return <a href={item.url} className="seat-x315"><img src={item.image} /></a>
        })
    }
    createBannerC = () => {
        const { bannerCList } = this.state
        let bannerList = bannerCList && bannerCList.map((item, index) => {
            return <a href={item.url} className="swiper-slide seat-x315"><img src={item.image} /></a>
        })
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {bannerList}

                </div>
                <div className="u-pagination wide"></div>
            </div>
        )
    }
    gotoRouter = (router) => {
        this.props.history.push(router)
    }
    getArticleInfo = (nextProps) => {
        Service.GetAllArticle({
            id: nextProps ? nextProps.match.params.aid : this.props.match.params.aid,
            categoryId: this.categoryIds.id
        }).then((response) => {
            if (response.data.status === 1) {
                let articleInfo = response.data.data
                this.setState({ articleInfo })
            }
        })
    }

    getCommentList = (nextProps) => {

        // Service.GetCommentList({
        //     contentId: this.props.match.params.aid,
        //     categoryId: this.categoryIds.id
        // })
        Service.GetArticleComment({
            id: nextProps ? nextProps.match.params.aid : this.props.match.params.aid
        }).then((response) => {
            if (response.data.status === 1) {
                let commentList = response.data.data
                this.setState({ commentList })
            }
        })
    }

    getQuestionList = (nextProps) => {
        Service.GetQuestion({
            categoryId: this.categoryIds.id,
            isRecommend: 0,
            CommentNum: 0
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

    createQuestionList = (data) => {
        const { questionList } = this.state;
        return questionList.list && questionList.list.slice(0, 5).map((item, index) => {
            return (
                <li onClick={() => this.gotoRouter(`/Question/Article/${item.id}`)}>
                    <a href="javascript:;">{item.title}</a><span>{item.commentNum}个回答</span>
                </li>
            )
        })
    }
    handleArticleLike = (item) => {
        Service.HandleArticleLike({
            userId: userInfo && userInfo.id,
            myUseId: userInfo && userInfo.id,
            id: item.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.likeNum++
                this.setState({})
            } else if (response.data.status === 3) {
                item.likeNum--
                this.setState({})
            }
            /* global layer */
            layer.msg(response.data.message)
        })
            .catch((error) => {
                console.log(error)
            })
    }
    // createCommentList = (data) => {
    //     const { commentList } = this.state;
    //     return commentList.list && commentList.list.map((item, index) => {
    //         let Hours = FormatDate.apartHours(item.createDate)
    //         let Time = Hours > 24 ? FormatDate.customFormat(item.createDate, 'yyyy/MM/dd') : `${Hours + 1}小时前`
    //         return (
    //             <div className="fu_detail hidden" id="item11">
    //                 <div className="fu_info">
    //                     <a href="javascript:;" className="face">
    //                         <img src={item.user.photo  || defaultPhoto} />
    //                     </a>
    //                     <div className="alt clearfix">
    //                         <a href="javascript:;" className="j_name">{item.name}</a>
    //                         <span className="dot"></span>
    //                         <span>{Time}</span>
    //                     </div>
    //                     <div className="txt">{item.authorDript || '此家伙很懒...'}</div>
    //                 </div>
    //                 <div className="fu_txt clearfix" dangerouslySetInnerHTML={{ __html: item.content }}>

    //                 </div>
    //                 <a href="javascript:;" className="jq-hidden" data-for="#item11"> <i className="fa-angle-up"></i></a>
    //                 <div className="f-bartool clearfix">
    //                     {/* <a href="javascript:;" onClick={() => this.handleCollect(item)}><i className="icon-heart"></i><span>{item.collectNum}</span></a> */}
    //                     <a href="javascript:;" onClick={() => this.handleLike(item)}><i className="icon-thumbs"></i><span>{item.likeNum}</span></a>
    //                     <a href="javascript:;" onClick={() => this.handleComment(item)}><i className="icon-comment"></i><span>{item.commentNum}</span></a>
    //                     {/* <a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a>
    //                     <a href="javascript:;"><i className="icon-comment"></i><span>51</span></a> */}
    //                     <a href="javascript:;"><i className="icon-link"></i><span>链接</span></a>
    //                     <a href="javascript:;" className="tousu" onClick={() => this.handleComplaints(item)}>投诉内容</a>
    //                 </div>
    //             </div>
    //         )
    //     })
    // }
    createCommentList = (data) => {

        return data.list && data.list.map((item, index) => {
            let Time = FormatDate.formatTime(item.createDate)
            return (
                <div className="fu_detail hidden" id="item11">
                    <div className="fu_info">
                        <a href="javascript:;" className="face">
                            <img src={item.userPhoto || defaultPhoto} onError={Utils.setDefaultPhoto} />
                        </a>
                        <div className="alt clearfix">
                            <a href="javascript:;" className="j_name">{item.name}</a>
                            <span className="dot"></span>
                            <span>{Time}</span>
                        </div>
                        <div className="txt">{item.authorDript || '此家伙很懒...'}</div>
                    </div>
                    <div className="fu_txt clearfix" dangerouslySetInnerHTML={{ __html: item.content }}>

                    </div>
                    {/* <a href="javascript:;" className="jq-hidden" data-for="#item11"> <i className="fa-angle-up"></i></a> */}
                    <div className="f-bartool clearfix">
                        <a href="javascript:;" onClick={() => this.handleArticleLike(item)}><i className="icon-heart"></i><span>{item.likeNum}</span></a>

                        <a href="javascript:;" /*onClick={() => this.handleReply(item)}*/><i className="icon-comment"></i><span>{item.commentNum}</span></a>

                        <a href="javascript:;"><i className="icon-link"></i><span>链接</span></a>
                        {/* <a href="javascript:;" className="tousu" onClick={() => this.handleComplaints(item)}>投诉内容</a> */}
                    </div>
                    {
                        item.childComments &&
                        <div className="disc-sub">
                            {this.createCommentList(item.childComments)}
                        </div>
                    }
                    <div className="replyfrom" style={{ display: (item.id === this.state.replyId ? "" : "none") }}><textarea placeholder="我来补充两句。"></textarea><a href="javascript:;" className="thumb"><img src={(userInfo && userInfo.photo) || defaultPhoto} onError={Utils.setDefaultPhoto} /></a><a href="javascript:;" className="artbtn" onClick={() => this.submitComment(item.id)}>留 言</a><a href="javascript:;" className="escbtn" data-el="replyesc">稍后再说</a></div>
                </div>
                // <div className="disc-item">
                //     <a href="javascript:;" className="thumb"><img src={item.user.photo  || defaultPhoto} /></a>
                //     <div className="alt">
                //         <a href="javascript:;" className="j_name" onClick={() => this.gotoRouter(`/UserNews${item.user.id}`)}>{item.name}</a><span className="dot"></span><span>{Time}</span>
                //     </div>
                //     <div className="txt">
                //         {item.content}
                //     </div>
                //     <div className="bar">
                //         <a href="javascript:;">投诉</a><a href="javascript:;" onClick={() => this.handleReply(item)}>回复</a><a href="javascript:;" className="thumbs" onClick={() => this.handleLike(item)}><i className="icon-thumbs-up"></i>{item.commentNum}</a>
                //     </div>
                //     {
                //         item.childComments &&
                //         <div className="disc-sub">
                //             {this.createCommentList(item.childComments)}
                //         </div>
                //     }
                //     <div className="replyfrom" style={{ display: (item.id === this.state.replyId ? "" : "none") }}><textarea placeholder="我来补充两句。"></textarea><a href="javascript:;" className="thumb"><img src={userInfo.photo  || defaultPhoto} /></a><a href="javascript:;" className="artbtn" onClick={() => this.submitComment(item.id)}>留 言</a><a href="javascript:;" className="escbtn" data-el="replyesc">稍后再说</a></div>
                // </div>
            )
        })
    }

    //投诉
    handleComplaints = (item) => {
        Service.Complaints({
            id: item.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {

            }
            /* global layer */
            layer.msg(response.data.message)
        })
    }

    //评论
    // handleComment = (item) => {
    //     POST({
    //         url: "/a/cms/article/complaints?",
    //         opts: {
    //             id: item.id
    //         }
    //     }).then((response) => {
    //         global.constants.loading = false
    //         if (response.data.status === 1) {

    //         }
    //         /* global layer */
    //         layer.msg(response.data.message)
    //     })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }
    handleReply = (item) => {
        this.setState({ replyId: item.id })
    }
    //热门排行
    // getSpecialCol = () => {

    //     Service.GetNav({
    //         subscriber: 0
    //     }).then((response) => {
    //         if (response.data.status === 1) {
    //             let specialCol = response.data.data
    //             this.setState({ specialCol })
    //         }
    //     })
    // }

    // createSpecialCol = () => {
    //     const { specialCol } = this.state
    //     return specialCol && specialCol.map((item, index) => {
    //         if (index === 0 || index === 1) {
    //             return (
    //                 <li onClick={() => this.gotoRouter(item.href)}>
    //                     <a href="javascript:;" className="thumb-img">
    //                         <span>{index + 1}</span>
    //                         <img src={item.image} />
    //                     </a>
    //                     <h1><a href="javascript:;">{item.name}</a></h1>
    //                     <h3>{item.user && item.user.name}</h3>
    //                 </li>
    //             )
    //         } else {
    //             return (
    //                 <li>
    //                     <a href="#" className="thumb-img">
    //                         <span>{index + 1}</span>
    //                         <img src={item.image} />
    //                     </a>
    //                     <h1><a href="#">{item.name}</a></h1>
    //                     <h3>{item.user && item.user.name}</h3>
    //                     <div className="alt">
    //                         {
    //                             item.user &&
    //                             <img src="css/images/1x1.png" />
    //                         }
    //                         <span className="dot"></span>
    //                         <span>{item.subscriber}人订阅</span>
    //                     </div>
    //                 </li>
    //             )
    //         }
    //     })
    // }

    getHitsArticle = () => {
        Service.GetAllArticle({
            hits: 1
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
    createHitsArticle = () => {
        const { hitsArticleList } = this.state;
        return hitsArticleList && hitsArticleList.slice(0, 10).map((item, index) => {

            return (
                <li key={index} onClick={() => this.gotoRouter(`/Inspiration/Article/${item.id}`)}>
                    <a href="javascript:;" className="thumb-img">
                        <span>{index + 1}</span>
                        <LazyLoad><img src={item.image} /></LazyLoad>
                    </a>
                    <h1><a href="javascript:;">{item.title}</a></h1>
                    <h3>{item.user.name}</h3>
                </li>
            )
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

    handleLike = (item) => {
        Service.AddLike({
            id: item.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.likeNum++
                this.setState({})
            }
            /* global layer */
            layer.msg(response.data.message)
        })
    }
    handleCollect = (item) => {
        Service.AddCollect({
            userId: 1,
            articleId: item.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.collectNum++
                this.setState({})
            }

            /* global layer */
            layer.msg(response.data.message)
        })
    }

    handlePageChange = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ curPage: page })
        this.getBooksList(this.props.match.params.tid, this.state.sortType, page)
    }

    submitComment = (pid) => {
        const { articleInfo } = this.state;
        // Service.SubmitComment({
        //     title: articleInfo.title,
        //     categoryId: this.categoryIds.id,
        //     contentId: this.props.match.params.aid,
        //     replyId: '',
        //     name: userInfo && userInfo.name,
        //     isValidate: "0",
        //     content: this.state.EditorVal,
        //     userId: userInfo && userInfo.id
        // })
        Service.SubmitComment({
            title: articleInfo.title,
            categoryId: articleInfo.category.id,
            contentId: this.props.match.params.aid,
            replyId: pid || '',
            name: userInfo && userInfo.name,
            isValidate: "0",
            content: this.state.EditorVal,
            userId: userInfo && userInfo.id,
            userPhoto: userInfo && userInfo.photo
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {

            }

            /* global layer */
            layer.msg(response.data.message)
        })
            .catch((error) => {
                console.log(error)
            })
    }

    showAllComment = () => {
        this.setState({ commentRenderLen: this.state.commentList.length })
    }

    setEditorVal = (val) => {
        this.setState({ EditorVal: val })
    }

    render() {
        const { toolList, articleInfo, commentList, commentRenderLen } = this.state;
        let Time = articleInfo ? FormatDate.formatTime(articleInfo.createDate) : null;
        let commentRenderList = commentList.list && commentList.list.slice(0, commentRenderLen)
        return (
            <div className="">
                {/* 头部 */}
                < Header />
                <div className="wrapper g-qingjiao2">
                    <div className="g-left">
                        <div className="qj-article">
                            <h1>{articleInfo.title}</h1>
                            <div className="alt clearfix">
                                <a href="javascript:;" className="j_name"><img src={articleInfo.user && (articleInfo.user.photo || defaultPhoto)} className="thumb-img" />{articleInfo.user && articleInfo.user.name}</a>
                                <span>▪</span>
                                <span>{Time}</span>
                                {articleInfo.classifying && articleInfo.classifying.classifying && <a href="javascript:;" className="tag">{articleInfo.classifying.classifying}</a>}
                            </div>
                            <div className="txt clearfix">
                                {articleInfo.image && <img src={articleInfo.image} className="thumb-img" />}
                                <div className="box">
                                    <div dangerouslySetInnerHTML={{ __html: articleInfo.articleData && articleInfo.articleData.content }} />
                                    {articleInfo.articleData && articleInfo.articleData.content && articleInfo.articleData.content.lenght > 100 && <a href="javascript:;">显示全部 <i className="fa-angle-down"></i></a>}
                                </div>
                            </div>
                            <div className="f-bartool clearfix">
                                <Collect item={articleInfo} />
                                <Like item={articleInfo} />
                                <Comment item={articleInfo} />
                                {/* <a href="javascript:;" onClick={() => this.handleCollect(articleInfo)}><i className="icon-heart"></i><span>{articleInfo.collectNum}</span></a>
                                <a href="javascript:;" onClick={() => this.handleLike(articleInfo)}><i className="icon-thumbs"></i><span>{articleInfo.likeNum}</span></a>
                                <a href="javascript:;"><i className="icon-comment"></i><span>{articleInfo.commentNum}</span></a> */}
                            </div>

                        </div>

                        <div className="u-editor">
                            <div id="qeditorContainer" ref="editorElem" />
                            {/* <Editor customConfig={{
                                // "uploadImgShowBase64": true,
                                "height": 325,
                                "menus": [
                                    'head',  // 标题
                                    'bold',  // 粗体
                                    'fontSize',  // 字号
                                    'fontName',  // 字体
                                    'italic',  // 斜体
                                    'underline',  // 下划线
                                    'strikeThrough',  // 删除线
                                    'foreColor',  // 文字颜色
                                    'backColor',  // 背景颜色
                                    'link',  // 插入链接
                                    'list',  // 列表
                                    'justify',  // 对齐方式
                                    'quote',  // 引用
                                    'image',  // 插入图片
                                    'undo',  // 撤销
                                    'redo'  // 重复
                                ]
                            }} onChange={this.setEditorVal} style={{ height: 325 }} /> */}
                        </div>
                        <div className="qj-submit">
                            <a href="javascript:;" onClick={() => this.submitComment()}>提 交</a>
                        </div>
                        <div className="u-forum">
                            <div className="u-title3">
                                <b>{commentList.list && commentList.list.length || 0}条热心回答</b>
                                {/* <div className="u-select">
                                    <div className="in_sort" role="note">热度排行</div>
                                    <div data-for=".in_sort" role="menu">
                                        <ul>
                                            <li>时间排序</li>
                                            <li>热度排序</li>
                                        </ul>
                                    </div>
                                </div> */}
                            </div>
                            {this.createCommentList(commentList)}
                            {/* <div className="fu_detail">
                                <div className="fu_info">
                                    <a href="#" className="face">
                                        <img src="css/images/1x1.png" />
                                    </a>
                                    <div className="alt clearfix">
                                        <a href="#" className="j_name">AcadeCityLv6</a>
                                        <span className="dot"></span>
                                        <span>今天 09:32</span>
                                    </div>
                                    <div className="txt">无业文氓。要想活到99，每天吸猫一大口</div>
                                </div>
                                <div className="fu_txt clearfix">
                                    <p>可以理解但是，作为经济学爱好者，我对瓜子二手车平台传递的观念实在不能忍。 瓜子二手车的广告语是这样：车主多卖钱.</p>
                                    <p><br /></p>
                                    <p>买家少花钱，没有中间商赚差价。言下之意，中间商之存在会让买卖双方吃亏。没有中间商赚差价，买卖方都获益。真相是这样吗？当然是胡扯。这种“讲道理的广告”是反经济学的。什么是中间商呢？小贩、中介、经纪、拉皮条的、二道贩子。在许多人的眼中，商品流经他们手里，就要加些价格，卖主少卖，买家多花钱，中间商赚的是盘剥过路的钱。谴责中间商的声音一直都有。中间商损害买卖双方的利益，增加交易成本吗？事实恰恰相反，中间商促进买卖关系，维持交易稳定，减少交易成本的必要环节.</p>
                                    <p><br /></p>
                                    <p>没有小商小贩，生产者把商品直接卖给消费者，成本会变得奇高。他们无法经营庞大的销售网络，找不到大量的买家，生产规模也就无法扩大，甚至无法进行。中间商帮他们做到这一点。中间商赚的价差再大，也远远小于他们减少销售成本所创造的价值。</p>
                                    <p><br /></p>
                                    <p>没有小商小贩，生产者把商品直接卖给消费者，成本会变得奇高。他们无法经营庞大的销售网络，找不到大量的买家，生产规模也就无法扩大，甚至无法进行。中间商帮他们做到这一点。中间商赚的价差再大，也远远小于他们减少销售成本所创造的价值。</p>
                                </div>
                                <div className="f-bartool clearfix">
                                    <a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a>
                                    <a href="javascript:;"><i className="icon-comment"></i><span>51</span></a>
                                    <a href="javascript:;"><i className="icon-link"></i><span>链接</span></a>
                                    <a href="javascript:;" className="tousu">投诉内容</a>
                                </div>
                            </div>
                            <div className="fu_detail hidden" id="item11">
                                <div className="fu_info">
                                    <a href="#" className="face">
                                        <img src="css/images/1x1.png" />
                                    </a>
                                    <div className="alt clearfix">
                                        <a href="#" className="j_name">AcadeCityLv6</a>
                                        <span className="dot"></span>
                                        <span>今天 09:32</span>
                                    </div>
                                    <div className="txt">无业文氓。要想活到99，每天吸猫一大口</div>
                                </div>
                                <div className="fu_txt clearfix">
                                    <p>可以理解但是，作为经济学爱好者，我对瓜子二手车平台传递的观念实在不能忍。</p>
                                    <p>瓜子二手车的广告语是这样：车主多卖钱.</p>
                                    <p>买家少花钱，没有中间商赚差价。言下之意，中间商之存在会让买卖双方吃亏。没有中间商赚差价，买卖方都获益。真相是这样吗？当然是胡扯。这种“讲道理的广告”是反经济学的。什么是中间商呢？小贩、中介、经纪、拉皮条的、二道贩子。在许多人的眼中，商品流经他们手里，就要加些价格，卖主少卖，买家多花钱，中间商赚的是盘剥过路的钱。谴责中间商的声音一直都有。中间商损害买卖双方的利益，增加交易成本吗？事实恰恰相反，中间商促进买卖关系，维持交易稳定，减少交易成本的必要环节.</p>
                                    <p><img src="images/15.jpg" /><br /><img src="images/16.jpg" /><br /><img src="images/1.jpg" /><br /></p>
                                    <p>没有小商小贩，生产者把商品直接卖给消费者，成本会变得奇高。他们无法经营庞大的销售网络，找不到大量的买家，生产规模也就无法扩大，甚至无法进行。中间商帮他们做到这一点。中间商赚的价差再大，也远远小于他们减少销售成本所创造的价值。</p>
                                    <p>可以理解但是，作为经济学爱好者，我对瓜子二手车平台传递的观念实在不能忍。</p>
                                    <p>瓜子二手车的广告语是这样：车主多卖钱.</p>
                                    <p>买家少花钱，没有中间商赚差价。言下之意，中间商之存在会让买卖双方吃亏。没有中间商赚差价，买卖方都获益。真相是这样吗？当然是胡扯。这种“讲道理的广告”是反经济学的。什么是中间商呢？小贩、中介、经纪、拉皮条的、二道贩子。在许多人的眼中，商品流经他们手里，就要加些价格，卖主少卖，买家多花钱，中间商赚的是盘剥过路的钱。谴责中间商的声音一直都有。中间商损害买卖双方的利益，增加交易成本吗？事实恰恰相反，中间商促进买卖关系，维持交易稳定，减少交易成本的必要环节.</p>
                                    <p><img src="images/15.jpg" /><br /><img src="images/16.jpg" /><br /><img src="images/1.jpg" /><br /></p>
                                    <p>没有小商小贩，生产者把商品直接卖给消费者，成本会变得奇高。他们无法经营庞大的销售网络，找不到大量的买家，生产规模也就无法扩大，甚至无法进行。中间商帮他们做到这一点。中间商赚的价差再大，也远远小于他们减少销售成本所创造的价值。</p>

                                </div>
                                <a href="javascript:;" className="jq-hidden" data-for="#item11"> <i className="fa-angle-up"></i></a>
                                <div className="f-bartool clearfix">
                                    <a href="javascript:;"><i className="icon-thumbs"></i><span>36</span></a>
                                    <a href="javascript:;"><i className="icon-comment"></i><span>51</span></a>
                                    <a href="javascript:;"><i className="icon-link"></i><span>链接</span></a>
                                    <a href="javascript:;" className="tousu">投诉内容</a>
                                </div>
                            </div> */}

                        </div>
                        <a href="javascript:;" className="more-a" onClick={() => this.showAllComment()}>查看剩余答案</a>

                    </div>
                    <div className="g-right">
                        {this.createBannerA()}
                        {this.createBannerB()}
                        <div className="u-title4">
                            <b>相关问题</b>
                        </div>
                        <div className="qj-corre">
                            <ul>
                                {this.createQuestionList()}
                                {/* <li>
                                    <a href="#">你看过的广告作品中，最有用户身份洞察的有哪些？</a><span>12个回答</span>
                                </li>
                                <li>
                                    <a href="#">广告人怎么看待叶茂中做的世界杯广告？</a><span>34个回答</span>
                                </li> */}
                            </ul>
                        </div>
                        <div className="slide-seat-315">
                            {this.createBannerC()}
                            {/* <div className="swiper-container">
                                <div className="swiper-wrapper">
                                    <a href="javascript:;" className="swiper-slide seat-x315"><img src="images/d5.jpg" /></a>
                                    <a href="javascript:;" className="swiper-slide seat-x315"><img src="css/images/315x190.png" /></a>
                                    <a href="javascript:;" className="swiper-slide seat-x315"><img src="css/images/315x190.png" /></a>
                                    <a href="javascript:;" className="swiper-slide seat-x315"><img src="css/images/315x190.png" /></a>
                                </div>
                                <div className="u-pagination wide"></div>
                            </div> */}
                        </div>
                        {/* <div className="u-title4">
                            <b>热门排行</b>
                        </div>
                        <ul className="hot-article suite active">
                            {this.createSpecialCol()}
                        </ul> */}
                        <div className="u-title4">
                            <b>热文排行</b>
                        </div>
                        <ul className="hot-article suite active">
                            {/* {this.createSpecialCol()} */}
                            {this.createHitsArticle()}
                        </ul>
                    </div>
                </div>
                <HotRead />
                {/* 底部 */}
                <Footer />
            </div>
        );
    }
}

