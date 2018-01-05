/* global window */
import { reaction, extendObservable } from 'mobx';
import StorageManager from '../Storage/StorageManager';

/*
 * Delay
 * */
export const delay = (fn, timer = 300) => setTimeout(fn, timer);

/*
 * StorageName
 * Get class instance name and return as string
 * */
export const storageName = target => target.constructor.name;

/*
 * Test if LocalStorage is available
 * */
export const isLocalStorageAvailable = () => {
  const mod = 'mobxkeeper';
  try {
    window.localStorage.setItem(mod, mod);
    window.localStorage.removeItem(mod);
    return true;
  } catch (e) {
    return false;
  }
};

/*
 *  Mobx Utils
 * */
export function trackObservable({ storage, target, key }) {
  return reaction(
    () => target[key],
    value => StorageManager.update({ storage, key, value })
  );
}

export function descriptorModifier(descriptor, key, value) {
  function initializer() {
    const storage = storageName(this);
    delay(() => {
      extendObservable(this, { [key]: value });
      trackObservable({ storage, target: this, key });
    });
    return value;
  }

  return Object.assign(descriptor, {
    configurable: true,
    initializer,
  });
}
