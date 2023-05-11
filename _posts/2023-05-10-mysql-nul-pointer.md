---
layout: post
title: MySQL - invalid memory address or nil pointer dereference
date:  2023-05-10
tags:  sql Go
---
在 Go 連線資料庫之後做操作，卻出現以下錯誤：
```
runtime error: invalid memory address or nil pointer dereference
```
後來發現是 db 在程式中有重複宣告，所以以後出現這類型錯誤，先檢查物件是否是 nil。