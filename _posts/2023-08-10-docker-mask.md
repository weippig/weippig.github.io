---
layout: post
title: Docker - 安裝啟動錯誤整理
date:  2023-08-10
tags:  linux docker 
---
### 安裝報錯
安裝時顯示錯誤：Depends:containerd(>=1.2.6-0ubuntu1~)
1. 使用下面指令確認到底 containerd 包裝了沒
``` shell
dpkg -l containerd*
```
2. `containerd` 沒有安裝，所以用下面指令安裝：
``` shell
sudo apt install containerd
```
![](https://i.imgur.com/79sTf9y.png)

### 啟動報錯
要用 `systemctl start docker` 指令啟動 Docker daemon service 的時候，卻出現錯誤訊息，可以用下面兩種指令檢查：
1. 
``` shell
systemctl status docker.service
```
2. 
``` shell
systemctl list-unit-files | grep docker
```
如果顯示 docker.socket 被 ststemctl mask住，可以用下面指令解除：
``` shell
systemctl unmask docker.socket 
```