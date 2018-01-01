/* global window */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

function start(storageName) {
  const storageState = window.localStorage.getItem(storageName);

  if (!storageState) {
    window.localStorage.setItem(storageName, JSON.stringify({}));
    return {};
  }
  return JSON.parse(storageState);
}

function end(storageName) {
  window.localStorage.setItem(storageName, JSON.stringify({}));
}

function get(storageName, itemKey) {
  try {
    const storageState = JSON.parse(window.localStorage.getItem(storageName));

    if (storageState) {
      return storageState[itemKey];
    }
  } catch (e) {
    console.error(`[keeper]: ${e}`);
    return false;
  }

  return null;
}

function set(storageName, item) {
  const getStorageState = window.localStorage.getItem(storageName);
  const storageState = JSON.parse(getStorageState);
  const newStorageState = Object.assign({}, storageState, item);

  window.localStorage.setItem(storageName, JSON.stringify(newStorageState));
}

export default {
  start,
  end,
  get,
  set,
};
