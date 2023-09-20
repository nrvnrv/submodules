function getFieldFromUrlOrBody(req, fieldName) {
  if (req.query[fieldName] === undefined) {
    if (req.body[fieldName] === undefined) {
      return undefined;
    } else return req.body[fieldName];
  } else return req.query[fieldName];
}

function setIfUndefined(value, whatIfUndefined) {
  return value === undefined ? whatIfUndefined : value;
}

export { getFieldFromUrlOrBody, setIfUndefined };
