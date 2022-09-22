---
layout: post
title: PicoCTF - Who are you?
date:  2022-09-22
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/304?category=1&originalEvent=70&page=1&solved=0)

## Tags
PicoCTF 2021 / Web Exploitation 

## Description
Let me in. Let me iiiiiiinnnnnnnnnnnnnnnnnnnn <br />
http://mercury.picoctf.net:52362/

## Writeup 
Note that everyone 's port and flag are different! 
1. Visit this site, it says: Only people who use the official PicoBrowser are allowed on this site! So I use [ThunderClient](https://www.thunderclient.com/) to request website and change `User-Agent` in the header to `PicoBrowser`.
2. It says: I don't trust users visiting from another site. So we can add the key of `Referer` with the value `http://mercury.picoctf.net:52362/` to the header and request website again.
3. It says: Sorry, this site only worked in 2018. So we can add the key of `Date` with the value `1 Jan 2018` to the header and request website again.
4. It says: I don't trust users who can be tracked. So we can add the key of `DNT` which means do not track with the value `1` to the header and request website again.
5. It says: This website is only for people from Sweden. So we can add the key of [X-Forwarded-For](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For), which can change the originating IP, with the value [random Sweden IP address](https://lite.ip2location.com/sweden-ip-address-ranges) to the header and request website again.
6. It says: You're in Sweden but you don't speak Swedish? So we can add the key of `Accept-Language` with the value [sv](https://www.w3.org/International/ms-lang.html) to the header and request website again. Then we can get the flag! ٩(^ᴗ^)۶
    ![](https://i.imgur.com/TNdmCuy.png)
7. Header should be like : 
    <img src="https://i.imgur.com/IbAumQB.png" alt="remix" style="width:600px;"/> 