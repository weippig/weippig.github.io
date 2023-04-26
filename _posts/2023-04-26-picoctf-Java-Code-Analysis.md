---
layout: post
title: PicoCTF - Java Code Analysis!?!
date:  2023-04-26
tags:  picoCTF
---

## [Challenge](https://play.picoctf.org/practice/challenge/355?category=1&originalEvent=72&page=1)

## Tags
PicoCTF 2023 / Web Exploitation

## Description
BookShelf Pico, my premium online book-reading service.
I believe that my website is super secure. I challenge you to prove me wrong by reading the 'Flag' book!
<br />
Here are the credentials to get you started:
<br />
Username: "user"<br />
Password: "user"

## Writeup
### 觀察網站
1. 依照預設的帳號密碼登入後，先檢視網站，會發現，每次進行 request 都會戴上 jwt
    <img src="https://i.imgur.com/fMF4v9H.png">
2. 去 jwt.io 進行解碼後，可以發現裡面的內容包含 Role 等資訊：
    <img src="https://i.imgur.com/TZHzsYB.png">


### 觀察下載的原始碼
1. 用來簽名的 key 其實就存在 server_secret.txt 這個檔案中，內容是 1234。
    <img src="https://i.imgur.com/4lKdsko.png">
    <img src="https://i.imgur.com/HxORiSu.png">
    <img src="https://i.imgur.com/l8hrWy5.png">
2. role 分四個等級，最高權限是 Admin，從網頁書架的標籤與程式碼很多地方都可以看出來這點
    <img src="https://i.imgur.com/DwVjOWW.png">
3. 初始化有兩個帳戶，一個是 user，UserID = 1，第二個是 admin，UserID = 2，後者有最高的 Admin 權限
    <img src="https://i.imgur.com/NW0YgKR.png">
4. 得到書本內容的 api :
    <img src="https://i.imgur.com/ol0Iq2U.png">
5. 檢查權限的方式是看 jwt
    <img src="https://i.imgur.com/rF4MYgK.png">

### 偽造 jwt
1. 帶原本的 jwt POST `/base/books/pdf/5`，會被告知無權限
    <img src="https://i.imgur.com/hKcFG5g.png">
2. 在 jwt.io 中修改內容如下，用已知的秘密鑰匙簽名，複製左邊偽造的 jwt
    <img src="https://i.imgur.com/lRSRzIe.png">
3. 帶著偽造的 jwt 再 POST `/base/books/pdf/5`，成功了！將 flag pdf 儲存下來即可
    <img src="https://i.imgur.com/fFVmizL.png">
4. Flag
    <img src="https://i.imgur.com/UtpnOuI.png">