

export class GoogleSDKConfig {
  private _clientConfig: gapi.auth2.ClientConfig;
  public get clientConfig(): gapi.auth2.ClientConfig {
    return this._clientConfig;
  }
  public set clientConfig(value: gapi.auth2.ClientConfig) {
    this._clientConfig = value;
  }

  constructor(clientConfig: gapi.auth2.ClientConfig) {
    this.clientConfig = clientConfig;
  }
}
