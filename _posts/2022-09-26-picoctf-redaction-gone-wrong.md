---
layout: post
title: PicoCTF - Redaction gone wrong
date:  2022-09-26
tags: picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/290?category=4&originalEvent=70&page=1)

## Tags
PicoCTF 2022 / Forensics

## Description
Now you DON’T see me.<br />
This [report](https://artifacts.picoctf.net/c/264/Financial_Report_for_ABC_Labs.pdf) has some critical data in it, some of which have been redacted correctly, while some were not. Can you find an important key that was not redacted properly?

## Prereguisite
[pdftotext](https://linux.die.net/man/1/pdftotext) <br />
You can download by `sudo apt install poppler-utils`.

## Writeup
1. Download the pdf.
    ``` shell

    wget https://artifacts.picoctf.net/c/264/Financial_Report_for_ABC_Labs.pdf

    ```
2. Convert pdf to txt.
    ``` shell

    pdftotext Financial_Report_for_ABC_Labs.pdf

    ```
3. Grep the flag.
    ```

    cat Financial_Report_for_ABC_Labs.txt| grep pico
    
    ```
4. Here's flag! `picoCTF{C4n_Y0u_S33_m3_fully}` ٩(^ᴗ^)۶
