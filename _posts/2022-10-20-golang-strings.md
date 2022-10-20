---
layout: post
title: Golang - strings
date:  2022-10-20
tags: golang
---

寫到 [leetcode 459. Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern/) 時，看了討論區發現 `strings.Repeat(s string, count int)` 這個好用的函式，所以決定開一篇文用以記錄 Golang strings 裏面值得記起來的函式或用法，方便自己複習。

### Repeat 
重複傳入的字串指定次數
``` golang
  package main
  import (
    "fmt"
    "strings"
  )

  func main() {
    fmt.Println("ba" + strings.Repeat("na", 2))
    // banana
  }
```

### Fields
將字串以空格為基準進行切割，回傳字串陣列
``` golang
  package main
  import (
    "fmt"
    "strings"
  )

  func main() {
	  fmt.Printf("Fields are: %q", strings.Fields("  foo bar  baz   "))
    // Fields are: ["foo" "bar" "baz"]
  }
```