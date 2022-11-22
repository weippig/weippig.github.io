---
layout: post
title: Ceramic Network request failed
date:  2022-07-21
tags: blockchain
---
if you encounter error like this :
``` 
Uncaught (in promise) Error: Failed to resolve did:3:kjzl6cwe1jw147zqv5dtc1ftpxhxoo0tsabl7271zemu8hkjukmcey2ja2fhlu4?version-id=0#dMW2faveLVp6D2H: invalidDid, TypeError: Network request failed
    at DID.resolve (did.js?f452:230:1)
    at async DID.verifyJWS (did.js?f452:142:1)
    at async DID.authenticate (did.js?f452:86:23)
```
and your code maybe look like :
``` typescript
const ceramic = new CeramicClient('')
  const did = new DID({
    // Get the DID provider from the 3ID Connect instance
    provider: threeID.getDidProvider(),
    resolver: {
      ...get3IDResolver(ceramic),
      ...getKeyResolver(),
    },
  })
```

Try to change 
``` typescript
const ceramic = new CeramicClient()
```
to 
``` typescript
const ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com')
```
