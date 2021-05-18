export const BadgeExample =
`<ser-form-element style="width: 300px;">
    <label>Solo insignia</label>
    <ser-select serControl formControlName="badgeTemplate" [data]="options.dropdown">

        <ng-template sd-badge let-item="item">
            <div class="select-template">
                <div class="img" [ngStyle]="{'background-image': 'url(' + item.image + ')'}"></div>
                <div>
                    <div>{{ item.name }}</div>
                    <strong>{{ item.desc }}</strong>
                </div>
            </div>
        </ng-template>

    </ser-select>
</ser-form-element>`;

export const ItemExample =
`<ser-form-element style="width: 300px;">
    <label>Solo insignia</label>
    <ser-select serControl formControlName="itemTemplate" [data]="options.dropdown">

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
</ser-form-element>`;

export const BadgeItemExample =
`<ser-form-element style="width: 300px;">
    <label>Solo insignia</label>
    <ser-select serControl formControlName="badgeItemTemplate" [data]="options.dropdown">

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
</ser-form-element>`;

export const BadgeItemCompExample =
`<ser-form-element style="width: 300px;">
    <label>Solo insignia</label>
    <ser-select serControl formControlName="badgeItemCompTemplate" [data]="options.dropdown">

        <ng-template sd-badge-item let-item="item">
            <div class="select-template">
                <div class="img" [ngStyle]="{'background-image': 'url(' + item.image + ')'}"></div>
                <div>
                    <div>{{ item.name }}</div>
                    <strong>{{ item.desc }}</strong>
                </div>
            </div>
        </ng-template>

    </ser-select>
</ser-form-element>`;
