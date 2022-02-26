---
layout: post
title: 刪除 git 陰魂不散的 DS.Store
date:   2022-02-26 
author: weippig
tags: git
---

於terminal輸入：
``` console
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
```
輸入以下指令將.DS_Store加入.gitignore
``` console
echo .DS_Store >> .gitignore
```
commit .gitignore file
``` console
git add .gitignore
git commit -m '.DS_Store banished!'
```
[ 資料來源 ](https://stackoverflow.com/questions/107701/how-can-i-remove-ds-store-files-from-a-git-repository)
