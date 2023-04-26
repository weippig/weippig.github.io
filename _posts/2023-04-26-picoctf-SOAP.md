---
layout: post
title: PicoCTF - SOAP
date:  2023-04-26
tags:  picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/355?category=1&originalEvent=72&page=1)

## Tags
PicoCTF 2023 / Web Exploitation / XXE

## Description
The web project was rushed and no security assessment was done. Can you read the /etc/passwd file?

## Writeup
1. Launch Instance 後，進入網站點選其中一項 detail，發現網站 POST 網址 http://saturn.picoctf.net:56031/data，要求酬載如下：
  ``` xml
  <?xml version="1.0" encoding="UTF-8"?><data><ID>1</ID></data> 
  ```
2. 所以我們的 xml injection 如下：<br />
    Headers
    <img src="https://i.imgur.com/sQhB4Qb.png" alt="pico">
    Body 
    <img src="https://i.imgur.com/rrLleQk.png" alt="pico">
3. 將請求送出後，可以在 response 找到我們的 flag！
    <img src="https://i.imgur.com/9G1zozi.png" alt="pico">
