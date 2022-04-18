const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/flask/api',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_URL}`,
      changeOrigin: true,
    })
  );
};