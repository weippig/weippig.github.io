---
layout: post
title: Docker - Fail to do request (network)
date:  2025-10-29
tags:  docker
---

執行 `make images` 來 build docker image 的時候出現這個問題。
詳細錯誤：
```
ERROR resolve image config for docker-image://docker.io/docker/dockerfile:1.15.1 5.0s
##  > resolve image config for docker-image://docker.io/docker/dockerfile:1.15.1:
## Dockerfile:1
##    1 | >>> # syntax=docker/dockerfile:1.15.1
   2 |
   3 | ARG GO_VERSION=1.24.2
ERROR: failed to solve: failed to resolve source metadata for docker.io/docker/dockerfile:1.15.1: failed to do request: Head "https://registry-1.docker.io/v2/docker/dockerfile/manifests/1.15.1": proxyconnect tcp: dial tcp: lookup http.docker.internal on 192.168.65.7:53: read udp 192.168.65.6:55546->192.168.65.7:53: i/o timeout
View build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/wttlgr801i0kmd1vyit8722ek
make: *** [binary] Error 1
```
### 後來的解決辦法
1. 先用 `curl -I https://registry-1.docker.io/v2/` 指令確認，401 的話代表正常
2. 嘗試重啟 Docker
3. 可能是 builder 的問題，因此檢查一下 builder
    - 看有什麼 builder
      ```
      helenhuang@HelendeMacBook-Pro >> docker buildx ls
        NAME/NODE       DRIVER/ENDPOINT          STATUS    BUILDKIT
        default         docker                   running   v0.21.0
        \_ default      \_ default
        desktop-linux*  docker                   running   v0.21.0   ← 你正在用的（* 表示當前）
        \_ desktop-linux  \_ desktop-linux
      ```
    - 發現目前有兩個 builder，用的是第二個，問題就出在 desktop-linux
4. 且換到 default builder `docker buildx use default`  -> 問題解決！

