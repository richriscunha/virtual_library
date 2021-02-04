export const isEmpty = (collection: {} | any[]): boolean => {
  if (isObject(collection)) {
    return isEmptyObject(collection);
  }

  return isEmptyArray(collection as any[]);
};

const isObject = (object: {}): boolean => {
  return typeof object === "object" && object !== null;
};

const isEmptyArray = (array: any[]): boolean => {
  return array.length === 0;
};

const isEmptyObject = (object: {}): boolean => {
  const keys = Object.keys(object);
  return isEmptyArray(keys);
};
