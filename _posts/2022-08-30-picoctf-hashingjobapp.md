---
layout: post
title: PicoCTF - HashingJobApp
date:  2022-08-30
tags: picoCTF
---
## [Challenge](https://play.picoctf.org/practice/challenge/243?category=5&originalEvent=69&page=1&solved=0)

## Tags
Beginner picoMini 2022 / General skill / shell / python / nc / hashing

## Description
If you want to hash with the best, beat this test!
``` shell
nc saturn.picoctf.net 54555
```

## Writeup
1. Run command `nc saturn.picoctf.net 54555`
2. Create a python script to transfer string to md5 hash
    ``` python
    import hashlib
    import sys

    def give_me_md5_hash(str):
      result = hashlib.md5((str).encode())

      # printing the equivalent hexadecimal value.
      print("The hexadecimal equivalent of hash is : ", end ="")
      print(result.hexdigest())
      
    give_me_md5_hash(sys.argv[1])
    ```
  Execute script in this way :
  ``` shell
  python3 HashingJobApp.py "some string" 
  # The hexadecimal equivalent of hash is : 53a09ce3db9c4d42c862dc0e29d777e5
  ``` 

3. It will ask you for md5 hash of string it give three times like below.
  ![](https://i.imgur.com/L2dvGQQ.png)
4. Here's flag: `picoCTF{4ppl1c4710n_r3c31v3d_674c1de2}` ٩(^ᴗ^)۶
