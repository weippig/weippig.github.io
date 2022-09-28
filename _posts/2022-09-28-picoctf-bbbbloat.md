---
layout: post
title: PicoCTF - Bbbbloat
date:  2022-09-28
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/255?category=3&originalEvent=70&page=1)

## Tags
PicoCTF 2022 / Reverse Engineering / binary /obfuscation

## Writeup
1. Download the file.
2. We can use  `file` command to check its type.
    ``` shell

    file bbbbloat
    #bbbbloat: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=99c5c1ce06be240322c15bcabc3cd90318eb2003, for GNU/Linux 3.2.0, stripped

    ```
3. Use [IDA](https://hex-rays.com/ida-free/) analysis its pseudocode. (View > Open subviews > Generate pseudocode) 
    <img src="https://i.imgur.com/oz25R7g.png" /> 
4. Execute file and answer 549255.
    <img src="https://i.imgur.com/4f5gdnD.png" alt="remix" style="width:300px;"/> 