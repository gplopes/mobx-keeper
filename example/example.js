/*
 * Live Example
 * */

import { observable, action, autorunAsync } from 'mobx';
import { keep, createKeeper } from '../src/index';


// Class Example
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


// Variable Examples
window.arrayKeep = keep('arrayKeep', ['hello', 'world']);
window.simpleKeep = keep('simpleKeep', 'I also work');


// Function Example
function MyObject() {
  createKeeper(this, { keep: 'test' });
}

window.myObject = new MyObject();



// Print Html
const el = document.getElementById('keeper');
const disposer = autorunAsync(() => {
  const html = `
    <ul>
      <li><h3>Class Variables</h3>
      <li>KeepZ: <strong>${store.keepZ}</strong></li>
      <li>nonKeeper: <strong>${store.nonKeeper}</strong></li>
      <li>KeepMe: <strong>${store.keepMe}</strong></li>
    </ul>
    <br/>
    <ul>
      <li><h3>Simple Variables</h3>
      <li>arrayKeep: <strong>${window.arrayKeep}</strong></li>
      <li>simpleKeep: <strong>${window.simpleKeep}</strong></li>
    </ul>
  `;

  el.innerHTML = '';
  el.insertAdjacentHTML('beforeend', html);
}, 300);
