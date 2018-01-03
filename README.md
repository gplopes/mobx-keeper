![mobx-keeper](https://image.ibb.co/fL1zew/KEEPER_logo.png)

A directly and easy way to keep mobx observable persistent using localstorage

[![forthebadge](http://forthebadge.com/images/badges/check-it-out.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)

[![npm version](https://badge.fury.io/js/mobx-keeper.svg)](https://badge.fury.io/js/mobx-keeper)
[![Build Status](https://travis-ci.org/gplopes/mobx-keeper.svg?branch=master)](https://travis-ci.org/gplopes/mobx-keeper)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shields)](http://makeapullrequest.com)



## Getting Started

If you are using mobx already it should be easy. Initialize the variables with **mobx-keeper**, it shouldn't interfere the app store and work out of the box.

### Prerequisites

You will need to install mobx (of course) and in case you want to use decorator, config your webpack to support it.

### Installing

This module uses basic localStorage to keep the variables persistent, so it should be easy and painless :)


```
npm install --save mobx-keeper
```

And then import your project

```js
import { observable } from 'mobx';
import { keep, createKeeper } from 'mobx-keeper';


class Store {
  @keep keepz = 'my keep';
  @observable mobxObserver = 'non keeper';

  constructor() {
    createKeeper(this, {
      keepzTwo: 'my 2 keep',
    });
  }
}
```

## Running the tests

Project uses [jest](https://facebook.github.io/jest/) for tests

```
npm test
```

## Built With

* [Wepback](https://github.com/webpack/webpack)
* [Mobx](https://mobx.js.org/) 

## Contributing

PR, Comments & feedback are welcome :)


