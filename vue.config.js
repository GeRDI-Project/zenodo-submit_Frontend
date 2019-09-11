module.exports = {
  publicPath: '/submit/zenodo/',
  devServer: {
    proxy: {
      "/api": {
        target: "https://www.test.gerdi.org",
        changeOrigin: true,
        headers: {
          'Authorization': 'Bearer xxx'
        }
      }
    }
  }
};
