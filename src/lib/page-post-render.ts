/**
 * @file Runs code just after the page loads. For pipeline step postRender.
 */

import { NavigationInstruction, Next } from 'aurelia-router';

export class PagePostRender {

  /**
   * Run command for the pipeline step postRender.
   *
   * @param {NavigationInstruction} navigationInstruction - Unused here.
   * @param {Next} next - Next call is used to continue after extra instructions are added.
   * @returns {Promise<any>} N/A.
   * @example N/A
   */
  public run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {

    // Reset the window scroll location to the top when we navigate to a different page.
    window.scrollTo(0, 0);

    // Call next.
    return next();
  }

}
