---
layout: post
title: Request body is undefined
date:  2024-10-04
tags:  http
---

### 問題
嘗試將包在 docker 內的 app 和 redis container 一起用 docker-compose 啟動並連接的時候，發現 app 一直連不上，而且會顯示錯誤：
```
[ioredis] Unhandled error event: Error: connect ECONNREFUSED 127.0.0.1:6379
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1085:14)
```

### Solution
1. 將 docker compose 中 redis 的部分改為下面：
    ``` yml
    redis1:
    container_name: redis1
    image: redis:latest
    networks:
      - custom_network
    command: ["redis-server", "--bind", "redis1", "--port", "6379"]
    ```
2. app 連線 redis 的 client 部分，host 必須是 container 的名字
    ``` typescript
    const redisClient1 = new Redis({
      host: 'redis1',
      port: 6379
    });
    ```

這個解法來自[這篇](https://github.com/redis/ioredis/issues/763)
