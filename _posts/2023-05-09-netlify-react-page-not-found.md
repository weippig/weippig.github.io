---
layout: post
title: Netlify & React - Page not found
date:  2023-05-09
tags:  react 
---

在 Netlify 部署好 React 網站後，卻發現某些頁面點擊會顯示 **Page Not Found. Looks like you've followed a broken link** 這樣的錯誤。


這是因為 Netlify 不知道 root route 之外的 route 要怎麼去 locate。以下是我的解決方式：
1. 在 `public` 資料夾底下建立檔案 `_redirects`
2. 在這個檔案中貼上內容： `/* /index.html 200`
3. 存擋，重新 deploy & publish !



### Reference
[Netlify React Router Not Working: 5 Simple Steps to Fix it](https://blog.arnabghosh.me/netlify-react-router-not-working)