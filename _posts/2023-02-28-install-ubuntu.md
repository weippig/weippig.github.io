---
layout: post
title: 安裝  Ubuntu & Windows 雙系統
date:  2023-02-28
tags:  linux ubuntu
---


之前在已經有 Windows 系統的電腦安裝了 Ubuntu 雙系統，這邊做的筆記記錄一下！

## 檢查

1. 按下 Win + R 兩個按鍵，並輸入 msinfo32 
2. 找到 BIOS 模式的欄位，查看值是不是 UEFI
3. 不是的話不適用本篇教學

## 準備工作

1. 準備 8GB 以上的空USB
2. [下載 Ubuntu ISO](https://ubuntu.com/download) (不用放進 USB)
3. [分割磁碟](https://ofeyhong.pixnet.net/blog/post/221438016)，分出一個大於 60GB 的空間

## 建立 Bootable USB

1. 安裝 Rufus
2. 照著[官方指南](https://ubuntu.com/tutorials/create-a-usb-stick-on-windows#1-overview)操作

## 開始操作

1. Bootable USB 記得插在要安裝 Ubuntu 的電腦
2. 進去電腦 BIOS，方法可以參考[這篇](https://ofeyhong.pixnet.net/blog/post/179504851)到 step6
3. Advanced Mode → Security Boot → Security Boot Control 改為 Disabled
4. 把 Boot 中 USB Ubuntu 優先權移至第一位
5. 保存並重啟電腦

## Ubuntu 安裝引導

1. 進入黑色選擇面板，選第一個就行了
2. 在歡迎面板中，選擇英文與 Install Ubuntu
3. Keyboard layout，左右都選 English(US) 即可
4. 不連接網路
5. 更新與其他軟體，這邊我是保持 default 選項並按下一步
6. 安裝類型選 其他選項，才能讓 Windows 和 Ubuntu 共存
7. 進入分區選項

## 分區

共有五個分區，以下僅供參考，實際分區要自己的硬碟大小等而定：

### EFI

- 大小：200MB - 500MB
- 分區類型：邏輯分區
- 分區位置：空間起始位置
- 用於：EFI 系統分區

### Swap

- 大小：4GB 左右
- 分區類型：主分區
- 分區位置：空間起始位置
- 用於：交換空間

### 掛載點

- 大小：75GB 左右
- 分區類型：邏輯分區
- 分區位置：空間起始位置
- 用於：Ex4 日誌文件系統
- 掛載點(mount) : /

### 掛載點 /usr

- 大小：180GB 左右
- 分區類型：邏輯分區
- 分區位置：空間起始位置
- 用於：Ex4 日誌文件系統
- 掛載點(mount) : /usr

### 掛載點 /home

- 大小：300GB 左右，可以更大，視硬碟大小而定
- 分區類型：邏輯分區
- 分區位置：空間起始位置
- 用於：Ex4 日誌文件系統
- 掛載點(mount) : /home

設置安裝啟動設備，選擇 EFI 分區的設備號，彈出視窗確認後按確認。

## Turn off RFT

我在安裝 Ubuntu 的時候有遇到這個錯誤，照著以下步驟操作解決問題：

1. win + R，輸入 msconfig →系統設定 → 開機 → 開機選項 →安全開機(F)勾起來，下面的選項選最基本安全開機方式(M)
2. 在命令提示字元執行 `shutdown /t /fw /t 0` 會進入 BIOS頁面
3. Advanced Mode → Advanced → SATA Configuration → SATA Mode Selection → 將 RFT 選項改為 AHCI
4. 重複第一步，但是是把安全開機選項去掉
5. 啟動 Ubuntu

## 安裝一些套件等

ipconfig

```bash
sudo apt install net-tools
sudo apt install tree
```

Vim

```bash
sudo apt-get install vim
```

Visual studio code

```bash
sudo apt update
sudo apt install software-properties-common apt-transport-https curl

curl -sSL https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"

sudo apt update
sudo apt install code

# 測試成功了沒
code .
```

Git

```bash
sudo apt update
sudo apt install git
```

Docker

```bash
sudo apt-get install docker.io
service docker status
```

出現 `Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock` 錯誤的解決方式：

1. 建立 docker 群組
    
    ```bash
    sudo groupadd docker 
    
    ```
    
2. 把當前使用者加到群組
    
    ```bash
    sudo gpasswd -a $USER docker
    ```
    
3. 激活更改/重啟docker
    
    ```bash
    newgrp docker
    sudo systemctl restart docker
    ```
    

設置 ssh

```bash
cd ~/.ssh

pwd
# /home/wei/.ssh

sudo ssh-keygen -o -t rsa -C "your_github_mail_address"
```

1. Enter file in which to save the key (/root/.ssh/id_rsa): /home/wei/.ssh/id_rsa (剛剛 `pwd` 的路徑加上 /.ssh)
2. Enter passphrase: 可以空白也可以輸入
3. 重複 passphrase
4. `cat /home/wei/.ssh/id_rsa.pub` ，將公鑰複製起來
5. 開啟 github →setting →SSH and GPG keys →New SSH key，Title 隨便取，Key Type 維持預設，把複製的東西貼在 Key 的欄位 → Add SSH key
6. 記得 `sudo chmod 755 /home/wei/.ssh/id_rsa`  ，後面的路徑改成自己的 id_rsa 位置，來設置權限
7. 測試是否成功：`ssh -T git@github.com`
    
    成功的話會顯示：Hi 用戶名! You've successfully authenticated 等字
    

Go

```bash
sudo apt update
sudo apt upgrade

sudo apt search golang-go
sudo apt search gccgo-go

sudo apt install golang-go

# check 
go version
```

資料來源：

[https://www.bilibili.com/read/cv16108268?from=search](https://www.bilibili.com/read/cv16108268?from=search)

[https://zhuanlan.zhihu.com/p/268620595](https://zhuanlan.zhihu.com/p/268620595)

[https://www.myfreax.com/how-to-install-visual-studio-code-on-ubuntu-20-04/](https://www.myfreax.com/how-to-install-visual-studio-code-on-ubuntu-20-04/)