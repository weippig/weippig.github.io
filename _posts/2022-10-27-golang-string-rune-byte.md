---
layout: post
title: Golang - String, Rune, Byte
date:  2022-10-27
tags: golang
---

``` go
str := "str"
fmt.Printf("%T \n", str)
fmt.Println([]rune(str))
fmt.Println([]byte(str))

// string 
// [115 116 114]
// [115 116 114]
```
初學 Go 的時候，不太了解`rune`和`byte`之間的區別，一個`string`既是`rune`構成的，又是`byte`構成的，上頭的程式碼 `[]rune`和 `[]byte` 輸出的結果相同。那麼兩者差別在哪呢？下面就透過程式碼做一些簡介。


在[原始碼](https://github.com/golang/go/blob/master/src/builtin/builtin.go)的第88行和第92行告訴我們：`byte`是 uint8，等同一個byte也就是八個bit，`rune` 則是 int32，等同四個byte也就是三十二個bit。上面的英文程式碼輸出沒有差，下面換成中文來試試看：
``` go
chinese := "哈囉你好"
fmt.Println([]rune(chinese))
fmt.Println([]byte(chinese))

// [21704 22217 20320 22909]
// [229 147 136 229 155 137 228 189 160 229 165 189]
```
`[]rune` 和 `[]byte` 輸出的差異在於中文一個字需要佔用三個byte。四個中文字是四個rune，等同十二個byte。一個rune可以是英文字母、中文字、特殊符號，但byte永遠就是一個byte。

``` go
chinese := "哈囉你好"
fmt.Println(chinese[:2])
fmt.Println(chinese[:3])

// �
// 哈
```
上面程式碼的第一個 `Println` 只取了哈囉你好的前兩個byte，然而中文字是三個byte所構成，因此印出來會是奇怪的亂碼。使用 `byte`處理 UTF-8 不同語言的字串十分麻煩，這就是為什麼 `rune` 會誕生。
下方有兩個不同的`for` 迴圈：
``` go 
for _, char := range chinese {
	fmt.Printf("%T %v %s \n", char, char, string(char))
}

// int32 21704 哈
// int32 22217 囉
// int32 20320 你
// int32 22909 好
```

``` go
for i := 0; i < len(chinese); i++ {
	fmt.Printf("%T %v %s \n", chinese[i], chinese[i], string(chinese[i]))
}

// Output: 
// uint8 229 å 
// uint8 147  
// uint8 136  
// uint8 229 å 
// uint8 155 
// int8 137  
// uint8 228 ä 
// uint8 189 ½ 
// uint8 160   
// uint8 229 å 
// uint8 165 ¥ 
// uint8 189 ½ 
```

第一個迴圈使用`range`，一次會取出一個`rune`，也就是int32，用`string`函式將其轉為字串後會是中文字。第二個迴圈則是用index來取，一次會取出一個byte。