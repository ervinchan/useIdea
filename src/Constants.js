global.constants = {
    loading: false,
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || {},
    PAGESIZE: 15,
    categorys: [
        { id: '4812062598ec4b10bedfb38b59ea3e94', name: '请教' },
        { id: '26a6442976784f079b0ebc43da0d3487', name: '书单上新' },
        { id: 'dc1b3e874dcd4f808be1d90b68a85c3d', name: '阅读场景' },
        { id: 'b1969f551e00485e855ea4f8d26aea4b', name: '见识灵感' },
        { id: '299c0a633b87429aa72c66656121427c', name: '专访幕后' },
        { id: '765cb41251224aff8c3416e17b82960b', name: '醒来再读' },
        { id: '7a8bbb7d262142cbb7ae5bf884935e81', name: '工具包' },
        { id: 'ce009ff186fa4203ab07bd1678504228', name: '口吃文案' },
        { id: '981892a5c2394fe7b01ce706d917699e', name: '招聘' }
    ],
    categoryIds: {
        '请教': {
            'id': '4812062598ec4b10bedfb38b59ea3e94',
            'url': '/Question'
        },
        '口吃文案': {
            'id': 'ce009ff186fa4203ab07bd1678504228',
            'url': '/GoodCopy'
        },
        '书单上新': {
            'id': '26a6442976784f079b0ebc43da0d3487',
            'url': '/Bookstore/NewBooks'
        },
        '工具包': {
            'id': '7a8bbb7d262142cbb7ae5bf884935e81',
            'url': '/Inspiration/Tool'
        },
        "醒来再读": {
            'id': '765cb41251224aff8c3416e17b82960b',
            'url': '/Viewpoint',
        },
        "阅读场景": {
            'id': 'dc1b3e874dcd4f808be1d90b68a85c3d',
            'url': '/Bookstore//ReadingTime',
        },
        "招聘": {
            'id': '981892a5c2394fe7b01ce706d917699e',
            'url': '/Job',
        }
    },
    categoryUrl: {
        "请教": "/Question",
        "吃口文案": "/GoodCopy",
        "见识灵感": "/Inspiration",
        "醒来再读": "/Viewpoint",
        "专访幕后": "/Inspiration/Interview",
        "工具包": "/Inspiration/Tool",
        "阅读场景": "/Bookstore//ReadingTime",
        "书单上新": "/Bookstore/NewBooks"
    }
};