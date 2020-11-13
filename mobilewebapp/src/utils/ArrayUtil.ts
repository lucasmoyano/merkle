export default class ArrayUtil {

  /** Remove element by index */
  public static removeByIndex(array: any[], index: number) {
    if (!array) { return; }
    ArrayUtil.remove(array, array[index]);
  }

  /** Remove element from array */
  public static remove(array: any[], element: any) {
    if (!array || !element) { return; }
    var index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  /** Insert an element in a specific index */
  public static addElementByIndex(array: any[], element: any, index: number) {
    if (!array || !element) { return; }
    array.splice(index, 0, element);
  }

  /** Add an element to the array if it not exist */
  public static addIfNotExist(array: any[], element: any) {
    if (!array || !element) { return; }
    let result = array.find(x => x == element);
    if (!result) {
      array.push(element);
    }
  }

  /**
   * Add or update an element from array.
   * @param array 
   * @param element 
   * @param predicate x => x.id == x.id
   */
  public static addOrUpdate(array: any[], element: any, predicate: any = null, addAtTheEnd: boolean = false) {
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

}