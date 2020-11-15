const FileManagerPlugin = require("filemanager-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
let htmlPageNames = ["home"]; // page name

let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    inject: false,
    templateContent: ({ htmlWebpackPlugin }) => {
      return `
        <html>
          <head>
            <title>${htmlWebpackPlugin.options.title}</title>
            <script src="dist/lazysizes.min.js" async></script>
            <script src="dist/ls.unveilhooks.min.js" async></script>
            ${htmlWebpackPlugin.tags.headTags}
          </head>
          <body>
            <section id='app'></section>
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
      `;
    },
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  });
});
const entries = {
  home: ["@babel/polyfill", path.resolve(__dirname, "../src/index.js")]
};
const fileManagerPlugin = new FileManagerPlugin({
  events: {
    onStart: {
      delete: [path.resolve(__dirname, "../build/workbox*")]
    },
    onEnd: {
      copy: [
        {
          source: path.resolve(__dirname, "../src/assets/lazysizes.min.js"),
          destination: path.resolve(__dirname, "../build/dist/lazysizes.min.js")
        },
        {
          source: path.resolve(
            __dirname,
            "../src/assets/ls.unveilhooks.min.js"
          ),
          destination: path.resolve(
            __dirname,
            "../build/dist/ls.unveilhooks.min.js"
          )
        }
      ]
    }
  }
});

const resolve = {
  extensions: [".js", ".jsx"],
  alias: {
    Modules: path.resolve(__dirname, "node_modules")
  }
};

module.exports = {
  entries: entries,
  fileManagerPlugin: fileManagerPlugin,
  htmlWebpackPlugins: multipleHtmlPlugins,
  resolve: resolve
};
