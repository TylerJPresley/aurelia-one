/**
 * @file Main layout for the site.
 */

import { bindable, customElement } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';

@bindable({ name: 'pageTitle', defaultBindingMode: bindingMode.toView })

@customElement('main-layout')

export class MainLayout {

  public pageTitle: string;

}
