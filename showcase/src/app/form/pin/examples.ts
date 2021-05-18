export const PINExample =
`<ser-form-element>
    <pin-input serControl formControlName="pin1" [codeLength]="codeLength" [onlyNumber]="onlyNumber" [isCodeHidden]="isCodeHidden"></pin-input>

    <div serErrors="pin1">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;
