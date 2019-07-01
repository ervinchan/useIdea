const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    // app.use(proxy('/zsl', { target: 'http://localhost:8080' }));
    app.use(proxy('/zsl', { target: 'http://120.77.43.218:8080' }));
    //app.use(proxy('/zsl', { target: 'http://47.94.253.240:8083' }));
    //app.use(proxy('/zsl', { target: 'http://192.168.2.125:8080' }));
};