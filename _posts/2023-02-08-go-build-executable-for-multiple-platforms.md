---
layout: post
title: Go - Build Executables for Multiple Platforms
date:  2023-02-08
tags:  Go
---

以 libp2p 的 chatroom 範本為例，編譯不同平台的執行檔。

1. Clone the repo.
  ``` shell
    git clone https://github.com/libp2p/go-libp2p
    cd go-libp2p/examples/pubsub/chat
  ```
2. Build the binary
  ``` shell
    go build . # Builds executables
    ./chat # 執行
  ```
3. 讓執行檔放在特定位置並取特定名字
    ``` shell
      go build -o build/hello .
    ```
  上面的程式碼會 build 出叫 hello 的執行檔，並將他放在叫 build 的資料夾中。
4. 如果希望執行檔被存在 `$GOPATH/bin`，則要使用 `go install`
    ``` shell
    go install .  
    ```
    可以用下面指令查看目前 `$GOPATH/bin` 在哪：
    ```
    echo $GOPATH/bin    
    ```
5. Go 方便的地方之一就是可以為其他 OS 與 architecture 編譯執行檔，用下面指令查看可以可以 build 執行檔的 OS 與 architecture :
    ``` shell
    go tool dist list
    ```
6. 用下列指令 build 後，資料夾下會出現屬於 Windows 64-bit 的執行檔 `chat.exe` : 
    ```
    GOOS=windows GOARCH=amd64 go build .
    ```
7. 可以使用 `go env` 查看目前的環境變數，裡面就包括預設的你的系統的 GOOS 與 GOARCH。

## 參考資料
- [How To Build Go Executables for Multiple Platforms on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-build-go-executables-for-multiple-platforms-on-ubuntu-20-04)

