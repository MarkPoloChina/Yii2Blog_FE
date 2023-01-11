const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: "./src/main.ts",
      title: "YII个人博客",
    },
  },
})
