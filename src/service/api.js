
import { POST, FormData } from './service';
import { CLASS } from 'postcss-selector-parser';

class API {
    //登录
    static Login(data) {
        return POST({
            url: "/filter/loginSuccess?",
            opts: data
        })
    }
    //注册
    static UserReg(data) {
        return POST({
            url: "/filter/email?",
            opts: data
        })
    }

    //检查用户名是否可用
    static CheckLoginName(data) {
        return POST({
            url: "/filter/loginSuccess?",
            opts: data
        })
    }

    //导航栏
    static GetNav(data) {
        return POST({
            url: "/a/cms/category/filter/navigationBar?",
            opts: data
        })
    }

    //获取文章列表
    static GetAllArticle(data) {
        return POST({
            url: "/a/cms/article/filter/getAllArticle?",
            opts: data
        })
    }

    //获取文章内容
    static GetArticleContent(data) {
        return POST({
            url: "/zsl/a/cms/article/filter/getArticleContent?",
            opts: data
        })
    }

    //获取文章收藏用户列表
    static GetCollectUsers(data) {
        return POST({
            url: "/a/artuser/articleCollect/filter/collectUsers?",
            opts: data
        })
    }

    //获取图书列表
    static GetBooks(data) {
        return POST({
            url: "/a/book/bookManager/filter/bookSoft?",
            opts: data
        })
    }

    //热门作者
    static GetHostAuthor() {
        return POST({
            url: "/a/cms/article/filter/getHostAuthor?"
        })
    }

    //点赞
    static AddLike(data) {
        return POST({
            url: "/a/cms/article/filter/like?",
            opts: data
        })
    }

    //收藏
    static AddCollect(data) {
        return POST({
            url: "/a/artuser/articleCollect/filter/collectArticle?",
            opts: data
        })
    }

    //请教分类
    static FindClassifying(data) {
        return POST({
            url: "/a/cms/article/filter/findClassifying?",
            opts: data
        })
    }
    //获取请教列表\评论列表
    static GetQuestion(data) {
        return POST({
            url: "/a/cms/comment/filter/consultationArticleList?",
            opts: data
        })
    }
    //获取评论列表
    static GetCommentList(data) {
        return POST({
            url: "/a/cms/comment/filter/consultationList?",
            opts: data
        })
    }
    //请教提交
    static QuestionBuild(data) {
        return POST({
            url: "/a/cms/article/filter/consultationSave?",
            opts: data
        })
    }
    //投诉
    static Complaints(data) {
        return POST({
            url: "/a/cms/article/filter/complaints?",
            opts: data
        })
    }
    //评论提交
    static SubmitComment(data) {
        return POST({
            url: "/f/comment?",
            opts: data
        })
    }

    //获取图书分类菜单
    static GetBooksMenu(data) {
        return POST({
            url: "/a/classificationtree/classificationtree/filter/findClassification?",
            opts: data
        })
    }
    //获取阅读场景列表
    static GetReads(data) {
        return POST({
            url: "/a/cms/article/filter/readScene?",
            opts: data
        })
    }
    //
    static GetBooksNotice(data) {
        return POST({
            url: "/a/notice/bookNotice/filter/notice?",
            opts: data
        })
    }

    //热门岗位
    static GetHotPost(data) {
        return POST({
            url: "/a/cms/article/filter/getHostPost?",
            opts: data
        })
    }
    //招聘过滤地区
    static JobCity(data) {
        return POST({
            url: "/a/jobcity/jobCity/filter/findAllJobCity?",
            opts: data
        })
    }
    //地区选择
    static findJobCity(data) {

        return POST({
            url: "/a/jobcity/jobCity/filter/findJobCity?",
            opts: data
        })
    }
    //招聘过滤条件
    static JobFilters(data) {
        return POST({
            url: "/a/sys/dict/filter/jobSelect?",
            opts: data
        })
    }
    //获取招聘列表
    static GetAllJob(data) {
        return POST({
            url: "/a/cms/article/filter/getAllJobArticle??",
            opts: data
        })
    }


    //热门关键字
    static HotKeywords(data) {
        return POST({
            url: "/a/cms/article/filter/getHostKeywords?",
            opts: data
        })
    }

    //文章发布分类
    static ArticleClassify(data) {
        return POST({
            url: "/a/cms/category/filter/updateArticleClassify?",
            opts: data
        })
    }

    //文章发布上传
    static ArticleBuild(data) {
        return FormData({
            url: "/a/cms/article/filter/consultationSave?",
            opts: data.form
        })
    }

    //首页顶部广告
    static GetBanners(data) {
        return POST({
            url: "/a/cms/article/filter/adsList?",
            opts: data
        })
    }

    //广告位列表   
    static GetADPosList(data) {
        return POST({
            url: "/a/ad/adInfomation/filter/findAllAdInfomationList?",
            opts: data
        })
    }
    //广告列表
    static GetADList(data) {
        return POST({
            url: "/a/ad/adInfomation/filter/findAdWindowAdInfomationList?",
            opts: data
        })
    }


    /*用户中心*/
    //我的心选
    static GetCollectList(data) {
        return POST({
            url: "/a/artuser/articleCollect/filter/collectList?",
            opts: data
        })
    }
    //最新动态
    static GetLatestAction(data) {
        return POST({
            url: "/a/cms/article/filter/latestAction?",
            opts: data
        })
    }
    //关注列表
    static GetAttentionList(data) {
        return POST({
            url: "/a/attention/userAttentionUserids/filter/attentionList?",
            opts: data
        })
    }
    //粉丝列表
    static GetFansList(data) {
        return POST({
            url: "/a/attention/userAttentionUserids/filter/attention2List?",
            opts: data
        })
    }
    //关注
    static AddAttention(data) {
        return POST({
            url: "/a/attention/userAttentionUserids/filter/attention?",
            opts: data
        })
    }
    //最新动态
    static GetLatestAction(data) {
        return POST({
            url: "/a/cms/article/filter/latestAction?",
            opts: data
        })
    }




}
export default API