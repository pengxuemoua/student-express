// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  devServer: { // user devServer
    proxy: 'http://127.0.0.1:3000' // proxy req from vue app to our express server 
  }
}