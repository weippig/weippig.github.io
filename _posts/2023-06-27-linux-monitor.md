---
layout: post
title: Linux - Monitoring
date:  2023-06-27
tags:  linux
---

How linux work 這本書看到了第八章，這一章主要在介紹一些可以監測 CPU / process / 資源 的工具，趁這個機會把其中一些指令記錄下來。

- `lsof` : list open files，這個指令會列出使用中的檔案與使用這個檔案的 process
- `top` : 可以持續地監看目前所有 process 狀況，包括 PID / CPU / memory / port 等
- `ps` : process status，雖然也是列出 process 的狀況，但是是快照的形式而不會持續性變動
- `uptime` : kernal 跑了多久、過去 1/5/15 分鐘的 load average

