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
