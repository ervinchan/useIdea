import defaultPhoto from "../../images/user/default.png"
class Utils {
    static getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
    static transTreeData(data) {
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
    static uploadProps(fileList, callback, that = null) {
        return {
            onRemove: (file) => {
                that.setState((state) => {
                    const index = state.officeEnvi.indexOf(file);
                    const newFileList = state.officeEnvi.slice();
                    newFileList.splice(index, 1);
                    return {
                        // fileList: newFileList,
                        officeEnvi: newFileList
                    };
                });

            },
            beforeUpload: (file) => {
                var newUrl = ""
                var reader = new FileReader();
                reader.readAsDataURL(file);
                var that = this
                reader.onload = function (e) {
                    // 图片base64化
                    newUrl = this.result;
                    callback(file, newUrl)
                };

                return false;
            },
            fileList,
            showUploadList: false
        }
    }
    static setDefaultPhoto(e) {
        e.target.src = defaultPhoto
    }
    static gotoRouter(history, router, params) {
        // history.push({ pathname: router, state: params })
        debugger
        sessionStorage.setItem("aid", params);
        history.push({ pathname: router, state: { 'aid': params } })
    }
}

export default Utils