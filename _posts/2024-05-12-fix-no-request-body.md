---
layout: post
title: Request body is undefined
date:  2024-05-12
tags:  http
---
在試著打自己寫的 api 時，發現 Body 明明有以 JSON 的方式傳遞，使用 `fetch` function 打出去的時候，對面卻找不到Body，後來發現是兩個原因：

1. express 少了 `app.use(express.json())`
2. fetch function 的 Header 少了 `"Content-Type": "application/json"`