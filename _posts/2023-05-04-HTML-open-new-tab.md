---
layout: post
title: HTML - Open link with new tab
date:  2023-05-04
tags:  react html
---

方法如下：
``` html
<a href="某個網址" target="_blank" rel="noreferrer noopenner"> 
  New link
</a>
```


根據 google chrome 官方說明：
- `rel="noopener"` prevents the new page from being able to access the window.opener property and ensures it runs in a separate process.
- `rel="noreferrer"` has the same effect but also prevents the Referer header from being sent to the new page. See Link type "noreferrer".


簡而言之，後面的 `rel="noreferrer noopenner"` 是安全性考量，避免新開的頁面如果是 malicious page 會影響到原本的頁面。不過新版的瀏覽器目前都默認 `target="_blank"` link 使用 `rel=noopener`。

### Reference
[Links to cross-origin destinations are unsafe](https://developer.chrome.com/docs/lighthouse/best-practices/external-anchors-use-rel-noopener/)
[target="_blank" 的安全性風險](https://pjchender.dev/internet/is-noreferrer-noopenner/)