---
layout: post
title: 使用 @ethersproject 系列套件建立錢包
date:   2022-05-02
author: weippig
tags: ethers wallet 
---

使用@ethersproject旗下的系列套件時做一個具有註記的錢包
程式碼如下：

``` typescript
const ethWallet = require('@ethersproject/wallet')
const ethTx = require('@ethersproject/transactions')
import { computePublicKey } from '@ethersproject/signing-key'

const wallet = ethWallet.Wallet.createRandom() //隨機建立一個含有私鑰、註記詞的錢包

console.log(wallet.mnemonic.phrase) // 印出註記詞
console.log(wallet.publicKey) //印出公鑰
console.log(wallet.privateKey) //印出私鑰
console.log(wallet.address) //印出錢包地址

console.log(wallet.publicKey.substring(2)) //印出publicKeyHex
console.log(wallet.privateKey.substring(2)) //印出privateKeyHex
console.log(ethTx.computeAddress(wallet.publicKey)) //same to wallet.address
```
如果將privateKeyHex的值匯入metamask，會發現成功匯入，這個錢包的地址就是wallet.address！

