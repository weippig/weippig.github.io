---
layout: post
title: React - React router with customized id
date:  2023-05-03
tags:  react 
---

在 Route 的過程中，發現一個問題，那就是如何在跳轉到 `/user` 這個 link 的同時，透過 `/user/:userid` 這種方式將想傳遞的內容傳遞到 component 內呢？找到的方法如下：

1. 定義 Route，後面的 `<User />` 是要路由過去的 component，也就是需要取得 userid 的頁面
    ``` jsx
    <Route path="user/:userid" element={<User />} />
    ```
2. 頁面跳轉的 Link，userid 是某個 dynamic 的變數，像如果 userid 是 1 的話，等同 `<Link href="/user/1" />`
    ``` jsx
    <Link href={"/user/"+ userid} />
    ```
3. 在目標頁面(component)，也就是 `<User />` 內取得id  
    ``` js
    import { useParams } from "react-router-dom";
    
    let { userid } = useParams();
    ```

### Reference
[React-Router v6 教学(附demo)](https://juejin.cn/post/7088663952225206279)
[React-Router doc](https://reactrouter.com/en/6.11.0)