---
layout: post
title: Go - 如何儲存密碼
date:  2022-12-13
tags:  Go
---

目前常見儲存密碼的方式是使用單向雜湊演算法將明文雜湊後儲存。單向雜湊演算法，顧名思義，無法將雜湊過後的摘要(digest)還原成明文，而這個過程具有確定性，也就是每次輸入相同內容得到的摘要都相同。在真實情況下，每次輸入密碼後，會將其進行雜湊，再與資料庫內儲存的摘要做比對。

常用的單向雜湊演算法包括 SHA-256, SHA-1, MD5 等 :
``` go
import (
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"fmt"
	"io"
)

func main() {
	h := sha256.New()
	io.WriteString(h, "密碼")
	fmt.Printf("% x\n", h.Sum(nil)) // %x	base 16, with lower-case letters for a-f

	h = sha1.New()
	io.WriteString(h, "密碼")
	fmt.Printf("% x\n", h.Sum(nil))

	h = md5.New()
	io.WriteString(h, "密碼")
	fmt.Printf("%x", h.Sum(nil))
}
```
結果：
```
ef 8b 49 45 8c 14 f6 59 63 50 24 2e d3 73 a7 0d 63 b8 ba 13 32 b0 1c d6 f9 80 23 35 ae ae 63 7c
6e 25 cb 22 24 f0 e4 ff 01 4a 51 c3 82 82 f7 b7 59 88 dc 31
6662c848a80c30c8d042bfd17cf5ae2c
```

### Rainbow table
有些密碼特別常見，因此有個摘要組合叫做 Rainbow table，其實就是很多常見的密碼與其雜湊過後的摘要，和資料庫儲存的摘要進行比對後，就可以推導出原本的明文。所以一旦資料庫被洩露，駭客可以照著 Rainbow table 比對出很多用戶的明文密碼。

### 加鹽
為了防止駭客輕易比對出密碼，有個方法叫做「加鹽」，除了使用單向雜湊法將明文雜湊一次，另外加上指定字串或用戶名等隨機字串再做一次加密。
``` go 
import (
	"crypto/md5"
	"fmt"
	"io"
)

func main() {
	h := md5.New()
	io.WriteString(h, "密碼")

	pwmd5 := fmt.Sprintf("%x", h.Sum(nil))

	salt1 := "@#$%"
	salt2 := "^&*()"

	// 和上面兩個鹽拼接
	io.WriteString(h, salt1)
	io.WriteString(h, salt2)
	io.WriteString(h, pwmd5)

	fmt.Printf("% x", h.Sum(nil))
}
```

### scrypt / bcrypt
還有其他的套件例如 scrypt 與 bcrypt：


scrypt
``` go
package main

import (
	"fmt"

	"golang.org/x/crypto/scrypt"
)

func main() {
	salt := []byte("asdfasdf")
	h, err := scrypt.Key([]byte("some password"), salt, 16384, 8, 1, 32)

	if err == nil {
		fmt.Printf("% x", h)
	}
}
```
bcrypt
``` go
package main

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	password := []byte("密碼")

	// Hashing the password with the default cost of 10
	h, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
	if err == nil {
		fmt.Printf("% x", h)
	}

	// Comparing the password with the hash
	err = bcrypt.CompareHashAndPassword(h, password)
	fmt.Println(err) // nil means it is a match
}

```

## 參考資料
- [儲存密碼](https://willh.gitbook.io/build-web-application-with-golang-zhtw/09.0/09.5)
- [equivalent salt and hash in golang](https://stackoverflow.com/questions/23039458/equivalent-salt-and-hash-in-golang)