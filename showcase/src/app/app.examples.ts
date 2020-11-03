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

export const InputTextExample =
`<ser-form-element>
    <label>Texto</label>
    <input type="text" serControl formControlName="text1">

    <div serErrors="text1">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;

export const InputAddressExample =
`<ser-form-element>
    <label>Dirección</label>
    <address-col-input serControl formControlName="address"></address-col-input>

    <div serErrors="address">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;

export const DropdownDefaultExample =
`<ser-form-element>
    <label>Por defecto</label>
    <ser-select serControl formControlName="selectDefault" [data]="options.dropdown"></ser-select>

    <div serErrors="selectDefault">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;

export const DropdownSimpleExample =
`<ser-form-element>
    <label>Por defecto</label>
    <ser-select serControl formControlName="selectDefault" simple [data]="options.dropdown"></ser-select>

    <div serErrors="selectDefault">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;

export const DropdownMultipleExample =
`<ser-form-element>
    <label>Multiple</label>
    <ser-select serControl formControlName="selectMultiple" multiple [data]="options.dropdown"></ser-select>

    <div serErrors="selectMultiple">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;

export const DropdownTemplateExample =
`<ser-form-element style="min-width: 300px;">
    <label>Single template</label>
    <ser-select serControl formControlName="selectSingleTemplate" [data]="options.dropdown">

        <ng-template sd-badge let-item="item">
            <div class="select-template">
                <div class="img" [ngStyle]="{'background-image': 'url(' + item.image + ')'}"></div>
                <div>
                    <div>{{ item.name }}</div>
                    <strong>{{ item.desc }}</strong>
                </div>
            </div>
        </ng-template>

        <ng-template sd-item let-item="item">
            <div class="select-template">
                <div class="img" [ngStyle]="{'background-image': 'url(' + item.image + ')'}"></div>
                <div>
                    <div>{{ item.name }}</div>
                    <strong>{{ item.desc }}</strong>
                </div>
            </div>
        </ng-template>

    </ser-select>

    <div serErrors="selectSingleTemplate">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;

export const DropdownTemplateMultipleExample =
`<ser-form-element style="min-width: 300px;">
    <label>Multiple with template</label>
    <ser-select serControl formControlName="selectMultipleTemplate" mutiple [data]="options.dropdown">

        <ng-template sd-badge let-item="item">
            <div class="select-template">
                <div class="img" [ngStyle]="{'background-image': 'url(' + item.image + ')'}"></div>
                <div>
                    <div>{{ item.name }}</div>
                    <strong>{{ item.desc }}</strong>
                </div>
            </div>
        </ng-template>

        <ng-template sd-item let-item="item">
            <div class="select-template">
                <div class="img" [ngStyle]="{'background-image': 'url(' + item.image + ')'}"></div>
                <div>
                    <div>{{ item.name }}</div>
                    <strong>{{ item.desc }}</strong>
                </div>
            </div>
        </ng-template>

    </ser-select>

    <div serErrors="selectMultipleTemplate">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;
