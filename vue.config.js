module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/zhenyab-project-01/dist/'
    : '/',
  lintOnSave: false,
  runtimeCompiler: true,
  /*
   * Force safari cache bug
   * https://github.com/vuejs/vue-cli/issues/1132#issuecomment-409916879
   */
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config
        .output
        .filename('[name].[hash].js')
        .end()
    }
  }
}
