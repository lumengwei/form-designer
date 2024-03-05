export function guaranteeNumber(value: number, min: number, max: number) {
    if (value === undefined || value == null) {
        return value;
    }
    if (value < min) {  // 最小值
        return min;
    }

    if (value > max) {// 最大值
        return max;
    }
    return value;
}

export function isNull() {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] === undefined || arguments[i] == null) {
            return true;
        }
    }
    return false;
}

/**
 * 获取属性值并擦除属性
 * @param obj
 * @param prop
 * @returns {*}
 */
export function getErasure(obj: any, prop: string) {
    if (typeof obj !== 'object') {
        throw new Error(`not expected type:${typeof obj}, must be object`);
    }
    const value = obj[prop];
    delete obj[prop];
    return value;
}
