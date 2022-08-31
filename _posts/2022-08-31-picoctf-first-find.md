---
layout: post
title: PicoCTF - First Find
date:  2022-08-31
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/320?category=5&page=3&solved=0)

## Tags
PicoGyn Exclusive / General skills

## Description
Unzip this archive and find the file named 'uber-secret.txt'<br />
[Download zip file](https://artifacts.picoctf.net/c/550/files.zip)

## Writeup
1. `wget https://artifacts.picoctf.net/c/550/files.zip`
2. `unzip files.zip`
3. `cd files`
4. use `find` command to find file
``` shell
find . -name uber-secret.txt   
# ./adequate_books/more_books/.secret/deeper_secrets/deepest_secrets/uber-secret.txt
```
5. checkout .txt we found!
``` shell
cat ./adequate_books/more_books/.secret/deeper_secrets/deepest_secrets/uber-secret.txt
# picoCTF{f1nd_15_f457_ab443fd1} 
```
6. Here's the flag ! `picoCTF{f1nd_15_f457_ab443fd1}` ٩(^ᴗ^)۶
