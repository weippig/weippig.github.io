---
layout: post
title: 添加.well-known路徑及檔案
date:   2022-07-13
tags: jekyll
---

如申請SSL憑證時，會遇到如下圖驗證步驟：


![](https://i.imgur.com/GxtduJH.png)


網路上遍尋不著教學，後來發現可能是方法太簡單，方法如下：
1. 在前端程式目錄新增 `.well-known` 資料夾(與子資料夾，以上圖範例為例的話應該於.well-known底下再建立建立pki-validation資料夾，視應用場景而定)，將 `.txt, .json` 檔案置入
2. config.yml 新增一行 `include: [".well-known"]`