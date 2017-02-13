# qwebs-form
Form validation and format service for [Qwebs server](https://www.npmjs.com/package/qwebs).
  
## Features

  * [Qwebs](https://www.npmjs.com/package/qwebs)
  * [API](#api) 

<a name="api"/>
## API

  * validateLogin(login)
  * validatePassword(password)
  * validateEmail(email)
  * validatePhoneNumber(phoneNumber)
  * formatPhoneNumber(phoneNumber)

### Declare and inject $mongo

#### Via routes.json
```routes.json
{
  "services": [
    { "name": "$form", "location": "qwebs-form" }
  ]
}
```

#### Or in javascript
```js
const Qwebs = require("qwebs");
const qwebs = new Qwebs();

qwebs.inject("$form" ,"qwebs-form");
```

## Installation

```bash
$ npm install qwebs-form
```
