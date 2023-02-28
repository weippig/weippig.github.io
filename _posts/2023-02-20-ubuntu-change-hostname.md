---
layout: post
title: Ubuntu - 修改 hostname
date:  2023-02-20
tags:  ubuntu
---

1. 查看目前的 hostname
    
    ```bash
    hostname
    ```
    
2. 修改 etc/hostname
    
    ```bash
    sudo vim etc/hostname
    ```
    
3. 修改 etc/hosts 
    
    ```bash
    sudo vim etc/hosts
    ```
    
4. 運行以下指令
    
    ```bash
    sudo hostname -F /etc/hostname
    ```
    

重新開啟 terminal ，應該就可以看到新的 hostname 了！