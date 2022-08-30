---
layout: post
title: PicoCTF - PW Crack 1
date:  2022-08-30
tags: picoCTF
---
## [Challenge](https://play.picoctf.org/practice/challenge/242?category=5&originalEvent=69&page=1&solved=0)

## Tags
Beginner picoMini 2022 / General skill / password cracking

## Description
Can you crack the password to get the flag? <br />
Download the password checker [here](https://artifacts.picoctf.net/c/53/level1.py) and you'll need the encrypted [flag](https://artifacts.picoctf.net/c/53/level1.flag.txt.enc) in the same directory too.

## Writeup
1. Download files
    ``` shell
    wget https://artifacts.picoctf.net/c/53/level1.py
    wget https://artifacts.picoctf.net/c/53/level1.flag.txt.enc
    ```
2. Check python code
    ``` python
    vim level1.py
    ```
3. The place surrounded by the red frame reveals that password is **8713**
4. `python level1.py` then input 8713 as password.
5. Here's flag: `picoCTF{545h_r1ng1ng_1b2fd683}` ٩(^ᴗ^)۶