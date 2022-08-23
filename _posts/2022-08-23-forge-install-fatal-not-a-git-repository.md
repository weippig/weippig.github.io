---
layout: post
title:  "forge install : fatal: Not a git repository (or any of the parent directories)" 
date:  2022-08-23
tags: smart-contract
---
Run `forge install some-repo` command then get `fatal: Not a git repository (or any of the parent directories)`error. Because there are no .git folder! <br />
Solve the problem by run `forge init` (or `forge init --force`)