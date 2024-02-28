---
layout: post
title: Typeorm - Error: Cannot find module
date:  2024-02-28
tags:  typeorm
---
在寫完 seed file 做執行的時候，卻出現下列錯誤：
```
Error: Cannot find module
```
這是因為在 seed.ts 內引入 entity 時的路徑關係
正確寫法：
``` typescript
import Flight from '../entity/Flight'
```
錯誤寫法：
``` typescript
import Flight from 'db/entity/Flight'
```
應使用相對路徑而非絕對路徑。
