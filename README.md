listen-in
---

[![Travis](https://img.shields.io/travis/tbremer/listen-in.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/tbremer/listen-in)
[![npm](https://img.shields.io/npm/v/listen-in.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/listen-in)
[![npm](https://img.shields.io/npm/l/listen-in.svg?maxAge=2592000?style=flat-square)](https://github.com/tbremer/listen-in/blob/master/LICENSE)

listen-in is a simple to use, Promise based, STDIN listener for node applications

## Motivation

listen-in was written because I wanted a way to pass secure information into Node applications with out adding `EXPORT` or configuration files to my user profile.

## Basic Use

```javascript
const lstn = require('listen-in');

lstn({
  message: 'First Name: ',
  insecure: true
})
.then(data => {
  console.log(`First Name: ${data}`);
});
```

## Use with es2017 Async/Await

```javascript
import lstn from 'listen-in';

const config = async () => ({
  dbName: 'production',
  dbUser: 'username',
  dbPassword: await listn({ insecure: true, message: 'Database Password: ' })
});
```
## Use for updating `process.env`:
```javascript
import lstn from 'listen-in';

function getConfigs() {
  return lstn({ message: 'Database Password: ', envToken: 'dbp'})
  .then(() => ({
    dbName: 'production',
    dbUser: 'username',
    dbPassword: process.env.dbp
  }));
}
```

## Options

- `envToken [String]`: add value to `process.env` under this name. (_default `null`_)
- `message [String]`: Message to prompt user with. (_default `null`_)
- `insecure [Boolean]`: Passes user input into the `then`.
