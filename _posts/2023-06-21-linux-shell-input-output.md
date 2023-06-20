---
layout: post
title: Linux - Shell input & output
date:  2023-06-21
tags:  linux
---

把指令的輸出存到某個檔案：
``` shell
command > file
```
例如：
``` shell
echo hello > hello.txt
```
可以用 `cat hello.txt` 印出檔案內容。

> 注意！hello.txt 如果已經存在，會覆蓋掉原本的檔案！

不想覆蓋掉檔案，而是加在原檔案後面的話，將原本的指令的 > 改為 >> 
例如：
``` shell
echo hello >> hello.txt
```

### Pipe character
將某指令的輸出當作另一個指定的標準輸入，可以使用 pipe character (|)
例如：
``` shell
cat hello.txt | wc
```
`wc` 會印出會印出他的行數、單詞數、字符串數(包含 newline)，會發現是 1, 1, 6
把字串送進檔案、不包含 newline 的另一個作法是這個指令：
``` shell
printf hello > hello.txt    
```

### Reference
[[Linux]cat 搭配wc用法](https://easonliao1994.medium.com/linux-cat-%E6%90%AD%E9%85%8Dwc%E7%94%A8%E6%B3%95-36f86c40e719)