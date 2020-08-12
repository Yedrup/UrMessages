export const isObjEmpty = obj => {
  return !Object && !Object.keys(obj).length;
};

export const isObject = valueToTest => {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    valueToTest.constructor === Object
  );
};

export const filterInArray = (arrOfMessages, filterToApply) => {
  return arrOfMessages.filter(filterToApply);
};

export const findObjectByPropInArr = (
  arrayOfMessageObj,
  propertyToCheck,
  valueSearched
) => {
  let resp = Object.values(arrayOfMessageObj).find(object => {
    return object[propertyToCheck] === valueSearched;
  });
  return resp;
};
