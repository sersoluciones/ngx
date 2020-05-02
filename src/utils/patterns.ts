/**
 * @description Colección de Regex comunes
 */
export module Patterns {
  export const PASSWORD = /^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])).{6,}$/;
  export const DOMAIN = /^([a-zA-Z0-9\_\-\.]{2,63})\.([a-zA-Z0-9]{2,})$/;
  export const EMAIL = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  export const IMAGE = /^image\/([a-zA-Z].*)$/;
  export const NUMBER = /^[0-9].*$/;
  export const CC = /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/;
}
