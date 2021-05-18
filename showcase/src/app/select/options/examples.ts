export const SimpleExample =
`<ser-form-element>
    <label>Simple</label>
    <ser-select serControl formControlName="simpleSelect" [data]="options.dropdown" simple></ser-select>
</ser-form-element>`;

export const PLExample =
`<ser-form-element>
    <ser-select serControl formControlName="plTemplate" [data]="options.dropdown" labelKey="desc" primaryKey="name"></ser-select>
</ser-form-element>`;
