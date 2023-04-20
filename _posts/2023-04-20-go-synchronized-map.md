---
layout: post
title: Go - Synchronized map
date:  2023-04-20
tags:  Go
---

Go 內建的 map 不具有 thread-safe 的特性，例如執行以下程式碼多次，有時候會成功，但大多時間會出現 `concurrent map writes` 的錯誤：


``` go
package main

import (
	"fmt"
	"sync"
)

func main() {
  var m = map[int]int{}
  wg := sync.WaitGroup{}
  wg.Add(10)
  for i := 0; i < 10; i++ {
    go func(i int) {
      m[i%5]++
      fmt.Println(m)
      wg.Done()
    }(i)
  }
  wg.Wait()
}
```

改善方法：使用 sync.Mutex 或是 sync.RWMutex，來將正在被操作的 map 鎖住。例如以下：


``` go
package main

import (
	"fmt"
	"sync"
)

type m struct {
	sync.Mutex
	m map[int]int
}

func (m *m) Get(key int) int {
	m.Lock()
	a := m.m[key]
	m.Unlock()
	return a
}
func (m *m) Put(key, value int) {
	m.Lock()
	m.m[key] = value
	m.Unlock()
}

func (m *m) Range(f func(k, v int)) {
	m.Lock()
	for k, v := range m.m {
		f(k, v)
	}
	m.Unlock()
}

func main() {
	var mm m
	mm = m{m: make(map[int]int)}
	wg := sync.WaitGroup{}
	wg.Add(10)
	for i := 0; i < 10; i++ {
		go func(i int) {
			mm.Put(i, i%5)
			fmt.Println(mm.Get(i))
			wg.Done()
		}(i)
	}
	wg.Wait()
}

```
另外，Go 在 1.9 後的版本引入一個結構叫做 `sync.Map`。這個結構的 method 包括以下：
- Load : 用給定的 key 從 map 中取出 value
- Store : 將給定的 key 在 map 中的值設為傳入的 value
- Delete : 移除給定的 key 在 map 中的 entry
以及 LoadAndDelete、LoadOrStore、Range、Swap 等。
範例如下：

``` go 
package main

import (
	"fmt"
	"sync"
)

func main() {
	var m = sync.Map{}
	var wg = sync.WaitGroup{}
	wg.Add(1000)
	for i := 0; i < 1000; i++ {
		go func(i int) {
			m.LoadOrStore(i, i)
			wg.Done()
		}(i)
	}
	wg.Wait()
	i := 0
	m.Range(func(k, v interface{}) bool {
		i++
		return true
	})
	fmt.Println(i)
}
```