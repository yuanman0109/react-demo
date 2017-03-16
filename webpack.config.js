var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');
module.exports={
    entry:'./app/main.js',
    output:{
        path:path.join(__dirname,'build'),
        filename: "js/[name].[hash].js"
    },
    module:{
        loaders:[
            {
                test: /\.js(x)*$/,
                loader: 'babel-loader',
                include: [
                    // 只去解析运行目录下的 app文件夹，提升webpack打包效率
                    path.join(process.cwd(), './app'),
                ],
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test:/\.css$/,
                loader: ExtractTextPlugin.extract({fallback:'style-loader', use:'css-loader'})
            },
            {
                test:/\.scss$/,
                loader: ExtractTextPlugin.extract({fallback:'style-loader', use: ['css-loader', 'sass-loader'],publicPath: '../'})
            },
            //编译sass文件
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} 
            //对图片进行打包
        ]
    },
    //生成的sourcemap的方式
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
    resolve: {
        //自动扩展文件后缀名
        extensions: [' ', '.js', '.json', '.scss', '.ts']
    },
    devServer: {
        contentBase: "/build", //静态资源的目录,
        historyApiFallback: true,
        port: 8080,
        inline:true,
        open:true
    },
    plugins: [
	    new ExtractTextPlugin("css/[name].[contenthash].css"),//则会生成一个css文件
		new HtmlwebpackPlugin({
	      filename: 'index.html',
	      template: 'index.html',
	      inject: true
	    })
	]
}