/* global localStorage */
import isObservable from './isObservable';
import {
  descriptorModifier,
  trackObservable,
  storageName,
  isLocalStorageAvailable,
} from '../src/utils/utils';
import StorageManager from '../src/Storage/StorageManager';
import { keep, createKeeper } from '../src/index';


expect.extend(isObservable);
beforeEach(() => {
  localStorage.clear();
});


describe('@ Helpers', () => {
  /*
   *  isLocalStorageAvailable()
   *  it check whether the localstorage is available or not.
   * */
  test('isLocalStorageAvailable() should return true or false', () => {
    expect(isLocalStorageAvailable()).toBe(true);
  });

  /*
   * StorageName()
   * it takes the class and return its name to be use as LocalStorage key
   * */
  test('storageName() should return class name', () => {
    class KeeperStorage { }
    const instance = new KeeperStorage();

    expect(storageName(instance)).toBe('KeeperStorage');
  });

});

describe('@ Utils', () => {
  /*
   * trackObservable()
   * it creates a mobx reaction and saves the variable on
   * the localStorage all the time it is changed
   * */
  test('trackObservable() should register mobx reaction function', () => {
    class KeeperTrack { }
    const instance = new KeeperTrack();

    const storage = storageName(instance);
    const instanceOfTrackObservable = trackObservable({
      storage,
      target: instance,
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
});

describe('@ StorageMananger', () => {

  /*
   * StorageManager.save()
   * it will save the variable in the localStorage under the class name
   * */
  test('StorageManager.save() should save variable on the localstorage', () => {
    const targetName = 'Mockup_Class_Name';
    StorageManager.save(targetName, { keep: 'keep' });
    expect(localStorage.__STORE__[targetName]).toMatch(JSON.stringify({ keep: 'keep' }));
  });

  /*
   * StorageManager.get()
   * it will get the variable in the localStorage under the class name
   * */
  test('StorageManager.get() should return variable from localStorage', () => {
    const targetName = 'Mockup_Class_Name';
    StorageManager.save(targetName, { keep: 'keep' });
    const localStorageVariable = StorageManager.get(targetName, { keep: 'keep' });

    expect(localStorageVariable).toEqual({ keep: 'keep' });
  });

  /*
   * StorageManager.get()
   * it will return the same variable in case it cannot find the variable
   * in the localStorage
   * */
  test('StorageManager.get() should return same variable if localStorage is empty', () => {
    const targetName = 'Mockup_Class_Name';
    const StorageManagerVariable = StorageManager.get(targetName, { keep: 'not local' });

    expect(StorageManagerVariable).toEqual({ keep: 'not local' });
  });

  /*
   * StorageManager.clear()
   * it will simply clean the localstorage
   * */
  test('StorageManager.clear() should clean the localStorage', () => {
    const targetName = 'Mockup_Class_Name';
    StorageManager.clear(targetName);
    expect(localStorage.__STORE__[targetName]).toBe(JSON.stringify({}));
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

});


describe('@ Main Functions', () => {
  /*
   * createKeeper()
   * it should create an mobx observable
   * */
  test('createKeeper() should create mobx observable', () => {
    class Store {
      constructor() {
        createKeeper(this, { keep: 'keep' });
      }
    }
    const instance = new Store();

    expect(instance).isObservable('keep');
  });


  /*
   * @keep
   * it should create an mobx observable using decorator
   * */
  // test('@keep should create mobx observable using decorator', () => {
  //   class Store {
  //     @keep keepMe = 'keep';
  //   }
  //   const instance = new Store();

  // });
});
