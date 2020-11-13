/**
   * This method recive a function, and it is executed with a delay... If you call this function
   * many times, it going to be executed once.
   */
export const executeLastCallWithDelay: any = (() => {
  var timer: any = null;

  var action: any = (call: any, milliseconds: number = 500) => {
    if (!!timer) {
      clearInterval(timer);
    }
    timer = setTimeout(call, milliseconds);
  };
  return action;
})();

/**
 * Merge arrays
 * @param arrayA First Array
 * @param arrayB Second Array
 * @param mergeByProperty With this you can merge to array by an inner object property. If it's empty merge by the object value.
 */
export const mergeArrays: any = (arrayA: any[], arrayB: any[], mergeByProperty: string = '') => {
  let hash: any = {};
  var i;

  for (i = 0; i < arrayA.length; i++) {
    if (mergeByProperty) {
      hash[arrayA[i][mergeByProperty]] = arrayA[i];
    } else {
      hash[arrayA[i]] = arrayA[i];
    }
  }
  for (i = 0; i < arrayB.length; i++) {
    if (mergeByProperty) {
      hash[arrayB[i][mergeByProperty]] = arrayB[i];
    } else {
      hash[arrayB[i]] = arrayB[i];
    }
  }
  return Object.values(hash);
}


/**
 * Clone objects
 */
export const clone: any = (object: any) => {
  return JSON.parse(JSON.stringify(object));
}

/**
 * Add or update an element from array.
 * addOrUpdate(roles, role, x => x.id == x.id)
 */

/**
 * Add or update an element from array.
 * @param array 
 * @param element 
 * @param predicate x => x.id == x.id
 */
export const addOrUpdate = (array: any[], element: any, predicate: any = null, addAtTheEnd: boolean = false) => {
  if (!array || !element) { return; }
  if (!predicate) {
    predicate = (x: any) => x == element;
  }

  const index = array.findIndex(predicate);
  if (index >= 0) {
    array[index] = element;
  } else {
    addAtTheEnd ? array.push(element) : array.unshift(element);
  }
}
