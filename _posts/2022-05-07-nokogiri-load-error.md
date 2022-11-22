---
layout: post
title: cannot load such file -- nokogiri/nokogiri
date:   2022-05-07
author: weippig
tags: jekyll 
---

可能添加了一些新東西到Gemfile，接著執行`bundle install`，安裝好後想執行`bundle exec jekyll serve`卻發生錯誤：
`require': cannot load such file -- nokogiri/nokogiri (LoadError)`

參考許多網路解法後，有效的是[這一篇](https://www.janmeppe.com/blog/how-to-fix-incompatible-library-version-nokogiri/)：
1. `gem uninstall -aIx`指令卸載全部的gems
2. `gem install bundler`安裝新的bundler
3. `bundle install`安裝全部的gems

問題解決！
