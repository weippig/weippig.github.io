---
layout: post
title: PicoCTF - Power Cookie
date:  2022-09-22
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/288?category=1&originalEvent=70&page=1&solved=0)

## Tags
PicoCTF 2022 / Web Exploitation

## Description
Can you get the flag? <br />
Go to this [website](http://saturn.picoctf.net:55287/) and see what you can discover.

## Writeup
1. Click Continue as guest button, there is a page tell you they don't have guest service.
2. Change `isAdmin` cookie value to 1.
3. Refresh the page.
4. Here's flag: `picoCTF{gr4d3_A_c00k13_5d2505be}` ٩(^ᴗ^)۶