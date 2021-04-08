/**
 * @file A collection of utility methods used site wide.
 */

import * as moment from 'moment';
import { Logger } from './logger';

export class Utility {

  /**
   * Cleans private fields from the JSON objects we pass around.
   *
   * @param {any} obj - Could be any model or class.
   * @returns {any} - Returns a JSON object without the private fields.
   * @example Utility.cleanPrivateProperties({ a: 1, _b: 2 }); // { a: 1 }
   */
  public static cleanPrivateProperties(obj: any): void {

    const ordered: any = {};
    const unordered: any = JSON.parse(JSON.stringify(obj));
    const keys: string[] = Object.keys(unordered).sort();

    for (let i: number = 0, j: number = keys.length; i < j; i++) {
      if (!keys[i].startsWith('_')) {
        ordered[keys[i]] = unordered[keys[i]];
      }
    }

    return ordered;
  }

  /**
   * Clones an object.
   *
   * @param {any} target - The object that you want to clone.
   * @returns {any} - The cloned object.
   * @example Utility.cloneObject({ a: 1 }); // { a: 1 }
   */
  public static cloneObject(target: any): any {

    // TODO: See if this maintains the class that it was before the cloning.

    // Just return null if there's no object to clone.
    if (!Utility.isPresent(target)) {
      return null;
    }

    // Clone the object.
    return Object.assign({}, target);
  }

  /**
   * Converts an object to a querystring.
   *
   * @param {any} target - Object you want to convert.
   * @returns {string} - Converted querystring.
   * @example Utility.convertObjectToQueryString({ a: 1, b: 'test' }); // a=1&b=test
   */
  public static convertObjectToQueryString(target: any): string {

    // Return if the target is not present.
    if (!Utility.isPresent(target)) {
      return null;
    }

    // Clean any private fields from the object.
    const cleanedObj: any = Utility.cleanPrivateProperties(target);

    // Get an array of the (key/value)s
    const keyList: string[] = Object.keys(cleanedObj).filter((key: string) => Utility.isPresent(target[key]));

    // Create the querystring without the initial '?'.
    return keyList.map((key: string) => `${ key }=${ encodeURIComponent(target[key]) }`).join('&');
  }

  /**
   * Converts a value to a number.
   *
   * @param {string} value - Value to be converted.
   * @param {string} def - The default if the value is undefined or null.
   * @returns {string} - Number conversion.
   * @example Utility.convertToString('10.5'); // 10.5
   */
  public static convertToNumber(value: string, def: number = null): number {

    // If the value is not defined we need to return the default.
    if (!Utility.isPresent(value)) {
      return def;
    }

    // Try to make it a number.
    const tmp: number = Number(value);

    // Return the default if it's NaN.
    return !isNaN(tmp) ? tmp : def;
  }

  /**
   * Converts a value to a string.
   *
   * @param {number | string} value - Value to be converted.
   * @param {string} def - The default if the value is undefined or null.
   * @returns {string} - String conversion.
   * @example Utility.convertToString(10); // '10'
   */
  public static convertToString(value?: number | string, def: string = null): string {
    return Utility.isPresent(value) ? `${ value }` : def;
  }

  /**
   * Generates a random number. By default it between 0 and current timestamp, but can be overridden to give a random number to whatever max is passed.
   *
   * @param {number} max - Max number that should be returned.
   * @returns {number} - A random number from 0 to whatever the max is.
   * @example Utility.generateRandomNumber(10); // 8
   */
  public static generateRandomNumber(max: number = Utility.generateTimeStamp(true)): number {
    return Math.floor(Math.random() * max);
  }

  /**
   * Generates a timestamp.
   *
   * @param {boolean} usePerformance - Whether we should use the window['performance'] or not.
   * @returns {number} - The timestamp.
   * @example Utility.generateTimeStamp(); // 1391.4417
   */
  public static generateTimeStamp(usePerformance: boolean = true): number {
    return (usePerformance && window['performance'] && window['performance'].now && (window['performance'].now() * 1000)) ? window['performance'].now() : Date.now();
  }

  /**
   * Generates a URL based on the passed params. NOTE: As of right now this is only setup to take simple object. It will not handle complex objects.
   *
   * @param {string} path - The base path.
   * @param {any} params - An object of querystring params.
   * @returns {string} - A full url with path and querystring.
   * @example Utility.generateUrl('/path', { a: 1, b: 'test' }); // /path?a=1&b=test
   */
  public static generateUrl(path: string, params: any = null): string {

    // Create the querystring based off the passed params.
    const qs: string = Utility.convertObjectToQueryString(params);

    // Stitch it all together and return the URL.
    return Utility.isPresent(qs) ? `${ path }?${ qs }` : path;
  }

