---
layout: post
title: PicoCTF - Sleuthkit Intro
date:  2022-09-26
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/301?category=4&originalEvent=70&page=1)

## Tags
PicoCTF 2021 / Forensics / sleuthkit

## Description
Description
Download the disk image and use `mmls` on it to find the size of the Linux partition. Connect to the remote checker service to check your answer and get the flag.
Note: if you are using the webshell, download and extract the disk image into `/tmp`not your home directory.
- [Download disk image](https://artifacts.picoctf.net/c/114/disk.img.gz)
- Access checker program: nc saturn.picoctf.net 52279

## Prereguisite
[mmls](https://www.kali.org/tools/binwalk/#:~:text=Binwalk%20is%20a%20tool%20for,for%20the%20Unix%20file%20utility.), which is a tool of sleuthkit used to display the partition layout of a volume system (partition tables).

## Writeup
1. Download the file.
    ``` shell
    
    wget https://artifacts.picoctf.net/c/114/disk.img.gz
    
    ``` 
2. Unzip.
    ```
    
    gzip -d disk.img.gz
    
    ```
3. Display the partition layout of a volume system (partition tables).
    ``` shell 
    
    mmls disk.img
    
    ```
4. `nc saturn.picoctf.net 52279` and input `202752`.
5. Here's flag ! `picoCTF{mm15_f7w!}` ٩(^ᴗ^)۶