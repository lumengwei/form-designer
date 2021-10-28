export function guaranteeNumber(value, min, max) {
  if (value === undefined || value == null) {
    return value;
  }
  if (value < min) {
    // 最小值
    return min;
  }

  if (value > max) {
    // 最大值
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
export function getErasure(obj, prop) {
  if (typeof obj !== 'object') {
    throw new Error(`not expected type:${typeof obj}, must be object`);
  }
  const value = obj[prop];
  delete obj[prop];
  return value;
}

/**
 * 排序
 * @param {*} arr
 * @param {*} index
 * @param {*} tindex
 */
export function sorting(arr, index, tindex) {
  // 如果当前元素在拖动目标位置的下方，先将当前元素从数组拿出，数组长度-1，我们直接给数组拖动目标位置的地方新增一个和当前元素值一样的元素，
  // 我们再把数组之前的那个拖动的元素删除掉，所以要len+1
  if (index > tindex) {
    arr.splice(tindex, 0, arr[index]);
    arr.splice(index + 1, 1);
  } else {
    // 如果当前元素在拖动目标位置的上方，先将当前元素从数组拿出，数组长度-1，我们直接给数组拖动目标位置+1的地方新增一个和当前元素值一样的元素，
    // 这时，数组len不变，我们再把数组之前的那个拖动的元素删除掉，下标还是index
    arr.splice(tindex + 1, 0, arr[index]);
    arr.splice(index, 1);
  }
}
