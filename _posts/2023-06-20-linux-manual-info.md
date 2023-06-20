---
layout: post
title: Linux - Manual & Info
date:  2023-06-20
tags:  linux
---

查看 ls 指令的 manual page : 
``` shell
man ls 
```
![](https://i.imgur.com/2RwwBfW.png)
最上方 LS 旁邊的 (1) 代表這個指令他的類別，1 是 User commands (Programs)。詳細分類如下：
![](https://i.imgur.com/PUQCHlu.png)

不確定指令名字的時候，使用關鍵字搜尋 manual page:
``` shell
man -k keyword
```

另一種可以使用的指令是 info :
``` shell
info ls
```

### Reference
[man-pages(7) — Linux manual page](https://man7.org/linux/man-pages/man7/man-pages.7.html)