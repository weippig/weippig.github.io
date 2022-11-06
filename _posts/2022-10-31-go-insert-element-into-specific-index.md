---
layout: post
title: Golang - Insert element to the sepcific position of slice
date:  2022-10-31
tags:  golang
---
If we want to insert element to index `i`, there is code :
``` go
arr = append(arr[:i+1], arr[i:]...)
arr[i] = value
```