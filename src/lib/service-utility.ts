/**
 * @file General utility for handling service requests.
 */

import { HttpClientConfiguration } from 'aurelia-fetch-client';
import environment from '../environment';
import { Logger } from './logger';
import { AppStorage } from './app-storage';

export class ServiceUtility {

  /**
   * Handles configuring the HttpClient config property in it's callback.
   *
   * @param {HttpClientConfiguration} config - HttpClient config object.
   * @param {any} headers - Headers object to configure the HttpClient.
   * @param {string} apiUrl - Base URL for the API.
   * @param urlApi
   * @example ServiceUtility.baseConfiguration(config, { 'header': 'header' }, environment.apiUri);
   */
  public static baseConfiguration(config: HttpClientConfiguration, headers: any = {}, urlApi: string = ''): void {
    config
      .withDefaults({
        headers
      })
      .withInterceptor({
        request: (request: Request) => {

          // Skip if this is not a get request.
          if (request.method.toLowerCase() !== 'get') {
            return;
          }

          // Set the headers. This is a fix for the latest version of IE.
          request.headers.append('Cache-Control', 'no-cache');
          request.headers.append('Pragma', 'no-cache');
          request.headers.append('Expires', 'Sun, 11 Mar 1984 12:00:00 GMT');

          return request;
        }
      })
      .withBaseUrl(urlApi);
  }

  /**
   * Sets up the standard configuration for http-client/fetch.
   *
   * @param {HttpClientConfiguration} config - The config that needs to be mutated for every httpRequest.
   * @example
   const http: HttpClient = new HttpClient();
   http.configure((config: HttpClientConfiguration) => ServiceUtility.defaultConfiguration(config));
   */
  public static defaultConfiguration(config: HttpClientConfiguration): void {
    // TODO: See if we can change this so that we're not mutating
    ServiceUtility.baseConfiguration(config, {
      'Accept': 'application/json',
      'Authorization': `Bearer ${ AppStorage.get('token') as string }`,
      'X-Requested-With': 'Fetch'
    }, environment.urlApi);
  }

  /**
   * Handles the second promise of the fetch and returns the data after checking it.
   *
   * @param {any} data - Data object from the first fetch promise.
   * @returns {any} - Returns an any because we don't know who made this request. So it could be anything at this point.
   * @example
   return http.fetch('endpoint', { method: 'post', body: json(stub) })
   .catch((e: any) => ServiceUtility.handleNetworkFailure(e))
   .then((response: any) => ServiceUtility.responseFilter(response))
   .then((data: any) => ServiceUtility.responseReturn(data));
   */
  public static responseReturn(data: any): any {

    /** Show the data in the console if we're debugging. */
    Logger.info('ServiceUtility.responseReturn(a)', { data }, 'app-service');

    /** Return the data. */
    return data;
  }

  /**
   * Handles the initial response from fetch and returns the json or handles http errors.
   *
   * @param {Response} response - The response sent back from the API.
   * @param {boolean} isJson - Whether this should be handled as a json response.
   * @returns {any} - Returns an any because we don't know who made this request. So it could be anything at this point.
   * @example
   return http.fetch('endpoint', { method: 'post', body: json(stub) })
   .catch((e: any) => ServiceUtility.handleNetworkFailure(e))
   .then((response: any) => ServiceUtility.responseFilter(response))
   .then((data: any) => ServiceUtility.responseReturn(data));
   */
  public static responseFilter(response: Response, isJson: boolean = true): any {

    // TODO: Think about how bad responses could be handled on the other side so that the page doesn't redirect or become unusable.

    Logger.info(`ServiceUtility.responseFilter(response, isJson) [${ response.status }] ${ response.url }`, { response, isJson }, 'app-service');

    switch (response.status) {

      case 200:
      case 250:
        return (isJson) ? response.json() : response.text();

      case 401:
        window.location.assign('/logout');
        return false;

      case 403:
        window.location.assign('/unauthorized');
        return false;

      case 500:
        window.location.assign('/system-error');
        return false;

      default:
        Logger.error('Response status was unhandled', response);
        return false;

    }

  }

  /**
   * Handle network failure or IE 401 issue.
   *
   * @param {any} e - Failure message to get logged.
   * @example
   return http.fetch('endpoint', { method: 'post', body: json(stub) })
   .catch((e: any) => ServiceUtility.handleNetworkFailure(e))
   .then((response: any) => ServiceUtility.responseFilter(response))
   .then((data: any) => ServiceUtility.responseReturn(data));
   */
  public static handleNetworkFailure(e: any): void {
    Logger.error('ServiceUtility.handleNetworkFailure()', e, 'app-service');
    window.location.assign('/logout');
  }

}
