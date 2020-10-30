import { mergeObjs } from './object';
/**
 * @description
 * Función para generar un código GUID aleatorio
 * @returns {string}
 */
export function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
/**
 * @description
 * Función para generar un código alfanúmerico único
 * @returns {string}
 */
export function uniqueId() {
    const today = new Date();
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4() + Math.floor((today.getTime() * Math.random()));
}
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
/**
 * @description
 * Función para obtener un número aleatorio
 * @param {number} min Número mínimo
 * @param {number} max Número máximo
 * @returns {number}
 */
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Función para generar contraseñas aleatorias
 * @param options Parametros de contraseña
 */
export function generatePassword(options) {
    var _a, _b, _c, _d;
    const defaultOptions = {
        length: 8,
        numbers: true,
        specialChars: false,
        lettersLowerCase: true,
        lettersUpperCase: true
    };
    mergeObjs(defaultOptions, options);
    let charset = '';
    if ((_a = defaultOptions) === null || _a === void 0 ? void 0 : _a.numbers) {
        charset += '0123456789';
    }
    if ((_b = defaultOptions) === null || _b === void 0 ? void 0 : _b.lettersLowerCase) {
        charset += 'abcdefghijklmnopqrstuvwxyz';
    }
    if ((_c = defaultOptions) === null || _c === void 0 ? void 0 : _c.lettersUpperCase) {
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if ((_d = defaultOptions) === null || _d === void 0 ? void 0 : _d.specialChars) {
        charset += '!#$%&\()*+,-./:;<=>?@^[\\]^_`{|}~';
    }
    let retVal = '';
    for (let i = 0, n = charset.length; i < defaultOptions.length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJ1dGlscy9yYW5kb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVyQzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLElBQUk7SUFDbEIsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7QUFDdkYsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsUUFBUTtJQUN0QixNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3pCLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9HLENBQUM7QUFFRCxTQUFTLEVBQUU7SUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDO1NBQzNDLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDWixTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsR0FBVyxFQUFFLEdBQVc7SUFDbkQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDM0QsQ0FBQztBQThCRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsT0FBMkI7O0lBRXhELE1BQU0sY0FBYyxHQUFzQjtRQUN0QyxNQUFNLEVBQUUsQ0FBQztRQUNULE9BQU8sRUFBRSxJQUFJO1FBQ2IsWUFBWSxFQUFFLEtBQUs7UUFDbkIsZ0JBQWdCLEVBQUUsSUFBSTtRQUN0QixnQkFBZ0IsRUFBRSxJQUFJO0tBQ3pCLENBQUM7SUFFRixTQUFTLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRW5DLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUVqQixVQUFJLGNBQWMsMENBQUUsT0FBTyxFQUFFO1FBQ3pCLE9BQU8sSUFBSSxZQUFZLENBQUM7S0FDM0I7SUFFRCxVQUFJLGNBQWMsMENBQUUsZ0JBQWdCLEVBQUU7UUFDbEMsT0FBTyxJQUFJLDRCQUE0QixDQUFDO0tBQzNDO0lBRUQsVUFBSSxjQUFjLDBDQUFFLGdCQUFnQixFQUFFO1FBQ2xDLE9BQU8sSUFBSSw0QkFBNEIsQ0FBQztLQUMzQztJQUVELFVBQUksY0FBYywwQ0FBRSxZQUFZLEVBQUU7UUFDOUIsT0FBTyxJQUFJLG1DQUFtQyxDQUFDO0tBQ2xEO0lBRUQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBRWhCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ2hFLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0Q7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWVyZ2VPYmpzIH0gZnJvbSAnLi9vYmplY3QnO1xyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBGdW5jacOzbiBwYXJhIGdlbmVyYXIgdW4gY8OzZGlnbyBHVUlEIGFsZWF0b3Jpb1xyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGd1aWQoKTogc3RyaW5nIHtcclxuICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogRnVuY2nDs24gcGFyYSBnZW5lcmFyIHVuIGPDs2RpZ28gYWxmYW7Dum1lcmljbyDDum5pY29cclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVJZCgpOiBzdHJpbmcge1xyXG4gIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICByZXR1cm4gczQoKSArIHM0KCkgKyBzNCgpICsgczQoKSArIHM0KCkgKyBzNCgpICsgczQoKSArIHM0KCkgKyBNYXRoLmZsb29yKCh0b2RheS5nZXRUaW1lKCkgKiBNYXRoLnJhbmRvbSgpKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHM0KCk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXHJcbiAgICAgIC50b1N0cmluZygxNilcclxuICAgICAgLnN1YnN0cmluZygxKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBGdW5jacOzbiBwYXJhIG9idGVuZXIgdW4gbsO6bWVybyBhbGVhdG9yaW9cclxuICogQHBhcmFtIHtudW1iZXJ9IG1pbiBOw7ptZXJvIG3DrW5pbW9cclxuICogQHBhcmFtIHtudW1iZXJ9IG1heCBOw7ptZXJvIG3DoXhpbW9cclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21JbnQobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJhbmRvbVBhc3N3b3JkT3BzIHtcclxuICAgIC8qKlxyXG4gICAgICogVGFtYcOxbyBkZSBsYSBjb250cmFzZcOxYVxyXG4gICAgICovXHJcbiAgICBsZW5ndGg/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICogSGFiaWxpdGEgc2kgc2UgaW5jbHV5ZW4gbsO6bWVyb3NcclxuICAgICAqL1xyXG4gICAgbnVtYmVycz86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYWJpbGl0YSBzaSBzZSBpbmNsdXllbiBjYXJhY3RlcmVzIGVzcGVjaWFsZXNcclxuICAgICAqL1xyXG4gICAgc3BlY2lhbENoYXJzPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhYmlsaXRhIHNpIHNlIGluY2x1eWVuIGxldHJhcyBlbiBtYXnDunNjdWxhc1xyXG4gICAgICovXHJcbiAgICBsZXR0ZXJzVXBwZXJDYXNlPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhYmlsaXRhIHNpIHNlIGluY2x1eWVuIGxldHJhcyBlbiBtaW7DunNjdWxhc1xyXG4gICAgICovXHJcbiAgICBsZXR0ZXJzTG93ZXJDYXNlPzogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZ1bmNpw7NuIHBhcmEgZ2VuZXJhciBjb250cmFzZcOxYXMgYWxlYXRvcmlhc1xyXG4gKiBAcGFyYW0gb3B0aW9ucyBQYXJhbWV0cm9zIGRlIGNvbnRyYXNlw7FhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVQYXNzd29yZChvcHRpb25zPzogUmFuZG9tUGFzc3dvcmRPcHMpIHtcclxuXHJcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9uczogUmFuZG9tUGFzc3dvcmRPcHMgPSB7XHJcbiAgICAgICAgbGVuZ3RoOiA4LFxyXG4gICAgICAgIG51bWJlcnM6IHRydWUsXHJcbiAgICAgICAgc3BlY2lhbENoYXJzOiBmYWxzZSxcclxuICAgICAgICBsZXR0ZXJzTG93ZXJDYXNlOiB0cnVlLFxyXG4gICAgICAgIGxldHRlcnNVcHBlckNhc2U6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgbWVyZ2VPYmpzKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICBsZXQgY2hhcnNldCA9ICcnO1xyXG5cclxuICAgIGlmIChkZWZhdWx0T3B0aW9ucz8ubnVtYmVycykge1xyXG4gICAgICAgIGNoYXJzZXQgKz0gJzAxMjM0NTY3ODknO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZWZhdWx0T3B0aW9ucz8ubGV0dGVyc0xvd2VyQ2FzZSkge1xyXG4gICAgICAgIGNoYXJzZXQgKz0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6JztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGVmYXVsdE9wdGlvbnM/LmxldHRlcnNVcHBlckNhc2UpIHtcclxuICAgICAgICBjaGFyc2V0ICs9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWic7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRlZmF1bHRPcHRpb25zPy5zcGVjaWFsQ2hhcnMpIHtcclxuICAgICAgICBjaGFyc2V0ICs9ICchIyQlJlxcKCkqKywtLi86Ozw9Pj9AXltcXFxcXV5fYHt8fX4nO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXRWYWwgPSAnJztcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IGNoYXJzZXQubGVuZ3RoOyBpIDwgZGVmYXVsdE9wdGlvbnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICByZXRWYWwgKz0gY2hhcnNldC5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbikpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXRWYWw7XHJcbn1cclxuIl19