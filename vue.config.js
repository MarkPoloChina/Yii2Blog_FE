const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8088,
  },
  pages: {
    index: {
      entry: "./src/main.ts",
      title: "YII个人博客",
    },
  },
});
