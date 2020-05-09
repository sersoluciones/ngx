import { hasValue } from '../utils/check';

/**
 * @description
 * Función para transformar un objeto en un string apto para filtrar resultados GraphQL
 * @param {any} obj Objeto a convertir
 * @returns {string}
 */
export function objectToGraphParams(obj: any): string {

  let graph_params = '';

  for (const [key, value] of Object.entries(obj)) {
      if (hasValue(value)) {
          graph_params += key + ': ';

          if (typeof (value) === 'string') {
              graph_params += '"' + value + '"';
          } else {
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
