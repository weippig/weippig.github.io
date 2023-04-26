---
layout: post
title: Go - mysql 學習記錄 
date:  2023-04-25
tags:  Go sql
---
在學習如何在 Go 操作資料庫，用此篇文章記錄一下。

### 設置專案
1. 建立一個放程式碼（project）的資料夾
    ``` shell
    mkdir example
    ```
2. 進入資料夾
    ``` shell
    cd example
    ```
3. 初始化專案
    ``` shell
    go mod init example
    ```

### 建置資料庫(MySQL)
1. 開啟新的 terminal，透過下列指令進入 MySQL CLI
    ``` shell
    mysql -u root -p
    ```
2. 在 MySQL CLI 輸入並執行指令：
    ``` sql
    create database recordings;
    ```
3. 在 MySQL CLI 輸入並執行指令：
    ``` sql
    use recordings;
    ```
    關於 use，MySQL 手冊上的介紹：The USE statement tells MySQL to use the named database as the default (current) database for subsequent statements.
4. 在剛剛建立的資料夾(example)下建立新檔案 `create-tables.sql`，貼上下面程式碼：
    ``` sql
    DROP TABLE IF EXISTS album;
    CREATE TABLE album (
      id         INT AUTO_INCREMENT NOT NULL,
      title      VARCHAR(128) NOT NULL,
      artist     VARCHAR(255) NOT NULL,
      price      DECIMAL(5,2) NOT NULL,
      PRIMARY KEY (`id`)
    );

    INSERT INTO album
      (title, artist, price)
    VALUES
      ('Blue Train', 'John Coltrane', 56.99),
      ('Giant Steps', 'John Coltrane', 63.99),
      ('Jeru', 'Gerry Mulligan', 17.99),
      ('Sarah Vaughan', 'Sarah Vaughan', 34.98);
    ```
5. 在 MySQL CLI 輸入並執行指令，執行我們剛剛建立的 sql script：
    ```
    source /path/to/create-tables.sql
    ```
6. 在 MySQL CLI 輸入並執行指令，檢查 sql script 是否有成功執行建立 table：
    ``` sql
    select * from album;
    ```
    應該會出現：
    ```
    +----+---------------+----------------+-------+
    | id | title         | artist         | price |
    +----+---------------+----------------+-------+
    |  1 | Blue Train    | John Coltrane  | 56.99 |
    |  2 | Giant Steps   | John Coltrane  | 63.99 |
    |  3 | Jeru          | Gerry Mulligan | 17.99 |
    |  4 | Sarah Vaughan | Sarah Vaughan  | 34.98 |
    +----+---------------+----------------+-------+
    4 rows in set (0.00 sec) 
    ```

