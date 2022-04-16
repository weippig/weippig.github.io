
---
layout: post
title: 解決 github page can not enable https 問題
date:   2022-04-16
author: weippig
tags: github cloudflare
---

購買網域並使用Cloudflare配置DNS後，想在github page勾選Enforce https讓網頁可以進行安全連線，卻發現如下問題：
![](https://i.imgur.com/EK7swXf.png)

原因：
Cloudflare會預設啟用代理功能(顯示Proxied的橘色雲朵狀態)，因此github沒辦法查看生成證書需要的DNS資訊。

解決方法：
![](https://i.imgur.com/S7cCpLM.png)
將和github page有關的DNS設定改為灰色雲朵DNS only，回到github page頁面，重新設定一次custom domain。


![資料來源](https://iqiqiya.com/posts/b1adab59.html)
