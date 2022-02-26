---
layout: post
title: 解決 5432 port 被PostgreSQL 佔用問題
date:   2022-02-26 
author: weippig
tags: postgresql port
---

當我在使用Docker啟用postgreSQL建置資料庫時，遇到了5432這個port被佔用的問題。
按照官網說明使用：
``` console
brew remove postgresql
```
之後，如果port還是被佔用的狀態，先用下面指令確認 port 5432 被佔用的狀況：
``` console
sudo lsof -i TCP:5432
```
我的Mac是出現以下畫面
![](https://i.imgur.com/3dff5p8.png)

輸入下列指令
``` console
sudo pkill -u postgres
```
再確認一次應該就可以了！
