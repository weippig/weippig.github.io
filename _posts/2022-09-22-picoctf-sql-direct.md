---
layout: post
title: PicoCTF - SQL Direct
date:  2022-09-22
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/303?category=1&originalEvent=70&page=1&solved=0)

## Tags
PicoCTF 2022 / Web Exploitation

## Description
Connect to this PostgreSQL server and find the flag!

## Writeup
1. Launch instance.
2. Open Websell and Log in .
3. Connect to sql by command `psql -h saturn.picoctf.net -p 61408 -U postgres pico` and input the password.
4. Use `\dt` command to show all table, there is only one table, which is named `flags`.
5. Use `SELECT * FROM flags;` command to check the content of table.
6. Here's flag: `picoCTF{L3arN_S0m3_5qL_t0d4Y_31fd14c0}` ٩(^ᴗ^)۶