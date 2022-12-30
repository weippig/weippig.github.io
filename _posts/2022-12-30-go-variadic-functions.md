---
layout: post
title: Variadic Functions
date:  2022-12-30
tags:  Go
---

Variadic Functions，可變參數函數，讓函數參數數量可是未定義，可能是一個或多個，也可能是零個。
`fmt.Println` 就是 Go 常見的 Variadic Functions。


以加總函數 sum 為例，可以有下面兩種寫法：
``` go
package main

import "fmt"

// Variadic Functions
func sum(nums ...int) {
	fmt.Println("nums: ", nums)
	total := 0

	for _, n := range nums {
		total += n
	}
	fmt.Println("sum: ", total)
}

// 傳入陣列
func sum2(nums []int) {
	fmt.Println("nums: ", nums)
	total := 0

	for _, n := range nums {
		total += n
	}
	fmt.Println("sum: ", total)
}

func main() {
	arr := []int{1, 3, 5, 7, 9}
	sum(arr...)
	sum2(arr)
}
```