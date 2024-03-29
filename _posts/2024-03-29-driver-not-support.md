---
layout: post
title: Go - postgresql - LastInsertId is not supported by this driver
date:  2024-03-29
tags:  Go
---
在執行下面程式碼的時候：
``` go 
sqlStatement := `INSERT INTO tx (urls) VALUES($1) RETURNING id`
res, err := db.Exec(sqlStatement, pq.Array(body.Urls))
id, err := res.LastInsertId()
```
出現下面錯誤：
**LastInsertId is not supported by this driver**
這是因為 LastInsertId() 不支援 Postgresql driver

### 解決方式
將程式碼改為如下：
``` go 
sqlStatement := `INSERT INTO tx (urls) VALUES($1) RETURNING id`
var id int
err = db.QueryRow(sqlStatement, pq.Array(body.Urls)).Scan(&id)
```

