---
layout: post
title:  RegExp.test returns false, even though it should return true
date:  2022-08-11
tags: typescript
---
For example, this is my regular expression : <br />
`^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$` <br />
It used to check if string is in YYYY-MM-DD form. <br />
I used code as below at first, and found that `regexp.test` always return false, even thouth it should return true. <br />
``` typescript 
  const regexp = new RegExp('^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$')
  console.log(regexp.test(date))
```
The solution is : 
``` typescript 
  const regexp = new RegExp(/^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/)
  return(regexp.test(date))
```
To replace single quotations(') to slash(/) !
Check this [website](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) to get more information.

