---
layout: post
title:  Anchor test - Error loading workspace IDL for counter
date:  2022-11-22
tags:  solana blockchain
---

When encountering this error `Error: Error loading workspace IDL for counter` when run `anchor test`, you shoud check three place which must be same name.
1. program 's name
    ``` rust
    pub mod programe_name
    ```
2. package name in `Cargo.toml`
    ``` toml
    [package]
    name = "programe_name"
    version = "0.1.0"
    description = "Created with Anchor"
    edition = "2021"
    ```
3. lib name in `Cargo.toml`
    ``` toml
    [lib]
    crate-type = ["cdylib", "lib"]
    name = "counter"
    ```