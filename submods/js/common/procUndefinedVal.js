export function getFieldFromUrlOrBody(req, fieldName) {
  if (req.query[fieldName] === undefined) {
    if (req.body[fieldName] === undefined) {
      return undefined;
    } else return req.body[fieldName];
  } else return req.query[fieldName];
}

export function setIfUndefined(value, whatIfUndefined) {
  return value === undefined ? whatIfUndefined : value;
}

export function setIfFieldNotInObj(obj, field, whatIfNotInObj) {
  return obj === undefined
    ? whatIfNotInObj
    : typeof obj !== typeof {}
    ? whatIfNotInObj
    : field in obj
    ? obj[field]
    : whatIfNotInObj;
}
