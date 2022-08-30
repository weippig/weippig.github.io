---
layout: post
title: PicoCTF - Glitch cat
date:  2022-08-30
tags: picoCTF
---
## [Challenge](https://play.picoctf.org/practice/challenge/242?category=5&originalEvent=69&page=1&solved=0)

## Tags
Beginner picoMini 2022 / General skill / shell / python / nc

## Description
Our flag printing service has started glitching!
``` shell
$ nc saturn.picoctf.net 65353
```

## Writeup
1. We can simply create a python file to transfer ascii code to char.
    ``` python
    flag_enc = chr(0x39) + chr(0x63) + chr(0x34) + chr(0x32) + chr(0x61) + chr(0x34) + chr(0x35) + chr(0x64) 
    print('picoCTF{gl17ch_m3_n07_'+ flag_enc + '}')
    ```
2. Here 's flag: `picoCTF{gl17ch_m3_n07_9c42a45d}` ٩(^ᴗ^)۶

