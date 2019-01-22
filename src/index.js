import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable';
import Loading from './common/Loading/Index'
import './service/interceptors.js';
import './static/less/reset.less';
import './index.less';
import './static/less/swiper.less';
import './static/less/global.less';
import './static/less/module.less';

//import App from './App';
import * as serviceWorker from './serviceWorker';

//const Loading = () => <div className="positionC"><Spin tip="加载中..." /></div>;

const Home = Loadable({
    loader: () => import('./routes/Home/Index'),
    loading: Loading,
});

const Question = Loadable({
    loader: () => import('./routes/Question/Index'),
    loading: Loading,
});

const QuestionArticle = Loadable({
    loader: () => import('./routes/Question/Article'),
    loading: Loading,
});

const Bookstore = Loadable({
    loader: () => import('./routes/Bookstore/Index'),
    loading: Loading,
});

const Bookbuy = Loadable({
    loader: () => import('./routes/Bookstore/Buy'),
    loading: Loading,
});

const ReadingTime = Loadable({
    loader: () => import('./routes/ReadingTime/Index'),
    loading: Loading,
});
const Bigidea = Loadable({
    loader: () => import('./routes/Inspiration/Bigidea'),
    loading: Loading,
});
const Interview = Loadable({
    loader: () => import('./routes/Inspiration/Interview'),
    loading: Loading,
});
const Viewpoint = Loadable({
    loader: () => import('./routes/Inspiration/Viewpoint'),
    loading: Loading,
});
const Tool = Loadable({
    loader: () => import('./routes/Inspiration/Tool'),
    loading: Loading,
});
const Article = Loadable({
    loader: () => import('./routes/Inspiration/Article'),
    loading: Loading,
});

const GoodCopy = Loadable({
    loader: () => import('./routes/GoodCopy/Index'),
    loading: Loading,
});

const Job = Loadable({
    loader: () => import('./routes/Job/Index'),
    loading: Loading,
});

const JobList = Loadable({
    loader: () => import('./routes/Job/List'),
    loading: Loading,
});

const ArticleEditor = Loadable({
    loader: () => import('./common/articleEdit/Index'),
    loading: Loading,
});

const Login = Loadable({
    loader: () => import('./common/login/Index'),
    loading: Loading,
});
const Reg = Loadable({
    loader: () => import('./common/reg/Index'),
    loading: Loading,
});
const UserCenter = Loadable({
    loader: () => import('./routes/user/Index'),
    loading: Loading,
});
const MyWork = Loadable({
    loader: () => import('./routes/user/MyWork'),
    loading: Loading,
});
const MyHeart = Loadable({
    loader: () => import('./routes/user/MyHeart'),
    loading: Loading,
});
const LoginQy = Loadable({
    loader: () => import('./common/login/Company'),
    loading: Loading,
});
const RegQy = Loadable({
    loader: () => import('./common/reg/Company'),
    loading: Loading,
});
const RegInfo = Loadable({
    loader: () => import('./common/reg/Info'),
    loading: Loading,
});
const RegFinish = Loadable({
    loader: () => import('./common/reg/Finish'),
    loading: Loading,
});


const App = () => (
    <Router>
        <Switch>
            <Redirect from='/refresh' to='/' />
            <Route exact path="/" breadcrumbName="首页" component={Home} />
            <Route exact path="/Question" breadcrumbName="请教" component={Question} />
            <Route exact path="/Question/Article/:qid?" breadcrumbName="请教" component={QuestionArticle} />
            <Route exact path="/Bookstore" breadcrumbName="蜗牛翻书" component={Bookstore} />
            <Route exact path="/Bookstore/NewBooks/:tid?" breadcrumbName="书单上新" component={Bookstore} />
            <Route exact path="/Bookstore/Bookbuy/:id" breadcrumbName="书单详情" component={Bookbuy} />
            <Route exact path="/Bookstore/ReadingTime" breadcrumbName="阅读场景" component={ReadingTime} />
            <Route exact path="/Inspiration" breadcrumbName="见识灵感" component={Bigidea} />
            <Route exact path="/Inspiration/Interview/:tid?" breadcrumbName="专访幕后" component={Interview} />
            <Route exact path="/Inspiration/Viewpoint" breadcrumbName="醒来再读" component={Viewpoint} />
            <Route exact path="/Inspiration/Tool" breadcrumbName="工具包" component={Tool} />
            <Route exact path="/Inspiration/Article/:aid?" breadcrumbName="文章" component={Article} />
            <Route exact path="/GoodCopy" breadcrumbName="口吃文案" component={GoodCopy} />
            <Route exact path="/Job" breadcrumbName="招聘" component={Job} />
            <Route exact path="/Job/List/:city/:txt?" breadcrumbName="招聘列表" component={JobList} />
            <Route exact path="/ArticleEditor" breadcrumbName="" component={ArticleEditor} />

            <Route exact path="/Login" breadcrumbName="登录" component={Login} />
            <Route exact path="/Reg" breadcrumbName="注册" component={Reg} />
            <Route exact path="/UserCenter" breadcrumbName="用户中心" component={UserCenter} >
                <Route path="/MyWork" component={MyWork} />
            </Route>
            <Route exact path="/LoginQy" breadcrumbName="企业登录" component={LoginQy} />
            <Route exact path="/RegQy" breadcrumbName="企业注册" component={RegQy} />
            <Route exact path="/RegInfo" breadcrumbName="企业注册信息" component={RegInfo} />
            <Route exact path="/RegFinish" breadcrumbName="注册成功" component={RegFinish} />
        </Switch>
    </Router>
);

ReactDOM.render(App(), document.getElementById('root'));

/* 取消热更新 */
if (module.hot) {
    module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();