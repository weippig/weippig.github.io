---
layout: post
title: Rust - Unresolved import `rand`
date:  2022-09-07
tags: Rust
---
I encounter this error when I'm going to use `rand::thread_rng().gen_range()` function to create a random number.<br />
How to solve this ? It's really simple!
1. open `Cargo.toml`
2. add `rand = "*"` below `[dependencies]` 
