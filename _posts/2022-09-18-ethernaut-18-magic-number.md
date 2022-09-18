---
layout: post
title: Ethernaut - 18. Magic Number 
date:  2022-09-18
tags: ethernaut solidity
---
## Difficulty: 🌕🌕🌕🌑🌑
> To solve this level, you only need to provide the Ethernaut with a `Solver`, a contract that responds to `whatIsTheMeaningOfLife()` with the right number. <br />
Easy right? Well... there's a catch.<br />
The solver's code needs to be really tiny. Really reaaaaaallly tiny. Like freakin' really really itty-bitty tiny: 10 opcodes at most.<br />
Hint: Perhaps its time to leave the comfort of the Solidity compiler momentarily, and build this one by hand O_o. That's right: Raw EVM bytecode.<br />
Good luck!

## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract MagicNum {

  address public solver;

  constructor() public {}

  function setSolver(address _solver) public {
    solver = _solver;
  }

  /*
    ____________/\\\_______/\\\\\\\\\_____        
     __________/\\\\\_____/\\\///////\\\___       
      ________/\\\/\\\____\///______\//\\\__      
       ______/\\\/\/\\\______________/\\\/___     
        ____/\\\/__\/\\\___________/\\\//_____    
         __/\\\\\\\\\\\\\\\\_____/\\\//________   
          _\///////////\\\//____/\\\/___________  
           ___________\/\\\_____/\\\\\\\\\\\\\\\_ 
            ___________\///_____\///////////////__
  */
}
```

## Writeup
1. Get new instance.
2. Create a new contract
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.6.0;

    contract MagicNumberCracker{
        constructor() public{
            assembly{
                mstore(0x00, 0x602a60005260206000f3)
                return(0x16, 0x0a)
            }
        }
    }
    ```
    How `0x602a60005260206000f3` come from ? 
    1. PUSH(0x2a) --> 0x602a (Push 42 onto the stack)
    2. PUSH(0x00) --> 0x6000 (Push memory slot 00 to stack)
    3. MSTORE --> 0x52 (Store 42 to memory slot 00)
    4. PUSH(0x20) --> 0x6020 (Memory slot size is 32 bytes)
    5. PUSH(0x80) --> 0x6000 (Value is stored at moemory slot 00)
    6. RETURN --> 0xf3 (Return value which is stored at memory 00 with sizeof 32 bytes)
3. Compile and Deploy.
4. Set Solver : 
    ``` javascript

    await contract.setSolver('MAGICNUMBERCRACKER_CONTRACT_ADDRESS')

    ```
5. Submit instance ξ( ✿＞◡❛)


## Reference
- [ethervm](https://www.ethervm.io/)
- [Solidity- Layout in memory](https://docs.soliditylang.org/en/v0.8.13/internals/layout_in_memory.html#layout-in-memory)
- [The Ethereum Virtual Machine](https://cypherpunks-core.github.io/ethereumbook/13evm.html)