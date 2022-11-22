---
layout: post
title: Go - Two ways to reverse bits
date:  2022-10-21
tags: Go
---
When input is 32 bits unsigned integer, there are two ways to reverse bits.

### Solution 1
``` go
func reverseBits(num uint32) uint32 {
    return bits.Reverse32(num)
}
```

### Solution 2
``` go
func reverseBits(num uint32) uint32 {
    var result uint32   
    for i := 0; i < 32; i++ {
        result += num >> i << 31 >> i
    }
    return result
}
```
