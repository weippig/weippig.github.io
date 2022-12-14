---
layout: post
title: Go - 加解密
date:  2022-12-14
tags:  Go
---

Go 簡單的加解密可以用 base64 來實現

``` go 
import (
	"encoding/base64"
	"fmt"
)

func main() {

	data := "你好世界"

	sEnc := base64.StdEncoding.EncodeToString([]byte(data))
	fmt.Println(sEnc)

	sDec, err := base64.StdEncoding.DecodeString(sEnc)
	if err == nil {
		fmt.Println(string(sDec))
	}
}

```

其他還有例如 DES、AES，這兩個演算法在 `crypto` package 內被實現。AES 的範例如下： 
``` go
import (
	"crypto/aes"
	"crypto/cipher"
	"fmt"
	"os"
)

var commonIV = []byte{0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f}

func main() {
	//需要去加密的字串
	plaintext := []byte("你好世界")
	//如果傳入加密串的話，plaintext 就是傳入的字串
	if len(os.Args) > 1 {
		plaintext = []byte(os.Args[1])
	}

	//aes 的加密字串
	key_text := "astaxie12798akljzmknm.ahkjkljl;k"
	if len(os.Args) > 2 {
		key_text = os.Args[2]
	}

	// 建立加密演算法 aes
	c, err := aes.NewCipher([]byte(key_text))
	if err != nil {
		fmt.Printf("Error: NewCipher(%d bytes) = %s", len(key_text), err)
		os.Exit(-1)
	}

	//加密字串
	cfb := cipher.NewCFBEncrypter(c, commonIV)
	ciphertext := make([]byte, len(plaintext))
	cfb.XORKeyStream(ciphertext, plaintext)
	fmt.Printf("%s=>%x\n", plaintext, ciphertext)

	// 解密字串
	cfbdec := cipher.NewCFBDecrypter(c, commonIV)
	plaintextCopy := make([]byte, len(plaintext))
	cfbdec.XORKeyStream(plaintextCopy, ciphertext)
	fmt.Printf("%x=>%s\n", ciphertext, plaintextCopy)
}
```

### 參考資料
[程式碼來源](https://willh.gitbook.io/build-web-application-with-golang-zhtw/09.0/09.6)