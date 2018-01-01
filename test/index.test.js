/* global localStorage */
import isObservable from './isObservable';
import {
  descriptorModifier,
  trackObservable,
  storageName,
} from '../src/utils/utils';
import StorageManager from '../src/Storage/StorageManager';
import { keep, createKeeper } from '../src/index';


/*
 * Mockup
* */
class Keeper {
  constructor() {
    this.keeper = 'keeper';
    createKeeper(this, {
      keepIn: 'Created Keeper',
    });
  }
}

const KeeperInstance = new Keeper();

/*
 * StorageName()
 * it takes the class and return its name to be use as LocalStorage key
 * */
test('storageName() should return class name', () => {
  expect(storageName(KeeperInstance)).toBe('Keeper');
});


/*
 * trackObservable()
 * it creates a mobx reaction and saves the variable on
 * the localStorage all the time it is changed
 * */
test('trackObservable() should register mobx reaction function', () => {
  const storage = storageName(KeeperInstance);
  const instanceOfTrackObservable = trackObservable({
    storage,
    target: KeeperInstance,
    key: 'keeper',
  });

  expect(instanceOfTrackObservable).toBeInstanceOf(Function);
});


/*
 * descriptorModifier()
 * it changes the descriptor used on decorators, the changes are:
 * 1. make it configurable
 * 2. run a trackObservable once it is initialized
 * */
test('descriptorModifier() should return modifier descriptor object', () => {

  const instanceOfDescriptorModifier = descriptorModifier(
    {},
    'keeper',
    'keeper',
  );

  expect(instanceOfDescriptorModifier).toMatchSnapshot({
    configurable: true,
    initializer: function initializer() { return 0; },
  });
});


/*
 * StorageManager.save()
 * it will save the variable in the localStorage under the class name
 * */
test('StorageManager.save() should save variable on the localstorage', () => {
  const target = storageName(KeeperInstance);
  const expected = {
    [target]: JSON.stringify({
      keepIn: 'Created Keeper',
      keep: 'keep',
    }),
  };
  StorageManager.save(target, { keep: 'keep' });
  expect(localStorage.__STORE__).toEqual(expected);
});

/*
 * StorageManager.get()
 * it will get the variable in the localStorage under the class name
 * */
test('StorageManager.get() should return variable from localStorage', () => {
  const target = storageName(KeeperInstance);
  StorageManager.save(target, { keep: 'keep' });
  const localStorageVariable = StorageManager.get(target, { keep: 'keep' });

  expect(localStorageVariable).toEqual({ keep: 'keep' });
});

/*
 * StorageManager.get()
 * it will return the same variable in case it cannot find the variable
 * in the localStorage
 * */
test('StorageManager.get() should return same variable if localStorage is empty', () => {
  const target = 'Keeper 2';
  const StorageManagerVariable = StorageManager.get(target, { keep: 'not local' });
  expect(StorageManagerVariable).toEqual({ keep: 'not local' });
});

/*
 * StorageManager.clear()
 * it will simply clean the localstorage
 * */
test('StorageManager.clear() should clean the localStorage', () => {
  const target = storageName(KeeperInstance);
  StorageManager.clear(target);

  expect(localStorage.__STORE__[target]).toBe(JSON.stringify({}));
});

/*
 * StorageManager.update()
 * it will update the variable already storaged in the localStorage
 * */
test('StorageManager.update() should update varialbe in the localStorage', () => {
  const target = 'Keeper Update';
  const initVariable = { keep: 'update keep' };
  const updatedVariable = { keep: '[NEW] update keep' };
  StorageManager.save(target, initVariable);
  StorageManager.update({
    storage: target,
    key: 'keep',
    value: updatedVariable.keep,
  });

  const localStorageVariable = StorageManager.get(target, initVariable);
  expect(localStorageVariable).toEqual(updatedVariable);
});


/*
 * createKeeper()
 * it should create an mobx observable
 * */
test('createKeeper() should create mobx observable', () => {
  expect.extend(isObservable);
  expect(KeeperInstance).isObservable('keepIn');
});


/*
 * @keep
 * it should create an mobx observable using decorator
 * */
// test('@keep should create mobx observable using decorator', () => {
// });
