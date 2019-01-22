import React, { Component } from 'react';
import { Menu, Icon, Badge, Tabs, List, Avatar, Divider, Button, Card } from 'antd';
import Slider from "react-slick";
import { StickyContainer, Sticky } from 'react-sticky';
import './App.less';

import logo from './static/logo.png'
import logo2 from './static/logo2.png'
import ewm from './static/a_86.jpg'
import litbanner from './static/litbanner_10.png'
import banner from './static/1-首页_06.png'
import banner1 from './static/1-首页_09.png'
import banner2 from './static/1-首页_12.png'
import banner3 from './static/1-首页_17.png'
import banner4 from './static/1-首页_28.png'
import banner5 from './static/1-首页_22.png'
import banner6 from './static/1-首页_24.png'
import banner7 from './static/1-首页_32.png'



const TabPane = Tabs.TabPane;

export default class App extends Component {

    handleTabChange = (key) => {
        console.log(key);
    }

    createList = (name) => {
        const listData = [];
        for (let i = 0; i < 3; i++) {
            listData.push({
                href: '#',
                title: `${name}-索尼X王俊凯特别款套装 ${i}，你pick了吗`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: '本栏所有精品美文都是从文章阅读网里面精选出来的,包括爱情美文欣赏,经典亲情、友情等情感美文摘抄,欢迎读者慢慢品味。',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            });
        }
        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );
        return [<List
            itemLayout="vertical"
            dataSource={listData}
            renderItem={item => (
                <List.Item
                    key={item.title}
                //actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                >
                    <List.Item.Meta
                        avatar={<img width={272} alt="logo" src={banner1} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={[
                            <span>今天09:32</span>,
                            <p>Brand:Sony 索尼</p>,
                            <div className="action action-brand"><Icon type="medium" />企业名称</div>, <div className="action action-tool"><IconText type="heart" text="156" /><Divider type="vertical" /><IconText type="like-o" text="156" /><Divider type="vertical" /><IconText type="message" text="2" /></div>
                        ]}
                    />
                    {/* {item.content} */}
                </List.Item>
            )}
        />,
        <img src={banner4} />
            ,
        <List
            itemLayout="vertical"
            dataSource={listData}
            loadMore={
                <div style={{ textAlign: 'center', marginTop: 12, width: '100%' }}>
                    <Button className="loadmore-btn" onClick={this.onLoadMore}>点击浏览更多</Button>
                </div>
            }
            renderItem={item => (
                <List.Item
                    key={item.title}
                //actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                >
                    <List.Item.Meta
                        avatar={<img width={272} alt="logo" src={banner1} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={[
                            <p>{item.description}</p>,
                            <div className="action action-brand">用户名<span style={{ margin: '5px' }}>·</span>2018-01-01</div>, <div className="action action-tool"><IconText type="heart" text="156" /><Divider type="vertical" /><IconText type="like-o" text="156" /><Divider type="vertical" /><IconText type="message" text="2" /></div>
                        ]}
                    />
                    {/* {item.content} */}
                </List.Item>
            )}
        />]
    }


    renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={80}>
            {({ style }) => {
                return <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
            }}
        </Sticky>
    );

    render() {
        const rankData = [
            {
                title: '飓风向太阳系袭来 1',
            },
            {
                title: '飓风向太阳系袭来 2',
            },
            {
                title: '飓风向太阳系袭来 3',
            },
            {
                title: '飓风向太阳系袭来 4',
            },
        ];
        const settingsBanner = {
            dots: true,
            className: "center",
            //centerMode: true,
            infinite: true,
            centerPadding: "30",
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            speed: 500,
            nextArrow: <Icon type="right-circle" theme="filled" />,
            prevArrow: <Icon type="left-circle" theme="filled" />
        };
        const settings = {
            dots: true,
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "0",
            slidesToShow: 4,
            speed: 500,
            nextArrow: <Icon type="right" className="next-btn" />,
            prevArrow: <Icon type="left" className="prev-btn" />
        };
        const settings2 = {
            dots: true,
            className: "center",
            infinite: true,
            centerPadding: "0",
            slidesToShow: 4,
            speed: 500,
            rows: 2,
            nextArrow: <Icon type="right" className="next-btn" />,
            prevArrow: <Icon type="left" className="prev-btn" />
        };

        return (
            <div className="">
                <div className="header" id="header">
                    <h1 className="logo"><a href=""><img src={logo} /></a></h1>
                    <div className="header-right">
                        <div className="nav">
                            <Menu
                                mode="horizontal"
                            >
                                <Menu.Item key="mail">
                                    首页
                                </Menu.Item>
                                <Menu.Item key="ask">
                                    请教
                                </Menu.Item>
                                <Menu.Item key="xlm">
                                    小专栏
                                </Menu.Item>
                                <Menu.Item key="ckwa">
                                    吃口文案
                                </Menu.Item>
                                <Menu.Item key="lgk">
                                    灵感库
                                </Menu.Item>
                                <Menu.Item key="wnfs">
                                    蜗牛翻书
                                </Menu.Item>
                                <Menu.Item key="zp">
                                    招聘
                                </Menu.Item>
                            </Menu>
                        </div>
                        <div class="wxss"> <a href="" className="search"></a></div>
                        <Badge count={5}><Icon type="user" /></Badge>
                    </div>
                </div>

                <div className="banner">
                    <Slider {...settingsBanner}>
                        <Card
                            className="banner-card"
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src={banner} />}

                        >
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                            <h3>野生中年文案，上岸指南7</h3>
                        </Card>
                        <Card
                            className="banner-card"
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src={banner} />}

