---
layout: post
title:  "Solidity doc速讀筆記"
date:   2022-01-21 
author: weippig
tags: solidity
---

# Solidity

## 有用的web
* [solidity by example](https://solidity-by-example.org/)
* [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)

## Style Guide 值得注意的地方
[ 參考網址 ](https://docs.soliditylang.org/en/v0.8.10/style-guide.html)
* the Solidity compiler encourages the use of machine-readable SPDX license identifiers(用來標示許可). Every source file should start with a comment indicating its license:
``` solidity
// SPDX-License-Identifier: MIT
```
## State Variables
Variables whose values are permanently stored in contract storage.
* 可以被宣告成`constant` 或 `immutable`.
    * `constant` : The value has to be fixed at compile-time/ It is also possible to define constant variables at the file level.
    * `immutable` : It can still be assigned at construction time.

## Value Type
* `bool` : 包括constants `true` and `false`
* Integer：`int` / `unit`
* Fixed Point Numbers : `fixed` / `ufixed`
* Address
    * `address`: Holds a 20 byte value (size of an Ethereum address).
    * `address payable`: Same as address, but with the additional members transfer and send.可以接收Ether.
    * 可做Implicit和Explicit conversion.[參考](https://docs.soliditylang.org/en/v0.8.11/types.html#address)
    * 如果計畫要接收Ether，最好一開始就宣告`address payable`
    * Members of Address Types
        * ex. `balance` and `transfer`
         ```solidity
         address payable x = payable(0x123);
         address myAddress = address(this);
         if (x.balance < 10 && myAddress.balance >= 10) x.transfer(10);
        ```
        * `call`, `delegatecall` and `staticcall`
    * 注意： All contracts can be converted to address type, so it is possible to query the balance of the current contract using `address(this).balance`.
* Fixed-size byte arrays
    * The value types `bytes1`, `bytes2`, `bytes3`, …, `bytes32` hold a sequence of bytes from one to up to 32.
    * Dynamically-sized byte array像是`bytes`,`string` Not a value-type!
* String Literals and Types
    * They do not imply trailing zeroes as in C; "foo" represents three bytes, not four.
    * `"foo" "bar"` is equivalent to `"foobar"` -->遇到超長string的時候有用
* enum
    * default：第一個成員
    * Using `type(NameOfEnum).min` and `type(NameOfEnum).max` you can get the smallest and respectively largest value of the given enum.
    * Enums can also be declared on the file level, outside of contract or library definitions.

## Reference Types
* Structs, Arrays and Mappings.
* Use a reference type, you always have to explicitly provide the data area where the type is stored: 
    *  `memory`
    *  `storage`
    *  `calldata`
```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract C {
    // The data location of x is storage.
    // This is the only place where the
    // data location can be omitted.
    uint[] x;

    // The data location of memoryArray is memory.
    function f(uint[] memory memoryArray) public {
        x = memoryArray; // works, copies the whole array to storage
        uint[] storage y = x; // works, assigns a pointer, data location of y is storage
        y[7]; // fine, returns the 8th element
        y.pop(); // fine, modifies x through y
        delete x; // fine, clears the array, also modifies y
        // The following does not work; it would need to create a new temporary /
        // unnamed array in storage, but storage is "statically" allocated:
        // y = memoryArray;
        // This does not work either, since it would "reset" the pointer, but there
        // is no sensible location it could point to.
        // delete y;
        g(x); // calls g, handing over a reference to x
        h(x); // calls h and creates an independent, temporary copy in memory
    }

    function g(uint[] storage) internal pure {}
    function h(uint[] memory) public pure {}
}
```

## Arrays
* An array of 5 dynamic arrays of uint is written as `uint[][5]` --> 和其他語言相反
    * 宣告 `uint[][5] memory x` 後
            * access the seventh uint in the third dynamic array using `x[2][6]`
            * access the third dynamic array, use`x[2]`
* `X[3]` is always an array containing three elements of type X, even if X is itself an array --> 和其他語言不同
* Allocating Memory Arrays
    *  `uint[] memory a = new uint[](7);`
    *  As opposed to storage arrays, it is not possible to resize memory arrays (e.g. the `.push` member functions are not available)

### Array Literals
* 複雜
* `[1, 2, 3]` is `uint8[3] memory`, because the type of each of these constants is `uint8`. If you want the result to be a `uint[3] `memory type, you need to convert the first element to `uint`. ex. `[uint(1), 2, 3]`
* `[1, -1]` is invalid，因為第一個是`uint8`，而第二個是`int8`，應該寫成`[int8(1), -1]`
* Fixed size memory arrays cannot be assigned to dynamically-sized memory arrays
    * `uint[] memory x = [uint(1), 3, 4];` -->錯
    * 正確：分開assign值
    ```
        uint[] memory x = new uint[](3);
        x[0] = 1;
        x[1] = 3;
        x[2] = 4;
    ```
### Array Members
* length
* push()
* push(x)
* pop

### Special array
* `bytes`
* `string`

## Mapping Types
```solidity
mapping(_KeyType => _ValueType) _VariableName
```
* 可以想成hash table
*  the key data is not stored in a mapping, only its `keccak256` hash is used to look up the value. 所以對key沒有長度的限制
* The **_KeyType** can be any built-in value type, `bytes`, `string`, or any contract or enum type. Other user-defined or complex types, such as mappings, structs or array types are not allowed. 
* **_ValueType** can be any type, including mappings, arrays and structs.
* You cannot iterate over mappings, i.e. you cannot enumerate their keys. 但可以自己實作

## delete
* `delete a` assigns the initial value for the type to a. 
``` solidity
uint x = data;
delete x; // sets x to 0, does not affect data
delete data; // sets data to 0, does not affect x
uint[] storage y = dataArray;
delete dataArray; // this sets dataArray.length to zero, but as uint[] is a complex object, also
// y is affected which is an alias to the storage object
// On the other hand: "delete y" is not valid, as assignments to local variables
// referencing storage objects can only be made from existing storage objects.
```
* 如果delete a[x]，會刪除index x的element，造成array中間有個Gap.


## Function Type
```solidity
function (<parameter types>) {internal|external} [pure|constant|view|payable] [returns (<return types>)]
```
* 預設：internal，所以internal|external可省略
* External (or public) functions 的members:
    * `.address` returns the address of the contract of the function.
    * `.selector` returns the ABI function selector
    * `{gas: ...}` and` {value: ...}` to specify the amount of gas or the amount of wei sent to a function, respectively.


## Special global variable
* msg

## Events
* 是inheritable members

## Visibility and Getters
### external
* Part of the contract interface
* means they can be called from other contracts and via transactions. 
* An external function f cannot be called internally (i.e. `f()` does not work, but `this.f()` works).
### public 
* Part of the contract interface
* can be either called internally or via messages
* For public state variables, an automatic getter function (see below) is generated.
### internal
* can only be accessed internally (i.e. from within the current contract or contracts deriving from it),without using this. 
### private
* are only visible for the contract they are defined in and not in derived contracts.
### getter function
* The compiler automatically creates getter functions for all public state variables.
* The mapping and arrays (with the exception of byte arrays) in the struct are omitted because there is no good way to select individual struct members or provide a key for the mapping

## State Mutability
### view
Functions can be declared view in which case they promise not to modify the state.
下面行為被認為是 modifying the state:
* Writing to state variables.
* Emitting events.
* Creating other contracts.
* Using selfdestruct.
* Sending Ether via calls.
* Calling any function not marked view or pure.
* Using low-level calls.
* Using inline assembly that contains certain opcodes.
### pure
Functions can be declared pure in which case they promise not to read from or modify the state.
下面行為被認為是reading from the state:
* Reading from state variables.
* Accessing address(this).balance or address.balance.
* Accessing any of the members of block, tx, msg (with the exception of msg.sig and msg.data).
* Calling any function not marked pure.
* Using inline assembly that contains certain opcodes.
### payable
讓函式可以接收以太幣
[ 延伸閱讀 ](https://blogs.thebitx.com/index.php/2021/10/25/what-is-payable-in-solidity/)

## Special Functions
### Receive Ether Function
* 一個合約只能有一個receive function
* 宣告使用
    `receive() external payable { ... } `
        * 不用`function` keyword
        * 不能有arguments
        * 不能return東西
        *一定要有external visibility and payable state mutability
### Fallback Function
* 一個合約只能有一個fallback function
* 宣告使用
    `fallback () external [payable]` or 
    `fallback (bytes calldata _input) external [payable] returns (bytes memory _output)`
        * 不用`function` keyword
        * 不能有arguments
        * 不能return東西
        *一定要有external visibility



## 數字比對、字串比對
* 字串比較：
`keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2))`


## Error handling: Assert, Require, Revert and Exceptions
[ 參考網址 ](https://medium.com/blockchannel/the-use-of-revert-assert-and-require-in-solidity-and-the-new-revert-opcode-in-the-evm-1a3a7990e06e)
* The `assert` function creates an error of type `Panic(uint256)`.
* The `require` function either creates an error without any data or an error of type `Error(string)`.
* The `revert` statement takes a custom error as direct argument without parentheses:
    `revert CustomError(arg1, arg2);`
### try/catch
``` solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.1;

interface DataFeed { function getData(address token) external returns (uint value); }

contract FeedConsumer {
    DataFeed feed;
    uint errorCount;
    function rate(address token) public returns (uint value, bool success) {
        // Permanently disable the mechanism if there are
        // more than 10 errors.
        require(errorCount < 10);
        try feed.getData(token) returns (uint v) {
            return (v, true);
        } catch Error(string memory /*reason*/) {
            // This is executed in case
            // revert was called inside getData
            // and a reason string was provided.
            errorCount++;
            return (0, false);
        } catch Panic(uint /*errorCode*/) {
            // This is executed in case of a panic,
            // i.e. a serious error like division by zero
            // or overflow. The error code can be used
            // to determine the kind of error.
            errorCount++;
            return (0, false);
        } catch (bytes memory /*lowLevelData*/) {
            // This is executed in case revert() was used.
            errorCount++;
            return (0, false);
        }
    }
}
```


## Self Destruct
[ 參考網址 ](https://solidity-by-example.org/hacks/self-destruct/)
The only way to remove code from the blockchain is when a contract at that address performs the `selfdestruct` operation. 
很危險！如果其他人傳送Ether到已經被移除的合約地址，Ether會被永久遺失。

## 其他
* 可以返回多個return值
* 可以overloading--A contract can have multiple functions of the same name but with different parameter types
* 和c一樣有struct

