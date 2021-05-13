const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  devServer: {
    port: 9999
    // proxy: {
    //     '/lili': {
    //         target: 'http://127.0.0.1:8888',  // 请求本地 需要lili后台项目
    //         ws: true
    //     }
    // }
  },

  chainWebpack: config => {
    //  @ 对应 src目录
    config.resolve.alias.set("@", resolve("src"));
  },

  // 打包时不生成.map文件 避免看到源码
  productionSourceMap: false,

  // 部署优化
  configureWebpack: {
    // 使用CDN
    externals: {
      vue: "Vue",
      "vue-i18n": "VueI18n",
      axios: "axios",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      "view-design": "iview",
      xlsx: "XLSX",
      dplayer: "DPlayer",
      "print-js": "printJS",
      html2canvas: "html2canvas",
      "vue-json-pretty": "VueJsonPretty",
      "vue-lazyload": "VueLazyload",
      gitalk: "Gitalk",
      "js-cookie": "Cookies",
      wangEditor: "wangEditor",
      quill: "Quill",
      stompjs: "Stomp",
      "sockjs-client": "SockJS",
      vuedraggable: "vuedraggable"
    },
    // GZIP压缩
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/, // 匹配文件
        threshold: 10240 // 对超过10k文件压缩
      })
    ],
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace("@", "")}`;
            }
          }
        }
      }
    }
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/common.scss")]
    }
  }
};
