
export const PrefersColorSchemeExample =
`import { PrefersColorScheme } from '@sersol/ngx';

constructor(colorscheme: PrefersColorSchemeService) {
    colorscheme.init();
    colorscheme.watch();
}`;
