export const PrefersColorSchemeExample =
`import { PrefersColorScheme } from 'src/prefers-color-scheme';

const colorscheme = new PrefersColorScheme();
colorscheme.init();
colorscheme.watch();`;

export const CookiesExample =
`import { Cookies } from 'src/typescript/cookie';

Cookies.get('Test'); // Obtiene el valor de una cookie
Cookies.set('Test', '123'); // Setea valor de una cookie
Cookies.delete('Test'); // Elimina una cookie
Cookies.deleteAll(); // Elimina todas las cookies`;

export const FullscreenExample =
`import { Fullscreen } from 'src/typescript/fullscreen';

const fullscreen = new Fullscreen();
fullscreen.enable(); // Habilita el modo pantalla completa
fullscreen.disable(); // Deshabilita el modo pantalla completa
fullscreen.toggle(); // Habilita ó deshabilita el modo pantalla completa según el estado`;
