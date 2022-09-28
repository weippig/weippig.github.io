---
layout: post
title: PicoCTF - WebNet1
date:  2022-09-28
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/42?category=4&originalEvent=1&page=2)

## Tags
PicoCTF 2019 / Forensics 

## Description
We found this [packet capture](https://jupiter.challenges.picoctf.org/static/fbf98e695555a2a48fe42c9a245de376/capture.pcap) and [key](https://jupiter.challenges.picoctf.org/static/fbf98e695555a2a48fe42c9a245de376/picopico.key). Recover the flag.

## Prereguisite
[ssldump](https://linux.die.net/man/1/ssldump), which is an SSL/TLS network protocol analyzer.


## Writeup
1. Download packet capture and key.
2. `ssldump -r capture.pcap -k picopico.key -d > output`
3. `vim output`
4. [Search](https://linuxize.com/post/vim-search/) our flag.
    ![](https://i.imgur.com/hOnRO0H.png)