/**
 * @file This is here to track system changes. So that we can push updates in real time and the client will know to refresh.
 */

import { HttpClient, HttpClientConfiguration } from 'aurelia-fetch-client';
import { ServiceUtility } from '../lib/service-utility';
import environment from '../environment';

export class SystemService {

  public static getVersion(): Promise<any> {

    const http: HttpClient = new HttpClient();
    http.configure((config: HttpClientConfiguration) => ServiceUtility.baseConfiguration(config, {
      'Accept': 'application/json',
      'X-Requested-With': 'Fetch'
    }, environment.urlWeb));

    return http.fetch('/manifest.json')
      .catch((e: any) => ServiceUtility.handleNetworkFailure(e))
      .then((response: any) => ServiceUtility.responseFilter(response))
      .then((data: any) => ServiceUtility.responseReturn(data));
  }

}
