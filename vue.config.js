module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/scss/variables.scss"; @import "~@/scss/mixins.scss";`
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}