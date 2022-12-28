---
layout: post
title: 玩一玩 Protocol Buffer
date:  2022-12-28
tags:  Go
---

建立資料夾、進入資料夾、初始化

```bash
mkdir hello

cd hello

go mod init example
```

建立放 `proto` 檔案的資料夾、建立 `.proto`

```bash
mkdir person

cd person 

touch person.proto
```

在`person.proto` 貼上以下程式碼

```protobuf
syntax = "proto3"; // 3 代表版本

option go_package = "example/person";
package person;

message Person {
    string name = 1; // 有型別，和JSON不同，所以編譯器才能自動產生很多不同語言的版本
}
```

執行：

```bash
protoc *.proto --go_out=plugins=grpc:. --go_opt=paths=source_relative
```

回到根目錄並建立 `main.go`

```go
cd ..

touch main.go
```

在`main.go` 貼上以下程式碼

```go
package main

import (
	"fmt"
	"io/ioutil"
	"log"

	pb "example/person"

	proto "github.com/golang/protobuf/proto"
)

func main() {
  person := &pb.Person{Name: "XXX"}
	fmt.Printf("Person's name is %s\n", person.GetName())

	//把 person object 寫到檔案 person.bin(人類不可讀)
	out, err := proto.Marshal(person)
	if err != nil {
		log.Fatalf("Serialization error: %s", err.Error())
	}
	if err := ioutil.WriteFile("person.bin", out, 0644); err != nil {
		log.Fatalf("Write File Error: %s ", err.Error())
	}
	fmt.Println("Write Success")

	//讀檔然後印出來
	in, err := ioutil.ReadFile("person.bin")
	if err != nil {
		log.Fatalf("Read File Error: %s ", err.Error())
	}
	person2 := &pb.Person{}
	err2 := proto.Unmarshal(in, person2)
	if err2 != nil {
		log.Fatalf("DeSerialization error: %s", err.Error())
	}

	fmt.Println("Read Success")
	fmt.Printf("Person2's name is %s\n", person2.GetName())
}
```

下載需要的 package

```go

go get -u github.com/golang/protobuf/proto
```

執行程式

```go
go run main.go
```

參考資料

[Protocol Buffers and Go: Getting started](https://golangbyexample.com/protocol-buffers-go/)