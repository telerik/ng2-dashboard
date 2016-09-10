var webpack = require("webpack");
var ConcatSource = require("webpack/lib/ConcatSource");
//var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var path = require("path");
var failPlugin = require("webpack-fail-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

//HACK: changes the JSONP chunk eval function to `global["nativescriptJsonp"]`
// applied to tns-java-classes.js only
function FixJsonpPlugin(options) {
}

FixJsonpPlugin.prototype.apply = function (compiler) {
    compiler.plugin('compilation', function (compilation, params) {
        compilation.plugin("optimize-chunk-assets", function (chunks, callback) {
            chunks.forEach(function (chunk) {
                chunk.files.forEach(function (file) {
                    if (file === "tns-java-classes.js") {
                        var src = compilation.assets[file];
                        var code = src.source();
                        var match = code.match(/window\["nativescriptJsonp"\]/);
                        if (match) {
                            compilation.assets[file] = new ConcatSource(code.replace(/window\["nativescriptJsonp"\]/g, "global[\"nativescriptJsonp\"]"));
                        }
                    }
                });
            });
            callback();
        });
    });
};

module.exports = {
    context: path.resolve("./mobile"),
    entry: {
        "bundle": "./main",
        "tns-java-classes": "./tns-java-classes"
    },
    output: {
        pathinfo: true,
        path: path.resolve("./app"),
        libraryTarget: "commonjs2",
        filename: "[name].js",
        jsonpFunction: "nativescriptJsonp"
    },
    resolve: {
        extensions: [
            ".ts",
            "",
            ".js",
        ],
        modulesDirectories: [
            "node_modules/tns-core-modules",
            "node_modules"
        ]
    },
    resolveLoader: {
        root: path.join(__dirname, "..", "node_modules")
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.scss$/,
                loaders: [
                    // 'css?sourceMap',
                    // //'resolve-url',
                    // 'sass?sourceMap'
                    'raw', 'resolve-url', 'sass'
                ]
            },
        ]
    },
    plugins: [
        failPlugin,
        new webpack.optimize.CommonsChunkPlugin({
            name: ["tns-java-classes"]
        }),
        new webpack.DefinePlugin({
            global: 'global',
            __dirname: '__dirname',
            "global.TNS_WEBPACK": 'true',
        }),
        new CopyWebpackPlugin([
            { from: "**/*.css" }
        ]),
        new FixJsonpPlugin(),
    ]
};
