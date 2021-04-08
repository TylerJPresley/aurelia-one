/**
 * @file Handles interacting with localStorage.
 */

import * as store from 'store-js';

export class AppStorage {

  /**
   * Clears all values from localStorage.
   *
   * @example AppStorage.clearAll();
   */
  public static clearAll(): void {
    store.clearAll();
  }

  /**
   * Gets a value from localStorage.
   *
   * @param {string} key - Key at which the value is located.
   * @returns {any} - Returns the value at the key location.
   * @example AppSession.get('myKey');
   */
  public static get(key: string): any {
    return store.get(key);
  }

  /**
   * Removes a key from localStorage.
   *
   * @param {string} key - Key where the value is stored.
   * @example AppSession.remove('myKey');
   */
  public static remove(key: string): void {
    store.remove(key);
  }

  /**
   * Sets a value in localStorage.
   *
   * @param {string} key - Key at which a value will be stored.
   * @param {any} value - The value being stored.
   * @example AppSession.set('myKey');
   */
  public static set(key: string, value: any): void {
    store.set(key, value);
  }

}
