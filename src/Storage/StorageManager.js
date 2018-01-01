import keeperStorage from './localstorage';

// Storage Management
const StorageManager = {
  save(target, items) {
    keeperStorage.start(target);
    Object.keys(items).map(key => (keeperStorage.set(target, { [key]: items[key] })));
  },
  get(target, items) {
    const objItems = {};
    Object.keys(items).map((key) => {
      const localValue = keeperStorage.get(target, key);

      if (!localValue) {
        this.save(target, { [key]: items[key] });
        objItems[key] = items[key];
      } else {
        objItems[key] = localValue;
      }
    });

    return objItems;
  },
  clear(storeName) {
    keeperStorage.end(storeName);
  },
  update({ storage, key, value }) {
    keeperStorage.set(storage, { [key]: value });
  },
};

export default StorageManager;
