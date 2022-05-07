---
layout: post
title: 使用Hardhat與Infura部署合約
date:   2022-05-07
author: weippig
tags: hardhat infura
---

## 小試身手

1.Retrieve the Current Block Number
```bash
curl [https://mainnet.infura.io/v3/](https://mainnet.infura.io/v3/YOUR-PROJECT-ID)YOUR_PROJECT_ID \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_blockNumber","params": [],"id":1}'
```

回傳了以十六進制表示的block number：`{"jsonrpc":"2.0","id":1,"result":"0xdf9bca"}`

2.Check the Ether Balance For a Given Contract

```bash
curl [https://rinkeby.infura.io/v3/](https://mainnet.infura.io/v3/YOUR-PROJECT-ID)YOUR_PROJECT_ID \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBalance","params": ["0xBf4eD7b27F1d666546E30D74d50d173d20bca754", "latest"],"id":1}'
```

回傳`{"jsonrpc":"2.0","id":1,"result":"0x159fa21f4e8b7e715de0"}` ，result中的字串代表合約的balance，單位是*wei*，一個*Ether*約等於10¹⁸ *wei*。

___

## 建立交易看看吧

1.建立Ethereum帳號(可使用例如metamask)
2.建資料夾立然後進入
    
```bash
mkdir sendTransaction
cd sendTransaction
```
    
3.安裝需要的packages
    
```bash
npm install web3
npm install dotenv --save
```
    
<mark style="background-color:lightyellow;">💡 `dotenv` package用來讓使用者建立.env檔案、安全地存放本地環境變數。</mark>
    
    
4.建立`.env`檔案，內容：
    
```bash
ETHEREUM_NETWORK = "rinkeby"
INFURA_PROJECT_ID = "<Project-ID>"
SIGNER_PRIVATE_KEY = "<Private-Key>"
```
    
- `<Project-ID>` 在infura dashboard→setting 內可以找到
- `<Private-Key>` 以太坊帳號私鑰，導出metamask私鑰可看[這篇](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)
- ETHEREUM_NETWORK 因自己在哪個網路而異，不一定是rinkeby

5.建立`send.js`檔案，內容：

```jsx
const Web3 = require("web3");

async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    )
  );
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY
  );
  web3.eth.accounts.wallet.add(signer);
  // Creating the transaction object
  const tx = {
    from: signer.address,
    to: "0xAED01C776d98303eE080D25A21f0a42D94a86D9c",
    value: web3.utils.toWei("0.001"),
  };
  // Assigning the right amount of gas
  tx.gas = await web3.eth.estimateGas(tx);

  // Sending the transaction to the network
  const receipt = await web3.eth
    .sendTransaction(tx)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
}

require("dotenv").config();
main();
```
    
6.執行
    
```bash
node send.js
```
    
7.可到輸出結果第二行的網址查看細節
    
![](https://imgur.com/dcJNEx4.png)
    
___

## 結合Hardhat部署合約到測試鏈上吧
------

### 前置作業

1.安裝Hardhat
    
```bash
npm install --save-dev hardhat
```
    
2.建立資料夾並進入
    
```bash
mkdir infura_project
cd infura_project
```
    
3.建立Hardhat project，選擇第一個 <mark style="background-color:aliceblue;">Create a basic sample project</mark>
    
```bash
npx hardhat
```
    
![](https://imgur.com/tHD9tMy.png)
    
4.MacOS的環境下，可以使用 `tree -L 1` 指令印出第一層資料夾樹狀結構，沒有安裝過`tree`的話，可透過 `brew install tree`  安裝
    
![](https://imgur.com/4Iq8aSH.png)

------  

### 撰寫合約與測試

1.將contract資料夾底下的`Greeter.sol`改名為`Demo.sol`，替換程式碼內容為：
    
```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Demo is Ownable{
    uint256 private _value = 0;
    event ValueChanged(uint256 value);

    function store(uint256 value) public onlyOwner {
        _value = value;
        emit ValueChanged(value);
    }

    function retrieve() public view returns (uint256) {
        return _value;
    }
}
```
    
2.合約需要用到openzepplin的Ownable.sol，使用指令安裝@openzeppelin/contracts
    
```bash
npm install @openzeppelin/contracts
```
    
3.編譯合約看看
    
```bash
npx hardhat compile
```

會列印出 *Compiled 3 Solidity files successfully*，資料夾目錄底下多出`artifacts`和`cache`兩個資料夾
    
4.將test資料夾底下的`sample-test.js` 改名為`Demo.test.ts`，內容為：
    
```tsx
import { expect } from 'chai'
import { ethers } from 'hardhat'

// Start test block
describe('Demo', function () {
  before(async function () {
    this.Demo = await ethers.getContractFactory('Demo')
  })

  beforeEach(async function () {
    this.demo = await this.Demo.deploy()
    await this.demo.deployed()
  })

  // Test case
  it('retrieve returns a value previously stored', async function () {
    // Store a value
    await this.demo.store(42)

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.demo.retrieve()).toString()).to.equal('42')
  })
})
```
    
這時候會報錯，這是因為我們接下來會用typescript進行開發，需要更改package.json內容：
    
```json
{
  "name": "hardhat-project",
  "devDependencies": {
    "@nomiclabs/hardhat-ethers": "^2.0.5",
    "@nomiclabs/hardhat-waffle": "^2.0.3",
    "@types/chai": "^4.3.1",
    "@types/mocha": "^9.1.1",
    "@types/node": "^17.0.27",
    "chai": "^4.3.6",
    "dotenv": "^16.0.0",
    "ethereum-waffle": "^3.4.4",
    "ethers": "^5.6.4",
    "hardhat": "^2.9.3",
    "mocha": "^9.2.2",
    "solc": "^0.8.13",
    "ts-node": "^10.7.0",
    "typescript": "^4.6.3",
    "web3": "^1.7.3"
  },
  "dependencies": {
    "@openzeppelin/contracts": "^4.5.0",
    "@typechain/hardhat": "^6.0.0"
  }
}
```

再執行一次 `npm install` ，回到`Demo.test.ts`就看不到紅字了！
    
5.更改`hardhat.config.js`成`.ts`，檔頭`require("@nomiclabs/hardhat-waffle");` 改為
    
```tsx
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
```
    
6.添加`tsconfig.json`檔案
    
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "strict": true,
    "rootDirs": ["./src", "./scripts", "./test"],
    "esModuleInterop": true
  },
  "exclude": ["dist", "node_modules"],
  "include": ["./test", "./src", "./scripts"],
  "files": ["./hardhat.config.ts"]
}
```
    
7.使用 `npx hardhat test` 指令進行測試，順利的話，最後會出現 1 passing 

------

### 撰寫腳本進行部署

1.將scripts資料夾下的`sample-scripts.js`更改為`deploy.ts`，內容為：
    
```tsx
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account:", deployer.address); 

  const Demo = await ethers.getContractFactory("Demo"); // Getting the Contract
  const demo = await Demo.deploy(); //deploying the contract

  await demo.deployed(); // waiting for the contract to be deployed

  console.log("Demo deployed to:", demo.address); // Returning the contract address on the rinkeby
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); // Calling the function to deploy the contract
```
    
2.在`hardhat.config.ts`中配置網路，添加在`solidity: "0.8.4"`後面
    
```tsx
export default {
  solidity: "0.8.4",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/YOUR_PROJECT_ID", //Infura url with projectId
      accounts: ["YOUR_ACCOUNT_PRIVATE_KEY"] // add the account that will deploy the contract (pay gas fee)
    }
  },
