---
layout: post
title: unknown feature `proc_macro_span_shrink`
date:  2022-10-06
tags:  solana blockchain
---

I encounter below error when run command `anchor build`.
``` shell
error[E0635]: unknown feature `proc_macro_span_shrink`
```
Solution is downgrading proc-macro2 to 1.0.43 : 
``` shell
cargo update -p proc-macro2 --precise 1.0.43
```
[Reference](https://github.com/dtolnay/proc-macro2/pull/348)