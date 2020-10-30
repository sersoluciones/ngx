import { greaterOrEqualThan, greaterThan, lowerOrEqualThan, lowerThan } from './comparison';
import { match } from './match';
import { maxFileSize, minFileSize, requiredFileType } from './file';
import { alreadyExist } from './remote';
// @dynamic
/**
 * Validaciones adicionales para Form Control's
 */
var CustomValidators = /** @class */ (function () {
    function CustomValidators() {
    }
    /**
     * Verifica si los campos proveidos son iguales
     * @param originalPathField Path del campo original
     * @param duplicatePathField Path del campo que deberia ser igual al original
     */
    CustomValidators.match = function (originalPathField, duplicatePathField) {
        return match(originalPathField, duplicatePathField);
    };
    /**
     * Verifica si un campo es menor a otro
     * @param BasePathField Path del campo que debe ser menor
     * @param TargetPathField Path del campo que deberia ser mayor
     */
    CustomValidators.lowerThan = function (BasePathField, TargetPathField) {
        return lowerThan(BasePathField, TargetPathField);
    };
    /**
     * Verifica si un campo es menor o igual a otro
     * @param BasePathField Path del campo que debe ser menor o igual
     * @param TargetPathField Path del campo que deberia ser mayor o igual
     */
    CustomValidators.lowerOrEqualThan = function (BasePathField, TargetPathField) {
        return lowerOrEqualThan(BasePathField, TargetPathField);
    };
    /**
     * Verifica si un campo es mayor a otro
     * @param BasePathField Path del campo que debe ser mayor
     * @param TargetPathField Path del campo que deberia ser menor
     */
    CustomValidators.greaterThan = function (BasePathField, TargetPathField) {
        return greaterThan(BasePathField, TargetPathField);
    };
    /**
     * Verifica si un campo es mayor o igual a otro
     * @param BasePathField Path del campo que debe ser mayor o igual
     * @param TargetPathField Path del campo que deberia ser menor o igual
     */
    CustomValidators.greaterOrEqualThan = function (BasePathField, TargetPathField) {
        return greaterOrEqualThan(BasePathField, TargetPathField);
    };
    /**
     * Verifica si el tamaño no excede el tamaño maximo indicado
     * @param size Tamaño en KB, MG ó GB (ejem: 100MB)
     */
    CustomValidators.maxFileSize = function (size) {
        return maxFileSize(size);
    };
    /**
     * Verifica si el tamaño es mayor el tamaño mínimo indicado
     * @param size Tamaño en KB, MG ó GB (ejem: 100MB)
     */
    CustomValidators.minFileSize = function (size) {
        return minFileSize(size);
    };
    /**
     * Verifica si el archivo tiene una extensión adminitida por medio de su cabecera
     * @param ext Extensiones admitidas
     */
    CustomValidators.requiredFileType = function (ext) {
        return requiredFileType(ext);
    };
    /**
     * Verifica si existe dicho valor en la DB si coincide con el modelo y el nombre de campo
     * @param http
     * @param url
     * @param requestBody propiedad Id opcional para excluir de la busqueda un registro
     */
    CustomValidators.alreadyExist = function (http, url, requestBody) {
        return alreadyExist(http, url, requestBody);
    };
    return CustomValidators;
}());
export { CustomValidators };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXZhbGlkYXRvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImZvcm0vdmFsaWRhdGlvbnMvY3VzdG9tLXZhbGlkYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDNUYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUF1QixNQUFNLFVBQVUsQ0FBQztBQUU3RCxXQUFXO0FBQ1g7O0dBRUc7QUFDSDtJQUFBO0lBaUZBLENBQUM7SUEvRUc7Ozs7T0FJRztJQUNJLHNCQUFLLEdBQVosVUFBYSxpQkFBeUIsRUFBRSxrQkFBMEI7UUFDOUQsT0FBTyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDBCQUFTLEdBQWhCLFVBQWlCLGFBQXFCLEVBQUUsZUFBdUI7UUFDM0QsT0FBTyxTQUFTLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksaUNBQWdCLEdBQXZCLFVBQXdCLGFBQXFCLEVBQUUsZUFBdUI7UUFDbEUsT0FBTyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSw0QkFBVyxHQUFsQixVQUFtQixhQUFxQixFQUFFLGVBQXVCO1FBQzdELE9BQU8sV0FBVyxDQUFDLGFBQWEsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLG1DQUFrQixHQUF6QixVQUEwQixhQUFxQixFQUFFLGVBQXVCO1FBQ3BFLE9BQU8sa0JBQWtCLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7O09BR0c7SUFDSSw0QkFBVyxHQUFsQixVQUFtQixJQUFZO1FBQzNCLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSSw0QkFBVyxHQUFsQixVQUFtQixJQUFZO1FBQzNCLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxpQ0FBZ0IsR0FBdkIsVUFBd0IsR0FBc0I7UUFDMUMsT0FBTyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSw2QkFBWSxHQUFuQixVQUFvQixJQUFnQixFQUFFLEdBQVcsRUFBRSxXQUFnQztRQUMvRSxPQUFPLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTCx1QkFBQztBQUFELENBQUMsQUFqRkQsSUFpRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3JGbiwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgQXN5bmNWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZGVsYXksIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBoYXNWYWx1ZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NoZWNrJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgZ3JlYXRlck9yRXF1YWxUaGFuLCBncmVhdGVyVGhhbiwgbG93ZXJPckVxdWFsVGhhbiwgbG93ZXJUaGFuIH0gZnJvbSAnLi9jb21wYXJpc29uJztcclxuaW1wb3J0IHsgbWF0Y2ggfSBmcm9tICcuL21hdGNoJztcclxuaW1wb3J0IHsgbWF4RmlsZVNpemUsIG1pbkZpbGVTaXplLCByZXF1aXJlZEZpbGVUeXBlIH0gZnJvbSAnLi9maWxlJztcclxuaW1wb3J0IHsgYWxyZWFkeUV4aXN0LCBCYXNlVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi9yZW1vdGUnO1xyXG5cclxuLy8gQGR5bmFtaWNcclxuLyoqXHJcbiAqIFZhbGlkYWNpb25lcyBhZGljaW9uYWxlcyBwYXJhIEZvcm0gQ29udHJvbCdzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ3VzdG9tVmFsaWRhdG9ycyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJpZmljYSBzaSBsb3MgY2FtcG9zIHByb3ZlaWRvcyBzb24gaWd1YWxlc1xyXG4gICAgICogQHBhcmFtIG9yaWdpbmFsUGF0aEZpZWxkIFBhdGggZGVsIGNhbXBvIG9yaWdpbmFsXHJcbiAgICAgKiBAcGFyYW0gZHVwbGljYXRlUGF0aEZpZWxkIFBhdGggZGVsIGNhbXBvIHF1ZSBkZWJlcmlhIHNlciBpZ3VhbCBhbCBvcmlnaW5hbFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbWF0Y2gob3JpZ2luYWxQYXRoRmllbGQ6IHN0cmluZywgZHVwbGljYXRlUGF0aEZpZWxkOiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoKG9yaWdpbmFsUGF0aEZpZWxkLCBkdXBsaWNhdGVQYXRoRmllbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmVyaWZpY2Egc2kgdW4gY2FtcG8gZXMgbWVub3IgYSBvdHJvXHJcbiAgICAgKiBAcGFyYW0gQmFzZVBhdGhGaWVsZCBQYXRoIGRlbCBjYW1wbyBxdWUgZGViZSBzZXIgbWVub3JcclxuICAgICAqIEBwYXJhbSBUYXJnZXRQYXRoRmllbGQgUGF0aCBkZWwgY2FtcG8gcXVlIGRlYmVyaWEgc2VyIG1heW9yXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb3dlclRoYW4oQmFzZVBhdGhGaWVsZDogc3RyaW5nLCBUYXJnZXRQYXRoRmllbGQ6IHN0cmluZyk6IFZhbGlkYXRvckZuIHtcclxuICAgICAgICByZXR1cm4gbG93ZXJUaGFuKEJhc2VQYXRoRmllbGQsIFRhcmdldFBhdGhGaWVsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJpZmljYSBzaSB1biBjYW1wbyBlcyBtZW5vciBvIGlndWFsIGEgb3Ryb1xyXG4gICAgICogQHBhcmFtIEJhc2VQYXRoRmllbGQgUGF0aCBkZWwgY2FtcG8gcXVlIGRlYmUgc2VyIG1lbm9yIG8gaWd1YWxcclxuICAgICAqIEBwYXJhbSBUYXJnZXRQYXRoRmllbGQgUGF0aCBkZWwgY2FtcG8gcXVlIGRlYmVyaWEgc2VyIG1heW9yIG8gaWd1YWxcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvd2VyT3JFcXVhbFRoYW4oQmFzZVBhdGhGaWVsZDogc3RyaW5nLCBUYXJnZXRQYXRoRmllbGQ6IHN0cmluZyk6IFZhbGlkYXRvckZuIHtcclxuICAgICAgICByZXR1cm4gbG93ZXJPckVxdWFsVGhhbihCYXNlUGF0aEZpZWxkLCBUYXJnZXRQYXRoRmllbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmVyaWZpY2Egc2kgdW4gY2FtcG8gZXMgbWF5b3IgYSBvdHJvXHJcbiAgICAgKiBAcGFyYW0gQmFzZVBhdGhGaWVsZCBQYXRoIGRlbCBjYW1wbyBxdWUgZGViZSBzZXIgbWF5b3JcclxuICAgICAqIEBwYXJhbSBUYXJnZXRQYXRoRmllbGQgUGF0aCBkZWwgY2FtcG8gcXVlIGRlYmVyaWEgc2VyIG1lbm9yXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBncmVhdGVyVGhhbihCYXNlUGF0aEZpZWxkOiBzdHJpbmcsIFRhcmdldFBhdGhGaWVsZDogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xyXG4gICAgICAgIHJldHVybiBncmVhdGVyVGhhbihCYXNlUGF0aEZpZWxkLCBUYXJnZXRQYXRoRmllbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmVyaWZpY2Egc2kgdW4gY2FtcG8gZXMgbWF5b3IgbyBpZ3VhbCBhIG90cm9cclxuICAgICAqIEBwYXJhbSBCYXNlUGF0aEZpZWxkIFBhdGggZGVsIGNhbXBvIHF1ZSBkZWJlIHNlciBtYXlvciBvIGlndWFsXHJcbiAgICAgKiBAcGFyYW0gVGFyZ2V0UGF0aEZpZWxkIFBhdGggZGVsIGNhbXBvIHF1ZSBkZWJlcmlhIHNlciBtZW5vciBvIGlndWFsXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBncmVhdGVyT3JFcXVhbFRoYW4oQmFzZVBhdGhGaWVsZDogc3RyaW5nLCBUYXJnZXRQYXRoRmllbGQ6IHN0cmluZyk6IFZhbGlkYXRvckZuIHtcclxuICAgICAgICByZXR1cm4gZ3JlYXRlck9yRXF1YWxUaGFuKEJhc2VQYXRoRmllbGQsIFRhcmdldFBhdGhGaWVsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJpZmljYSBzaSBlbCB0YW1hw7FvIG5vIGV4Y2VkZSBlbCB0YW1hw7FvIG1heGltbyBpbmRpY2Fkb1xyXG4gICAgICogQHBhcmFtIHNpemUgVGFtYcOxbyBlbiBLQiwgTUcgw7MgR0IgKGVqZW06IDEwME1CKVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbWF4RmlsZVNpemUoc2l6ZTogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xyXG4gICAgICAgIHJldHVybiBtYXhGaWxlU2l6ZShzaXplKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZlcmlmaWNhIHNpIGVsIHRhbWHDsW8gZXMgbWF5b3IgZWwgdGFtYcOxbyBtw61uaW1vIGluZGljYWRvXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSBUYW1hw7FvIGVuIEtCLCBNRyDDsyBHQiAoZWplbTogMTAwTUIpXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBtaW5GaWxlU2l6ZShzaXplOiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XHJcbiAgICAgICAgcmV0dXJuIG1pbkZpbGVTaXplKHNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmVyaWZpY2Egc2kgZWwgYXJjaGl2byB0aWVuZSB1bmEgZXh0ZW5zacOzbiBhZG1pbml0aWRhIHBvciBtZWRpbyBkZSBzdSBjYWJlY2VyYVxyXG4gICAgICogQHBhcmFtIGV4dCBFeHRlbnNpb25lcyBhZG1pdGlkYXNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlcXVpcmVkRmlsZVR5cGUoZXh0OiBzdHJpbmcgfCBzdHJpbmdbXSk6IEFzeW5jVmFsaWRhdG9yRm4ge1xyXG4gICAgICAgIHJldHVybiByZXF1aXJlZEZpbGVUeXBlKGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJpZmljYSBzaSBleGlzdGUgZGljaG8gdmFsb3IgZW4gbGEgREIgc2kgY29pbmNpZGUgY29uIGVsIG1vZGVsbyB5IGVsIG5vbWJyZSBkZSBjYW1wb1xyXG4gICAgICogQHBhcmFtIGh0dHBcclxuICAgICAqIEBwYXJhbSB1cmxcclxuICAgICAqIEBwYXJhbSByZXF1ZXN0Qm9keSBwcm9waWVkYWQgSWQgb3BjaW9uYWwgcGFyYSBleGNsdWlyIGRlIGxhIGJ1c3F1ZWRhIHVuIHJlZ2lzdHJvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhbHJlYWR5RXhpc3QoaHR0cDogSHR0cENsaWVudCwgdXJsOiBzdHJpbmcsIHJlcXVlc3RCb2R5OiBCYXNlVmFsaWRhdGlvbk1vZGVsKTogQXN5bmNWYWxpZGF0b3JGbiB7XHJcbiAgICAgICAgcmV0dXJuIGFscmVhZHlFeGlzdChodHRwLCB1cmwsIHJlcXVlc3RCb2R5KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19