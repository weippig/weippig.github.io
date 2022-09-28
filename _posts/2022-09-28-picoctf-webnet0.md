---
layout: post
title: PicoCTF - WebNet0
date:  2022-09-28
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/32?category=4&originalEvent=1&page=2)

## Tags
PicoCTF 2019 / Forensics 

## Description
We found this [packet capture](https://jupiter.challenges.picoctf.org/static/0c84d3636dd088d9fe4efd5d0d869a06/capture.pcap) and [key](https://jupiter.challenges.picoctf.org/static/0c84d3636dd088d9fe4efd5d0d869a06/picopico.key). Recover the flag.

## Writeup
1. Download packet capture and key.
2. Use Wireshark to open packet capture.
3. Prefrence > Protocal > TLS > RSA key list edit > add key we download.
4. Analysis TLS stream.
    ![](https://i.imgur.com/cn12Nee.png)

## Reference
[Decrypting TLS Streams With Wireshark: Part 1](https://blog.didierstevens.com/2020/12/14/decrypting-tls-streams-with-wireshark-part-1/)