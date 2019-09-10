module.exports = {
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
