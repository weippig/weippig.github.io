---
layout: post
title: Group descriptors corrupted
date:  2025-07-14
tags:  linux filesystem 
---

用 `systemctl start xx.service` 啟動某個 daemon 的時候，出現下面錯誤：

``` shell
EXT4-fs (sde3): ext4_check_descriptors: Checksum for group 0 failed (9679!=59862)
EXT4-fs (sde3): group descriptors corrupted!
```
這表示 /dev/sde3 分區的 ext4 superblock 或 group descriptor 出現校驗錯誤（corruption）。

### 修復方式
執行
``` shell
umount /dev/sde3  # 如果已掛載
e2fsck -f /dev/sde3
```
這會掃描並修復損壞的 metadata（會詢問是否修復，建議按 y）
如果你看到類似 "Inode bitmap checksums invalid" 等錯誤，也會自動修！