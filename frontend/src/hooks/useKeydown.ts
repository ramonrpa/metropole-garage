import { useEffect } from 'react'

export const useKeydown = (key: string, callback: () => void) => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === key) {
        event.preventDefault()
        callback()
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [key, callback])
}
