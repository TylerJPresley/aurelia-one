/**
 * @file Notification/toast wrapper library.
 */

import { Utility } from './utility';

export class Notify {

  /**
   * Handles showing any messages coming back form the server payload.
   *
   * @param {any} messages - Object with messages from the api.
   * @example
   */
  public static handleServerMessages(messages: any): void {

    // Return if there are no messages.
    if (!Utility.isPresent(messages)) {
      return;
    }

    // Show all the success messages.
    for (let i: number = 0, j: number = messages.successes.length; i < j; i++) {
      Notify.showSuccess(messages.successes[i]);
    }

    // Show all the error messages.
    for (let i: number = 0, j: number = messages.errors.length; i < j; i++) {
      Notify.showError(messages.errors[i]);
    }

  }

  /**
   * Shows an error notification/toast.
   *
   * @param {string} msg - Error message to be displayed.
   * @example Notify.showError('My Error');
   */
  public static showError(msg: string): void {
    Notify.showMsg(msg, {
      type: 'danger',
      title: 'Uh-oh!'
    });
  }

  public static showMsg(msg: string, options: any = {}): void {

    const defaultOptions: any = {
      title: 'Notification',
      subtitle: null,
      content: msg,
      type: 'info',
      delay: 5000,
      pause_on_hover: true
    };

    // Call bootstrap's toast/notification functionality.
    setTimeout(() => {
      $.toast(Object.assign(defaultOptions, options));
    }, 500);

  }

  /**
   * Shows a success notification/toast.
   *
   * @param {string} msg - Success message to be displayed.
   * @example Notify.showSuccess('My Success!');
   */
  public static showSuccess(msg: string): void {
    Notify.showMsg(msg, {
      type: 'success',
      title: 'Success!'
    });
  }

}
