---
layout: post
title: gRPC  v.s. WebSocket
date:  2022-12-27
tags:  Go
---

## gRPC
### 特色
- 使用 Google 的 Protocol Buffers(Protobuf) 作為 interface description language.
- `protoc` compiler 支援多語言，例如：python、go，所以客戶端和伺服器可以使用不同語言撰寫
- 基於 HTTP/2
- 讓調用遠程的程式也像調用本地函式庫一樣，此外，許多網路相關的程式碼被不需要工程師自己寫，`protoc` compiler 會幫忙產生

### 缺點
- Protobuf 非人類可讀語言，debug 不方便
- 雖然很多語言都有 gRPC 的套件，瀏覽器仍然沒辦法直接支持，需要使用例如 gRPC Web 這種 proxy

## WebSocket
### 特色
- WebSocket 是 W3C 網路協定標準，與一般 http、https不同之處在於，他只需要一次接觸便能一直保持連線，直到其中一方斷掉
- 可以傳輸文本、binary data
- HTTP/1.1 握手期間可以指定在 WebSocket 之上使用的子協議（例如，MQTT），也可以自訂協議或自訂額外功能（例如發布/訂閱消息傳遞）
- 因為是持續的連接而不是每次都 request/response，所以只需要極小的傳輸開銷
- 瀏覽器原生支持 WebSocket API
- 事件驅動(event-driven)

### 缺點
- stateful
- 連線終止後不會自動恢復
- 某些環境（例如帶有代理服務器的公司網絡）會阻止 WebSocket 連接。

## 比較
- data format 
  - GRPC : `.proto` file
  - WebSocket : no “official” format specification
- request processing performance
  - gRPC : 使用 HTTP2 連線延遲比較大，但因為 HTTP2 支持 multiplexing 與 高效的 binary format，gRPC 有較大的吞吐量(throughput)
  - WebSocket : 使用持續的 TCP 連線，通信完成才關閉，也可以做 multiplexing ，但必須要使用第三方函式庫或自己寫代碼，比較麻煩
- scalability
  - gRPC : 使用的 HTTP 是 stateless，維持通信所需的任何信息都會在每次請求/響應交換時重新傳輸。雖然這造成標頭中數據的低效重複，但它也確保了服務器在過程中是可互換的，因為它們都不需要記住與它們通信的客戶端的任何信息。擴展比較簡單
  - WebSocket : stateful protocol，依賴於雙方（尤其是服務器）存儲有關連接狀態和先前消息歷史記錄的信息。 您需要更複雜的代碼來跟踪狀態。此外，客戶端只能與有權訪問當前狀態的服務器進程通信。 這會使擴展大量 WebSocket 之間的連接變得困難
  但總而言之，WebSocket 佔用資源較少，差不多規模的系統，使用 gRPC 會需要比較大的計算能力和頻寬

## 使用時機
### gRPC
- Connecting polyglot services in a microservices-style architecture.
- Connecting client devices (e.g., mobile devices) to backend services. (理想情況不涉及高頻數據更新)
- Connecting point-to-point realtime services that need to handle streaming requests or responses.

### WebSocket
- Realtime updates, where the communication is unidirectional, and the server is streaming low-latency (and often frequent) updates to the client. (例如：實時比分更新、新聞源、警報和通知 等)
- Bidirectional communication, where both the client and the server send and receive messages. (例如：聊天室、虛擬活動、虛擬教室)
- 多用戶協作(例如：同時編輯一文檔)
- Fanning out (broadcasting) the same message to multiple users at once.(pub/sub messaging)

### 參考資料
- [WebSockets vs. HTTP: Comparing pros and cons](https://ably.com/topic/grpc-vs-websocket)
- [JavaScript WebSocket 讓前後端沒有距離](https://medium.com/enjoy-life-enjoy-coding/javascript-websocket-%E8%AE%93%E5%89%8D%E5%BE%8C%E7%AB%AF%E6%B2%92%E6%9C%89%E8%B7%9D%E9%9B%A2-34536c333e1b)