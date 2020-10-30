/// <reference types="gapi.auth2" />
export interface GoogleUserProfile {
    id: string;
    id_token: string;
    first_name: string;
    last_name?: string;
    email?: string;
    picture?: string;
}
export declare class GoogleClientConfig implements gapi.auth2.ClientConfig {
}
