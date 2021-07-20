import { useState } from 'react'

export const ShowModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false)
  const toggle = () => setIsShown(!isShown)
  return {
    isShown,
    toggle
  }
}
