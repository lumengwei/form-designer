export function makeFieldId() {
    const date = new Date().getTime();
    if (date < 0) {
        throw Error("系统时间错误");
    }
    return 'FD' + date
}

export function makeComponentId() {
    const date = new Date().getTime();
    if (date < 0) {
        throw Error("系统时间错误");
    }
    return 'CP' + date
}


/**
 * 获取属性值并擦除属性
 * @param obj
 * @param fieldPath
 * @returns {*}
 */
export function getFieldValue<T>(obj: any, fieldPath: string): T | null {
    const fields: string[] = fieldPath.split('.');

    let co: any = obj;
    let i = 1;
    for (const field of fields) {
        if (field.endsWith(']')) {
            // 数组处理
            let index = field.indexOf('[');
            const fieldName = field.substring(0, index);
            const arrIndex = parseInt(field.substring(index + 1, field.length - 1))

            if (co.hasOwnProperty(fieldName)) {
                if (i == fields.length) {
                    return co[fieldName][arrIndex];
                } else {
                    co = co[fieldName][arrIndex] || {};
                }
                i++;
            } else {
                throw Error(`[${fieldPath}] unreachable`);
            }
        } else if (co.hasOwnProperty(field)) {
            // 普通字段处理
            if (i == fields.length) {
                return co[field];
            } else {
                co = co[field];
            }
            i++;
        } else {
            throw Error(`[${fieldPath}] unreachable`);
        }
    }

    return null;
}

/**
 * 合并两个对象某个字段值
 * @param fieldPath
 * @param source
 * @param target
 */
export function mergeObj2Obj(fieldPath: string, source: any, target: any) {
    const value = getFieldValue(source, fieldPath);
    mergeObject(fieldPath, value, target);
}

/**
 *
 * @param fieldPath
 * @param value
 * @param obj
 */
export function mergeObject(fieldPath: string, value: any, obj: any) {
    const fields: string[] = fieldPath.split('.');

    let co: any = obj;
    let i = 1;
    for (const field of fields) {
        if (field.endsWith(']')) {
            // 数组处理
            let index = field.indexOf('[');
            const fieldName = field.substring(0, index);
            const arrIndex = parseInt(field.substring(index + 1, field.length - 1))

            if (co.hasOwnProperty(fieldName)) {
                if (i == fields.length) {
                    co[fieldName][arrIndex] = value;
                } else {
                    co = co[fieldName][arrIndex] || {};
                }
                i++;
            } else {
                throw Error(`[${fieldPath}] unreachable`);
            }
        } else if (co.hasOwnProperty(field)) {
            // 普通字段处理
            if (i == fields.length) {
                co[field] = value;
            } else {
                co = co[field];
            }
            i++;
        } else {
            throw Error(`[${fieldPath}] unreachable`);
        }

    }
}