                        >
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                            <h3>野生中年文案，上岸指南7</h3>
                        </Card>
                        <Card
                            className="banner-card"
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src={banner} />}

                        >
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                            <h3>野生中年文案，上岸指南7</h3>
                        </Card>
                        <Card
                            className="banner-card"
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src={banner} />}

                        >
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                            <h3>野生中年文案，上岸指南7</h3>
                        </Card>
                        <Card
                            className="banner-card"
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src={banner} />}

                        >
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                            <h3>野生中年文案，上岸指南7</h3>
                        </Card>
                        <Card
                            className="banner-card"
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src={banner} />}

                        >
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                            <h3>野生中年文案，上岸指南7</h3>
                        </Card>
                        <Card
                            className="banner-card"
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src={banner} />}

                        >
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                            <h3>野生中年文案，上岸指南7</h3>
                        </Card>
                        <Card
                            className="banner-card"
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src={banner} />}

                        >
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                            <h3>野生中年文案，上岸指南7</h3>
                        </Card>
                    </Slider>
                </div>

                <div className="gxtj">
                    <div className="txtj_nr">
                        <ul>
                            <li><a href=""><img src={litbanner} /></a></li>
                            <li><a href=""><img src={litbanner} /></a></li>
                            <li><a href=""><img src={litbanner} /></a></li>
                            <li><a href=""><img src={litbanner} /></a></li>
                        </ul>
                    </div>
                </div>

                <div className="content">
                    <StickyContainer style={{ overflow: 'hidden', float: 'left' }}>
                        <Tabs className="content-tab" defaultActiveKey="zb" onChange={this.handleTabChange} renderTabBar={this.renderTabBar}>
                            <TabPane tab="主编推荐" key="zb">{this.createList('主编')}</TabPane>
                            <TabPane tab="请教" key="qj">{this.createList('请教')}</TabPane>
                            <TabPane tab="醒来再读" key="xlzd">{this.createList('醒来再读')}</TabPane>
                            <TabPane tab="小专栏" key="xzl">{this.createList('小专栏')}</TabPane>
                            <TabPane tab="吃口文案" key="kcwa">{this.createList('吃口文案')}</TabPane>
                            <TabPane tab="书单上新" key="sdsx">{this.createList('书单上新')}</TabPane>
                            <TabPane tab="招聘" key="zp">{this.createList('招聘')}</TabPane>
                        </Tabs>
                    </StickyContainer>
                    <div className="content-right">
                        <div className="">
                            <a href=""><img src={banner2} /></a>
                            <a href=""><img src={banner3} /></a>
                        </div>
                        <div className="rank">
                            <div className="tit">
                                <span className="fixe-red"></span>
                                <h3 className="tit-text">热文排行</h3>
                            </div>
                            <ul className="rank-list">
                                <li>
                                    <img src={banner5} />
                                </li>
                                <li>
                                    <img src={banner6} />
                                </li>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={rankData}
                                    renderItem={(item, i) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<img height={65} src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                                                title={<a href="">{item.title}</a>}
                                                description="作者名称"
                                            />
                                            {<span className="rank-num">{i + 3}</span>}
                                        </List.Item>
                                    )}
                                />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="reading">
                    <h3 className="tit">同行在读</h3>
                    <span className="entit">BOOKS</span>
                    <Slider {...settings}>
                        <div className="card">
                            <img src={banner7} />
                            <h3>创意，从无到有1</h3>
                            <small>James boon</small>
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                        </div>
                        <div className="card">
                            <img src={banner7} />
                            <h3>创意，从无到有2</h3>
                            <small>James boon</small>
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                        </div>
                        <div className="card">
                            <img src={banner7} />
                            <h3>创意，从无到有3</h3>
                            <small>James boon</small>
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                        </div>
                        <div className="card">
                            <img src={banner7} />
                            <h3>创意，从无到有4</h3>
                            <small>James boon</small>
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                        </div>
                        <div className="card">
                            <img src={banner7} />
                            <h3>创意，从无到有5</h3>
                            <small>James boon</small>
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                        </div>
                        <div className="card">
                            <img src={banner7} />
                            <h3>创意，从无到有6</h3>
                            <small>James boon</small>
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                        </div>
                        <div className="card">
                            <img src={banner7} />
                            <h3>创意，从无到有7</h3>
                            <small>James boon</small>
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                        </div>
                        <div className="card">
                            <img src={banner7} />
                            <h3>创意，从无到有8</h3>
                            <small>James boon</small>
                            <p className="descript">飓风向太阳系袭来飓风向太阳系袭来</p>
                        </div>
                    </Slider>
                </div>

                <div className="hot-read reading">
                    <h3 className="tit">热门阅读</h3>
                    <Slider {...settings2}>
                        <Card
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}

                        >
                            <h3>野生中年文案，上岸指南1</h3>
                            <div className="action action-tool"><Icon type="heart" /><span>150</span><Divider type="vertical" /><Icon type="like-o" text="156" /><span>156</span><Divider type="vertical" /><Icon type="message" text="2" /><span>15</span></div>
                        </Card>
                        <Card
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}

                        >
                            <h3>野生中年文案，上岸指南2</h3>
                            <div className="action action-tool"><Icon type="heart" /><span>150</span><Divider type="vertical" /><Icon type="like-o" text="156" /><span>156</span><Divider type="vertical" /><Icon type="message" text="2" /><span>15</span></div>
                        </Card>
                        <Card
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}

                        >
                            <h3>野生中年文案，上岸指南3</h3>
                            <div className="action action-tool"><Icon type="heart" /><span>150</span><Divider type="vertical" /><Icon type="like-o" text="156" /><span>156</span><Divider type="vertical" /><Icon type="message" text="2" /><span>15</span></div>
                        </Card>
                        <Card
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}

                        >
                            <h3>野生中年文案，上岸指南4</h3>
                            <div className="action action-tool"><Icon type="heart" /><span>150</span><Divider type="vertical" /><Icon type="like-o" text="156" /><span>156</span><Divider type="vertical" /><Icon type="message" text="2" /><span>15</span></div>
                        </Card>
                        <Card
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}

                        >
                            <h3>野生中年文案，上岸指南5</h3>
                            <div className="action action-tool"><Icon type="heart" /><span>150</span><Divider type="vertical" /><Icon type="like-o" text="156" /><span>156</span><Divider type="vertical" /><Icon type="message" text="2" /><span>15</span></div>
                        </Card>
                        <Card
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}

                        >
                            <h3>野生中年文案，上岸指南6</h3>
                            <div className="action action-tool"><Icon type="heart" /><span>150</span><Divider type="vertical" /><Icon type="like-o" text="156" /><span>156</span><Divider type="vertical" /><Icon type="message" text="2" /><span>15</span></div>
                        </Card>
                        <Card
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}

                        >
                            <h3>野生中年文案，上岸指南7</h3>
                            <div className="action action-tool"><Icon type="heart" /><span>150</span><Divider type="vertical" /><Icon type="like-o" text="156" /><span>156</span><Divider type="vertical" /><Icon type="message" text="2" /><span>15</span></div>
                        </Card>
                        <Card
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}

                        >
                            <h3>野生中年文案，上岸指南8</h3>
                            <div className="action action-tool"><Icon type="heart" /><span>150</span><Divider type="vertical" /><Icon type="like-o" text="156" /><span>156</span><Divider type="vertical" /><Icon type="message" text="2" /><span>15</span></div>
                        </Card>
                        <Card
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}

                        >
                            <h3>野生中年文案，上岸指南9</h3>
                            <div className="action action-tool"><Icon type="heart" /><span>150</span><Divider type="vertical" /><Icon type="like-o" text="156" /><span>156</span><Divider type="vertical" /><Icon type="message" text="2" /><span>15</span></div>
                        </Card>
                        <Card
                            bordered={false}
                            hoverable
                            style={{ width: 250 }}
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}

                        >
                            <h3>野生中年文案，上岸指南10</h3>
                            <div className="action action-tool"><Icon type="heart" /><span>150</span><Divider type="vertical" /><Icon type="like-o" text="156" /><span>156</span><Divider type="vertical" /><Icon type="message" text="2" /><span>15</span></div>
                        </Card>
                    </Slider>
                </div>

                <div className="footer">
                    <div className="footer-bar">
                        <div className="footer-left">
                            <p>响创意<br />记录创造者的洞见</p>
                            <div className="logo2">
                                <img src={logo2} />
                                <ul className="foot-link">
                                    <li><a href="">关于我们</a></li>
                                    <li><a href="">版权声明</a></li>
                                    <li><a href="">隐私保护</a></li>
                                    <li><a href="">联系我们</a></li>
                                    <li><a href="">免责声明</a></li>
                                </ul>
                            </div>

                        </div>
                        <div className="footer-right">


                            <div className="ewm"> <img src={ewm} /> </div>
                            <div className="fllow"> follow us  ————
                                <a href=""><Icon type="weibo" /></a>
                                <a href=""><Icon type="zhihu" /></a>
                                <a href=""><Icon type="youtube" /></a>
                                <a href=""><Icon type="wechat" /></a>
                            </div>
                            <p className="email">商务合作及媒介沟通请联系：ideazhu@gmail.com</p>
                            <div className="copyright"> Copyright © 2018十间空文化-文案圈 &nbsp;&nbsp; 浙ICP备13019248号 </div>
                        </div>


                    </div>
                </div>
                <div className="bottom"></div>
            </div>
        );
    }
}