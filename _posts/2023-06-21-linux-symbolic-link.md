---
layout: post
title: Linux - Symbolic Link
date:  2023-06-21
tags:  linux
---

### 建立 Symbolic Link (簡稱 Symlink)
``` shell
ln -s <path to the file/folder to be linked> <the path of the link to be created>
```
例如
``` shell
ln -s hello.txt newhello.txt     
```
可以用 `ls -l` 列出檔案查看：
![](https://i.imgur.com/9HPDt6s.png)
最前面的 l 代表這個檔案是 symlink，後面的箭頭代表這個檔案指向哪個檔案。


### 移除 Symlink
``` shell
unlink <path-to-symlink>
```
直接使用 `rm` 指令也行。


### 找到 Broken link
``` shell
find . -type l ! -exec test -e {} \; -print
```

### find -L
`- L` flag 代表搜索過程中會遵循 symlink，也就是進入 symlink 指向的資料夾/文件作進一步搜索，使用這個 flag 可能會進入無限迴圈，或是不經意地破壞作業系統，應避免使用！


### Reference
[How can I find broken symlinks](https://unix.stackexchange.com/questions/34248/how-can-i-find-broken-symlinks)
[Symlink Tutorial in Linux – How to Create and Remove a Symbolic Link](https://www.freecodecamp.org/news/symlink-tutorial-in-linux-how-to-create-and-remove-a-symbolic-link/)

