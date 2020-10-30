/// <reference types="gapi.auth2" />
export declare class GoogleSDKConfig {
    private _clientConfig;
    get clientConfig(): gapi.auth2.ClientConfig;
    set clientConfig(value: gapi.auth2.ClientConfig);
    constructor(clientConfig: gapi.auth2.ClientConfig);
}
