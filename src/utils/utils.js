import { reaction, extendObservable } from 'mobx';
import StorageManager from '../Storage/StorageManager';

// Javascript Utils
export const delay = (fn, timer = 300) => setTimeout(fn, timer);
export const storageName = target => target.constructor.name;

// Mobx Utils
export function trackObservable({ storage, target, key }) {
  return reaction(
    () => target[key],
    value => StorageManager.update({ storage, key, value }),
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
