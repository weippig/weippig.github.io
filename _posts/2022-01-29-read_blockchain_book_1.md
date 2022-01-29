---
layout: post
title:  "區塊鏈生存指南 讀書紀錄"
date:   2022-01-29 
author: weippig
tags: blockchain notes
---
<br />
書籍這裡買：[天瓏](https://www.tenlong.com.tw/products/9789864345779)、[博客來](https://www.books.com.tw/products/0010885571?loc=M_0039_002)

* 區塊鏈使用**私鑰加密**交易紀錄，節點用**公鑰解密**-->**數位簽章**，公鑰即像亂碼的錢包地址
* 主流公鏈如比特幣、以太坊的非對稱式加密透過橢圓公式ECC
* 區塊鏈的不可能三角：去中心化、安全、效能，只能三取二
* CBC是區塊鏈的前身！！區塊鏈因為鏈會分岔，所以也有重放攻擊，藉由讓鏈有獨立ID避免此問題

### 主流鏈
### Bitcoin 
"Be your own bank"
* 發明者中本聰
* 節點要挖礦也要接收外部請求，中本聰一開始也是以socket & thread 完成資料的接收與處理，一個thread 處理socket的連接，另一個處理接收後的資訊
* 區塊容量上限 1MB --> 3.3-7 TPS(transaction per seconds), visa : 1700 TPS
* 每2016個block調整一次difficulty，盡量10分鐘出一個block
* [BIP](https://github.com/bitcoin/bips)
    * Bitcoin的改善協議
* UXTO(Unspent Transaction Output) 架構-->用支票的方式交易
    * 每一張支票只能被使用一次-->可對抗雙花攻擊
    * 帳戶目前餘額：所有持有UXTO的金額總和
    * 優點：擴充性佳、隱私性提升
* 三次重大版本更新
    1. **多重簽名**
       Pay to Multi Signature(P2MS)/Pay to Script Hash(P2SH)
    2. **隔離驗證**(Segregaed Witness, Segwit)
        可以提升兩倍交易量，擴充區塊大小其實也可以，但區塊大傳播慢
    3. **閃電網路**(Lightning Network)
       * 鏈下擴容，微小的支付並不會馬上上鏈，而是去鏈上開閃電支付的通道，接著到鏈下把牽過的交易資訊給對方，等到要結算再統一上鏈
       * 只要與閃電網路任何一個節點開啟支付通道，那就可以與節點連接的所有閃電網路進行無延遲無手續費的交易
       * 要先抵押資產，就像要刷悠遊卡之前要先儲值
        
      

### Ethereum
* 具圖靈完備性
* 用Gas機制限制運算量、手續費，手續費上限=Gas Limit*Gas Price
    * Gas
    * Gas Price：願意為每個Gas付多少錢(Gwei)
    * Gas Limit：願意為了這筆交易買多少Gas
* 每個區塊的Gas上限：800萬Gas，誰出的Gas Price高，礦工就販售位置給誰，所以出的Gas Price越高，交易越快被打包進區塊。
* 約15秒出一次塊
* [EIP](https://eips.ethereum.org/)
    * Ethereum的改善協議
    * 以太坊基金會開發維護，會基於EIP發出相對應的ERC讓大家討論 ex.ERC20
* Account 架構-->像是銀行簽帳卡
    * 每筆交易都有一個遞增的nonce值，值越小越優先執行-->避免雙花攻擊
    * 優點：簡單、效率，不用產生額外UXTO


### 共識
#### 拜占庭將軍問題
整個Bitcoin全節點可以視作一種純P2P網路，為了保持各個節點間資料一致性，傳播資料要考慮有假造的節點，如何確保資料同步、一致性，形成共識？-->要對抗女巫攻擊(惡意使壞的節點)
* 問題背景：
    有很多將軍，要投票達成一致策略，要撤離或是要進攻城市，投票過程每位將軍要把自己的決定通知給其他所有將軍，總計自己的決定和收到的其他將軍的決定，就可以推算出共同結果。 但將軍裡可能有叛徒，會有以下問題
    1. 故意投不好的策略、不照最後決定行動
    2. 假其他將軍之名傳假訊息給別人
    3. 送信的信使被攔截

#### 證明自己有廣播/投票權利 
* 工作量證明 POW(Proof Of Work)
    * 手中必須持有運算力，不斷找nonce
    * 缺點：區塊鏈發展被礦池把持
* 權益證明 POS(Proof Of Stake)
    * 持幣越多，越有權力去廣播與投票

#### 實用拜占庭容錯(PBFT)
考慮視域變化(view-change)，分為三階段：
1. pre-prepare
2. prepare
3. commit

#### 分岔
有時候分岔不是因為技術、惡意節點、駭客，而是因為社群意見的分裂。
* 暫時性分岔
    因為網路延遲造成短時間不同步的現象
    * **孤兒塊Orphan Block** : 鏈長較短被捨棄的區塊、交易不算、沒獎勵
    * Ethereum因為出塊時間比較短，會產生的孤兒塊也比較多，所以改用叔塊機制
    * **叔塊Uncle Block** : 必須在出現暫時性分岔後的六代內被納進主鏈，間隔越多代，出塊獎勵越少


以下兩種跟軟體升級、程式碼或協定更動有關
* 軟分岔 Soft Fork
    * 更新完還是可以接受與過去版本間形成部分的共識-->向後相容
    * 新舊版本可以共存同個鏈
    * 以功能的更新居多
* 硬分岔 Hard Fork
    * 更新後完全無法與舊版本形成共識
    * 新舊版本不可共存於同個鏈上
    * 通常是共識規則的更新
        * 舊版本無法驗證新版本下產生的區塊
    * Ex.
      Ethereum Classic(ETC) 自 Ethereum 分岔出
      Bitcoin Cash(BCH) 自 Bitcoin 分岔出


### 隱藏交易細節
#### 零知識證明
* 不提供任何有關訊息的資料，仍可以說服對方該筆訊息是正確的
* 不讓礦工知道所有交易明細，但要說服對方這筆交易合法合規
* 核心：**同態隱藏 Homomorphic Hidings**

#### 主流匿蹤貨幣
* ZEC
* Monero(XMR)
* Dash
    * 有master node機制，並非去中心化的(decentralized)

### 其他技術
* Socket
    1. Stream socket (TCP)
    2. Datagram socket (UDP)

### 其他專有名詞
Initial Coin Offering(ICO)
Initial Exchange Offering(IEO)
Initial Fork Offering(IFO)
Security Token Offering(STO)

### 網站
* [Bitnodes](https://bitnodes.io/) --> 查看節點資料
* [Etherscan](https://etherscan.io/)
* [Etherchain](https://www.etherchain.org/)
* [Nanopool](https://nanopool.org/)
* [BITCOIN UTXO STATS](https://utxo-stats.com/)
* [LIGHTNING NETWORK EXPLORER](https://explorer.acinq.co/)
* [eth gas station](https://ethgasstation.info/) --> 查看目前出多少Gas price會在多少時間內被打包








