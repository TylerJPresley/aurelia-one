/**
 * @file Runs code just before activate. For pipeline step preActivate.
 */

import { NavigationInstruction, Next } from 'aurelia-router';
import { AppStorage } from './app-storage';

export class PagePreActivate {

  /**
   * Run command for the pipeline step preActivate.
   *
   * @param {NavigationInstruction} navigationInstruction - Unused here.
   * @param {Next} next - Next call is used to continue after extra instructions are added.
   * @returns {Promise<any>} N/A.
   * @example N/A
   */
  public run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {

    // Set the previous page we were on.
    AppStorage.set('app-previous-page', AppStorage.get('app-current-page'));

    // Set the current page we're on.
    AppStorage.set('app-current-page', navigationInstruction.queryString ? `${ navigationInstruction.fragment }?${ navigationInstruction.queryString }` : `${ navigationInstruction.fragment }`);

    // Call next.
    return next();
  }

}
