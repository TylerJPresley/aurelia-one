/**
 * @file Hold all the base functionality for classes across the site.
 */

import { Utility } from './utility';

export abstract class BaseClass {

  public readonly _className: string = null;
  public readonly _instanceId: string = null;

  protected _ts: number = null;

  protected constructor() {
    this._className = `${ this.constructor.name as any }`;
    this._instanceId = `${ this._className }-${ Date.now() }-${ Utility.generateUuid() }`;
  }

  protected updateTs(): void {
    this._ts = Utility.generateTimeStamp();
  }

}
