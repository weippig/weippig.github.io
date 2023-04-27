---
layout: post
title: MySQL command category
date:  2023-04-26
tags:  sql
---

常見的 Structured Query Language 指令有 Create, Drop, Insert 等，而這些指令又可以細分為幾個種類：

### DDL (Data Definition Language)
這個種類的指令大多用來建立、變更、刪除資料庫物件的結構或 schema，例如：
1. CREATE
2. DROP
3. ALTAR
4. TRUNCATE
5. RENAME


### DQL – Data Query Language
一言以蔽之，用來查詢資料庫的資料，例如 SELECT。

### DML – Data Manipulation Language
操作和修改資料庫中的資料，常見的有：
1. INSERT
2. UPDATE
3. DELETE

### DCL – Data Control Language
與權限、授權、許可相關的指令，例如：
1. GRANT
2. REVOKE


### TCL – Transaction Control Language
與控制、管理事務(Transaction)相關，例如：
1. BEGIN
2. COMMIT
3. ROLLBACK


[Reference](https://www.geeksforgeeks.org/sql-ddl-dql-dml-dcl-tcl-commands/)