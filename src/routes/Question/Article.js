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
import Editor from 'rc-wang-editor'
import 'swiper/dist/css/swiper.min.css'

import 'antd/lib/pagination/style/index.css';
import '../../static/less/question.less'

const PAGESIZE = 3;

export default class QuestionArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortType: 0,
            curPage: 1,
            banner: [],
            toolList: []
        };
    }

    componentWillReceiveProps(nextProps) {

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

        this.getArticleInfo("7a8bbb7d262142cbb7ae5bf884935e81")
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
                        <a className="thumb-img" href={`/#/Bookstore/Bookbuy/${item.id}`}><img src={item.imageSrc} /></a>
                        <div className="tag">{item.category.name}</div>
                        <h1><a href={`/#/Bookstore/Bookbuy/${item.id}`}>{item.title}</a></h1>
                        <div className="alt clearfix">
                            <a href="#" className="j_name"><img src={item.user.img} className="thumb-img" />{item.author}</a>
                            <span className="dot"></span>
                            <span>{item.description}</span>
                        </div>
                    </div>
                </li>
            )
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

    handlePageChange = (page, pageSize) => {
        console.log(page, pageSize)
        this.setState({ curPage: page })
        this.getBooksList(this.props.match.params.tid, this.state.sortType, page)
    }

    render() {
        const { toolList } = this.state;

        return (
            <div className="">
                {/* 头部 */}
                < Header />
                <div class="wrapper g-qingjiao2">
                    <div class="g-left">
                        <div class="qj-article">
                            <h1>带我的创意总监经常提到消费者洞察，请问怎么练习洞察力？</h1>
                            <div class="alt clearfix">
                                <a href="#" class="j_name"><img src="css/images/1x1.png" class="thumb-img" />AcadeCityLv6</a>
                                <span>▪</span>
                                <span>2018/11/05</span>
                                <a href="#" class="tag">文案技巧</a>
                            </div>
                            <div class="txt clearfix">
                                <img src="css/images/280x180.png" class="thumb-img" />
                                <div class="box">
                                    经常在开会中，听到总监和领导提到用户洞察，一直对这两个词理解不清楚。请问洞察是什么？有没有好的洞察练习的方式？各位前辈有推荐的书没有？有没有好的洞察练习的方式？各位前辈有推荐的书没有。
                                    <a href="javascript:;">显示全部 <i class="fa-angle-down"></i></a>
                                </div>
                            </div>
                            <div class="f-bartool clearfix"><a href="javascript:;"><i class="icon-heart"></i><span>99</span></a><a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a><a href="javascript:;"><i class="icon-comment"></i><span>51</span></a></div>

                        </div>
                        <div class="u-editor">
                            <Editor customConfig={{
                                "uploadImgShowBase64": true,
                                "height": 325
                            }} style={{ height: 325 }} />
                        </div>
                        <div class="qj-submit">
                            <a href="#">提 交</a>
                        </div>
                        <div class="u-forum">
                            <div class="u-title3">
                                <b>14条热心回答</b>
                                <div class="u-select">
                                    <div class="in_sort" role="note">热度排行</div>
                                    <div data-for=".in_sort" role="menu">
                                        <ul>
                                            <li>时间排序</li>
                                            <li>热度排序</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="fu_detail">
                                <div class="fu_info">
                                    <a href="#" class="face">
                                        <img src="css/images/1x1.png" />
                                    </a>
                                    <div class="alt clearfix">
                                        <a href="#" class="j_name">AcadeCityLv6</a>
                                        <span class="dot"></span>
                                        <span>今天 09:32</span>
                                    </div>
                                    <div class="txt">无业文氓。要想活到99，每天吸猫一大口</div>
                                </div>
                                <div class="fu_txt clearfix">
                                    <p>可以理解但是，作为经济学爱好者，我对瓜子二手车平台传递的观念实在不能忍。 瓜子二手车的广告语是这样：车主多卖钱.</p>
                                    <p><br /></p>
                                    <p>买家少花钱，没有中间商赚差价。言下之意，中间商之存在会让买卖双方吃亏。没有中间商赚差价，买卖方都获益。真相是这样吗？当然是胡扯。这种“讲道理的广告”是反经济学的。什么是中间商呢？小贩、中介、经纪、拉皮条的、二道贩子。在许多人的眼中，商品流经他们手里，就要加些价格，卖主少卖，买家多花钱，中间商赚的是盘剥过路的钱。谴责中间商的声音一直都有。中间商损害买卖双方的利益，增加交易成本吗？事实恰恰相反，中间商促进买卖关系，维持交易稳定，减少交易成本的必要环节.</p>
                                    <p><br /></p>
                                    <p>没有小商小贩，生产者把商品直接卖给消费者，成本会变得奇高。他们无法经营庞大的销售网络，找不到大量的买家，生产规模也就无法扩大，甚至无法进行。中间商帮他们做到这一点。中间商赚的价差再大，也远远小于他们减少销售成本所创造的价值。</p>
                                    <p><br /></p>
                                    <p>没有小商小贩，生产者把商品直接卖给消费者，成本会变得奇高。他们无法经营庞大的销售网络，找不到大量的买家，生产规模也就无法扩大，甚至无法进行。中间商帮他们做到这一点。中间商赚的价差再大，也远远小于他们减少销售成本所创造的价值。</p>
                                </div>
                                <div class="f-bartool clearfix">
                                    <a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a>
                                    <a href="javascript:;"><i class="icon-comment"></i><span>51</span></a>
                                    <a href="javascript:;"><i class="icon-link"></i><span>链接</span></a>
                                    <a href="javascript:;" class="tousu">投诉内容</a>
                                </div>
                            </div>
                            <div class="fu_detail hidden" id="item11">
                                <div class="fu_info">
                                    <a href="#" class="face">
                                        <img src="css/images/1x1.png" />
                                    </a>
                                    <div class="alt clearfix">
                                        <a href="#" class="j_name">AcadeCityLv6</a>
                                        <span class="dot"></span>
                                        <span>今天 09:32</span>
                                    </div>
                                    <div class="txt">无业文氓。要想活到99，每天吸猫一大口</div>
                                </div>
                                <div class="fu_txt clearfix">
                                    <p>可以理解但是，作为经济学爱好者，我对瓜子二手车平台传递的观念实在不能忍。</p>
                                    <p>瓜子二手车的广告语是这样：车主多卖钱.</p>
                                    <p>买家少花钱，没有中间商赚差价。言下之意，中间商之存在会让买卖双方吃亏。没有中间商赚差价，买卖方都获益。真相是这样吗？当然是胡扯。这种“讲道理的广告”是反经济学的。什么是中间商呢？小贩、中介、经纪、拉皮条的、二道贩子。在许多人的眼中，商品流经他们手里，就要加些价格，卖主少卖，买家多花钱，中间商赚的是盘剥过路的钱。谴责中间商的声音一直都有。中间商损害买卖双方的利益，增加交易成本吗？事实恰恰相反，中间商促进买卖关系，维持交易稳定，减少交易成本的必要环节.</p>
                                    <p><img src="images/15.jpg" /><br /><img src="images/16.jpg" /><br /><img src="images/1.jpg" /><br /></p>
                                    <p>没有小商小贩，生产者把商品直接卖给消费者，成本会变得奇高。他们无法经营庞大的销售网络，找不到大量的买家，生产规模也就无法扩大，甚至无法进行。中间商帮他们做到这一点。中间商赚的价差再大，也远远小于他们减少销售成本所创造的价值。</p>
                                </div>
                                <a href="javascript:;" class="jq-hidden" data-for="#item11"> <i class="fa-angle-up"></i></a>
                                <div class="f-bartool clearfix">
                                    <a href="javascript:;"><i class="icon-thumbs"></i><span>36</span></a>
                                    <a href="javascript:;"><i class="icon-comment"></i><span>51</span></a>
                                    <a href="javascript:;"><i class="icon-link"></i><span>链接</span></a>
                                    <a href="javascript:;" class="tousu">投诉内容</a>
                                </div>
                            </div>

                        </div>
                        <a href="javascript:;" class="more-a">查看剩余答案</a>

                    </div>
                    <div class="g-right">
                        <a href="javascript:;" class="seat-x315"><img src="images/17.jpg" /></a>
                        <a href="javascript:;" class="seat-x315"><img src="images/d5.jpg" /></a>
                        <div class="u-title4">
                            <b>相关问题</b>
                        </div>
                        <div class="qj-corre">
                            <ul>
                                <li>
                                    <a href="#">你看过的广告作品中，最有用户身份洞察的有哪些？</a><span>12个回答</span>
                                </li>
                                <li>
                                    <a href="#">广告人怎么看待叶茂中做的世界杯广告？</a><span>34个回答</span>
                                </li>
                            </ul>
                        </div>
                        <div class="slide-seat-315">
                            <div class="swiper-container">
                                <div class="swiper-wrapper">
                                    <a href="javascript:;" class="swiper-slide seat-x315"><img src="images/d5.jpg" /></a>
                                    <a href="javascript:;" class="swiper-slide seat-x315"><img src="css/images/315x190.png" /></a>
                                    <a href="javascript:;" class="swiper-slide seat-x315"><img src="css/images/315x190.png" /></a>
                                    <a href="javascript:;" class="swiper-slide seat-x315"><img src="css/images/315x190.png" /></a>
                                </div>
                                <div class="u-pagination wide"></div>
                            </div>
                        </div>
                        <div class="u-title4">
                            <b>热门专栏</b>
                        </div>
                        <ul class="hot-article suite active">
                            <li>
                                <a href="#" class="thumb-img">
                                    <span>1</span>
                                    <img src="images/r1.jpg" />
                                </a>
                                <h1><a href="#">天猫拾光之旅：双11十年，都藏在这些彩蛋里了！</a></h1>
                                <h3>jrainlau</h3>
                            </li>
                            <li>
                                <a href="#" class="thumb-img">
                                    <span>2</span>
                                    <img src="images/r2.jpg" />
                                </a>
                                <h1><a href="#">《风味人间》的画面，每一帧都写着馋</a></h1>
                                <h3>jrainlau</h3>
                            </li>
                            <li>
                                <a href="#" class="thumb-img">
                                    <span>3</span>
                                    <img src="css/images/95x65.png" />
                                </a>
                                <h1><a href="#">100多年来，广告如何操控你对“颜值”的认知？</a></h1>
                                <h3>jrainlau01</h3>
                                <div class="alt">
                                    <img src="css/images/1x1.png" />
                                    <img src="css/images/1x1.png" />
                                    <img src="css/images/1x1.png" />
                                    <img src="css/images/1x1.png" />
                                    <span class="dot"></span>
                                    <span>473人订阅</span>
                                </div>
                            </li>
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

