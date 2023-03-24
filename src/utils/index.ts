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

export function mergeObject(fieldPath: string, value: any, obj: Object) {
    const fields: string[] = fieldPath.split('.');

    let co: any = obj;
    let i = 1;
    for (const field of fields) {
        if (co.hasOwnProperty(field)) {
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
