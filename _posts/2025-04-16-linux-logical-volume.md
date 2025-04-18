---
layout: post
title: Logical Volume Manager
date:  2025-04-16
tags:  linux
---

在傳統的磁碟管理方式中，通常使用固定大小的磁碟分割（partitions）來配置空間。缺點在於一旦磁碟分割完成，要擴充空間或搬移資料都會變得困難甚至需要停機，缺乏彈性，而 LVM（邏輯卷管理器）為了解決這種問題應運而生。


邏輯卷管理器（LVM） 是一種儲存虛擬化軟體，旨在提升對實體儲存裝置的管理能力與彈性。它透過對底層硬體的抽象，允許你動態地建立、調整大小與刪除虛擬儲存設備。
在 LVM 的架構中：
- PV（Physical Volume）實體卷 是指原始的儲存裝置
- 多個 PV 可以被組合成一個 VG（Volume Group，卷組）
- 在 VG 中，LVM 可以分配空間來建立 LV（Logical Volume，邏輯卷），LV 就是一個虛擬區塊裝置，可被檔案系統、資料庫或應用程式當作普通磁碟使用。

![](https://imgur.com/hMQipx7)



### Reference 
- [Red Hat](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/configuring_and_managing_logical_volumes/index)
- [鳥哥](https://linux.vbird.org/somepaper/20050321-LVM-1.pdf)