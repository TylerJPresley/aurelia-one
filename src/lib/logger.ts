/**
 * @file Creates a wrapper for logging within the app.
 */

import { LogManager } from 'aurelia-framework';

export class Logger {

  public static readonly appLoggerId: string = 'app';

  /**
   * Sends a debug message to the console.
   *
   * @param {string} title - The title of the console output.
   * @param {any} details - The code part of the console output.
   * @param {string} loggerId - The id displayed in the section output of the console message.
   * @example Logger.debug('My message', { a: 1, b: 'string' });
   */
  public static debug(title: string, details: any = null, loggerId: string = Logger.appLoggerId): void {
    LogManager.getLogger(loggerId).debug(title, details);
  }

  /**
   * Sends an info message to the console.
   *
   * @param {string} title - The title of the console output.
   * @param {any} details - The code part of the console output.
   * @param {string} loggerId - The id displayed in the section output of the console message.
   * @example Logger.info('My message', { a: 1, b: 'string' });
   */
  public static info(title: string, details: any = null, loggerId: string = Logger.appLoggerId): void {
    LogManager.getLogger(loggerId).info(title, details);
  }

  /**
   * Sends an error message to the console.
   *
   * @param {string} title - The title of the console output.
   * @param {any} details - The code part of the console output.
   * @param {string} loggerId - The id displayed in the section output of the console message.
   * @example Logger.error('My message', { a: 1, b: 'string' });
   */
  public static error(title: string, details: any = null, loggerId: string = Logger.appLoggerId): void {
    LogManager.getLogger(loggerId).error(title, details);
  }

}
