---
layout: post
title: MySQL - You have an error in your SQL syntax
date:  2023-05-09
tags:  sql
---

在執行 `source xx.sql` 執行 SQL 指令的時候，一直出現以下錯誤：
```
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '一些SQL指令'
```

後來發現是 CREATE 指令結束、 INSERT 指令前沒有加上分號......特地打一篇警惕自己！