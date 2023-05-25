---
layout: post
title: Go - HTTP POST/GET request 筆記
date:  2023-05-24
tags:  Go 
---

我的 Go 版本：go version go1.20.1 darwin/amd64

### GET

``` go
package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
)

func main() {

    resp, err := http.Get("https://weippig.com/")

    if err != nil {
        log.Fatal(err)
    }

    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(body))
}
```

### POST
假設要發送 POST 請求給某個叫做 `http://apple.com` 的 url，並且使用 JSON 格式傳送字串 merchant_id 和 merchant_trade_no 以及數字 total_amount：
``` go
import (
    "bytes"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "io/ioutil"
)

func main() {
    url := "http://apple.com"
    values := map[string]interface{}{
		"merchant_id":       "111",
		"merchant_trade_no": "123",
		"total_amount":      1,
	 }

    json_data, err := json.Marshal(values)

    if err != nil {
        log.Fatal(err)
    }

    resp, err := http.Post(url, "application/json",
        bytes.NewBuffer(json_data))

    if err != nil {
        log.Fatal(err)
    }

    body, error := ioutil.ReadAll(resp.Body)
    if error != nil {
      fmt.Println(error)
    }

    resp.Body.Close()

    fmt.Println(string(body))
}

```