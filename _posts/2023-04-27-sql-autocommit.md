---
layout: post
title: MySQL - Explicit Commit / Implicit Commit / Autocommit
date:  2023-04-27
tags:  sql
---

資料庫提供數據的三種類型：
### 顯式提交 (Explicit Commit)
用 `COMMIT` 命令完成提交，例如：
``` sql
select * from dept;
commit;
```

### 隱式提交 (Implicit Commit)
運行某些指令之後資料庫自動完成，不需要再做 `COMMIT`，例如：
```sql
CREATE TABLE Persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);
```
隱式提交的指令有：`CREATE TABLE`、`DROP TABLE` 等，這些指令各自被視作單一的 transaction，因此執行完畢做 `ROLLBACK` 不會有用。更多可以參考 [Statements That Cause an Implicit Commit](https://dev.mysql.com/doc/refman/8.0/en/implicit-commit.html)。

### 自動提交 (Autocommit)
如果 autocommit mode 開啟的話，每一個 SQL statement 都將被視作單一的 transaction，不需要 `COMMIT`，會自動完成提交。MySQL 默認 autocommit mode 開啟。
> 可以用 `SELECT @@autocommit` 指令確認 autocommit mode 是否開啟，是的話值為 1。

### Reference
[autocommit, Commit, and Rollback](https://dev.mysql.com/doc/refman/8.0/en/implicit-commit.html)