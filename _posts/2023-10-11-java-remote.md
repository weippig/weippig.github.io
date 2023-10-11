---
layout: post
title: Java - Maven 編譯問題 (1)
date:  2023-10-11
tags:  java
---
在執行 `mvn install` 的時候，會跳出下面 Error:
```
maven is present in the local repository, but cached from a remote repository ID that is unavailable in current build context
```


**解決辦法**


至有問題的 package 資料夾底下，刪除 `_remote.repositories` 這個檔案。
