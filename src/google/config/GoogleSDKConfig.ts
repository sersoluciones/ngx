import ClientConfig = gapi.auth2.ClientConfig;

export class GoogleSDKConfig {
  private _clientConfig: ClientConfig;
  public get clientConfig(): ClientConfig {
    return this._clientConfig;
  }
  public set clientConfig(value: ClientConfig) {
    this._clientConfig = value;
  }

  constructor(clientConfig: ClientConfig) {
    this.clientConfig = clientConfig;
  }
}
