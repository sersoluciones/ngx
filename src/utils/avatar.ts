import { Observable } from 'rxjs';
import { hasValue } from './check';

export class Color {

    // Settings
    // Play with these to change the types of colors generated
    hue: number;
    sat: number;
    light: number;
    hsl: string;

    minHue = 0;
    maxHue = 360;

    minSat = 75;
    maxSat = 100;

    minLight = 65;
    maxLight = 80;

    scaleLight = 15;

    constructor(hue?: number, sat?: number, light?: number, lightBackground?: boolean) {

        if (lightBackground) {
            this.minLight = 40;
            this.maxLight = 65;
        }

        this.hue = hue || this.randomNum(this.minHue, this.maxHue);

        // Redo if ugly hue is generated
        if (this.hue > 288 && this.hue < 316) {
            this.hue = this.randomNum(316, 360);
        } else if (this.hue > 280 && this.hue < 288) {
            this.hue = this.randomNum(260, 280);
        }

        this.sat = sat || this.randomNum(this.minSat, this.maxSat);
        this.light = light || this.randomNum(this.minLight, this.maxLight);

        this.hsl = 'hsl(' + this.hue + ', ' + this.sat + '%, ' + this.light + '%)';
    }

    randomNum(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Change hue by rotation number
    changeHue(hue: number, rotate: number) {
        return hue + rotate > this.maxHue ?
            (hue + rotate) - this.maxHue : hue + rotate;
    }

    // Scale lightness while keeping within limits
    changeLight(light: number) {
        return light + this.scaleLight > this.maxLight ? this.maxLight : light + this.scaleLight;
    }

}

export function generateDefaultImage(name: string, lastName?: string, type?: 'image/jpeg' | 'image/png', quality?: number): Observable<Blob> {
    return new Observable(observer => {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');

        const baseColor = new Color();

        ctx.beginPath();
        ctx.rect(0, 0, 200, 200);

        ctx.fillStyle = new Color(
            baseColor.changeHue(baseColor.hue, 0),
            baseColor.sat,
            baseColor.changeLight(baseColor.light)).hsl;

        ctx.fill();

        ctx.font = '500 70px Segoe UI';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let initials: string;

        if (hasValue(lastName)) {
            initials = name.charAt(0) + lastName.charAt(0);
        } else {
            initials = name.charAt(0) + name.charAt(0);
        }

        ctx.fillText(initials.toUpperCase(), canvas.width / 2, canvas.height / 2);

        canvas.toBlob(result => {
            observer.next(result);
            observer.complete();
        }, type, quality);
    });
}
