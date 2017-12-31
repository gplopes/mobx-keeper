# MobX Keeper

A directly and easy way to keep mobx observable persistent.

``` typescript
  npm install --save mobx-keeper
```

## Usage

``` typescript
import { observable } from 'mobx';
import { keep, createKeeper } from 'mobx-keeper';

class Store {
  @keep keeperDecorator = 'Keeper observable';
  @observable nonKeeper = 'I am just Mobx observable!';
  constructor() {
    createKeeper(this, {
      anotherKeeper: 'Keeper 2 observable!',
    });
  }
}

```

1. That's all, all the **Keepers** variables will work as a normal MobX variables and can be use as such.

2. This module uses basic localStorage to keep the variables persistent.
