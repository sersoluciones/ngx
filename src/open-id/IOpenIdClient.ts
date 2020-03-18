export interface OpenIdClient {
    id: string;
    third_id?: string;
    secret: string;
    scopes: string;
}

export interface OpenIdData {
  claims: string[];
  isSuperUser: boolean;
}
