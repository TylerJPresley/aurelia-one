/**
 * @file Configures Aurelia.
 */

import 'bootstrap';
import { Aurelia } from 'aurelia-framework';
import environment from './environment';
import { DialogConfiguration } from 'aurelia-dialog';

/**
 * Aurelia configuration.
 *
 * @param {Aurelia} aurelia - Aurelia object.
 * @example N/A
 */
export function configure(aurelia: Aurelia): void {

  aurelia.use
    .standardConfiguration()
    //.feature('components')
    .feature('layouts')
    //.feature('value-converters')
    .feature('view-engine-hooks')
    .plugin('aurelia-dialog', (config: DialogConfiguration) => {
      config.useDefaults();
      config.settings.lock = true;
      config.settings.centerHorizontally = true;
      config.settings.keyboard = true;
      config.settings.startingZIndex = 2000;
      config.useCSS('');
    })
    .plugin('aurelia-validation');

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  //if (environment.testing) {
  //  aurelia.use.plugin('aurelia-testing');
  //}

  //Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader'); 

  void aurelia.start().then(() => aurelia.setRoot());

}
