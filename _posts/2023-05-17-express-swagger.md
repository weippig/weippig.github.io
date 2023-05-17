---
layout: post
title: Express + Swagger 學習記錄
date:  2023-05-18
tags:  nodejs express
---
Express 後端寫到一半，想弄個 swagger 來做測試，也可一目了然現在有什麼 api，對網路上的學習資源做了一些整理：
## 方法：使用 swagger-autogen
1. 用下面指令安裝需要的 package
    ```
    npm install --save swagger-autogen swagger-ui-express
    ```
2. 建立 `swagger.js`
    ``` js
    const swaggerAutogen = require('swagger-autogen')()

    const outputFile = './swagger_output.json'
    const endpointsFiles = ['./app.js'] 

    swaggerAutogen(outputFile, endpointsFiles)
    ```
3. 在 `app.js` 加入程式碼：
    ``` js
    const swaggerUi = require('swagger-ui-express')
    const swaggerFile = require('./swagger_output.json') 

    app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    ```
4. 在終端機執行 `swagger.js`，自動產生 `swagger_output.json`
    ```
    node ./swagger.js
    ```
5. 進入 http://localhost:3000/api-doc/ 就可以看到 swagger ui 了！

資料來源
[使用 Swagger 自動生成 API 文件](https://israynotarray.com/nodejs/20201229/1974873838/)