### 撰寫程式，與資料庫交互吧！
1. 選擇 [SQL Driver](https://github.com/golang/go/wiki/SQLDrivers)
2. 接下來用的是 Go-MySQL-Driver，package name 是 `github.com/go-sql-driver/mysql`
3. 在 main.go 貼上以下程式碼，引入 MySQL Driver 和待會會用到的其他套件：
    ``` go
    package main

    import (
      "database/sql"
      "fmt"
      "log"
      "os"

      "github.com/go-sql-driver/mysql"
    )
    ```
4. 貼上下列程式碼：
    ``` go 
    var db *sql.DB

    func main() {
        // Capture connection properties.
        cfg := mysql.Config{
            User:   os.Getenv("DBUSER"),
            Passwd: os.Getenv("DBPASS"),
            Net:    "tcp",
            Addr:   "127.0.0.1:3306",
            DBName: "recordings",
        }
        // Get a database handle.
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
    }
    ```
5. terminal 路徑在 `example` 資料夾，執行下列指令：
    ``` shell
    go get .
    ```
6. 設置環境變數
    ``` shell
    export DBUSER=你的 MySQL 用戶名 
    export DBPASS=你的 MySQL password 
    ```
7. 執行程式碼：
    ``` shell
    go run .
    ```

### Query 多個 rows
1. 在 main function 上方貼上下面程式碼，定義一個叫做 Album 的 struct：
    ```go
    type Album struct {
        ID     int64
        Title  string
        Artist string
        Price  float32
    }
    ```
2. 貼上下列程式碼，這定義了一個叫做 `albumsByArtist` 的 function，這個 function 會 query 傳入的作者所有的專輯，並透過 for loop 與 `rows.Next()` 進行迭代，把 query 到的內容存入 `albums` 這個 Album struct 陣列中。
    ``` go 
    // albumsByArtist queries for albums that have the specified artist name.
    func albumsByArtist(name string) ([]Album, error) {
      // An albums slice to hold data from returned rows.
      var albums []Album

      rows, err := db.Query("SELECT * FROM album WHERE artist = ?", name)
      if err != nil {
        return nil, fmt.Errorf("albumsByArtist %q: %v", name, err)
      }
      defer rows.Close()
      // Loop through rows, using Scan to assign column data to struct fields.
      for rows.Next() {
        var alb Album
        if err := rows.Scan(&alb.ID, &alb.Title, &alb.Artist, &alb.Price); err != nil {
          return nil, fmt.Errorf("albumsByArtist %q: %v", name, err)
        }
        albums = append(albums, alb)
      }
      if err := rows.Err(); err != nil {
        return nil, fmt.Errorf("albumsByArtist %q: %v", name, err)
      }
      return albums, nil
    }
    ```
3. 在 main function 貼上下列程式碼，呼叫剛剛定義的 `albumsByArtist` function，索引 John Coltrane 的所有 album ：
    ``` go 
    albums, err := albumsByArtist("John Coltrane")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Albums found: %v\n", albums)
    ```
4. 執行程式：
    ``` shell
    go run .
    ```


### Query 單一的 row
剛剛是透過指令 Query 出多個 row，因為一個 artist 可能會創作多張專輯。那如果是只會回傳一個 row 的情況呢？可以使用另一個叫做 `QueryRow` 的的 method.
1. 定義一個叫做 albumByID 的新 function，這個 function 會 query 傳入的 ID 是哪一張 album，因為只會有一個結果，所以就不需要 for loop：
    ``` go
    // albumByID queries for the album with the specified ID.
    func albumByID(id int64) (Album, error) {
        // An album to hold data from the returned row.
        var alb Album

        row := db.QueryRow("SELECT * FROM album WHERE id = ?", id)
        if err := row.Scan(&alb.ID, &alb.Title, &alb.Artist, &alb.Price); err != nil {
            if err == sql.ErrNoRows {
                return alb, fmt.Errorf("albumsById %d: no such album", id)
            }
            return alb, fmt.Errorf("albumsById %d: %v", id, err)
        }
        return alb, nil
    }
    ```
2. 在 main funtion 貼上下列程式碼，呼叫剛剛定義好的 `albumByID`，索引 ID 是 2 的專輯：
    ``` go
    alb, err := albumByID(2)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Album found: %v\n", alb)
    ```
3. 執行程式碼：
    ``` shell
    go run .
    ```

### 新增資料
前面使用了 `Query` 和 `QueryRow`，接下來是不會回傳資料的操作，使用 `Exec`
1. 定義一個新的 functioin，這個 function 會將傳入的 Album struct 插入資料庫，並用 `result.LastInsertId()` 來 retrieve 剛剛插入的 row 的 ID：
    ``` go
    // addAlbum adds the specified album to the database,
    // returning the album ID of the new entry
    func addAlbum(alb Album) (int64, error) {
        result, err := db.Exec("INSERT INTO album (title, artist, price) VALUES (?, ?, ?)", alb.Title, alb.Artist, alb.Price)
        if err != nil {
            return 0, fmt.Errorf("addAlbum: %v", err)
        }
        id, err := result.LastInsertId()
        if err != nil {
            return 0, fmt.Errorf("addAlbum: %v", err)
        }
        return id, nil
    }
    ```
2. 在 main function 呼叫新建立的 function，傳入一個 Album struct ：
    ``` go
    albID, err := addAlbum(Album{
        Title:  "The Modern Sound of Betty Carter",
        Artist: "Betty Carter",
        Price:  49.99,
    })
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("ID of added album: %v\n", albID)
    ```
3. 執行程式碼：
    ``` shwll
    go run .
    ```

### Reference
[Tutorial: Accessing a relational database](https://go.dev/doc/tutorial/database-access)