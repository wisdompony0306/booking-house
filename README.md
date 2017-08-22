#租房订单

## 技术简介

| **技术** | **描述** |
|----------|-----------------|
| vue2 | [https://cn.vuejs.org/](https://cn.vuejs.org/) |
| axios | [https://github.com/mzabriskie/axios](https://github.com/mzabriskie/axios) |
| jsonp | [https://github.com/webmodules/jsonp](https://github.com/webmodules/jsonp) |
| Flexible | [https://github.com/amfe/lib-flexible](https://github.com/amfe/lib-flexible) |
| Babel | [http://babeljs.io](http://babeljs.io) |
| ES6 | [http://es6.ruanyifeng.com/](http://es6.ruanyifeng.com/) |
| LESS |  [http://lesscss.cn/](http://lesscss.cn/) |
| Webpack | [http://webpack.github.io](http://webpack.github.io) |
| npm scripts | [https://docs.npmjs.com/misc/scripts](https://docs.npmjs.com/misc/scripts) |
| Mock.js | [http://mockjs.com/](http://mockjs.com/) |


## 目录结构

```
.
├── build                               # 打包好的文件
├── config                              # webpack配置文件
│   ├── webpack.base.config.js          # 基础打包文件
│   ├── webpack.dev.config.js           # 开发环境打包文件
│   └── webpack.prod.config.js          # 生产环境打包文件
├── docs                                # 文档
├── mock                                # mock测试数据模拟
├── node_modules                        # 
├── src                                 # 源码
│   ├── assets                          # 静态资源
│   ├── components                      # 组件
│   │	├── .....                       # 组件目录
│   │	└── index.js                    # 组件整体导出文件
│   ├── libs                            # 第三方库文件
│   ├── plugins                         # vue插件
│   │	├── appShim.js                  # app_20264.js封装,不直接调用
│   │	├── request.js                  # http请求封装 get post jsonp
│   │	└── vue.ext.js                  # 插件扩展
│   ├── service                         # 后端相关
│   │   └── api.js                      # 后端接口
│   ├── templates                       # 模板
│   ├── utils                           # 工具库
│   └── views                           # 页面入口文件
├── .gitignore                          # 
├── package.json                        # 
└── README.md                           # 
```

## 项目安装与运行

    git clone git@gitlab.58corp.com:fangfe/fang-booking.git
    npm install
    npm run build
    npm run dev
    
浏览器打开 [http://localhost:8080/](http://localhost:8080/) 进入 /build/views/ 下相应的目录