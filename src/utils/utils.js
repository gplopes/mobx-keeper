/* global window */
import {
  reaction,
  extendObservable,
  observe,
  isObservableObject,
  isObservableMap,
  isObservableArray,
} from 'mobx';
import StorageManager from '../Storage/StorageManager';

/*
 * isObservableValue
 * check if the observable is type simple value
 * */
function isObservableValue(target) {
  return (
    !isObservableMap(target) &&
    !isObservableObject(target) &&
    !isObservableArray(target)
  );
}

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
 * Track Observable from class
 * and apply reaction when it updates
 * */
function trackObservableFromClass({ storage, target, key }) {
  return reaction(
    () => target[key],
    value => StorageManager.update({ storage, key, value }),
  );
}

/*
 * Track Observable from variable
 * and observe when it changes
 * */
function trackObservableFromVariable({ storage, selfTarget, key }) {
  return observe(selfTarget, (change) => {
    const value = isObservableValue(change.object) ? change.newValue : change.object;
    StorageManager.update({ storage, key, value });
  });
}

/*
 * MAIN:
 * Track Observables from class
 * or outside class (global variables)
 * */
export function trackObservable(params) {
  return params.selfTarget !== undefined
    ? trackObservableFromVariable(params)
    : trackObservableFromClass(params);
}

/*
 * Modify descriptor from decorator
 * (apply tracker and observable)
 * */
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
