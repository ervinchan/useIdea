const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    // app.use(proxy('/zsl', { target: 'http://localhost:8080' }));
    app.use(proxy('/zsl', { target: 'http://120.77.43.218:8080' }));
};