import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'
import Service from '../../service/api.js'
import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import HotRead from '../../common/hotRead/Index'
import '../../Constants'
import Loading from '../../common/Loading/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/article.less';
import defaultPhoto from "../../static/images/user/default.png"
const PAGESIZE = 3;
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
export default class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            articleInfo: {},
            articleContent: {},
            articleComment: {},
            collectUserList: [],
            isFans: 0,
            replyContent: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        let aid = nextProps.match.params.aid
        var script = document.createElement('script');
        script.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5);
        document.body.appendChild(script);
        this.getArticleInfo(aid)
        this.getArticleContent(aid)
        this.getCollectUsers(aid)
    }

    componentWillMount() {

    }
    componentDidMount() {
        let that = this
        let aid = this.props.match.params.aid
        var script = document.createElement('script');
        script.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5);
        document.body.appendChild(script);
        this.getArticleInfo(aid)
        this.getArticleContent(aid)
        this.getCollectUsers(aid)
        // $(".copy").on("click", function () {
        //     var inputText = document.getElementById('inputText');
        //     var currentFocus = document.activeElement;
        //     inputText.focus();
        //     inputText.setSelectionRange(0, inputText.value.length);
        //     document.execCommand('copy', true);
        //     currentFocus.focus();
        // })

    }

    getArticleInfo = (aid) => {
        Service.GetAllArticle({
            id: aid
        }).then((response) => {
            let articleInfo = response.data.data
            this.getArticleComment(aid, articleInfo.category.id)
            this.setState({ articleInfo })
        })
            .catch((error) => {
                console.log(error)
            })
    }

    getArticleContent = (aid) => {
        Service.GetArticleContent({
            id: aid
        }).then((response) => {
            let articleContent = response.data.data
            this.setState({ articleContent })
        })
            .catch((error) => {
                console.log(error)
            })
    }

    getArticleComment = (aid, cid) => {
        Service.GetArticleComment({
            id: aid
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                let articleComment = response.data.data
                this.setState({ articleComment })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    getCollectUsers = (aid) => {
        Service.GetCollectUsers({
            articleId: aid
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                let collectUserList = response.data.data
                this.setState({ collectUserList })
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    createCollectUsers = () => {
        const { collectUserList } = this.state
        let users = collectUserList && collectUserList.map((item, index) => {
            return <a href="javascript:;" onClick={() => this.gotoRouter(`/UserNews/${item.id}`)}><img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} /></a>

        })
        return (
            <div className="user-art">
                {users}
                {
                    users.length >= 10 &&
                    <a href="javascript:;"><i className="icon-more-3"></i></a>
                }
            </div>
        )
    }

    handleNextPage = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ curPage: page })
        this.getBooksList(this.props.match.params.tid, this.state.sortType, page)
    }

    handlePerPage = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ curPage: page })
        this.getBooksList(this.props.match.params.tid, this.state.sortType, page)
    }

    handleLike = (item) => {
        Service.AddLike({
            userId: userInfo && userInfo.id,
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
    handleCollect = (item) => {
        Service.AddCollect({
            userId: userInfo && userInfo.id,
            articleId: item.id
        }).then((response) => {
            global.constants.loading = false
            if (response.data.status === 1) {
                item.collectNum++
                this.setState({})
            } else if (response.data.status === 3) {
                item.collectNum--
                this.setState({})
            }

            /* global layer */
            layer.msg(response.data.message)
        })
            .catch((error) => {
                console.log(error)
            })
    }

    createCommentList = (data) => {
        const { replyContent } = this.state;
        return data.list && data.list.map((item, index) => {
            let Time = FormatDate.formatTime(item.createDate);
            return (
                <div className="disc-item">
                    <a href="javascript:;" className="thumb"><img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} /></a>
                    <div className="alt">
                        <a href="javascript:;" className="j_name" onClick={() => this.gotoRouter(`/UserNews${item.user.id}`)}>{item.user.name}</a><span className="dot"></span><span>{Time}</span>
                    </div>
                    <div className="txt">
                        {item.content}
                    </div>
                    <div className="bar">
                        <a href="javascript:;">投诉</a><a href="javascript:;" onClick={() => this.handleReply(item)}>回复</a><a href="javascript:;" className="thumbs" onClick={() => this.handleLike(item)}><i className="icon-thumbs-up"></i>{item.commentNum}</a>
                    </div>
                    <div class="replyfrom" style={{ display: (item.id === this.state.replyId ? "" : "none") }}><textarea value={replyContent} placeholder="我来补充两句。" onChange={this.handleChangeReply} /><a href="javascript:;" class="thumb"><img src={(userInfo && userInfo.photo) || defaultPhoto} onError={Utils.setDefaultPhoto} /></a><a href="javascript:;" class="artbtn" onClick={() => this.submitComment(item.id, replyContent)}>留 言</a><a href="javascript:;" class="escbtn" onClick={this.cancleReply}>稍后再说</a></div>
                    {
                        item.childComments &&
                        <div className="disc-sub">
                            {this.createChildCommentList(item.childComments)}
                        </div>
                    }

                </div>
            )
        })
    }

    createChildCommentList = (data) => {
        const { replyContent } = this.state;
        return data && data.map((item, index) => {
            let Time = FormatDate.formatTime(item.createDate)
            return (
                <div className="disc-item">
                    <a href="javascript:;" className="thumb"><img src={item.user.photo || defaultPhoto} onError={Utils.setDefaultPhoto} /></a>
                    <div className="alt">
                        <a href="javascript:;" className="j_name" onClick={() => this.gotoRouter(`/UserNews${item.user.id}`)}>{item.user.name}</a><span className="dot"></span><span>{Time}</span>
                    </div>
                    <div className="txt">
                        {item.content}
                    </div>
                    <div className="bar">
                        <a href="javascript:;">投诉</a><a href="javascript:;" onClick={() => this.handleReply(item)}>回复</a><a href="javascript:;" className="thumbs" onClick={() => this.handleLike(item)}><i className="icon-thumbs-up"></i>{item.commentNum}</a>
                    </div>
                    <div class="replyfrom" style={{ display: (item.id === this.state.replyId ? "" : "none") }}><textarea value={replyContent} placeholder="我来补充两句。" onChange={this.handleChangeReply} /><a href="javascript:;" class="thumb"><img src={(userInfo && userInfo.photo) || defaultPhoto} onError={Utils.setDefaultPhoto} /></a><a href="javascript:;" class="artbtn" onClick={() => this.submitComment(item.id, replyContent)}>留 言</a><a href="javascript:;" class="escbtn" onClick={this.cancleReply}>稍后再说</a></div>
                    {
                        item.childComments &&
                        <div className="disc-sub">
                            {this.createChildCommentList(item.childComments)}
                        </div>
                    }

                </div>
            )
        })
    }
    cancleReply = () => {
        this.setState({ replyId: '', replyContent: '', commentTxt: '' });
    }

    handleReply = (item) => {
        this.setState({ replyId: item.id })
    }
    handleChangeReply = (e) => {
        this.setState({ replyContent: e.target.value })
    }

    gotoRouter = (router) => {
        this.props.history.push(router)
    }

    handleAddFans = () => {
        const { articleInfo } = this.state;
        Service.AddAttention({
            attention2UserId: articleInfo.user.id,
            userId: userInfo && userInfo.id
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

    handleChangeCommentTxt = (e) => {
        this.setState({ commentTxt: e.target.value })
    }

    submitComment = (pid, content) => {
        const { articleInfo, commentTxt } = this.state;
        if (userInfo && userInfo.id) {
            Service.SubmitComment({
                title: articleInfo.title,
                categoryId: articleInfo.category.id,
                contentId: this.props.match.params.aid,
                replyId: pid || '',
                name: userInfo && userInfo.name,
                isValidate: "0",
                content: content,
                userId: userInfo && userInfo.id
            }).then((response) => {
                global.constants.loading = false
                if (response.data.status === 1) {
                    this.cancleReply();
                    this.getArticleComment(this.props.match.params.aid, articleInfo.category.id)
                }

                /* global layer */
                layer.msg(response.data.message)
            })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            layer.alert('请先登录')
        }

    }

    render() {
        const { articleInfo, articleContent, articleComment, isFans, commentTxt } = this.state;

        let Time = FormatDate.formatTime(articleInfo.updateDate)
        return (
            <div className="">
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}

                <div className="art-thumb">
                    <img src={articleInfo.image} />
                </div>
                <div className="wrapper art-wrapper">
                    <div className="art-head">
                        <div className="meta clearfix"><a href="javascript:;">{articleInfo.user && articleInfo.user.name}</a><span className="dot"></span><span>{Time}</span></div>
                        <h1>{articleInfo.title}</h1>
                        <div className="drift">
                            <a href="javascript:;" className="icon-home"></a>
                            <p>
                                <a href="javascript:;" data-el="weixin" onClick={() => this.handleCollect(articleInfo)}>订 阅</a>
                                <a href="javascript:;" onClick={() => this.gotoRouter(`/ArticleEditor`)}>发布创作</a>
                            </p>
                        </div>
                    </div>
                    <div className="art-body">
                        <div className="art-tools">
                            <a href="javascript:;"><i className="icon-buy-art"></i></a>
                            <a href="javascript:;" data-el="weixin"><i className="icon-circle-art"></i></a>
                            <a href="javascript:;"><i className="icon-weibo-art"></i></a>
                            <a href="javascript:;"><i className="icon-zhifu-art"></i></a>
                        </div>
                        {/* <div className="art-link">
                            <a href="javascript:;" onClick={this.handleNextPage}><span><i className="icon-next-art"></i></span>下一篇</a><br />
                            <a href="javascript:;" onClick={this.handlePerPage}><span><i className="icon-prev-art"></i></span>上一篇</a>
                        </div> */}
                        <div className="art-detail" dangerouslySetInnerHTML={{ __html: articleContent.content }}>

                        </div>
                    </div>
                    <div className="share-bottom clearfix">
                        <div className="copyright">版权声明：本文版权、观点和立场归投稿作者所有。未经作者授权，不得以任何形式进行刊登、摘录或转载。</div>
                        <a href="javascript:;" className="thumbs-up" onClick={() => this.handleLike(articleInfo)}><i className="icon-thumbs-up"></i> 点赞{articleInfo.likeNum}人</a>
                        <div className="sharebox clearfix">
                            <span>好文分享：</span>
                            {/* <a href="javascript:;" title="分享到新浪微博"><i className="icon-weibo-art"></i></a>
                            <a href="javascript:;" title="分享到微信"><i className="icon-circle-art"></i></a>
                            <a href="javascript:;" title="分享到复制网址"><i className="icon-copy-art"></i></a> */}
                            <div className="bdsharebuttonbox" data-tag="share_1">
                                <a className="share-item tsina" data-cmd="tsina"><a className="a-item icon-weibo-art" data-cmd="tsina"></a></a>
                                <a className="share-item weixin" title="分享到微信"><a className="a-item icon-circle-art" data-cmd="weixin"></a></a>
                                <a className="share-item copy"><a className="a-item icon-copy-art" data-cmd="mshare"></a></a>
                            </div>
                        </div>
                    </div>

                    <div className="art-collect">
                        <a href="javascript:;" onClick={() => this.handleCollect(articleInfo)}><i className="icon-collect-art"></i></a>
                        <p>{articleInfo.collectNum}人收藏了文章</p>
                        {this.createCollectUsers()}
                        {/* <div className="user-art">
                            <a href="javascript:;"><img src="images/article/t1.jpg" /></a>
                            <a href="javascript:;"><img src="images/article/t1.jpg" /></a>
                            <a href="javascript:;"><img src="images/article/t1.jpg" /></a>
                            <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            <a href="javascript:;"><i className="icon-more-3"></i></a>
                        </div> */}
                    </div>
                    <a href="javascript:;" className="seat-x100 darken seat-art">
                        <img src="images/article/d1.jpg" />
                    </a>
                    <div className="art-discuss">
                        <h1>刚收到 {articleComment.count ? articleComment.count : 0} 条评论留言</h1>
                        <div className="artfrom">
                            <textarea value={commentTxt} placeholder="万难尽如人意，或有些许共鸣可取……" onChange={this.handleChangeCommentTxt}></textarea>
                            <a href="javascript:;" className="thumb">
                                <img src={(userInfo && userInfo.photo) || defaultPhoto} onError={Utils.setDefaultPhoto} />
                            </a>
                            <a href="javascript:;" className="artbtn" onClick={() => this.submitComment("", commentTxt)}>留 言</a>
                        </div>
                        <div className="author">
                            <h1>本文作者</h1>
                            <div className="box">
                                <a href="javascript:;" className="thumb" onClick={() => this.gotoRouter(`/UserNews/${articleInfo.user && articleInfo.user.id}`)}>
                                    <img src={articleInfo.user && articleInfo.user.photo || defaultPhoto} />
                                </a>
                                <h2>{articleInfo.user && articleInfo.user.name}</h2>
                                <div className="bar">
                                    <a href="javascript:;" className="icon-weixin-in"></a>
                                    <a href="javascript:;" className="icon-weibo-in"></a>
                                    <a href="javascript:;" className="icon-zhihu-in"></a>
                                    <a href="javascript:;" className="icon-dou-in"></a>
                                </div>
                                <div className="lk">
                                    {
                                        !isFans &&
                                        <a href="javascript:;" onClick={() => this.handleAddFans(userInfo && userInfo.id)}>关 注</a>
                                    }
                                    {/* {
                                        isFans && <a href="javascript:;" onClick={() => this.handleSubFans(JSON.parse(sessionStorage.getItem("userInfo")) && JSON.parse(sessionStorage.getItem("userInfo")).id)}>取消关注</a>
                                    } */}
                                    <a href="javascript:;" onClick={() => this.gotoRouter(`/UserNews/${articleInfo.user.id}`)}>主 页</a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="art-discuss-list">
                        {this.createCommentList(articleComment)}
                        {/* <div className="disc-item">
                            <a href="javascript:;" className="thumb"><img src="images/article/t1.jpg" /></a>
                            <div className="alt">
                                <a href="#" className="j_name">步履不停</a><span className="dot"></span><span>2018-06-19</span>
                            </div>
                            <div className="txt">
                                从文字链接到表情包的段落太多了，每次到这里就会卡一下，次数多了的话。有种强行配图的感觉。从文字链接到表情包的段落太多了，每次到这里就会卡一下，次数多了的话。
                            </div>
                            <div className="bar">
                                <a href="#">投诉</a><a href="javascript:;" data-el="reply">回复</a><a href="#" className="thumbs"><i className="icon-thumbs-up"></i>34</a>
                            </div>
                            <div className="disc-sub">
                                <div className="disc-item">
                                    <a href="javascript:;" className="thumb"><img src="images/article/t1.jpg" /></a>
                                    <div className="alt">
                                        <a href="#" className="j_name">管宝程</a><span className="dot"></span><span>2018-06-19</span>
                                    </div>
                                    <div className="txt">
                                        从文字链接到表情包的段落太多了，每次到这里就会卡一下，次数多了的话。有种强行配图的感觉。从文字链接到表情包的段落太多了，每次到这里就会卡一下，次数多了的话。
                                    </div>
                                    <div className="bar">
                                        <a href="#">投诉</a><a href="javascript:;" data-el="reply">回复</a><a href="#" className="thumbs"><i className="icon-thumbs-up"></i>34</a>
                                    </div>
                                </div>
                                <div className="disc-item">
                                    <a href="javascript:;" className="thumb"><img src="css/images/1x1.png" /></a>
                                    <div className="alt">
                                        <a href="#" className="j_name">Kelly</a><span>回复 管宝程</span><span className="dot"></span><span>2018-06-19</span>
                                    </div>
                                    <div className="txt">
                                        从文字链接到表情包的段落太多了，每次到这里就会卡一下，次数多了的话。有种强行配图的感觉。从文字链接到表情包的段落太多了，每次到这里就会卡一下，次数多了的话。
                                    </div>
                                    <div className="bar">
                                        <a href="#">投诉</a><a href="javascript:;" data-el="reply">回复</a><a href="#" className="thumbs"><i className="icon-thumbs-up"></i>34</a>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="more-b">
                        <a href="javascript:;">更多留言</a>
                    </div>
                </div>
                <HotRead />
                {/* 底部 */}
                <Footer />
                <Loading />
            </div>
        );
    }
}

