# qwebs-form
Form validation and format service for [Qwebs server](https://www.npmjs.com/package/qwebs).
  
## Features

  * [Qwebs](https://www.npmjs.com/package/qwebs)
  * [API](#api) 

<a name="api"/>
## API

  * validateLogin(login)
  * validatePassword(password)
  * generatePassword()
  * validateEmail(email)
  * validatePhoneNumber(phoneNumber)
  * formatPhoneNumber(phoneNumber)

### Declare and inject $form

#### Via services.json
```services.json
{
  "services": [
    { "name": "$form", "location": "qwebs-form" }
  ]
}
```

## Installation

```bash
$ npm install qwebs-form
```
