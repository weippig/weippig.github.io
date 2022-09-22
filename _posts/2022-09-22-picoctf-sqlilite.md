---
layout: post
title: PicoCTF - SQLiLite
date:  2022-09-22
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/304?category=1&originalEvent=70&page=1&solved=0)

## Tags
PicoCTF 2022 / Web Exploitation / sql

## Description

## Writeup
1. Launch instance.
2. Login with random username and password. I use `admin` as username and `xx` as password.
  <img src="https://i.imgur.com/ZsKLuso.png" alt="remix" style="width:500px;"/>
3. Now we know the SQL query command, we can use SQL Injection to exploit it.
4. Use `OR 1=1--'` as username and password to login again.
  <img src="https://i.imgur.com/R1ajbTo.png" alt="remix" style="width:500px;"/>
5. The flag is hidden. So inspect elements to find it.
  <img src="https://i.imgur.com/8m97Vs4.png" alt="remix" style="width:600px;"/>
6. Here's flag: `picoCTF{L00k5_l1k3_y0u_solv3d_it_9b0a4e21}` ٩(^ᴗ^)۶