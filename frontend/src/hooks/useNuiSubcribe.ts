import { useEffect } from 'react'

export const useNuiSubscribe = <T>(event: string, callback: (data: T) => void) => {
  useEffect(() => {
    const handleNuiEvent = (ev: MessageEvent) => {
      if (ev.data && ev.data.type === event) {
        callback(ev.data.data)
      }
    }

    window.addEventListener('message', handleNuiEvent)

    return () => {
      window.removeEventListener('message', handleNuiEvent)
    }
  }, [event, callback])
}
