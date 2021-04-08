/**
 * @file StubModel.
 */

import { Utility } from '../lib/utility';
import { transient } from 'aurelia-dependency-injection';

@transient()

/**
 * Stub Model.
 *
 * @property {string} firstName - Stub first name.
 * @property {string} lastName - Stub last name.
 * @property {number} age - Stub age.
 */
export class StubModel {

  public firstName: string = null;
  public lastName: string = null;
  public age: number = null;

  public constructor(model: any) {

    if (Utility.isPresent(model)) {
      this.firstName = Utility.processModelPropertyInConstructor(model.firstName, this.firstName);
      this.lastName = Utility.processModelPropertyInConstructor(model.lastName, this.lastName);
      this.age = Utility.processModelPropertyInConstructor(model.age, this.age);
    }

  }

}
