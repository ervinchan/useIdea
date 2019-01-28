global.constants = {
    loading: false,
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
    PAGESIZE: 15,
    categorys: [
        { id: '4812062598ec4b10bedfb38b59ea3e94', name: '请教' },
        { id: '26a6442976784f079b0ebc43da0d3487', name: '书单上新' },
        { id: 'fc955d0f79494f0bb9b46c1edada631b', name: '阅读场景' },
        { id: 'b1969f551e00485e855ea4f8d26aea4b', name: '见识灵感' },
        { id: '299c0a633b87429aa72c66656121427c', name: '专访幕后' },
        { id: '846cd0769ef9452aad0cc9c354ba07e3', name: '醒来再读' },
        { id: '7a8bbb7d262142cbb7ae5bf884935e81', name: '工具包' },
        { id: 'ce009ff186fa4203ab07bd1678504228', name: '口吃文案' },
        { id: '981892a5c2394fe7b01ce706d917699e', name: '招聘' }
    ]
};