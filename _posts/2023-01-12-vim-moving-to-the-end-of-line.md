---
layout: post
title: Vim - 跳到某行的開始/最後
date:  2023-01-12
tags:  Linux Vim
---
- `^` 跳到句子開始，保持 command mode
- `I` 跳到句子開始，切換到 insert mode
- `$` 跳到句子最後，保持 command mode
- `A` 跳到句子最後，切換到 insert mode
- 跳到某個想搜尋的字 : 
  ``` shell
    / [type the word you want to find]
  ```
  enter 後按 `n`可 以跳到下一個字 (用 `:noh` 可以取消 highlight)
