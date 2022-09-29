---
layout: post
title: PicoCTF - WPA-ing Out
date:  2022-09-29
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/237?category=4&originalEvent=gym&page=1)

## Tags
PicoGym Exclusive / Forensics 

## Description
I thought that my password was super-secret, but it turns out that passwords passed over the AIR can be CRACKED, especially if I used the same wireless network password as one in the rockyou.txt credential dump.<br />
Use this '[pcap file](https://artifacts.picoctf.net/c/8/wpa-ing_out.pcap)' and the rockyou wordlist. The flag should be entered in the picoCTF{XXXXXX} format.

## Prereguisite
[Aircrack-Ng](https://www.kali.org/tools/aircrack-ng/), which  is a network software suite consisting of a detector, packet sniffer, WEP and WPA/WPA2-PSK cracker and analysis tool for 802.11 wireless LANs. 

## Writeup
1. Download the pcap file and [rockyou wordlist](https://www.kaggle.com/datasets/wjburns/common-password-list-rockyoutxt).
2. Crack
    ``` shell

    aircrack-ng -w rockyou.txt wpa-ing_out.pcap

    ```
    ![](https://i.imgur.com/tYfNhdU.png)