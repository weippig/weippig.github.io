---
layout: post
title: Golang - Convert int to string
date:  2022-10-18
tags: golang
---
An integer can be converted to string by `Itoa` function which is in `strconv` library.<br />
Example : 

``` go
import (
	"fmt"
	"reflect"
	"strconv"
)

func main() {
	nums1 := 10
	fmt.Println(nums1, reflect.TypeOf(nums1))
	str := strconv.Itoa(nums1)
	fmt.Println(str, reflect.TypeOf(str))
}
```