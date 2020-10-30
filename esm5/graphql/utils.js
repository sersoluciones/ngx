import { __read, __values } from "tslib";
import { hasValue } from '../utils/check';
/**
 * @description
 * Función para transformar un objeto en un string apto para filtrar resultados GraphQL
 * @param {any} obj Objeto a convertir
 * @returns {string}
 */
export function objectToGraphParams(obj) {
    var e_1, _a;
    var graph_params = '';
    try {
        for (var _b = __values(Object.entries(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            if (hasValue(value)) {
                graph_params += key + ': ';
                if (typeof (value) === 'string') {
                    graph_params += '"' + value + '"';
                }
                else {
                    graph_params += value;
                }
                graph_params += ',';
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (hasValue(graph_params)) {
        graph_params = graph_params.substring(0, graph_params.length - 1);
    }
    return graph_params;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImdyYXBocWwvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQzs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxHQUFROztJQUUxQyxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7O1FBRXRCLEtBQTJCLElBQUEsS0FBQSxTQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7WUFBckMsSUFBQSx3QkFBWSxFQUFYLFdBQUcsRUFBRSxhQUFLO1lBQ2xCLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixZQUFZLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztnQkFFM0IsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxFQUFFO29CQUM3QixZQUFZLElBQUksR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7aUJBQ3JDO3FCQUFNO29CQUNILFlBQVksSUFBSSxLQUFLLENBQUM7aUJBQ3pCO2dCQUVELFlBQVksSUFBSSxHQUFHLENBQUM7YUFDdkI7U0FDSjs7Ozs7Ozs7O0lBRUQsSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDeEIsWUFBWSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDckU7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaGFzVmFsdWUgfSBmcm9tICcuLi91dGlscy9jaGVjayc7XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIEZ1bmNpw7NuIHBhcmEgdHJhbnNmb3JtYXIgdW4gb2JqZXRvIGVuIHVuIHN0cmluZyBhcHRvIHBhcmEgZmlsdHJhciByZXN1bHRhZG9zIEdyYXBoUUxcclxuICogQHBhcmFtIHthbnl9IG9iaiBPYmpldG8gYSBjb252ZXJ0aXJcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RUb0dyYXBoUGFyYW1zKG9iajogYW55KTogc3RyaW5nIHtcclxuXHJcbiAgbGV0IGdyYXBoX3BhcmFtcyA9ICcnO1xyXG5cclxuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvYmopKSB7XHJcbiAgICAgIGlmIChoYXNWYWx1ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgIGdyYXBoX3BhcmFtcyArPSBrZXkgKyAnOiAnO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgKHZhbHVlKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICBncmFwaF9wYXJhbXMgKz0gJ1wiJyArIHZhbHVlICsgJ1wiJztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZ3JhcGhfcGFyYW1zICs9IHZhbHVlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGdyYXBoX3BhcmFtcyArPSAnLCc7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChoYXNWYWx1ZShncmFwaF9wYXJhbXMpKSB7XHJcbiAgICAgIGdyYXBoX3BhcmFtcyA9IGdyYXBoX3BhcmFtcy5zdWJzdHJpbmcoMCwgZ3JhcGhfcGFyYW1zLmxlbmd0aCAtIDEpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGdyYXBoX3BhcmFtcztcclxufVxyXG4iXX0=