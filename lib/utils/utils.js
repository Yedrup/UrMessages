export const isObjEmpty = obj => !Object && !Object.keys(obj).length;

export const isObject = valueToTest =>
  valueToTest &&
  typeof valueToTest === 'object' &&
  valueToTest.constructor === Object;

export const filterInArray = (arrOfMessages, filterToApply) =>
  arrOfMessages.filter(filterToApply);

export const findObjectByPropInArr = (
  arrayOfMessageObj,
  propertyToCheck,
  valueSearched
) => {
  const resp = Object.values(arrayOfMessageObj).find(
    object => object[propertyToCheck] === valueSearched
  );
  return resp;
};
