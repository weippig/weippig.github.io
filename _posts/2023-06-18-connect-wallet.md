---
layout: post
title: React - 使用 Wagmi 連接錢包並保持連線
date:  2023-06-18
tags:  ethereum react
---

依照 [wagmi document](https://wagmi.sh/) 指示安裝好 package後，首先在 React 建立連線錢包按鈕的 Component：
``` js
import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import React from 'react'
import { useDisconnect } from 'wagmi'

export default function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const { disconnect } = useDisconnect()

  async function connectWallet() {
    try {
      connect()
      localStorage.setItem('isWalletConnected', true) 
      // 連接錢包後將 localStorage 的 isWalletConnected 欄位設定為 true
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnectWallet() {
    try {
      disconnect()
      localStorage.setItem('isWalletConnected', false)
      // 解除連接錢包後將 localStorage 的 isWalletConnected 欄位設定為 false
    } catch (ex) {
      console.log(ex)
    }
  }

  if (isConnected) return( // 如果 isConnected == true 表示在連線狀態，再次點擊會斷開連接
    <div>
      <button  id='wallet_address' onClick={() => disconnectWallet()}>Connected to {address}</button>
    </div>
  )
  return(
    <div>
      <button id='personal_btn' onClick={() => connectWallet()}>Connect Wallet</button>
    </div>
  )
}
```

在需要連接錢包、保持連線的地方新增以下程式碼 
``` js
import * as React from 'react';
import { useEffect } from "react";
import { InjectedConnector } from 'wagmi/connectors/injected'
import ConnectButton from "./component/connect";
import { useConnect  } from 'wagmi'

function Main() {
	const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

	useEffect(() => { 
    // 每次進入頁面都檢查 localStorage 是否有已連線的資訊，沒有則自動連線錢包
		const connectWalletOnPageLoad = async () => {
			if (localStorage?.getItem('isWalletConnected') === 'true') {
				try {
					connect()
				} catch (ex) {
					console.log(ex)
				}
			}
		}

		connectWalletOnPageLoad()
	}, [])

	return(
		<div>
			<div><ConnectButton /></div> 
		</div>
	  );
};

export default Main;
```

### Reference
[Keep Wallet Connected on Page Refresh — Web3 Dev](https://shmoji.medium.com/keep-wallet-connected-on-page-refresh-efc3b7c5cdea)