---
layout: post
title: Firebase 學習記錄
date:  2023-05-11
tags:  sql
---

因為網路上的教學有些有點舊，所以整理了一篇 firebase 學習記錄。
1. 建立專案，[參考這篇](https://ithelp.ithome.com.tw/articles/10205404)
2. 寫入資料(不覆蓋路徑下舊有的資料，但為了區別所以會自動產生一個亂數的key)
    ``` js
    function write(groupid, userid, username, message) {
      push(ref(db, '/group/'+ groupid), {
        userid: userid,
        username: username,
        message: message,
        timestamp: Date.now()
      })
    }
    ```
3. 讀取資料，存入 itemList 後回傳
    ``` js
    function read(groupid) {
      const itemList = []
      
      onValue(ref(db, '/group/'+groupid), (snapshot) => {
        snapshot.forEach(function (snapshot) {
          var obj = snapshot.val();
          itemList.push(obj)
      })
      }, {
        onlyOnce: true
      });

      return itemList
    }
    ```
4. 已覆蓋方式寫入資料(重置資料庫)
    ``` js
    function resetDB() {
      set(ref(db, '/group'), {});
    }
    ```

完整程式碼：
``` js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue} from "firebase/database";

const firebaseConfig = {
  apiKey: "你的 api key",
  authDomain: "你的 authDomain",
  databaseURL: "你的 db URL",
  projectId: "你的 projectId",
  storageBucket: "你的 storageBucket",
  messagingSenderId: "你的 messagingSenderId",
  appId: "你的 appId",
  measurementId: "你的 measurementId"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function resetDB() {
  set(ref(db, '/group'), {});
}

// set 寫入資料
export function write(groupid, userid, username, message) {
  push(ref(db, '/group/'+ groupid), {
    userid: userid,
    username: username,
    message: message,
    timestamp: Date.now()
  })
}

export function read(groupid) {
  const itemList = []
  
  onValue(ref(db, '/group/'+groupid), (snapshot) => {
    snapshot.forEach(function (snapshot) {
      var obj = snapshot.val();
      itemList.push(obj)
  })
  }, {
    onlyOnce: true
  });

  return itemList
}
```

### Reference
[Firebase doc](https://firebase.google.com/docs/database/web/read-and-write?hl=zh-tw)