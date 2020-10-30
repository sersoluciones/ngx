import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @description
 * Clase para obtener, observar y cambiar el esquema de color claro/oscuro
 * @example
 * constructor(prefersColorSchemeService: PrefersColorSchemeService) { }
 *
 * this.prefersColorSchemeService.init(); // Setea el esquema inicial
 * this.prefersColorSchemeService.watch(); // Observa cambio de esquema en OS
 */
let PrefersColorSchemeService = class PrefersColorSchemeService {
    constructor() {
        this._SchemeLightClassName = 'scheme-light';
        this._SchemeDarkClassName = 'scheme-dark';
        this.Scheme = window.matchMedia('(prefers-color-scheme: dark)');
    }
    get Scheme() {
        return this._Scheme;
    }
    set Scheme(value) {
        this._Scheme = value;
    }
    get SchemeLightClassName() {
        return this._SchemeLightClassName;
    }
    set SchemeLightClassName(value) {
        this._SchemeLightClassName = value;
    }
    get SchemeDarkClassName() {
        return this._SchemeDarkClassName;
    }
    set SchemeDarkClassName(value) {
        this._SchemeDarkClassName = value;
    }
    /**
     * @description
     * Inicializar el esquema de color
     * @usageNotes
     * Usarse unicamente si se desea aplicar el esquema de color acorde al esquema de color del sistema operativo
     */
    init() {
        if (this.Scheme.matches) {
            this.enableDark();
        }
        else {
            this.enableLight();
        }
    }
    /**
     * @description
     * Obtener el esquema de color actual del SO
     * @returns {string} Esquema de color
     */
    get() {
        if (this.Scheme.matches) {
            return 'dark';
        }
        else {
            return 'light';
        }
    }
    /**
     * @description
     * Agrega SchemeDarkClassName y remueve SchemeLightClassName a la etiqueta body
     */
    enableDark() {
        const body = document.getElementsByTagName('body')[0];
        if (body.classList.contains(this.SchemeLightClassName)) {
            body.classList.remove(this.SchemeLightClassName);
        }
        body.classList.add(this.SchemeDarkClassName);
    }
    /**
     * @description
     * Agrega SchemeLightClassName y remueve SchemeDarkClassName a la etiqueta body
     */
    enableLight() {
        const body = document.getElementsByTagName('body')[0];
        if (body.classList.contains(this.SchemeDarkClassName)) {
            body.classList.remove(this.SchemeDarkClassName);
        }
        body.classList.add(this.SchemeLightClassName);
    }
    /**
     * @description
     * Habilita el cambio automatico de esquema de color según el cambio de esquema de color del SO
     */
    watch() {
        const setScheme = (ev) => {
            if (ev.matches) {
                console.log('Changed to dark mode');
                this.enableDark();
            }
            else {
                console.log('Changed to light mode');
                this.enableLight();
            }
        };
        if (typeof this.Scheme.onchange === 'function') {
            this.Scheme.onchange = setScheme;
        }
        else if (typeof this.Scheme.addEventListener === 'function') {
            this.Scheme.addEventListener('change', setScheme);
            // tslint:disable-next-line: deprecation
        }
        else if (typeof this.Scheme.addListener === 'function') {
            // tslint:disable-next-line: deprecation
            this.Scheme.addListener(setScheme);
        }
    }
};
PrefersColorSchemeService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PrefersColorSchemeService_Factory() { return new PrefersColorSchemeService(); }, token: PrefersColorSchemeService, providedIn: "root" });
PrefersColorSchemeService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PrefersColorSchemeService);
export { PrefersColorSchemeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVycy1jb2xvci1zY2hlbWUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZXJzb2wvbmd4LyIsInNvdXJjZXMiOlsicHJlZmVycy1jb2xvci1zY2hlbWUvcHJlZmVycy1jb2xvci1zY2hlbWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFM0M7Ozs7Ozs7O0dBUUc7QUFJSCxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUF5QjtJQXlCcEM7UUFoQlEsMEJBQXFCLEdBQUcsY0FBYyxDQUFDO1FBUXZDLHlCQUFvQixHQUFHLGFBQWEsQ0FBQztRQVMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBekJELElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBVyxNQUFNLENBQUMsS0FBcUI7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUdELElBQVcsb0JBQW9CO1FBQzdCLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO0lBQ3BDLENBQUM7SUFDRCxJQUFXLG9CQUFvQixDQUFDLEtBQUs7UUFDbkMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztJQUNyQyxDQUFDO0lBR0QsSUFBVyxtQkFBbUI7UUFDNUIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDbkMsQ0FBQztJQUNELElBQVcsbUJBQW1CLENBQUMsS0FBSztRQUNsQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFNRDs7Ozs7T0FLRztJQUNILElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxHQUFHO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUN2QixPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU07WUFDTCxPQUFPLE9BQU8sQ0FBQztTQUNoQjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxVQUFVO1FBQ1IsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDbEQ7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVztRQUNULE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0RCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUs7UUFFSCxNQUFNLFNBQVMsR0FBRyxDQUFDLEVBQXVCLEVBQUUsRUFBRTtZQUM1QyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDbkI7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDcEI7UUFDSCxDQUFDLENBQUM7UUFFRixJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBRTlDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFJLFNBQVMsQ0FBQztTQUVuQzthQUFNLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixLQUFLLFVBQVUsRUFBRTtZQUU3RCxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUVwRCx3Q0FBd0M7U0FDdkM7YUFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEtBQUssVUFBVSxFQUFFO1lBRXhELHdDQUF3QztZQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUVwQztJQUNILENBQUM7Q0FDRixDQUFBOztBQXBIWSx5QkFBeUI7SUFIckMsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLHlCQUF5QixDQW9IckM7U0FwSFkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBDbGFzZSBwYXJhIG9idGVuZXIsIG9ic2VydmFyIHkgY2FtYmlhciBlbCBlc3F1ZW1hIGRlIGNvbG9yIGNsYXJvL29zY3Vyb1xyXG4gKiBAZXhhbXBsZVxyXG4gKiBjb25zdHJ1Y3RvcihwcmVmZXJzQ29sb3JTY2hlbWVTZXJ2aWNlOiBQcmVmZXJzQ29sb3JTY2hlbWVTZXJ2aWNlKSB7IH1cclxuICpcclxuICogdGhpcy5wcmVmZXJzQ29sb3JTY2hlbWVTZXJ2aWNlLmluaXQoKTsgLy8gU2V0ZWEgZWwgZXNxdWVtYSBpbmljaWFsXHJcbiAqIHRoaXMucHJlZmVyc0NvbG9yU2NoZW1lU2VydmljZS53YXRjaCgpOyAvLyBPYnNlcnZhIGNhbWJpbyBkZSBlc3F1ZW1hIGVuIE9TXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcmVmZXJzQ29sb3JTY2hlbWVTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9TY2hlbWU6IE1lZGlhUXVlcnlMaXN0O1xyXG4gIHB1YmxpYyBnZXQgU2NoZW1lKCk6IE1lZGlhUXVlcnlMaXN0IHtcclxuICAgIHJldHVybiB0aGlzLl9TY2hlbWU7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgU2NoZW1lKHZhbHVlOiBNZWRpYVF1ZXJ5TGlzdCkge1xyXG4gICAgdGhpcy5fU2NoZW1lID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9TY2hlbWVMaWdodENsYXNzTmFtZSA9ICdzY2hlbWUtbGlnaHQnO1xyXG4gIHB1YmxpYyBnZXQgU2NoZW1lTGlnaHRDbGFzc05hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fU2NoZW1lTGlnaHRDbGFzc05hbWU7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgU2NoZW1lTGlnaHRDbGFzc05hbWUodmFsdWUpIHtcclxuICAgIHRoaXMuX1NjaGVtZUxpZ2h0Q2xhc3NOYW1lID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9TY2hlbWVEYXJrQ2xhc3NOYW1lID0gJ3NjaGVtZS1kYXJrJztcclxuICBwdWJsaWMgZ2V0IFNjaGVtZURhcmtDbGFzc05hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fU2NoZW1lRGFya0NsYXNzTmFtZTtcclxuICB9XHJcbiAgcHVibGljIHNldCBTY2hlbWVEYXJrQ2xhc3NOYW1lKHZhbHVlKSB7XHJcbiAgICB0aGlzLl9TY2hlbWVEYXJrQ2xhc3NOYW1lID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuU2NoZW1lID0gd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIEluaWNpYWxpemFyIGVsIGVzcXVlbWEgZGUgY29sb3JcclxuICAgKiBAdXNhZ2VOb3Rlc1xyXG4gICAqIFVzYXJzZSB1bmljYW1lbnRlIHNpIHNlIGRlc2VhIGFwbGljYXIgZWwgZXNxdWVtYSBkZSBjb2xvciBhY29yZGUgYWwgZXNxdWVtYSBkZSBjb2xvciBkZWwgc2lzdGVtYSBvcGVyYXRpdm9cclxuICAgKi9cclxuICBpbml0KCkge1xyXG4gICAgaWYgKHRoaXMuU2NoZW1lLm1hdGNoZXMpIHtcclxuICAgICAgdGhpcy5lbmFibGVEYXJrKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVuYWJsZUxpZ2h0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBPYnRlbmVyIGVsIGVzcXVlbWEgZGUgY29sb3IgYWN0dWFsIGRlbCBTT1xyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IEVzcXVlbWEgZGUgY29sb3JcclxuICAgKi9cclxuICBnZXQoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLlNjaGVtZS5tYXRjaGVzKSB7XHJcbiAgICAgIHJldHVybiAnZGFyayc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ2xpZ2h0JztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIEFncmVnYSBTY2hlbWVEYXJrQ2xhc3NOYW1lIHkgcmVtdWV2ZSBTY2hlbWVMaWdodENsYXNzTmFtZSBhIGxhIGV0aXF1ZXRhIGJvZHlcclxuICAgKi9cclxuICBlbmFibGVEYXJrKCkge1xyXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XHJcblxyXG4gICAgaWYgKGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuU2NoZW1lTGlnaHRDbGFzc05hbWUpKSB7XHJcbiAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLlNjaGVtZUxpZ2h0Q2xhc3NOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBib2R5LmNsYXNzTGlzdC5hZGQodGhpcy5TY2hlbWVEYXJrQ2xhc3NOYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIEFncmVnYSBTY2hlbWVMaWdodENsYXNzTmFtZSB5IHJlbXVldmUgU2NoZW1lRGFya0NsYXNzTmFtZSBhIGxhIGV0aXF1ZXRhIGJvZHlcclxuICAgKi9cclxuICBlbmFibGVMaWdodCgpIHtcclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xyXG5cclxuICAgIGlmIChib2R5LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLlNjaGVtZURhcmtDbGFzc05hbWUpKSB7XHJcbiAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLlNjaGVtZURhcmtDbGFzc05hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGJvZHkuY2xhc3NMaXN0LmFkZCh0aGlzLlNjaGVtZUxpZ2h0Q2xhc3NOYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIEhhYmlsaXRhIGVsIGNhbWJpbyBhdXRvbWF0aWNvIGRlIGVzcXVlbWEgZGUgY29sb3Igc2Vnw7puIGVsIGNhbWJpbyBkZSBlc3F1ZW1hIGRlIGNvbG9yIGRlbCBTT1xyXG4gICAqL1xyXG4gIHdhdGNoKCkge1xyXG5cclxuICAgIGNvbnN0IHNldFNjaGVtZSA9IChldjogTWVkaWFRdWVyeUxpc3RFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXYubWF0Y2hlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDaGFuZ2VkIHRvIGRhcmsgbW9kZScpO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlRGFyaygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDaGFuZ2VkIHRvIGxpZ2h0IG1vZGUnKTtcclxuICAgICAgICB0aGlzLmVuYWJsZUxpZ2h0KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLlNjaGVtZS5vbmNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cclxuICAgICAgdGhpcy5TY2hlbWUub25jaGFuZ2UgID0gc2V0U2NoZW1lO1xyXG5cclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuU2NoZW1lLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuXHJcbiAgICAgIHRoaXMuU2NoZW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHNldFNjaGVtZSk7XHJcblxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5TY2hlbWUuYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuXHJcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cclxuICAgICAgdGhpcy5TY2hlbWUuYWRkTGlzdGVuZXIoc2V0U2NoZW1lKTtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==