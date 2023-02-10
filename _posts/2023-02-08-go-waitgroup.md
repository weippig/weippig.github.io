---
layout: post
title: Go - Waitgroup
date:  2023-02-10
tags:  Go
---
- 當有很多 Goroutine 需要完成時，就可以用 Waitgroup
- Waitgroup 做完一輪到 `wg.Wait()` 後可以被重複使用
- 傳給其他 function 要 pass by reference

``` go 
package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	wg := &sync.WaitGroup{} // 宣告一個 Waitgroup

	for i := 0; i < 10; i++ {
		wg.Add(1) // 需要等待的 Goroutine 數量加一
		id := i

		go func() { // 啟動 Goroutine
			defer func() { // 每次結束 Goroutine，使用 wg.Done() 通知 waitgroup 需要等待的 goroutine 減少一個
				fmt.Printf("Task %d done\n", id)
				wg.Done()
			}()

			worker(id)
		}()
	}

	wg.Wait() // 將 main() block 住，直到所有 Goroutine 被執行完(counter == 0)，避免 main() 在 goroutine 們還沒執行完就結束了
}

func worker(id int) {
	fmt.Printf("Worker %d starting\n", id)
	time.Sleep(time.Second)
}
```