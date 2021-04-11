/**
 * @file This is here for example.
 */

import { HttpClient, HttpClientConfiguration, json } from 'aurelia-fetch-client';
import { ServiceUtility } from '../lib/service-utility';
import { StubModel } from '../models/stub-model';

export class StubService {

  public static create(stub: StubModel): Promise<any> {

    const http: HttpClient = new HttpClient();
    http.configure((config: HttpClientConfiguration) => ServiceUtility.defaultConfiguration(config));

    return http.fetch('endpoint', { method: 'post', body: json(stub) })
      .catch((e: any) => ServiceUtility.handleNetworkFailure(e))
      .then((response: any) => ServiceUtility.responseFilter(response))
      .then((data: any) => ServiceUtility.responseReturn(data));
  }

}
