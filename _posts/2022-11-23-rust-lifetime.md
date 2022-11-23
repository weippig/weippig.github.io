---
layout: post
title:  Rust - Lifetime
date:  2022-11-23
tags:  Rust
---


前情提要：

Rust 被設計為一種非常安全的語言，因此變數宣告上有幾點特色 ：

1. Rust 沒有 null 的概念，也不允許 null pointer，如果在指派值給變數之前使用它，會報錯。
2. 變數預設為 immutable，如果要該變數的值可被變更，必須加上 `mut` 這個 keyword。

Rust 內，每個引用(Reference)都有生命週期(Lifetime)，生命週期會決定該引用是不是有效的引用。

當在一個 function、一個生命週期內大量地引用多個變數，這些變數可能擁有不同生命週期，這時我們就需要使用泛型生命週期來詮釋引用之間的關係，以避免 Dangling references 等問題發生。

例如下面這個例子：

```rust
fn main() {
    {
        let r;

        {
            let x = 5;
            r = &x;
        }

        println!("r: {}", r);
    }
}
```

如果執行會出現錯誤：

```
error[E0597]: `x` does not live long enough
  --> src/main.rs:7:17
   |
7  |             r = &x;
   |                 ^^ borrowed value does not live long enough
8  |         }
   |         - `x` dropped here while still borrowed
9  |
10 |         println!("r: {}", r);
   |                           - borrow later used here
```

這是因為外部作用域的 r 引用的內部作用域的 x 在被印出來之前生命就結束了，等於指標指到的地方記憶體已經被釋放了。

Rust 編譯器怎麼發現引用的記憶體被釋放了呢？這是因為 Rust 編譯器有個叫做 **借用檢查器**
（borrow checker）的東西，會檢查變數們的引用是否有效。

把上面的程式碼加上生命週期詮釋，用 'a 表示外部作用域的 r 的生命週期， 'b 代表內部作用域 x 的生命週期。

```rust
{
    let r;                // ---------+-- 'a
                          //          |
    {                     //          |
        let x = 5;        // -+-- 'b  |
        r = &x;           //  |       |
    }                     // -+       |
                          //          |
    println!("r: {}", r); //          |
}                         // ---------+
```

把程式碼改成下面的樣子就可以正常編譯：

```rust
{
    let x = 5;            // ----------+-- 'b
                          //           |
    let r = &x;           // --+-- 'a  |
                          //   |       |
    println!("r: {}", r); //   |       |
                          // --+       |
}                         // ----------+
```

此時 x 的生命週期 'b 比 'a 還長，所以編譯器知道引用有效。

### 函式中的生命週期

```rust
fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("最長的字串為 {}", result);
}

fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

編譯的話會出現下面的錯誤：

```
error[E0106]: missing lifetime specifier
 --> src/main.rs:9:33
  |
9 | fn longest(x: &str, y: &str) -> &str {
  |               ----     ----     ^ expected named lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but the signature does not say whether it is borrowed from `x` or `y`
help: consider introducing a named lifetime parameter
  |
9 | fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
  |           ++++     ++          ++          ++

For more information about this error, try `rustc --explain E0106`.
error: could not compile `playground` due to previous error
```

他叫你要有 lifetime specifier，這是因為`longest` function 引用了兩個參數，並回傳其中一個，但是到底回傳 x 還是 y 不一定，所以無法像前面觀察作用域一樣確保引用的有效。Rust 的解決方法就是加上泛型生命週期參數來定義引用之間的關係，讓檢查器可以檢查

### 生命週期詮釋語法

生命週期的參數以撇號開頭（'），通常是很短的小寫。大部分時會會將其放在引用的 `&` 後面。

```rust
&i32        // 一個引用
&'a i32     // 一個有顯式生命週期的引用
&'a mut i32 // 一個有顯式生命週期的可變引用
```

如果我們宣告一個叫做 one 的引用，他的生命週期是 'a，宣告一個叫做 two 的引用，他的生命週期也是 'a，這兩個變數都會和 'a 這個生命週期活得一樣久

修改前面的程式碼，確保 x 與 y 不管回傳哪個都是有效的引用。

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

這樣一來函式內所有引用 —  x 與 y 的生命週期都是 ‘a。回傳的地方也有標註生命週期，讓編譯器知道：不管 x 還 y ，生命週期都與回傳的 str 相同，不用擔心回傳到非法的引用。

實際上， 'a 代表的是 x 與 y 生命週期重疊的部分，也就是較短的生命週期。使用這個方式讓編譯器檢查出非法引用，畢竟較短的生命週期 = 比較早被釋放的變數，在此方法之下，回傳引用的生命週期保證在 `x` 和 `y`的生命週期較短的結束前有效。

現在的程式碼：

```rust
fn main() {
    let string1 = String::from("很長的長字串");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
    }
    println!("最長的字串為 {}", result);
}

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

編譯會檢查出錯誤：

```
error[E0597]: `string2` does not live long enough
 --> src/main.rs:6:44
  |
6 |         result = longest(string1.as_str(), string2.as_str());
  |                                            ^^^^^^^^^^^^^^^^ borrowed value does not live long enough
7 |     }
  |     - `string2` dropped here while still borrowed
8 |     println!("最長的字串為 {}", result);
  |                                 ------ borrow later used here

For more information about this error, try `rustc --explain E0597`.
```

編譯器發現 string2 生命週期太短！

如果是宣告 struct，通常也都會加上生命週期，避免在 struct 尚存在的時候，裡面引用的資料就被釋放

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}
```

