---
layout: post
title: PicoCTF - Search source
date:  2022-09-22
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/295?category=1&originalEvent=70&page=1&solved=0)

## Tags
PicoCTF 2022 / Web Exploitation

## Description
The developer of this website mistakenly left an important artifact in the website source, can you find it?<br />
The website is [here](http://saturn.picoctf.net:58133/)

## Writeup
1. `wget -m http://saturn.picoctf.net:58133/` to get source code.
2. `grep -r 'picoCTF' saturn.picoctf.net:58133` to search the flag!
3. Here's flag: `picoCTF{1nsp3ti0n_0f_w3bpag3s_587d12b8}` ٩(^ᴗ^)۶
