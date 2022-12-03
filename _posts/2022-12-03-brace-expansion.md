---
layout: post
title: 大括號的分配律─ Brace Expansion
date:  2022-12-01
tags:  linux zsh
---

1. 分配律用法例如：創建 apple.txt after.txt as.txt 三個檔案
    
    ``` bash
    touch a{pple,fter,s}.txt
    ```
    
    總之就是把共同的部份寫在大括號外面即可。
    
2. 連續用法例如：創建 file1, file2, ..., file100 等100個資料夾
    
    ``` bash
    mkdir file{1..100}
    ```
    
    把連續的字母或數字的**頭**、**尾**寫在大括號內，用 `..` 隔開即可，原本需要100條命令現在只要1條就可以做到。
    
    也可以將數字改為英文字母，例如下面指令會 echo a ~ z 26 個字母
    
    ```bash
    echo {a..z}
    # a b c d e f g h i j k l m n o p q r s t u v w x y z
    ```
    
    也可以用降序的方式：
    
    ```bash
    echo {10..1}
    # 10 9 8 7 6 5 4 3 2 1
    ```
    
3. 當然也可以混合使用：
    
    ``` bash
    touch file_{1..5}_{old,new}
    ```
    
    這樣會產生10個檔案，`file_1_old` 、 `file_1_new` 、 `file_2_old` ...
    
4. 設置 step - {start..end..step}
    
    ```bash
    echo {10..0..2}
    # 10 8 6 4 2 0
    ```
    
5. 使用在 for loop 上
    
    ```bash
    for i in {0..10}
    do
      echo "Number: $i"
    done
    
    # Number: 0
    # Number: 1
    # Number: 2
    # Number: 3
    # Number: 4
    # Number: 5
    # Number: 6
    # Number: 7
    # Number: 8
    # Number: 9
    # Number: 10
    ```
    
6. Nested 
    
    ```bash
    echo {a{1..3},{b..f}{4..0..2}}
    # a1 a2 a3 b4 b2 b0 c4 c2 c0 d4 d2 d0
    ```