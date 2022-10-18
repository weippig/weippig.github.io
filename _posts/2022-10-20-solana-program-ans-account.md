---
layout: post
title: Solana Program & Account
date:  2022-10-20
tags: solana blockchain
---

## Program

主打快速便宜的Solana有著和以太坊截然不同的Programming model，Solana 使用 Rust 作為編程語言，並將智能合約稱為 **Program** 。

Solana Program 與 以太坊智能合約不同之處在於：Solana Program 是 **stateless**。

以太坊的 world state 包含了所有以太坊帳戶、他們的 balance 、智能合約、智能合約使用到的資料等。這個機制的缺點在於：當用戶一直增加、新的智能合約被部署， world state 儲存的東西就越來越多，也就是說，如果想要成為一個 full node ， 電腦會需要更多的儲存空間。

而在 stateless 的區塊鏈，Program 不需要儲存數據，就只是簡單的指令，數據需要另外儲存在帳戶內。當調用一個Program 內的函數，需要將儲存這個函數所使用到的數據的帳戶地址也傳遞進去。


## Account

下面介紹三種 Solana Account ：

### Native Account

Solana 原生的帳戶，例如 System、Stake、Vote。

### Program Account

用以儲存 executable code。當客戶端和 Solana program 互動，它們會呼叫儲存在 program account 內的代碼。一個 program 可以用一到多個 data account 來儲存 state 。

### Data Account

用以儲存 state data 。又分為兩種：

1. System owned accounts
2. PDA (Program Derived Address) accounts

<img src="https://i.imgur.com/PnTwYFB.png" alt="account" style="width:600px;"/> 

上圖是與帳戶相關的欄位。每個帳戶都有自己的地址(公鑰)與擁有者。除了擁有者，其他人都沒辦法更改 Data account 儲存的資料，也沒辦法提款（但是可以存錢進去）。

現在假設我們要寫一隻計數器程序。我們需要建立兩個帳戶，一個用來儲存代碼，一個用來儲存計數的變數。如下圖：
<img src="https://i.imgur.com/PtsoVBd.png" alt="account" style="width:700px;"/>

## PDA (Program Derived Address) 是什麼？

Solana 將代碼與數據分離讓升級 Program 變得簡單。在Solana 可以在重用數據帳戶的同時，部署新版本的 Program 到相同地址，升級後數據並不會丟失。

然而，Solana也有一個令人尷尬的缺點。當每次要調用程序(Program)，想要修改狀態時，都要傳入Data account 地址，且需要相對應的私鑰才能進行修改，增加了開發上的麻煩，這個私鑰應該要存在哪裡呢？直接存在web2 作為環境變數好像有點奇怪，將私鑰存在程序本身、把data附加到程序上，變得類似以太坊是更好的辦法。PDA 由此而生。

PDA ，也就是程序派生帳戶，由一組種子與程序id 透過 `findProgramAddres` function 生成，如果找到的地址位於 ed2559 曲線上，便透過一個叫做 bump 方法進行跳躍，直到找到一個不位於 ed2559 的地址。這個方法生成的結果具有唯一性。

![pda-curve](https://i.imgur.com/tAkho3t.png)

有了 PDA ，程序可以直接對需要 PDA 的指令進行簽名。

![account-matrix](https://i.imgur.com/IgSYNjS.png)

<br />
[圖片來源](https://solanacookbook.com/zh/core-concepts/pdas.html#%E7%BB%BC%E8%BF%B0)