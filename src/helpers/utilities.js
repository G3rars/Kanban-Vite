function getFormData (ref) {
  return Object.fromEntries(new FormData(ref))
}

function objectToArr (obj) {
  Object.entries(obj)
}

export {
  getFormData,
  objectToArr
}
