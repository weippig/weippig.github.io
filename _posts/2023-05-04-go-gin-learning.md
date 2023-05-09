---
layout: post
title: Go - gin 學習記錄 
date:  2023-05-04
tags:  Go sql
---

上次學了怎麼用  Go 和 SQL 交互，接著要利用 gin package 來寫 api！下面範例沒有用到資料庫，只是先用陣列存一些資料做存取與新增。真正用到資料庫的程式碼在文章最下面，是延續使用[Go - mysql 學習記錄](https://weippig.com/2023/04/25/go-sql-learning.html)這篇架的資料庫。

### 初始化專案
``` shell
mkdir example && cd example
go mod init example
```

### 開始寫程式！取得資料的 handler！
1. 建立 `main.go`
    ``` shell
    touch main.go
    ```
2. 在 `main.go` 貼上：
    ``` go
    package main

    import (
        "net/http"

        "github.com/gin-gonic/gin"
    )
    ```
3. 建立資料的結構，在 `main.go` 貼上下面程式碼
    ``` go
    // album 結構代表會與之後從資料庫取回的專輯資料互相 match
    type album struct {
        ID     string  `json:"id"`
        Title  string  `json:"title"`
        Artist string  `json:"artist"`
        Price  float64 `json:"price"`
    }

    // 資料
    var albums = []album{
        {ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
        {ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
        {ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
    }
    ```
4. 貼上下面的 function，這是一個會取得 albums 訊息的 handler：
    ``` go
    func getAlbums(c *gin.Context) {
        c.IndentedJSON(http.StatusOK, albums)
    }
    ```
5. 貼上下面程式碼，利用 gin 建立 Router，讓 `getAlbums` handler handle 到 `/albums` path 的 GET 請求：
    ``` go
    func main() {
        router := gin.Default()
        router.GET("/albums", getAlbums)

        router.Run("localhost:8080") // start the server
    }
    ```
6. 在 terminal 執行 `go mod tidy` 或 `go get .` 來取得需要的 dependency
7.  `go run .` 啟動剛剛寫好的 http server
8. 在 terminal 用 `curl` 指令和 server 交互：
    ``` shell
    curl http://localhost:8080/albums
    ```

### 添加資料的 handler！
1.  把 POST method 的 request body 轉換成 album struct 後添加到 albums ，也就是我們的資料中：
    ``` go
    func postAlbums(c *gin.Context) {
        var newAlbum album

        // 把接收到的 json body 轉換成 struct
        if err := c.BindJSON(&newAlbum); err != nil {
            return
        }

        // 添加新專輯到 albums 陣列
        albums = append(albums, newAlbum)
        c.IndentedJSON(http.StatusCreated, newAlbum)
    }
    ```
2. 在 `main.go` 的 `router.GET("/albums", getAlbums)` 下加上一行：
    ``` go
    router.POST("/albums", postAlbums)
    ```
3. 用 `go run . ` 重新執行 server
4. 測試看看吧！
    ``` shell
    curl http://localhost:8080/albums \
    --include \
    --header "Content-Type: application/json" \
    --request "POST" \
    --data '{"id": "4","title": "The Modern Sound of Betty Carter","artist": "Betty Carter","price": 49.99}'
    ```
5. 用前面的 GET method 確認資料真的被添加進去：
    ``` shell
    curl http://localhost:8080/albums \
        --header "Content-Type: application/json" \
        --request "GET"
    ```

### 用 uri 指定取得特定資料！
1. 貼上 handler function：
    ``` go
    func getAlbumByID(c *gin.Context) {
        id := c.Param("id") // 從 path 裡面取出 id parameter

        // 用迴圈來找這個 id 是對應哪張專輯
        for _, a := range albums {
            if a.ID == id {
                c.IndentedJSON(http.StatusOK, a)
                return
            }
        }
        c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
    }
    ```
2. 在 `main.go` 的 `router.GET("/albums", getAlbums)` 下面貼上：
    ``` go
    router.GET("/albums/:id", getAlbumByID)
    ```
3. 在 terminal 用 `curl` 打打看這個 api：
    ``` shell
    curl http://localhost:8080/albums/2
    ```

### 把程式碼變成真的和資料庫交互！
[之前](https://weippig.com/2023/04/25/go-sql-learning.html)建立的資料庫還在，裡面的資料也和前面的 album 一樣，如果 handler 與 path 都不變，將資料從陣列改成真正的資料庫資料的話，程式如下：

``` go
package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/go-sql-driver/mysql"

	"github.com/gin-gonic/gin"
)

var db *sql.DB

// album represents data about a record album.
type Album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

func main() {
	// db config
	cfg := mysql.Config{
		User:   os.Getenv("DBUSER"), //export DBUSER=你的 MySQL 用戶名 
		Passwd: os.Getenv("DBPASS"), //export DBPASS=你的 MySQL password 
		Net:    "tcp",
		Addr:   "127.0.0.1:3306",
		DBName: "recordings",
	}
	// 連接資料庫
	var err error
	db, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	pingErr := db.Ping() // 確認是否真的連接上資料庫
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")

  // router 的部分
	router := gin.Default()
	router.GET("/albums", getAlbums)
	router.POST("/albums", postAlbums)
	router.GET("/albums/:id", getAlbumByID)

	router.Run("localhost:8080")
}

// 取得所有專輯資料
func getAlbums(c *gin.Context) {
	var albums []Album
	rows, err := db.Query("SELECT * FROM album")
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "getAlbums error"})
	}
	defer rows.Close()

	for rows.Next() {
		var alb Album
		if err := rows.Scan(&alb.ID, &alb.Title, &alb.Artist, &alb.Price); err != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": "getAlbums error"})
		}
		albums = append(albums, alb)
	}
	if err := rows.Err(); err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "getAlbums error"})
	}

	c.IndentedJSON(http.StatusOK, albums)
}

// 新增專輯
func postAlbums(c *gin.Context) {
	var newAlbum Album

	// 把接收到的 json body 轉換成 struct
	if err := c.BindJSON(&newAlbum); err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "getAlbums error"})
	}

	result, err := db.Exec("INSERT INTO album (title, artist, price) VALUES (?, ?, ?)", newAlbum.Title, newAlbum.Artist, newAlbum.Price)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "getAlbums error"})
	}
	id, err := result.LastInsertId()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "getAlbums error"})
	}

	c.IndentedJSON(http.StatusCreated, "新專輯的 id 是："+strconv.Itoa(int(id)))
}

// 使用 id 取得特定專輯
func getAlbumByID(c *gin.Context) {
	id := c.Param("id")

	var alb Album
	row := db.QueryRow("SELECT * FROM album WHERE id = ?", id)
	if err := row.Scan(&alb.ID, &alb.Title, &alb.Artist, &alb.Price); err != nil {
		if err != nil {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": err})
		}
	}

	c.IndentedJSON(http.StatusOK, alb)
}

```
錯誤處理的部分是亂寫的，統一使用 `http.StatusNotFound` 敷衍過去，但實際上應該有優雅又精確的處理辦法，之後研究完再來更新這篇！


### Reference
[Tutorial: Developing a RESTful API with Go and Gin](https://go.dev/doc/tutorial/web-service-gin)
[Tutorial: Accessing a relational database](https://go.dev/doc/tutorial/database-access)