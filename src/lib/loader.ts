/**
 * @file Site loader. Will show a loader over everything else while the we load content and between navigation.
 */

export class Loader {

  /**
   * Hides the loader.
   *
   * @example Loader.hide();
   */
  public static hide(): void {

    // Find the loader element.
    const loader: Element = document.getElementById('site-loader');

    // Update the classes.
    if (loader.classList.contains('aurelia-show')) {
      loader.classList.remove('aurelia-show');
      loader.classList.add('aurelia-hide');
    }
  }

  /**
   * Shows the loader.
   *
   * @example Loader.show();
   */
  public static show(): void {

    // Find the loader element.
    const loader: Element = document.getElementById('site-loader');

    // Update the classes.
    if (loader.classList.contains('aurelia-hide')) {
      loader.classList.remove('aurelia-hide');
      loader.classList.add('aurelia-show');
    }
  }

}
