---
layout: post
title: PicoCTF - Big Zip
date:  2022-08-31
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/322?category=5&page=3&solved=0)

## Tags
PicoGyn Exclusive / General skills

## Description
Unzip this archive and find the flag.<br />
- [Download zip file](https://artifacts.picoctf.net/c/553/big-zip-files.zip)

## Writeup
1. `wget https://artifacts.picoctf.net/c/553/big-zip-files.zip`
Now we have a zip file named big-zip-files.zip !
2. `unzip big-zip-files.zip`
3. `cd big-zip-files`
4. `grep -r picoCTF * `
5. Here's flag: `picoCTF{gr3p_15_m4g1c_ef8790dc}` ٩(^ᴗ^)۶

