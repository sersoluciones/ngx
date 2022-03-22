// Type definitions for Google API Client
// Project: https://github.com/google/google-api-javascript-client
// Definitions by: Frank M <https://github.com/sgtfrankieboy>, grant <https://github.com/grant>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

export interface GoogleUserProfile {
    profile: GoogleBasicProfile;
    auth2User: gapi.auth2.GoogleUser;
}

export interface GoogleBasicProfile {
    id: string;
    id_token: string;
    first_name: string;
    last_name?: string;
    email?: string;
    picture?: string;
}

export class GoogleClientConfig implements gapi.auth2.ClientConfig { }
