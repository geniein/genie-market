const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'genie-marker',
    mode: 'development', // 실서비스: production
    devtool: 'eval', // 빠르게
    entry: {
        app: ['./src/index.js']
      },
      output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/',
      },
      module: {
    
      },
      plugins: [],
      optimization: {},
      resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
      },    
      module: {
        rules: [{
            test: /\.js?/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
        	  test: /\.css$/,
              use: [{
                      loader: 'style-loader'
                  },
                  {
                     loader: 'css-loader'
                  }
              ]
          },          
        ],
      },
    // module: {
    //     rules: [{
    //         test: /\.jsx?/,
    //         loader: 'babel-loader',
    //         options: {
    //             presets: [
    //                 // preset 에 상세 옵션 줄때 아래와 같이 설정 가능
    //                 ['@babel/preset-env', {
    //                     targets: {
    //                         browsers: ['> 5% in KR'], // 한국에서 점유율 5% 이상 브라우저에 대응
    //                     },
    //                     debug: true,
    //                 }], '@babel/preset-react'], // plugin 들의 모음이 preset 임.
    //             plugins: [
    //                 '@babel/plugin-proposal-class-properties',
    //                 'react-refresh/babel'
    //                 ]
    //         },
    //     }],
    // },
    plugins: [
      new webpack.ProvidePlugin({
        "React": "react",
     }),
    new webpack.LoaderOptionsPlugin({ debug: true }),
        // new RefreshWebpackPlugin(),
    ], // 추가적으로 붙이고 싶은 것들이 있으면 여기

    // output: {
    //     // path 와 publicPath 의 차이
    //     // path는 실제경로. publicPath 는 가상의 경로(상대경로)
    //     path: path.join(__dirname, 'dist'), // path.join 은 현재폴더 경로 + dist 를 반환함
    //     filename: 'app.js',
    //     publicPath: '/dist/', // publicPath 는 node의 express.static 과 비슷
    // }, // 출력
    
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:8080'
        },
        devMiddleware: {publicPath:'/dist/',writeToDisk: true},
        hot: true, // 핫리로딩 - 변경점 감지
        port: 3100
    },
    
};