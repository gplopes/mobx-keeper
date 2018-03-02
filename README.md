![mobx-keeper](https://image.ibb.co/fL1zew/KEEPER_logo.png)


# mobx keeper

An easy way to keep mobx observable persistent and rehydrate.

[![npm version](https://badge.fury.io/js/mobx-keeper.svg)](https://badge.fury.io/js/mobx-keeper)
[![Build Status](https://travis-ci.org/gplopes/mobx-keeper.svg?branch=master)](https://travis-ci.org/gplopes/mobx-keeper)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shields)](http://makeapullrequest.com)
[![npm downloads](https://img.shields.io/npm/dm/mobx-keeper.svg?style=flat-square)](https://www.npmjs.com/package//mobx-keeper)


## Quickstart
`npm install mobx-keeper`

Usage Examples:
1. [Basic Usage](#basic-usage)
2. [Decorator Usage](#decorator-usage)
3. [Variable Usage](#variable-usage)

#### Basic Usage
Basic usage can be created inside an ES6+ class or a function.
```js
import { createKeeper } from 'mobx-keeper';


// ES6+ Class

class Store {
  constructor() {
    createKeeper(this, { storeItem: 'lorem ipsum' });
  }
}

// Function

function Store() {
  createKeeper(this, { storeItem: 'lorem ispum' });
}
const myStore = new Store();
```

#### Decorator Usage
If you are using [Decorators Transformer](https://babeljs.io/docs/plugins/transform-decorators/) with Babel or another compile you can wrap variables with **keep** and it will return a mobx observable.
```js
import { keep } from 'mobx-keeper';


// @Decorator

class Store {
  @keep storeItem = "lorem ispum";
}

```

#### Variable Usage
Keepers values can initialized as single variable, using any JS primitives.

```js
import { keep } from 'mobx-keeper';

const temperature = keep('temperature', 20);
temperature.set(25);
````

### PR, Comments & feedback are welcome :)

#### Run test
```
> npm test
> npm run test:watch
```

#### Run playground
##### A playground with a more visual example
```
> npm run example
```

------
### Built With [Mobx](https://mobx.js.org/)

[![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)](https://forthebadge.com)
