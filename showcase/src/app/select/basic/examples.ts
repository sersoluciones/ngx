export const DefaultExample =
`<ser-form-element>
    <label>Por defecto</label>
    <ser-select serControl formControlName="selectDefault" [data]="options.dropdown"></ser-select>

    <div serErrors="selectDefault">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;

export const MultipleExample =
`<ser-form-element>
    <label>Multiple</label>
    <ser-select serControl formControlName="selectMultiple" [data]="options.dropdown" multiple></ser-select>

    <div serErrors="selectMultiple">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;
