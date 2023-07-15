function useStorage ({ storageName }) {
  function saveItem (item) {
    localStorage.setItem(storageName, JSON.stringify(item))
  }

  function getSavedItem () {
    const item = localStorage.getItem(storageName) ?? null
    return item
  }

  return {
    saveItem,
    getSavedItem
  }
}

export { useStorage }
