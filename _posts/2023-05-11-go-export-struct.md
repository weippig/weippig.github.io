---
layout: post
title: Go - Export struct
date:  2023-05-11
tags:  Go 
---
在研究怎麼 Export struct 時，找到說 struct 名字要大寫，但改成大寫後卻出現下面的警告：
```
export struct field is unused
```
原來是 struct field 也要改成大寫，變成 exported fields！