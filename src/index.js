import { extendObservable } from 'mobx';

import {
  descriptorModifier,
  trackObservable,
  isLocalStorageAvailable,
  storageName,
} from './utils/utils';
import StorageManager from './Storage/StorageManager';

// Create Keep Variable
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

// Create Keep Decorator @keep
export function keep(target, key, descriptor) {
  if (isLocalStorageAvailable()) {
    const storage = storageName(target);
    const initValue = descriptor.initializer();
    const item = StorageManager.get(storage, { [key]: initValue });
    return descriptorModifier(descriptor, key, item[key]);
  }
  return descriptor;
}

export default {
  createKeeper,
  keep,
};
