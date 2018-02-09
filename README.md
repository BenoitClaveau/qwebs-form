# qwebs-form
Form validation and format service for [Qwebs server](https://www.npmjs.com/package/qwebs-form).

 [![NPM][npm-image]][npm-url]
 [![Build Status][travis-image]][travis-url]
 [![Coverage Status][coveralls-image]][coveralls-url]
 [![NPM Download][npm-image-download]][npm-url]
 [![Dependencies Status][david-dm-image]][david-dm-url]

## Features

  * [Qwebs](https://www.npmjs.com/package/qwebs-form)
  * [Validation](#validation)
  * [Format](#format)
  * [WorkingDays](#workingdays)

## API

<a name="validation"/>
### Validation

> service: $form-validation

  * login(login)
  * password(password)
  * password()
  * email(email)
  * phoneNumber(phoneNumber)

<a name="format"/>
### Format

> service: $form-format

  * phoneNumber(phoneNumber)

<a name="workingdays"/>
### Format

> service: $form-working-days

  * nonWorkingDays(year)
  * workingTime(begin, end)

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

[npm-image]: https://img.shields.io/npm/v/qwebs-form.svg
[npm-image-download]: https://img.shields.io/npm/dm/qwebs-form.svg
[npm-url]: https://npmjs.org/package/qwebs-form
[travis-image]: https://travis-ci.org/BenoitClaveau/qwebs-form.svg?branch=master
[travis-url]: https://travis-ci.org/BenoitClaveau/qwebs-form
[coveralls-image]: https://coveralls.io/repos/BenoitClaveau/qwebs-form/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/BenoitClaveau/qwebs-form?branch=master
[david-dm-image]: https://david-dm.org/BenoitClaveau/qwebs-form/status.svg
[david-dm-url]: https://david-dm.org/BenoitClaveau/qwebs-form
