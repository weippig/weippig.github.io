---
layout: post
title: PicoCTF - speeds and feeds
date:  2022-09-26
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/116?category=3&page=1)

## Tags
PicoCTF 2021 / Reverse Engineering

## Description
There is something on my shop network running at `nc mercury.picoctf.net 16524`, but I can't tell what it is. Can you?

## Prereguisite
[G-code](https://en.wikipedia.org/wiki/G-code)

## Writeup
1. Save G-code to the file
    ``` shell

    nc mercury.picoctf.net 16524 > g.gcode

    ```
2. Go to this [website](https://ncviewer.com/) and open `g.gcode`.
    ![](https://i.imgur.com/k0mXWet.png)
3. Here's flag ! `picoCTF{num3r1cal_c0ntr0l_e7749028}` ٩(^ᴗ^)۶