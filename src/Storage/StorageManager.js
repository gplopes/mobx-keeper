import keeperStorage from './localstorage';

// Storage Management
const StorageManager = {
  save(target, items) {
    keeperStorage.start(target);
    Object.keys(items).map(key => (keeperStorage.set(target, { [key]: items[key] })));
  },
  get(target, items) {
    const objItems = {};
    Object.keys(items).map(function mapKeys(key) {
      const localValue = keeperStorage.get(target, key);

      if (!localValue) {
        this.save(target, { [key]: items[key] });
        objItems.items[key] = items[key];
        return 0;
      }
      objItems[key] = localValue;
      return 0;
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
