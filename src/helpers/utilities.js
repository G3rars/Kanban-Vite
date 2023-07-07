function getFormData (ref) {
  return Object.fromEntries(new FormData(ref))
}

function objectToArr (obj) {
  return Object.entries(obj)
}

export {
  getFormData,
  objectToArr
}
