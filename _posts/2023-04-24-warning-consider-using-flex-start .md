---
layout: post
title: autoprefixer - start value has mixed support, consider using flex-start 
date:  2023-04-20
tags:  css
---

在整合別人寫的 html + css 進 React 的時候，css 的部分出現了這個錯誤，改正方法如下：
1. 找到 css 檔案中 的 `justify-content: start;`
2. 將其改為 `justify-content: flex-start;`