  /**
   * Generates a UUID.
   *
   * @returns {string} - Generated UUID.
   * @example Utility.generateUuid(); // "99a3f6cb-e50d-4eb2-98dd-60d134ef779b"
   */
  public static generateUuid(): string {
    //return uuidv4() as string;
    return Utility.convertToString(Utility.generateTimeStamp());
  }

  /**
   * Gets the current year.
   *
   * @returns {number} - The current year as a number.
   * @example Utility.getCurrentYear(); // 2021
   */
  public static getCurrentYear(): number {
    return parseInt(moment().format('YYYY'), 10);
  }

  /**
   * Handles promise catches.
   *
   * @param {any} e - Error being passed back.
   * @example .catch((e: any) => Utility.handleCatch(e));
   */
  public static handleCatch(e: any): void {

    // TODO: This needs to be finished.

    const err: Error = new Error();

    // Send the error to the logger.
    Logger.error('Utility.handleCatch()', { e, stack: err.stack }, 'app');

    //Notify.showError('An unknown error occurred');
  }

  /**
   * Tests whether a value is undefined or not.
   *
   * @param {any} value - The value to be tested.
   * @returns {boolean} - Returns bool.
   * @example
   const a;
   Utility.isDefined(a); // false
   */
  public static isDefined(value: any): boolean {
    return (typeof value !== 'undefined');
  }

  /**
   * Tests whether a value is not undefined or null.
   *
   * @param {any} value - The value to be tested.
   * @returns {boolean} - Returns bool.
   * @example
   const a = null;
   const b = 'test';
   Utility.isPresent(a); // false
   Utility.isPresent(b); // true
   */
  public static isPresent(value: any): boolean {
    return (Utility.isDefined(value) && value !== null);
  }

  /**
   * Checks to see if a string has a value.
   *
   * @param {string} value - String needing to be checked.
   * @returns {boolean} - The result of the test.
   * @example Utility.isStringPresent('test'); // true
   */
  public static isStringPresent(value: string): boolean {
    return (Utility.isPresent(value) && value !== '');
  }

  /**
   * Processes the property in the model constructor.
   *
   * @param {any} value - Value being passed into the constructor.
   * @param {any} defaultValue - Default value for the property. Will generally be this.propertyName.
   * @param {any} override - If we need to do a model override.
   * @returns {any} - Return one of the 3 above depending on what's available.
   * @example this.stubProp = Utility.processModelPropertyInConstructor(model.stubProp, this.stubProp, new StubModel(model.stubProp));
   */
  public static processModelPropertyInConstructor(value: any, defaultValue: any = null, override: any = null): any {

    // Make sure the value is defined.
    if (Utility.isPresent(value)) {

      // Check to see if there's an override.
      if (Utility.isPresent(override)) {
        return override;
      }

      // Return the value passed.
      return value;
    }

    // Pass back the default value.
    return defaultValue;
  }

  /**
   * Serialized an object. Note: As of right now it will only work for simple objects. Complex objects are not yet supported.
   *
   * @param {any} target - Target object to serialize.
   * @param {boolean} cleanTarget - Whether private fields should be removed in the process.
   * @returns {string} - Returns a serialized object.
   * @example Utility.serializeObject({ a: 1, _b: 'test' }); // {"a":1,"_b":"test"}
   */
  public static serializeObject(target: any, cleanTarget: boolean = false): string {

    // Return if target is not present.
    if (!Utility.isPresent(target)) {
      return target;
    }

    // Take a snapshot of the target.
    let currentTarget: any = Utility.cloneObject(target);

    // Clean the target if needed.
    if (cleanTarget) {
      currentTarget = Utility.cleanPrivateProperties(currentTarget);
    }

    // Return the serialized object
    return JSON.stringify(currentTarget);
  }

  /**
   * Truncates a string to desired length. Even adds an ellipsis if needed.
   *
   * @param {string} input - Input string.
   * @param {number} targetLength - The length we want the string to be.
   * @param {boolean} addEllipsis - Should we add ... To the end?
   * @returns {string} - Truncated string if is above target length.
   * @example Utility.truncateString('myLongString', 6); // "myLong..."
   */
  public static truncateString(input: string, targetLength: number, addEllipsis: boolean = true): string {

    if (!Utility.isPresent(input) || input.length <= targetLength) {
      return input;
    }

    if (addEllipsis) {
      return `${ input.substring(0, targetLength) }...`;
    }

    return input.substring(0, targetLength);
  }

}
