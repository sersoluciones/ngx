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
