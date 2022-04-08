---
layout: post
title: Error: invalid address or ENS name
date:   2022-04-06
author: weippig
tags: ether.js smart-contract blockchain hardhat
---

test 智能合約時，透過ethers.getSigners()建立Signer並使用
![](https://i.imgur.com/EYX524U.png)
跑 npx hardhat test 發現問題：Error: invalid address or ENS name (argument="name", value="<SignerWithAddress 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266>", code=INVALID_ARGUMENT, version=contracts/5.6.0)
![](https://i.imgur.com/T5ccpV8.png)

把alice使用console.log印出來看看
![](https://i.imgur.com/PWONFt5.png)

把 `{from: alice}` 改成 `{from: alice.address}`
Problem solved!
