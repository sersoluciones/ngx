export function inArray(value: any, array: any[]): boolean {
  return array ? array.indexOf(value) !== -1 : false;
}

export function notInArray(value: any, array: any[]): boolean {
  return array ? array.indexOf(value) === -1 : false;
}

export function arrayGroupBy(array: any[], field: string | number): object {

  const array_group_by = {};

  for (let index = 0; index < array.length; ++index) {

    if (array_group_by[array[index][field]] === undefined) {
      array_group_by[array[index][field]] = [];
    }

    array_group_by[array[index][field]].push(array[index]);
  }

  return array_group_by;
}

export function getObjectByValue({ array, attr, value }: { array: any[]; attr: string | number; value: any; }) {

  for (let i = 0; i < array.length; i++) {

    if (array[i].hasOwnProperty(attr)) {

      if (array[i][attr] === value) {

        return array[i];

      } else {

        for (const prop in array[i][attr]) {

          if (array[i][attr][prop] === value) {

            return array[i];

          }

        }

      }

    }

  }
}

export function getObjIndexByValue({ array, attr, value }: { array: any[]; attr: string | number; value: any; }) {

  for (let i = 0; i < array.length; i++) {

    if (array[i].hasOwnProperty(attr)) {

      if (array[i][attr] === value) {

        return i;

      } else {

        for (const prop in array[i][attr]) {

          if (array[i][attr][prop] === value) {

            return i;

          }

        }

      }

    }

  }
}
