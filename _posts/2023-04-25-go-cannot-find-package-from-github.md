---
layout: post
title: Go - could not import github.com/go-sql-driver/mysql 
date:  2023-04-25
tags:  Go
---
這個問題也可能發生在其他引入 github package 的情況下，Go 1.17 後的版本需要 dependencies 被清楚標明在 `go.mod` 內，解決方法如下：
1. go mod init example.com/module (optional)
2. go mod tidy 

