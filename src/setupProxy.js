var proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/api',{
        target: 'http://localhost:8080',
        changeOrigin: true
    }));
    app.use(proxy('/ws',{
        target: 'ws://localhost:8080',
        changeOrigin: true,
        ws: true
    }));
    app.use(proxy('/sockjs-node',{
        target: 'ws://localhost:8080',
        changeOrigin: true,
        ws: true
    }));
};