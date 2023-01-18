---
layout: post
title: Go - Return bit 1 count
date:  2023-01-13
tags:  Go
---
程式碼如下：
``` go
func BitCount(x int) int {
	cnt := 0
	for x > 0 { // 當 x <= 0 就是完全沒 1 了 
		x = x & (x - 1) // 每次會不見一個 1
		cnt++
	}
	return cnt
}

```