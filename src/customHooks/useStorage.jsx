function useStorage ({ storageName }) {
  function saveItem (item) {
    localStorage.setItem(storageName, JSON.stringify(item))
  }

  function getSavedItem () {
    const item = localStorage.getItem(storageName) ?? null
    return JSON.parse(item)
  }

  function removeItem () {
    localStorage.removeItem(storageName)
  }

  return {
    saveItem,
    getSavedItem,
    removeItem
  }
}

export { useStorage }
