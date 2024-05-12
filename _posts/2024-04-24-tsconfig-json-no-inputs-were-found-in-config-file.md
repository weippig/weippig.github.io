---
layout: post
title: Typescript - tsconfig.json - Build:No inputs were found in config file
date:  2024-04-24
tags:  typescript
---
出現這個錯誤的解決辦法：

在 tsconfig.json 的 compilerOptions 中加上一行：
``` typescript
"compilerOptions": {
    "allowJs": true,
}
```
