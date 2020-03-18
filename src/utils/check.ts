export function hasValue(value: any | any[]): boolean {
  if (Array.isArray(value)) {
    return 0 < value.length;
  } else {
    return ['', null, undefined, NaN].indexOf(value) === -1;
  }
}

export function objHasValue(value: any): boolean {
  return Object.keys(value).length > 0;
}
