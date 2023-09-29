---
layout: post
title: Java - How to compile and run a java program ? 
date:  2023-09-29
tags:  java
---
好久沒更新頁面了！最近在學 java，所以紀錄會偏向 java 與 spring boot 的學習！
1. 首先電腦必須先安裝java！
2. 建立檔案 
    ``` shell
    touch HelloWorld.java
    ```
3. 進入檔案，撰寫程式，執行程式將會打印 Hello world 
    ``` java
    class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello World!"); 
      }
    }
    ```
4. 在 terminal 輸入以下指令編譯程式，成功後會發現路徑下多了 HelloWorld.class 這個檔案
    ``` shell
    javac HelloWorld.java
    ```
5. 在 terminal 輸入以下指令來執行程式
    ``` shell
    java HelloWorld
    ```