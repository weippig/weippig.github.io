---
layout: post
title: Go - Context
date:  2023-05-02
tags:  Go 
---

控制 Goroutine 的方式有 Waitgroup 和 Context，前面有講過 Waitgroup 簡單來說是可以指定一個數量，等到這個數量的 job 都執行完了之後再繼續執行主程式。

Context 的話，goroutine 內可能又有多個 goroutine，背景又有別的 goroutine，取消就會變得很麻煩，這就是 Context 常見的使用場景，在複雜的 goroutine 場景進行取消非常好用，又可以理解成：多個或有上下層關係的 goroutine  同步請求、處理請求、取消。

### 建立 Context 的方法：
- `context.Backgroud()`, 較常使用
- `context.TODO()`

### With 函數(使用時需要從父 Context 衍生)：
- `func WithCancel(parent Context) (ctx Context, cancel CancelFunc)`
- `func WithDeadline(parent Context, deadline time.Time) (Context, CancelFunc)`
- `func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc)`
- `func WithValue(parent Context, key, val interface{}) Context`

### WithTimeout，超時取消範例：
``` go
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	HttpHandler()
}

func HttpHandler() {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second) 
        // cancel 其實沒被使用到 context 就結束了，但必須 defer cancel() 來避免 context leak
	defer cancel()
	deal(ctx)
}

func deal(ctx context.Context) {
	for i := 0; i < 10; i++ {
		time.Sleep(1 * time.Second)
		select {
		case <-ctx.Done(): // 三秒後context被關閉，執行此處
			fmt.Println(ctx.Err()) 
			return
		default: // 前三秒時
			fmt.Printf("deal time is %d\n", i)
		}
	}
}
```

### WithCancel，取消範例：
``` go
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())

	go Talk(ctx)

	time.Sleep(10 * time.Second)
	cancel() // 十秒後閉嘴
	time.Sleep(1 * time.Second)
}

package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())

	go Talk(ctx)

	time.Sleep(10 * time.Second)
	cancel()
	time.Sleep(1 * time.Second)
}

func Talk(ctx context.Context) {
	for range time.Tick(time.Second) {
		select {
		case <-ctx.Done():
			fmt.Println("我要閉嘴了")
			return
		default:
			fmt.Println("balabalabalabala")
		}
	}
}
```

### Reference
[【Go语言】小白也能看懂的context包详解：从入门到精通](https://segmentfault.com/a/1190000040917752)
[用 10 分鐘了解 Go 語言 context package 使用場景及介紹](https://blog.wu-boy.com/2020/05/understant-golang-context-in-10-minutes/)