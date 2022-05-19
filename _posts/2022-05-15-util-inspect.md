---
layout: post
title: util.insprct
date:   2022-05-15
author: weippig
tags: javascript typescript
---

有時使用`console.log`印出JSON檔時，會顯示很惱人的：
``` 
verificationMethod: [ [Object], [Object] ]
```

這時候可以用
```
const util = require('util')
console.log(util.inspect(myObject, false, null, true))
```

來解決