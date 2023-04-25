---
layout: post
title: Mysql - Change password
date:  2023-04-25
tags:  sql
---
我的 mysql 版本： mysql  Ver 8.0.32 for macos13 on x86_64 (MySQL Community Server - GPL)
在還記得原本密碼的情況下改密碼：
1. `mysql -u root -p` 輸入原本的密碼
2. ` ALTER USER 'root'@'localhost' IDENTIFIED BY '新密碼';`
