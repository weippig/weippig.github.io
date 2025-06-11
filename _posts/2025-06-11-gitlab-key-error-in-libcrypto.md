---
layout: post
title: Error loading key "/root/.ssh/repo_key" error in libcrypto
date:  2025-06-11
tags:  linux
---

遇到錯誤 Error loading key "/root/.ssh/repo_key": error in libcrypto ，卡了非常久，試過 chatgpt 建議的各種方法。
最後發現是 private key 檔案後必須要有 newline...
