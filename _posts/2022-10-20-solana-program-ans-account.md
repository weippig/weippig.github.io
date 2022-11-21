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

下列介紹一些 Solana 中的 Native Program。Native Program 類似於 Fabric 中的系統合約或是以太坊的預編譯合約，是作為 validator 的一部分運行，且可能隨著版本升級進行升級

目前支持的 Native Program 有：

- System Program
    - 創建新帳號
    - 指派 account 給它所屬的 program
    - 轉帳
    - program id ：11111111111111111111111111111111
- Stake Program
    - 管理質押者質押與存放獎勵的帳號
- Vote Program
    - 管理質押者投票相關資料
- BPF Loader
    - 部署合約到鏈上
    - 升級鏈上合約
    - 執行鏈上合約
- Secp256k1 Program
    - 幫助從簽名中還原出公鑰與地址，如同以太坊中的 ecrecover 函數

等等….

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

## Rent

另外，值得一提的是，在 Solana 建立 accounts 存放資料是要花錢的，這個行為被稱作 Rent。

使用下列指令可以查看存放 15000 bytes 的資料需要多少資金。

```bash
solana rent 15000
```

![截圖 2022-11-21 下午7.23.37.png](https://imgur.com/WTHbPYt.png)

第三行有一個詞叫做 Rent-exempt，這是什麼意思呢？其實就是：如果該帳號持有超過兩年份的租金，就可以免收費。以上圖為例，建立帳號時存入 0.10529088 SOL，若想廢棄該帳號的使用，將這些錢全部轉出來，該帳號就會自動被銷毀

目前，在 Solana 上建立帳號強制 Rent-exempt。