export const InputTextExample =
`<ser-form-element>
    <label>Texto</label>
    <input type="text" serControl formControlName="text1">

    <div serErrors="text1">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;

export const InputNumberExample =
`<ser-form-element>
    <label>Númerico</label>
    <input type="number" serControl formControlName="number1">

    <div serErrors="number1">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;

export const InputTextareaExample =
`<ser-form-element>
    <label>Área de texto</label>
    <textarea serControl formControlName="text2"></textarea>

    <div serErrors="number1">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;

export const InputSelectExample =
`<ser-form-element>
    <label>Lista desplegable</label>
    <select serControl formControlName="select1">
        <option [value]="item" *ngFor="let item of options.simpleDropdown">{{ item }}</option>
    </select>

    <div serErrors="select1">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;
