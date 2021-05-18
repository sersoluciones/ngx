export const DateExample =
`<ser-form-element>
    <label>Fecha ejemplo</label>
    <ser-date serControl formControlName="date1"></ser-date>

    <div serErrors="date1">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;

export const DateTimeExample =
`<ser-form-element>
    <label>Fecha ejemplo</label>
    <ser-date serControl formControlName="date2" time></ser-date>

    <div serErrors="date2">
        <div serError="required">Requerido</div>
    </div>
</ser-form-element>`;
