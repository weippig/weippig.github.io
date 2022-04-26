---
layout: post
title: eslint error: mocha 'describe' is not define 
date:   2022-04-27
author: weippig
tags: mocha eslint
---

撰寫test檔時，發現以下eslint報的錯
![](https://imgur.com/QNRGBNf)

解決辦法：
`.eslintrc`檔案中加上：
``` json
"env": {
	"mocha": true
},
``` 

[資料來源](https://jeremysu0131.github.io/ESLint-Mocha-describe-is-not-defined/)