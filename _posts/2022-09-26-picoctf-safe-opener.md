---
layout: post
title: PicoCTF - Safe Opener
date:  2022-09-26
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/294?category=3&originalEvent=70&page=1)

## Tags
PicoCTF 2022 / Reverse Engineering

## Description
Can you open this safe?<br />
I forgot the key to my safe but this [program](https://artifacts.picoctf.net/c/463/SafeOpener.java) is supposed to help me with retrieving the lost key. Can you help me unlock my safe?<br />
Put the password you recover into the picoCTF flag format like: <br />
`picoCTF{password}`

## Writeup
1. Download the progrem `SafeOpener.java`. There is a method named `openSafe` used to check if password correct. String `encodedkey` is password which was transferd to byte array and encode.
2. We can derive the password by decoding string `encodedkey`. Add four lines to `openSafe` method.
    ![](https://i.imgur.com/6k2Kzbo.png)
3. Execute the program. Here's flag! `picoCTF{pl3as3_l3t_m3_1nt0_th3_saf3}` ٩(^ᴗ^)۶
