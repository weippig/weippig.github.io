---
layout: post
title: Read, Write, Execute
date:  2022-01-11
tags:  Linux
---

Owner, Group, Other 對檔案/資料夾的 write, read, execute 三個動作分別具有不同的權限。


權限通常有兩種表示方法，第一種方式是用三個 octal number 作為權限的表示，第一個數字是 read 權限，第二個數字是 write 權限，第三個數字是 execute 權限；第二種方法是直接用 rwx 來表示。以下舉例：

- 0 or ---: No permissions
- 1 or --x: Execute permission (execute a file or navigate to a directory)
- 2 or -w-: Write permission (write a file or add new files in a directory)
- 3 or -wx: Write and execute
- 4 or r--: Read permission (read a file or list the contents of a directory)
- 5 or r-x: Read and execute
- 6 or rw-: Read and write
- 7 or rwx: Read, write, and execute


Owner, Group, Other 對一個檔案的權限，就用三個 octal number 或三組 rwx 表示：

- 777: Everyone can read, write, and execute.
- 700: Owner can read, write, and execute.
- 664: Owner and group can read and write.
- 640: Owner can read and write and group can read.
- 755: Owner can read, write, and execute, while group and others can read and execute.

可以用 `ls -l` 或 `ll` 來瀏覽目前目錄底下檔案／資料夾的權限設置。
會發現下面除了三組 rwx，有些檔案前面還有一個 d，這種 1333 的形式分別代表：**檔案屬性/ owner 擁有者權限 / group 同群組使用者權限 / other 其他人權限**。而 d 代表該檔案是個目錄。
有些檔案除了 1333，後面還有一個 **@**，這代表該檔案是 extended attributes。