var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var env = process.env.NODE_ENV=='production'?true:false;
var webpackConfig={
    entry:{
        'app':[
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            // bundle the client for webpack-dev-server
            'webpack/hot/only-dev-server',
            path.resolve(__dirname,'./app/main.js')
        ],
        'vendors':['react','react-dom']
    },
    output:{
        path:path.resolve(__dirname,'build'),
        filename: "js/[name].[hash].js"
    },
    module:{
        rules:[
            {
                test: /\.js(x)*$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            },
            //编译sass文件
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} 
            //对图片进行打包
        ]
    },
    //生成的sourcemap的方式
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
    resolve: {
        alias: {
        },
        //自动扩展文件后缀名
        extensions: [' ', '.js','.jsx','.css','.json', '.scss', '.ts']
    },
    devServer: {
        contentBase: "/build", //静态资源的目录,
        historyApiFallback: true,
        port: 8080,
        inline:true,
        open:true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendors',
            filename: "js/vendors.[hash].js"
        }),
		new HtmlwebpackPlugin({
	      filename: 'index.html',
	      template: 'index.html',
	      inject: true
	    })
	]
};
if(env){
    module.exports=merge(webpackConfig,{
        module:{
            rules:[
                {
                    test:/\.css$/,
                    loader: ExtractTextPlugin.extract({fallback:'style-loader', use:'css-loader'})
                },
                {
                    test:/\.scss$/,
                    loader: ExtractTextPlugin.extract({fallback:'style-loader', use: ['css-loader', 'sass-loader'],publicPath: '../'})
                }
            ]
        },
        plugins:[
            new ExtractTextPlugin("css/[name].[contenthash].css"),//则会生成一个css文件
        ]
    })
}else{
    module.exports=merge(webpackConfig,{
        module:{
            rules: [
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                },
                {
                    test: /\.scss$/,
                    use: [{
                            loader: "style-loader" // creates style nodes from JS strings
                        }, {
                            loader: "css-loader" // translates CSS into CommonJS
                        }, {
                            loader: "sass-loader" // compiles Sass to CSS
                    }]
                }
            ]
        }
    })
}