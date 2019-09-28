var proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/api', proxy({
        target: 'http://localhost:8080',
        changeOrigin: true
    }));
    app.use('/ws', proxy({
        target: 'ws://localhost:8080',
        changeOrigin: true,
        ws: true
    }));
};