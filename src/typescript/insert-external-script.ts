/**
 * @description
 * Función para insertar scritps externos (ejem: gapi, facebook sdk)
 * @example
 * insertExternalScript('google-jssdk', 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded');
 * @param id
 * @param src
 */
export function insertExternalScript(id: string, src: string) {
  const fjs = document.getElementsByTagName('script')[0];
  if (document.getElementById(id)) { return; }
  const js = document.createElement('script') as HTMLScriptElement;
  js.id = id;
  js.src = src;
  fjs.parentNode.insertBefore(js, fjs);
}
