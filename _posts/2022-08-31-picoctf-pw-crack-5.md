---
layout: post
title: PicoCTF - PW Crack 5
date:  2022-08-31
tags: picoCTF
---
## [Challenge](https://play.picoctf.org/practice/challenge/249?category=5&originalEvent=69&page=1&solved=0)

## Tags
Beginner picoMini 2022 / General skill / password cracking / hashing

## Description
Can you crack the password to get the flag? <br />
Download the password checker [here](https://artifacts.picoctf.net/c/81/level5.py) and you'll need the encrypted [flag](https://artifacts.picoctf.net/c/81/level5.flag.txt.enc) and the [hash](https://artifacts.picoctf.net/c/81/level5.hash.bin) in the same directory too. Here's a [dictionary](https://artifacts.picoctf.net/c/81/dictionary.txt) with all possible passwords based on the password conventions we've seen so far.

## Writeup
The challenge is quite similar to PW Crack 4, but we should know how to read `dictionary.txt` and then split and iterate it.<br />
Modify `level5.py` script to following code :
``` python 
import hashlib

### THIS FUNCTION WILL NOT HELP YOU FIND THE FLAG --LT ########################
def str_xor(secret, key):
    #extend key to secret length
    new_key = key
    i = 0
    while len(new_key) < len(secret):
        new_key = new_key + key[i]
        i = (i + 1) % len(key)        
    return "".join([chr(ord(secret_c) ^ ord(new_key_c)) for (secret_c,new_key_c) in zip(secret,new_key)])
###############################################################################

flag_enc = open('level5.flag.txt.enc', 'rb').read()
correct_pw_hash = open('level5.hash.bin', 'rb').read()


def hash_pw(pw_str):
    pw_bytes = bytearray()
    pw_bytes.extend(pw_str.encode())
    m = hashlib.md5()
    m.update(pw_bytes)
    return m.digest()


def level_5_pw_check(pw):
    user_pw = pw
    user_pw_hash = hash_pw(user_pw)
    
    if( user_pw_hash == correct_pw_hash ):
        print("Welcome back... your flag, user:")
        decryption = str_xor(flag_enc.decode(), user_pw)
        return decryption
    else:
        return "That password is incorrect"
    
list_ = open('dictionary.txt', 'r').read().split() #import txt and split it 

for x in list_: #iterate 
    res = level_5_pw_check(x)
    if res !="That password is incorrect" :
        print(res)
```
Here's flag: `picoCTF{h45h_sl1ng1ng_fffcda23}` ٩(^ᴗ^)۶


