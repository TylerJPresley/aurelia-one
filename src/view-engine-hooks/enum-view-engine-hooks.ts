/**
 * @file Holds all of the enum for view binding.
 */

import { View, viewEngineHooks } from 'aurelia-templating';
import { AuthStatusEnum } from '../enums/auth-status-enum';

@viewEngineHooks()

export class EnumViewEngineHooks {

  /**
   * Adds in enums before the page can bind, making the available when it's time to bind.
   *
   * @param {View} view - The view object from Aurelia.
   * @example N/A
   */
  public beforeBind(view: View): void {
    view.overrideContext['AuthStatusEnum'] = AuthStatusEnum;
  }

}
