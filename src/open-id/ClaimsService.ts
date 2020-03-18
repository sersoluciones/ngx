import { OpenIdData } from './IOpenIdClient';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { inArray } from '../utils/array';

export let OPEN_ID_CONFIG: InjectionToken<OpenIdData> = new InjectionToken<OpenIdData>('claims.config');

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  private _openIdData: OpenIdData;
  public get openIdData(): OpenIdData {
    return this._openIdData;
  }
  public set openIdData(value: OpenIdData) {
    this._openIdData = value;
  }

  constructor(@Inject(OPEN_ID_CONFIG) config: OpenIdData) {
    this.openIdData = config;
  }

  /**
   * hasPermission
   */
  public hasPermission(requiredPermission: string) {
    return this.openIdData.claims.indexOf(requiredPermission) !== -1;
  }

  /**
   * atLeastPermissions
   */
  public atLeastPermissions(requiredPermissions: string[]) {
    for (let index = 0; index < requiredPermissions.length; index++) {

      if (inArray(requiredPermissions[index], this.openIdData.claims)) {
        return true;
      }
    }

    return false;
  }

  /**
   * hasPermissions
   */
  public hasPermissions(requiredPermissions: string[]) {

    for (let index = 0; index < requiredPermissions.length; index++) {

      if (!inArray(requiredPermissions[index], this.openIdData.claims)) {
        return false;
      }
    }

    return true;
  }
}
