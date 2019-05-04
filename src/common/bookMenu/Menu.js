import React, { Component } from 'react';
import { Input, Tabs } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';
import Service from '../../service/api.js'
import $ from 'jquery'

export default class BookMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            booksMenu: [],
            bannerAList: []
        };
    }

    componentDidMount() {
        let that = this
        Service.GetBooksMenu()
            .then((response) => {
                let booksMenu = response.data.data
                this.setState({ booksMenu })
                $(function () {
                    $(".m-menu-shu .menu>li>a").on("click", function (e) {
                        $(this).next().slideToggle(300);
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
                    });
                })
            })
            .catch((error) => {
                console.log(error)
            })

    }

    componentWillReceiveProps(nextProps) {
        this.categoryIds = this.props.categoryid
    }

    searchBooks = () => {
        console.log(this.props)
        let searchTxt = $("#bookSearchTxt").val()
        window.location.href = `/#/Bookstore/NewBooks/search=${searchTxt}`
        // this.props.history.replaceState({ tid: $("#bookSearchTxt").val() }, "/Bookstore")
    }

    createBooksMenu = () => {
        const { booksMenu } = this.state;
        let Menu = this.transTreeData(booksMenu)
        return this.loop(Menu)
    }

    loop = (data) => {
        return data.map((item, index) => {
            let Lis = []
            if (item.children.length > 0) {
                Lis = this.loopChildren(item, item.children)
            }
            let Li = item.children.length ?
                <li key={index}><a href={`/#/Bookstore/NewBooks/${item.id}&${item.parentId}`}>{item.name}</a><ul>{Lis}</ul></li>
                :
                <li key={index}><a href={`/#/Bookstore/NewBooks/${item.id}&${item.parentId}`}>{item.name}</a></li>
            return Li
        })
    }

    loopChildren = (parent, items) => {
        let Lis = items.map((item, index) => <li key={index} ><a href={`/#/Bookstore/NewBooks/${item.id}&${parent.id}`}>{item.name}</a><span>({item.count || 0})</span></li>)
        return Lis
    }

    transTreeData = (data) => {
        if (data.length > 0) {
            var curPid = '0' //pid=0,为最上层节点 ,即无父节点 
            var parent = findChild(curPid);//数组 
            return parent;
        } else {
            return [];
        }
        //找子节点 
        function findChild(curPid) {
            var _arr = [];
            var items = data;
            var length = items.length;
            for (var i = 0; i < length; i++) {
                if (items[i].parentId === curPid) {
                    var _obj = items[i];
                    _obj.children = findChild(_obj.id);
                    _arr.push(_obj);
                }
            }
            return _arr;
        }
    }

    getBannerA = () => {
        Service.GetADList({
            categoryId: this.categoryIds.id,
            id: "e0de5c7e4a514c158a74876c851f13ba"
        }).then((response) => {
            if (response.data.status === 1) {
                this.setState({ bannerAList: response.data.data })
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
                <a className="seat" href={item.url} target="_blank">
                    <img src={item.image} />
                </a>
            )
        })
    }



    render() {
        return (
            <div className="g-right">
                <div className="m-menu-shu" data-fixed=".m-menu-shu .scroll">
                    <ul className="nav">
                        <li>
                            <i className="icon-upper"></i>
                            <a href="javascript:;">新上架</a>
                        </li>
                        <li>
                            <i className="icon-sale"></i>
                            <a href="javascript:;">销售榜</a>
                        </li>
                        <li>
                            <i className="icon-star"></i>
                            <a href="/#/Bookstore/ReadingTime">阅读场景</a>
                        </li>
                    </ul>
                    <div className="scroll"></div>
                    <div className="fixedbox">
                        <div className="u-search">
                            <input id="bookSearchTxt" type="text" placeholder="搜索与我相关的好书" />
                            <a href="javascript:;" className="fa-search" onClick={this.searchBooks}></a>

                        </div>
                        <ul className="menu">
                            {this.createBooksMenu()}

                        </ul>
                        {
                            this.createBannerA()
                        }

                        <ul className="menu">
                            <li>
                                <a href="javascript:;">阅读帮助</a>
                                <ul>
                                    <li><a href="javascript:;">选书方式</a></li>
                                    <li><a href="javascript:;">联系编辑</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

