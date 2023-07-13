import { useRef } from 'react'

function useDisable () {
  const disabled = useRef(false)

  function preventMulticlick () {
    disabled.current = true
  }

  function resetMultiClick () {
    disabled.current = false
  }

  function isDisabled () {
    return disabled.current
  }

  return {
    isDisabled,
    preventMulticlick,
    resetMultiClick
  }
}

export { useDisable }
