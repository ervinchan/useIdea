import React, { Component } from 'react';
import { Input, Tabs, Pagination } from 'antd';
import axios from 'axios'
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FormatDate from '../../static/js/utils/formatDate.js'
import Utils from '../../static/js/utils/utils.js'

import Header from '../../common/header/Index.js'
import Footer from '../../common/footer/Index.js'
import WheelBanner from '../../common/wheelBanner/Index'
import HotRead from '../../common/hotRead/Index'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/article.less';

const PAGESIZE = 3;

export default class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            articleInfo: {},
            articleContent: {},
            articleComment: []
        };
    }

    componentWillReceiveProps(nextProps) {

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
        this.getArticleComment(aid)

    }

    getArticleInfo = (aid) => {
        let url = '/zsl/a/cms/article/getAllArticle?'
        let opts = {
            id: aid
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                let articleInfo = response.data.data.list[0]
                this.setState({ articleInfo })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getArticleContent = (aid) => {
        let url = '/zsl/a/cms/article/getArticleContent?'
        let opts = {
            id: aid
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                let articleContent = response.data.data
                this.setState({ articleContent })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getArticleComment = (aid) => {
        let url = '/zsl/a/cms/article/getArticleComment?'
        let opts = {
            id: aid
        }
        for (var key in opts) {
            opts[key] && (url += "&" + key + "=" + opts[key])
        }
        axios.post(url, opts)
            .then((response) => {
                let articleComment = response.data.data
                this.setState({ articleComment })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleFavorite = (index) => {
        const { readList } = this.state;
        readList[index].favorite++;
        this.setState(readList);
    }

    handleLikes = (index) => {
        const { readList } = this.state;
        readList[index].like++;
        this.setState(readList);
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

    render() {
        const { articleInfo, articleContent, articleComment } = this.state;
        let Hours = FormatDate.apartHours(articleInfo.updateDate)
        let Time = Hours > 24 ? FormatDate.customFormat(articleInfo.updateDate, 'yyyy/MM/dd') : `${Hours}小时前`;
        return (
            <div className="">
                {/* 头部 */}
                < Header />
                {/* 轮播banner */}

                <div className="art-thumb">
                    <img src="images/article/1.jpg" />
                </div>
                <div className="wrapper art-wrapper">
                    <div className="art-head">
                        <div className="meta clearfix"><a href="javascript:;">{articleInfo.author}</a><span className="dot"></span><span>{Time}</span></div>
                        <h1>{articleInfo.title}</h1>
                        <div className="drift">
                            <a href="javascript:;" className="icon-home"></a>
                            <p>
                                <a href="javascript:;" data-el="weixin">订 阅</a>
                                <a href="javascript:;">发布创作</a>
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
                        <div className="art-link">
                            <a href="javascript:;" onClick={this.handleNextPage}><span><i className="icon-next-art"></i></span>下一篇</a><br />
                            <a href="javascript:;" onClick={this.handlePerPage}><span><i className="icon-prev-art"></i></span>上一篇</a>
                        </div>
                        <div className="art-detail" dangerouslySetInnerHTML={{ __html: articleContent.content }}>

                        </div>
                    </div>
                    <div className="share-bottom clearfix">
                        <div className="copyright">版权声明：本文版权、观点和立场归投稿作者所有。未经作者授权，不得以任何形式进行刊登、摘录或转载。</div>
                        <a href="javascript:;" className="thumbs-up"><i className="icon-thumbs-up"></i> 点赞12人</a>
                        <div className="sharebox clearfix">
                            <span>好文分享：</span>
                            <a href="javascript:;" title="分享到新浪微博"><i className="icon-weibo-art"></i></a>
                            <a href="javascript:;" title="分享到微信"><i className="icon-circle-art"></i></a>
                            <a href="javascript:;" title="分享到复制网址"><i className="icon-copy-art"></i></a>
                            <div className="bdsharebuttonbox" data-tag="share_1">
                                <a className="share-item tsina" data-cmd="tsina"><a className="a-item icon-weibo-art" data-cmd="tsina"></a></a>
                                <a className="share-item weixin"><a className="a-item icon-circle-art" data-cmd="weixin"></a></a>
                                <a className="share-item"><a className="a-item icon-copy-art" data-cmd="copy"></a></a>
                            </div>
                        </div>
                    </div>

                    <div className="art-collect">
                        <a href="javascript:;"><i className="icon-collect-art"></i></a>
                        <p>106人收藏了文章</p>
                        <div className="user-art">
                            <a href="javascript:;"><img src="images/article/t1.jpg" /></a>
                            <a href="javascript:;"><img src="images/article/t1.jpg" /></a>
                            <a href="javascript:;"><img src="images/article/t1.jpg" /></a>
                            <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            <a href="javascript:;"><img src="css/images/1x1.png" /></a>
                            <a href="javascript:;"><i className="icon-more-3"></i></a>
                        </div>
                    </div>
                    <a href="#" className="seat-x100 darken seat-art">
                        <img src="images/article/d1.jpg" />
                    </a>
                    <div className="art-discuss">
                        <h1>刚收到 25 条评论留言</h1>
                        <div className="artfrom">
                            <textarea placeholder="万难尽如人意，或有些许共鸣可取……"></textarea>
                            <a href="javascript:;" className="thumb">
                                <img src="images/article/t1.jpg" />
                            </a>
                            <a href="javascript:;" className="artbtn">留 言</a>
                        </div>
                        <div className="author">
                            <h1>本文作者</h1>
                            <div className="box">
                                <a href="javascript:;" className="thumb">
                                    <img src="images/article/t1.jpg" />
                                </a>
                                <h2>Kallyzyf</h2>
                                <div className="bar">
                                    <a href="javascript:;" className="icon-weixin-in"></a>
                                    <a href="javascript:;" className="icon-weibo-in"></a>
                                    <a href="javascript:;" className="icon-zhihu-in"></a>
                                    <a href="javascript:;" className="icon-dou-in"></a>
                                </div>
                                <div className="lk">
                                    <a href="javascript:;">关 注</a>
                                    <a href="javascript:;">主 页</a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="art-discuss-list">
                        <div className="disc-item">
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
                        </div>
                    </div>
                    <div className="more-b">
                        <a href="javascript:;">更多留言</a>
                    </div>
                </div>
                <HotRead />
                {/* 底部 */}
                <Footer />
            </div>
        );
    }
}

