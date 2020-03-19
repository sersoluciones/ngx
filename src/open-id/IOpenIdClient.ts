/**
 * @description
 * Interface que representa al objeto OpenId usado para autenticarse con la API de SER
 */
export interface OpenIdClient {
    id: string;
    third_id?: string;
    secret: string;
    scopes: string;
}

/**
 * @description
 * Interface que representa al objeto OpenIdData usado para contener los permisos del usuario
 */
export interface OpenIdData {
  claims: string[];
  isSuperUser: boolean;
}
