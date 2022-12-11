---
layout: post
title: Find & open Temp folder in MacOS
date:  2022-12-11
tags:  linux
---

1. Find Temp folder path 
    ``` shell
    echo $TMPDIR
    ```
2. Open Temp folder directly
    ``` shell
    open $TMPDIR          
    ```
Don't delete or modify anything in the temp folder!