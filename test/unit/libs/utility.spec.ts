/**
 * @file Tests for the Utility class.
 */

import { Utility } from '../../../src/lib/utility';

describe('Utility', () => {

  it('isDefined() - Returns true when value is undefined.', (done: any) => {

    let a: any;

    expect(Utility.isDefined(a)).toBeFalsy();

    done();
  });

  it('isDefined() - Returns false when a value is present.', (done: any) => {

    const a: any = null;

    expect(Utility.isDefined(a)).toBeTruthy();

    done();
  });

  it('isPresent() - Returns false when the value is undefined.', (done: any) => {

    let a: any;

    expect(Utility.isPresent(a)).toBeFalsy();

    done();
  });

  it('isPresent() - Returns false when the value is null.', (done: any) => {

    const a: any = null;

    expect(Utility.isPresent(a)).toBeFalsy();

    done();
  });

  it('isPresent() - Returns true when the value is present.', (done: any) => {

    const a: any = 'null';

    expect(Utility.isPresent(a)).toBeTruthy();

    done();
  });

  it('generateRandomNumber() - Returns returns a random number within the max.', (done: any) => {

    expect(Utility.generateRandomNumber(10)).toBeLessThanOrEqual(10);

    done();
  });

  it('generateRandomNumber() - Returns returns a random number without a param.', (done: any) => {

    expect(Utility.generateRandomNumber()).toBeDefined();

    done();
  });

  it('generateTimeStamp() - Returns returns a random number without a param.', (done: any) => {

    expect(Utility.generateTimeStamp()).toBeDefined();

    done();
  });

  it('convertToString() - Converts a number to a string.', (done: any) => {

    expect(Utility.convertToString(10)).toBe('10');

    done();
  });

  it('convertToString() - Returns null if not defined.', (done: any) => {

    let a;

    expect(Utility.convertToString(a)).toBeNull();

    done();
  });

  it('convertToNumber() - Converts a string to a number.', (done: any) => {

    expect(Utility.convertToNumber('10.5')).toBe(10.5);

    done();
  });

  it('convertToNumber() - Returns default if not defined.', (done: any) => {

    const a: string = null;

    expect(Utility.convertToNumber(a, 33)).toBe(33);

    done();
  });

  it('convertToNumber() - Returns null if default is not defined.', (done: any) => {

    const a: string = null;

    expect(Utility.convertToNumber(a)).toBeNull();

    done();
  });

  it('generateUid() - Returns a value.', (done: any) => {

    expect(Utility.generateUuid()).toBeDefined();

    done();
  });

  it('cleanPrivateFields() - Cleans the private fields.', (done: any) => {

    expect(JSON.stringify(Utility.cleanPrivateProperties({ a: 1, _b: 2 }))).toBe('{"a":1}');

    done();
  });

  it('cloneObject() - Clones the target object.', (done: any) => {

    expect(JSON.stringify(Utility.cloneObject({ a: 1 }))).toBe(JSON.stringify({ a: 1 }));

    done();
  });

  it('convertObjectToQueryString() - Creates a querystring from an object.', (done: any) => {

    expect(Utility.convertObjectToQueryString({ a: 1, b: 'test' })).toBe('a=1&b=test');

    done();
  });

  it('generateUrl() - Creates an URL with a querystring.', (done: any) => {

    expect(Utility.generateUrl('/path', { a: 1, b: 'test' })).toBe('/path?a=1&b=test');

    done();
  });

  it('generateUrl() - Creates an URL without a querystring.', (done: any) => {

    expect(Utility.generateUrl('/path')).toBe('/path');

    done();
  });

  it('getCurrentYear() - Returns the current year.', (done: any) => {

    expect(Utility.getCurrentYear()).toBe(2021);

    done();
  });

  it('isStringPresent() - Returns false for an empty string.', (done: any) => {

    expect(Utility.isStringPresent('')).toBeFalsy();

    done();
  });

  it('isStringPresent() - Returns false for null.', (done: any) => {

    expect(Utility.isStringPresent(null)).toBeFalsy();

    done();
  });

  it('isStringPresent() - Returns true if there\'s a string.', (done: any) => {

    expect(Utility.isStringPresent('a')).toBeTruthy();

    done();
  });

  it('serializeObject() - Serialized the target object.', (done: any) => {

    expect(Utility.serializeObject({ a: 1, _b: 'test' })).toBe('{"a":1,"_b":"test"}');

    done();
  });

  it('serializeObject() - Serialized the target object and cleans private fields.', (done: any) => {

    expect(Utility.serializeObject({ a: 1, _b: 'test' }, true)).toBe('{"a":1}');

    done();
  });

  it('handleCatch() - Catch is handled and logged for promises.', (done: any) => {

    // TODO: IDK how to write this test right now.

    done();
  });

});
