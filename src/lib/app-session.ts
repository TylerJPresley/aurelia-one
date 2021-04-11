/**
 * @file Some state management for the app.
 */

import { AuthStatusEnum } from '../enums/auth-status-enum';
import { computedFrom } from 'aurelia-framework';
import { AppStorage } from './app-storage';
import { Utility } from './utility';

export class AppSession {

  @computedFrom('_isAuthenticated')
  public get isAuthenticated(): boolean {

    if (this._isAuthenticated === AuthStatusEnum.NotSet) {

      this._isAuthenticated = Utility.isPresent(AppStorage.get('app-auth')) ? AuthStatusEnum.Authenticated : AuthStatusEnum.NotAuthenticated;

      return this._isAuthenticated === AuthStatusEnum.Authenticated;

    }

    return false;
  }

  private _isAuthenticated: AuthStatusEnum = AuthStatusEnum.NotSet;
  //private _meta: MetaModel = null;

}
