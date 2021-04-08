/**
 * @file Holds all of the enum for view binding.
 */

import { View, viewEngineHooks } from 'aurelia-templating';
import { AuthStatusEnum } from '../enums/auth-status-enum';
import { Utility } from '../lib/utility';

@viewEngineHooks()

export class UtilityViewEngineHooks {

  /**
   * Adds in enums before the page can bind, making the available when it's time to bind.
   *
   * @param {View} view - The view object from Aurelia.
   * @example N/A
   */
  public beforeBind(view: View): void {
    view.overrideContext['Utility'] = Utility;
  }

}
