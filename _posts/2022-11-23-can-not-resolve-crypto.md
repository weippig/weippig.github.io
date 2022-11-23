---
layout: post
title:  Module not found Error -  Can't resolve 'crypto'
date:  2022-11-23
tags:  react
---
To fix `Module not found: Error: Can't resolve 'crypto'` and `Module not found: Error: Can't resolve 'stream'` error, you can try this : 
``` shell
npm install 'stream-browserify'
npm install 'crypto-browserify'
```