```
    
3.執行指令 `TS_NODE_FILES=true ts-node scripts/deploy.ts` ，如果是使用測試鏈，可能需要等待比較久的時間，成功後應該會看到結果：
    
![](https://imgur.com/BkXVN38.png)
    
上面是部署合約、支付gas fee的帳號，下面是合約地址，把合約地址複製起來，去Etherscan看看：
    
![](https://imgur.com/SJqCIbr.png)
    
4.在scrips資料夾底下建立叫做`storeAndRetrieve.ts`的新檔案，測試剛剛部署好的合約的兩個function，`store()`和`retrieve()`
    
```tsx
import { ethers } from "hardhat";

async function main () {
    const accounts = await ethers.provider.listAccounts();

    const address = 'YOUR_CONTRACT_ADDRESS';
    const Demo = await ethers.getContractFactory('Demo');
    const demo = await Demo.attach(address);

    // Call the retrieve() function of the deployed Box contract
    let value = await demo.retrieve();
    console.log('demo value is', value.toString());
}
  
main()
  .then(() => process.exit(0))
  .catch(error => {
  console.error(error);
  process.exit(1);
  });
```
    
5.使用 `TS_NODE_FILES=true ts-node scripts/storeAndRetrieve.ts` 指令執行，會呼叫合約中的`retrieve()`，印出_value原始的值0。

### 監聽合約事件

1.在主目錄底下建立src資料夾，裡面建立一個做`eventListener.ts`的檔案
    
```tsx
import { ethers } from 'hardhat'

async function listenEvent () {
  const address = 'YOUR_CONTRACT_ADDRESS'
  const Demo = await ethers.getContractFactory('Demo')
  const demo = await Demo.attach(address)

  demo.on('ValueChanged', async (event: any) => {
    console.log(event)
  })
}

listenEvent()
```
    
2.修改storeAndRetrieve.ts，在`let value = await demo.retrieve();` 前面加上三行，代表呼叫合約中的`store(uint value)`，並變更`_value`的值成100
    
```tsx
// Send a transaction to store() a new value
    let storeValue = await demo.store(100);
    await storeValue.wait();
```
    
3.執行指令 `TS_NODE_FILES=true ts-node src/eventListener.ts` 持續監聽合約內的事件 `ValueChanged`

4.在新的terminal分頁執行 `TS_NODE_FILES=true ts-node scripts/storeAndRetrieve.ts`

5.過了一陣子，回到剛剛執行`eventListener.ts`的地方，因為呼叫store function來存入100，觸發了事件`ValueChanged`，合約監聽器會印出BigNumber { value: "100" }

6.可以回到Etherscan做確認，應該會看到兩筆交易，兩筆事件
    
![](https://imgur.com/kk9LBAu.png)
    
![](https://imgur.com/W5gCytD.png)
    

資料來源：

- [Getting Started With Infura](https://blog.infura.io/getting-started-with-infura-28e41844cc89/)
- [Deploying and interacting with smart contracts](https://docs.openzeppelin.com/learn/deploying-and-interacting#calling-the-contract)
- [Hardhat-typescript](https://hardhat.org/guides/typescript.html)