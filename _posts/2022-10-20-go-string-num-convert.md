---
layout: post
title: Golang - Convert between string & int & rune
date:  2022-10-20
tags: golang
---

``` go
package main

import (
	"fmt"
	"strconv"
)

func main() {
	n := 10
	str := strconv.Itoa(n) // convert to string
	for _, val := range str {
		fmt.Printf("%T  %v\n", val, val)
		fmt.Printf("%T  %v\n", int(val)-'0', int(val)-'0') // convert rune/int32 to int
	}

	n2, err := strconv.Atoi(str) // convert string to int
	if err == nil {
		fmt.Printf("%T  %v\n", n2, n2)
	}
}
```