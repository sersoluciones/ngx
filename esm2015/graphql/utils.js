import { hasValue } from '../utils/check';
/**
 * @description
 * Función para transformar un objeto en un string apto para filtrar resultados GraphQL
 * @param {any} obj Objeto a convertir
 * @returns {string}
 */
export function objectToGraphParams(obj) {
    let graph_params = '';
    for (const [key, value] of Object.entries(obj)) {
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
    if (hasValue(graph_params)) {
        graph_params = graph_params.substring(0, graph_params.length - 1);
    }
    return graph_params;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImdyYXBocWwvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLG1CQUFtQixDQUFDLEdBQVE7SUFFMUMsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBRXRCLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzVDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLFlBQVksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBRTNCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDN0IsWUFBWSxJQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDO2FBQ3JDO2lCQUFNO2dCQUNILFlBQVksSUFBSSxLQUFLLENBQUM7YUFDekI7WUFFRCxZQUFZLElBQUksR0FBRyxDQUFDO1NBQ3ZCO0tBQ0o7SUFFRCxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUN4QixZQUFZLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNyRTtJQUVELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYXNWYWx1ZSB9IGZyb20gJy4uL3V0aWxzL2NoZWNrJztcclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogRnVuY2nDs24gcGFyYSB0cmFuc2Zvcm1hciB1biBvYmpldG8gZW4gdW4gc3RyaW5nIGFwdG8gcGFyYSBmaWx0cmFyIHJlc3VsdGFkb3MgR3JhcGhRTFxyXG4gKiBAcGFyYW0ge2FueX0gb2JqIE9iamV0byBhIGNvbnZlcnRpclxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdFRvR3JhcGhQYXJhbXMob2JqOiBhbnkpOiBzdHJpbmcge1xyXG5cclxuICBsZXQgZ3JhcGhfcGFyYW1zID0gJyc7XHJcblxyXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iaikpIHtcclxuICAgICAgaWYgKGhhc1ZhbHVlKHZhbHVlKSkge1xyXG4gICAgICAgICAgZ3JhcGhfcGFyYW1zICs9IGtleSArICc6ICc7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiAodmFsdWUpID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgIGdyYXBoX3BhcmFtcyArPSAnXCInICsgdmFsdWUgKyAnXCInO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBncmFwaF9wYXJhbXMgKz0gdmFsdWU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZ3JhcGhfcGFyYW1zICs9ICcsJztcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKGhhc1ZhbHVlKGdyYXBoX3BhcmFtcykpIHtcclxuICAgICAgZ3JhcGhfcGFyYW1zID0gZ3JhcGhfcGFyYW1zLnN1YnN0cmluZygwLCBncmFwaF9wYXJhbXMubGVuZ3RoIC0gMSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZ3JhcGhfcGFyYW1zO1xyXG59XHJcbiJdfQ==