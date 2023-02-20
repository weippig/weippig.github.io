---
layout: post
title: Go - 解決每次都要重新 mount /proc 的問題
date:  2023-02-18
tags:  Go
---

照著 [Deep into Container — Build your own container with Golang](https://faun.pub/deep-into-container-build-your-own-container-with-golang-98ef93f42923) 這篇教學操作的時候，發現每次結束都需要執行：
``` shell
sudo mount -t proc proc /proc
```
上網查之後，發現將 `must(syscall.Mount("proc", "proc", "proc", 0, ""))` 改為以下程式碼，聲明這個新的 mount namespace 獨立：
``` go
must(syscall.Mount("", "/", "", syscall.MS_PRIVATE|syscall.MS_REC, ""))
defualtMountFlags := syscall.MS_NOEXEC | syscall.MS_NOSUID | syscall.MS_NODEV
must(syscall.Mount("proc", "/proc", "proc", uintptr(defualtMountFlags), ""))
```


[Resource](https://github.com/xianlubird/mydocker/issues/41)