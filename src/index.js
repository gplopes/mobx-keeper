import { extendObservable, observable } from 'mobx';

import {
  descriptorModifier,
  trackObservable,
  isLocalStorageAvailable,
  storageName,
} from './utils/utils';
import StorageManager from './Storage/StorageManager';

/*
 * Creates Keep Variable inside a class or function
 * extends observables
 * */
export function createKeeper(target, variables) {
  if (isLocalStorageAvailable()) {
    const storage = storageName(target);
    const items = StorageManager.get(storage, variables);
    const varKeys = Object.keys(items);
    extendObservable(target, items);
    varKeys.map(key => trackObservable({ storage, target, key }));
  } else {
    extendObservable(target, variables);
  }
}

/*
 * Creates Keep Variable inside a class
 * using decorator
 * */
function keepDecorator(target, key, descriptor) {
  if (isLocalStorageAvailable()) {
    const storage = storageName(target);
    const initValue = descriptor.initializer();
    const item = StorageManager.get(storage, { [key]: initValue });
    return descriptorModifier(descriptor, key, item[key]);
  }
  return descriptor;
}

/*
 * Create Keep Simple Value outside class
 * extend observable
 * */
const VARIABLES_STORAGE = 'keeper:variables';
function keepValue(key, value) {
  if (isLocalStorageAvailable()) {
    const item = StorageManager.get(VARIABLES_STORAGE, { [key]: value });
    const observableItem = observable(item[key]);

    trackObservable({ storage: VARIABLES_STORAGE, key, selfTarget: observableItem });
    return observableItem;
  }
  return value;
}


/*
 * MAIN:
 * Creates Decorator or Normal simple value;
 * */
export function keep(...params) {
  if (params.length <= 2) {
    return keepValue(...params);
  }
  if (params.length === 3 || typeof params[2] === 'function') {
    return keepDecorator(...params);
  }

  return undefined;
}

export default {
  createKeeper,
  keep,
};
