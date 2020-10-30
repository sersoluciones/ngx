/// <reference types="facebook-js-sdk" />
import ClientConfig = facebook.InitParams;
export declare class FacebookSDKConfig {
    private _clientConfig;
    get clientConfig(): ClientConfig;
    set clientConfig(value: ClientConfig);
    constructor(clientConfig: ClientConfig);
}
