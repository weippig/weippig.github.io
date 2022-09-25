---
layout: post
title: PicoCTF - Matryoshka doll
date:  2022-09-25
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/129?category=4&originalEvent=34&page=1)

## Tags
PicoCTF 2021 / Forensics

## Description
Matryoshka dolls are a set of wooden dolls of decreasing size placed one inside another. What's the final one?<br />
Image: [this](https://mercury.picoctf.net/static/205adad23bf9d8303081a0e71c9beab8/dolls.jpg)

## Prereguisite
[Binwalk](https://www.kali.org/tools/binwalk/#:~:text=Binwalk%20is%20a%20tool%20for,for%20the%20Unix%20file%20utility.), which is a tool for searching a given binary image for embedded files and executable code. 

## Writeup
1. Download the file. 
    ``` shell

    wget https://mercury.picoctf.net/static/205adad23bf9d8303081a0e71c9beab8/dolls.jpg

    ```
2. Unzip the file
    ``` shell

    binwalk -e dolls.jpg
    
    ```
3. Use `ls` command, we can see that there are one file(`dolls.jpg`) and one folder(`_dolls.jpg.extracted`). Second picture(`2_c.jpg`) is in `_dolls.jpg.extracted/base_images`.
4. Repeat unzip like step 2 three times.
    ``` shell

    cd _dolls.jpg.extracted/base_images
    binwalk -e 2_c.jpg
    cd _2_c.jpg.extracted/base_images
    binwalk -e 3_c.jpg
    cd _3_c.jpg.extracted/base_images
    binwalk -e 4_c.jpg
    cd _4_c.jpg.extracted

    ```
5. Now If we use `ls` command to list all file under the folder, there is a file named `flag.txt` !
6. Here's our flag. ٩(^ᴗ^)۶
    ``` shell

    cat flag.txt
    # picoCTF{96fac089316e094d41ea046900197662}

    ```
