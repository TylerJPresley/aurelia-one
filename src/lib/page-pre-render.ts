/**
 * @file Runs code just before the page renders. For pipeline step preRender.
 */

import { NavigationInstruction, Next } from 'aurelia-router';
import { AppStorage } from './app-storage';
import { SystemService } from '../services/system-service';
import { Utility } from './utility';
import { Notify } from './notify';

export class PagePreRender {

  /**
   * Run command for the pipeline step preRender.
   *
   * @param {NavigationInstruction} navigationInstruction - Unused here.
   * @param {Next} next - Next call is used to continue after extra instructions are added.
   * @returns {Promise<any>} N/A.
   * @example N/A
   */
  public run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {

    // Check for updates
    SystemService.getVersion()
      .then((response: any) => {

        // Cache the current version.
        const currentVersion: string = Utility.convertToString(AppStorage.get('app-version'));

        // Set the new version.
        AppStorage.set('app-version', response.version);

        // See if the version has changed.
        if (currentVersion !== Utility.convertToString(response.version)) {
          Notify.showMsg('<a href="javascript: location.reload();" >An update was released. Click HERE to refresh.</a>');
        }

        // Close out the promise.
        return null;
      })
      .catch((e: any) => Utility.handleCatch(e));

    // Call next.
    return next();

  }

}
