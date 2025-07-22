/**
 * Deep merge source object into target object
 * @param target Target object
 * @param source Source object
 */
export function mergeObjs(target: any, source: any) {
    const isObject = (obj: any) => obj && typeof obj === 'object';

    if (!isObject(source)) {
        return target;
    }

    if (!isObject(target)) {
        return source;
    }

    Object.keys(source).forEach(key => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            target[key] = targetValue.concat(sourceValue);
        } else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = mergeObjs(Object.assign({}, targetValue), sourceValue);
        } else {
            target[key] = sourceValue;
        }
    });

    return target;
}

export const noopLegacy = () => { };

export function getPath(obj: any, path: string[]) {

    // Cache the current object
    let current = obj;

    // For each item in the path, dig into the object
    for (let i = 0; i < path.length; i++) {

        // If the item isn't found, return the default (or null)
        if (!current[path[i]]) { return undefined; }

        // Otherwise, update the current  value
        current = current[path[i]];

    }

    return current;

}
