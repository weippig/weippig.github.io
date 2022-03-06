---
layout: post
title: 解決部署合約 insufficient funds for gas * price + value 問題
date:   2022-03-06
author: weippig
tags: truffle smart-contract blockchain geth
---

當我在建置完geth客戶端私有鏈後，想要把truffle範例中的Metacoin部署上去，卻出現了以下的問題：
![](https://i.imgur.com/kk5AkFE.png)

在genesis.json中定義的gasLimit是8000000，而現在的gasprice可以透過javascript console內的指令eth.gasPrice來查詢，得到如下圖結果：
![](https://i.imgur.com/i8Fexrk.png)


#### 解決辦法
如果是在私有鏈的情況下，可以透過在geth指令後方加上--miner.gasprice '0' 來解決這個問題。
加上此flag後再重啟客戶端，透過eth.gasPrice指令查詢，此時gasPrice變成0了！當然也就不會有insufficient funds的問題。
