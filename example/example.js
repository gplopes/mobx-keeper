/*
 * Live Example
 * */

import { observable, action, autorunAsync } from 'mobx';
import { keep, createKeeper } from '../src/index';

class myStore {
  @keep keepZ = 'Hello Keeper';
  @observable nonKeeper = 'I am not a keeper!';
  constructor() {
    createKeeper(this, {
      keepMe: 'Hi There!',
    });
  }
}


const store = window.store = new myStore();


// Print Html
const el = document.getElementById('keeper');
const disposer = autorunAsync(() => {
  const html = `
    <ul>
      <li>KeepZ: <strong>${store.keepZ}</strong></li>
      <li>nonKeeper: <strong>${store.nonKeeper}</strong></li>
      <li>KeepMe: <strong>${store.keepMe}</strong></li>
    </ul>
  `;

  el.innerHTML = '';
  el.insertAdjacentHTML('beforeend', html);
}, 300);
